import React from "react";
import { motion } from "framer-motion";
import { Github, Instagram, LinkedinIcon, Mail } from "lucide-react";

export default function ContributorCard({
  image,
  title,
  subtitle,
  description,
  socials,
  borderColor,
  gradient,
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative rounded-3xl overflow-hidden bg-white dark:bg-gray-900 
                 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] 
                 hover:shadow-[0_8px_25px_-4px_rgba(0,0,0,0.15)] 
                 transition-all duration-300 p-6 flex flex-col items-center text-center"
    >
      {/* Avatar */}
      <div
        className="w-24 h-24 rounded-full border-4 mb-4 overflow-hidden shadow-md"
        style={{ borderColor }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Nama & Role */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-sm text-[#647DEB] font-medium mb-2">{subtitle}</p>

      {/* Deskripsi */}
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs">
          {description}
        </p>
      )}

      {/* Divider line */}
      <div className="w-12 h-[2px] bg-gradient-to-r from-[#C74559] to-[#647DEB] rounded-full my-4"></div>

      {/* Socials */}
      <div className="flex justify-center gap-5 mt-2 text-gray-600 dark:text-gray-300">
        {socials.github && (
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black dark:hover:text-white transition-colors"
          >
            <Github size={18} />
          </a>
        )}
        {socials.instagram && (
          <a
            href={socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#C13584] transition-colors"
          >
            <Instagram size={18} />
          </a>
        )}
        {socials.linkedin && (
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0A66C2] transition-colors"
          >
            <LinkedinIcon size={18} />
          </a>
        )}
        {socials.email && (
          <a
            href={socials.email}
            className="hover:text-[#EA4335] transition-colors"
          >
            <Mail size={18} />
          </a>
        )}
      </div>

      {/* Bottom Border Gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[6px] rounded-b-3xl"
        style={{
          background: gradient,
        }}
      />
    </motion.div>
  );
}
