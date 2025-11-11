import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="w-full py-30 md:py-30">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="container mx-auto max-w-4xl px-4 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900">
          Temui Tim{" "}
          <span className="bg-gradient-to-r from-blue-900 to-[#647DEB] bg-clip-text text-transparent">
            SATSET <span className="text-[#EA2222]">AI</span>
          </span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-neutral-700">
          Kami adalah tim mahasiswa yang bersemangat, berkolaborasi untuk
          membangun alat yang bermanfaat bagi produktivitas akademik Anda.
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
