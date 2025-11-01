import React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, BookCheckIcon } from "lucide-react";
import { BorderBeam } from "./ui/BorderBeam";


const navItems = [
  { name: "Home", href: "#hero" }, 
  { name: "About", href: "#about" }, 
  { name: "Features", href: "#features" }, 
  { name: "Contributor", href: "#contributor" }, 
];

export default function Navbar() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Theme toggle
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Scroll listener for hide/show header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false); // Scrolling down
      } else {
        setShowHeader(true); // Scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // ScrollTo function
  const handleScrollTo = (id) => {
    // Menambahkan penanganan jika ID adalah "/" atau path
    // Jika tidak, itu akan error. Kita hanya proses hash ID.
    if (id.startsWith("#")) {
      const target = document.querySelector(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // Jika ini adalah path (cth: "/"), kita scroll ke atas
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  // ... (menuVariants, listVariants, itemVariants tetap sama) ...
  const menuVariants = {
    open: {
      clipPath: "circle(1200px at 90% 5%)",
      transition: { type: "spring", stiffness: 20, restDelta: 2 },
    },
    closed: {
      clipPath: "circle(20px at 90% 5%)",
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
  };

  const listVariants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { y: { stiffness: 1000, velocity: -100 } },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: { y: { stiffness: 1000 } },
    },
  };

  return (
    <AnimatePresence>
      {showHeader && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, top: 20, opacity: 1 }} // <-- Memastikan 'top: 20' ada di 'animate'
          exit={{ y: -100, opacity: 0, transition: { duration: 0.4 } }}
          transition={{ duration: 0.4, ease: "easeOut" }} // <-- Durasi disamakan
          className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4"
        >
          <div
            className="border border-gray-100 dark:border-gray-900 backdrop-blur-xl
             w-full xl:max-w-6xl rounded-full
             flex items-center justify-between px-6 py-3
             transition-all duration-300"
          >
            <BorderBeam />

            {/* Logo / Brand */}
            <a
              onClick={() => handleScrollTo("#hero")} // Logo scroll ke #hero
              className="cursor-pointer font-bold text-lg text-gray-800 dark:text-white"
            >
              <BookCheckIcon />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex flex-1 justify-center">
              <ul className="flex space-x-6">
                {navItems.map((item) => (
                  <motion.li
                    key={item.name}
                    className="relative group text-sm font-medium text-gray-600 
                     dark:text-gray-300 transition-colors"
                  >
                    <a
                      onClick={() => handleScrollTo(item.href)}
                      className="cursor-pointer hover:text-blue-800 dark:hover:text-blue-400"
                    >
                      {item.name}
                    </a>
                    <motion.span
                      className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-500 rounded-full"
                      initial={{ width: 0, x: "-50%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Theme Toggle Button (Desktop) */}
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-sm font-semibold
               hover:bg-blue-400 dark:hover:bg-blue-800 transition-colors
               hidden md:block" // Tetap hidden di mobile
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div /* ... */ >
                    <Moon size={20} className="text-gray-800 dark:text-white" />
                  </motion.div>
                ) : (
                  <motion.div /* ... */ >
                    <Sun size={20} className="text-gray-800 dark:text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-gray-800 dark:text-white"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Mobile Sidebar */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                className="fixed inset-0 z-40 bg-white dark:bg-gray-950 md:hidden flex flex-col items-center justify-center" // <-- Sesuaikan BG
              >
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-8 right-8 text-gray-800 dark:text-white"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <X size={32} />
                </motion.button>

                <motion.ul
                  variants={listVariants}
                  className="flex flex-col items-center justify-center h-full space-y-8"
                >
                  {navItems.map((item) => (
                    <motion.li key={item.name} variants={itemVariants}>
                      <a
                        onClick={() => handleScrollTo(item.href)}
                        className="text-4xl font-bold text-gray-800 dark:text-white cursor-pointer"
                      >
                        {item.name}
                      </a>
                    </motion.li>
                  ))}
                  
                  {/* Theme Toggle di Mobile Menu */}
                  <motion.li variants={itemVariants}>
                    <motion.button
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="p-3 rounded-full text-sm font-semibold
                       hover:bg-blue-100 dark:hover:bg-gray-800 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {theme === "dark" ? (
                          <motion.div
                            key="moon-mobile"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Moon size={24} className="text-gray-800 dark:text-white" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="sun-mobile"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Sun size={24} className="text-gray-800 dark:text-white" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </motion.li>
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}