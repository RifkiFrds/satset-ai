import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  MessageSquare,
  SearchCheck,
  FileText,
} from "lucide-react";
import { BorderBeam } from "./ui/BorderBeam";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Home", to: "/" },
  {
    name: "Features",
    dropdown: [
      {
        name: "Chatbot AI",
        to: "/chat-bot-ai",
        description: "Asisten cerdas untuk menjawab pertanyaan Anda.",
        icon: <MessageSquare size={20} className="text-blue-500" />,
      },
      {
        name: "Review Jurnal AI",
        to: "/review-jurnal-ai",
        description: "Analisis dan ringkas paper ilmiah secara instan.",
        icon: <SearchCheck size={20} className="text-green-500" />,
      },
      {
        name: "Template Makalah",
        to: "/template-makalah",
        description: "Buat kerangka tugas & laporan otomatis.",
        icon: <FileText size={20} className="text-purple-500" />,
      },
    ],
  },
  { name: "Contributor", to: "/contributor" },
];

export default function Navbar() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [openMobileItem, setOpenMobileItem] = useState(null);

  // Theme toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Hide/show header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(!(currentScrollY > lastScrollY && currentScrollY > 80));
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const menuVariants = {
    open: {
      clipPath: "circle(1200px at 90% 5%)",
      transition: { type: "spring", stiffness: 20 },
    },
    closed: {
      clipPath: "circle(20px at 90% 5%)",
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
  };

  const listVariants = {
    open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };

  const itemVariants = {
    open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000 } } },
    closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } },
  };

  return (
    <AnimatePresence>
      {showHeader && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
        >
          <div
            className="border border-gray-100 dark:border-gray-900 backdrop-blur-xl
               w-full xl:max-w-2xl rounded-full
               flex items-center justify-between px-6 py-3 transition-all duration-300"
          >
            <BorderBeam />

            {/* Logo */}
            <Link to="/" className="cursor-pointer">
              <img
                src={logo}
                alt="Logo"
                className="h-14 w-auto"
                style={{ objectPosition: "center" }}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex flex-1 justify-center">
              <ul className="flex space-x-6">
                {navItems.map((item) => (
                  <motion.li
                    key={item.name}
                    className="relative group text-sm font-medium text-gray-600 dark:text-gray-300"
                    onHoverStart={() =>
                      item.dropdown && setActiveDropdown(item.name)
                    }
                    onHoverEnd={() => item.dropdown && setActiveDropdown(null)}
                  >
                    {item.dropdown ? (
                      <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-800 dark:hover:text-blue-400">
                        <span>{item.name}</span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${
                            activeDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    ) : (
                      <Link
                        to={item.to}
                        className="cursor-pointer hover:text-blue-800 dark:hover:text-blue-400"
                      >
                        {item.name}
                      </Link>
                    )}

                    <AnimatePresence>
                      {item.dropdown && activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 15, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-8 left-1/2 -translate-x-1/2 
                                     w-max max-w-sm 
                                     bg-white dark:bg-gray-900 
                                     border border-gray-200 dark:border-gray-700 
                                     rounded-xl shadow-2xl"
                        >
                          <div className="p-4 grid gap-4">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.to}
                                onClick={() => setActiveDropdown(null)}
                                className="flex items-start p-3 rounded-lg
                                           hover:bg-blue-50 dark:hover:bg-gray-800
                                           transition-colors duration-150"
                              >
                                <div className="flex-shrink-0 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                  {subItem.icon}
                                </div>
                                <div className="ml-3">
                                  <p className="font-semibold text-sm text-gray-900 dark:text-white">
                                    {subItem.name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {subItem.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Theme Toggle */}
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hidden md:block hover:bg-blue-400 dark:hover:bg-blue-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === "dark" ? (
                <Moon size={20} className="text-gray-200" />
              ) : (
                <Sun size={20} className="text-gray-800" />
              )}
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
                className="fixed inset-0 z-40 bg-white dark:bg-gray-950 md:hidden flex flex-col items-center justify-center"
              >
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-8 right-8 text-gray-800 dark:text-white"
                >
                  <X size={32} />
                </motion.button>

                <motion.ul
                  variants={listVariants}
                  className="flex flex-col items-center space-y-6 w-full px-8"
                >
                  {navItems.map((item) => (
                    <motion.li
                      key={item.name}
                      variants={itemVariants}
                      className="w-full"
                    >
                      {item.dropdown ? (
                        <div className="w-full">
                          <button
                            onClick={() =>
                              setOpenMobileItem(
                                openMobileItem === item.name ? null : item.name,
                              )
                            }
                            className="flex items-center justify-between w-full text-3xl font-semibold text-gray-800 dark:text-white"
                          >
                            <span>{item.name}</span>
                            <ChevronDown
                              size={24}
                              className={`transition-transform duration-300 ${
                                openMobileItem === item.name ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence>
                            {openMobileItem === item.name && (
                              <motion.ul
                                initial={{
                                  height: 0,
                                  opacity: 0,
                                  marginTop: 0,
                                }}
                                animate={{
                                  height: "auto",
                                  opacity: 1,
                                  marginTop: "16px",
                                }}
                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                className="overflow-hidden space-y-4 pl-5 ml-2 border-l-2 border-gray-200 dark:border-gray-700"
                              >
                                {item.dropdown.map((subItem) => (
                                  <li key={subItem.name}>
                                    <Link
                                      to={subItem.to}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="flex items-center justify-start gap-3 
                                                 text-xl text-gray-700 dark:text-gray-300 
                                                 hover:text-blue-500 dark:hover:text-blue-400"
                                    >
                                      {React.cloneElement(subItem.icon, {
                                        size: 18,
                                      })}
                                      <span>{subItem.name}</span>
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          to={item.to}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block w-full text-left text-3xl font-semibold text-gray-800 dark:text-white"
                        >
                          {item.name}
                        </Link>
                      )}
                    </motion.li>
                  ))}

                  <motion.li variants={itemVariants} className="pt-6">
                    <motion.button
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                      className="p-3 rounded-full hover:bg-blue-100 dark:hover:bg-gray-800 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {theme === "dark" ? (
                        <Moon size={24} className="text-white" />
                      ) : (
                        <Sun size={24} className="text-gray-800" />
                      )}
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
