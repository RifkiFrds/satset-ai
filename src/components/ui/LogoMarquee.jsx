import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import meta from "../../assets/images/meta-ai.png";
import openai from "../../assets/images/open-ai.png";
import netlify from "../../assets/images/netlify.png";
import claude from "../../assets/images/claude-ai.png";
import mistral from "../../assets/images/mistral-ai.png";
import replicate from "../../assets/images/replicate-brand.png";
import granite from "../../assets/images/granite-ai.png";

// Logo list
const logos = [
  { src: meta, alt: "Meta" },
  { src: openai, alt: "OpenAI" },
  { src: netlify, alt: "Netlify" },
  { src: claude, alt: "Claude" },
  { src: mistral, alt: "Mistral" },
  { src: replicate, alt: "Replicate" },
  { src: granite, alt: "Granite AI" },
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
