import React from 'react';
import { motion } from 'framer-motion';

// Ganti teks ini dengan path ke logo SVG Anda nanti
const logos = [
  "Gemini",
  "OpenAI",
  "Llama",
  "Claude",
  "Mistral",
  "Replicate",
];

// Gandakan array untuk loop yang mulus
const allLogos = [...logos, ...logos];

export default function LogoMarquee() {
  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden" aria-hidden="true">
      <motion.div
        className="flex"
        animate={{
          x: ["0%", "-100%"], // Animasi dari 0% ke -100%
        }}
        transition={{
          ease: "linear",
          duration: 20, // Durasi 20 detik
          repeat: Infinity, // Ulangi selamanya
        }}
      >
        {allLogos.map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-48 flex justify-center items-center"
          >
            <span className="text-xl font-medium text-gray-500 dark:text-gray-400">
              {/* Ganti <span> ini dengan <img> nanti */}
              {logo}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}