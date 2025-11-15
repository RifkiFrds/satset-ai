import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Logo list
const logos = [
  { src: "/images/open-ai.png", alt: "OpenAI" },
  { src: "/images/claude-ai.png", alt: "Claude" },
  { src: "images/meta-ai.png", alt: "Meta" },
  { src: "/images/mistral-ai.png", alt: "Mistral" },
  { src: "/images/granite-ai.png", alt: "Granite AI" },
  { src: "/images/replicate-brand.png", alt: "Replicate" },
  { src: "/images/netlify.png", alt: "Netlify" },
];

// Gandakan array agar loop marquee mulus
const allLogos = [...logos, ...logos];

export default function LogoMarquee() {
  const [duration, setDuration] = useState(15);

  useEffect(() => {
    // Fungsi untuk update durasi berdasarkan ukuran layar
    const updateDuration = () => {
      if (window.innerWidth < 768) {
        setDuration(7); // Mobile (md ke bawah)
      } else {
        setDuration(15); // Desktop
      }
    };

    updateDuration(); // Jalankan saat pertama render
    window.addEventListener("resize", updateDuration); // Update saat resize

    return () => window.removeEventListener("resize", updateDuration);
  }, []);

  return (
    <div
      className="w-full max-w-4xl mx-auto overflow-hidden py-2 sm:py-3"
      aria-hidden="true"
    >
      <motion.div
        className="flex"
        animate={{
          x: ["0%", "-100%"],
        }}
        transition={{
          ease: "linear",
          duration: duration,
          repeat: Infinity,
        }}
      >
        {allLogos.map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-36 sm:w-44 md:w-48 flex justify-center items-center"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-8 sm:h-9 md:h-10 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
