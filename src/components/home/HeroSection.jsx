import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { PointerHighlight } from "../ui/PointerHighlight";
import LogoMarquee from "../ui/LogoMarquee";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="pt-32 pb-12 container mx-auto px-4 text-center flex flex-col items-center"
    >
      {/* HEADING */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight"
      >
        Semua Kebutuhan Risetmu,
        <br className="hidden sm:block" />
        Dalam Satu Platform{" "}
        <PointerHighlight
          containerClassName="inline-block"
          rectangleClassName="border-[#647DEB]"
          pointerClassName="text-[#647DEB]"
        >
          <span className="bg-gradient-to-r from-[#647DEB] to-[#647DEB] text-transparent bg-clip-text">
            Terintegrasi AI
          </span>
        </PointerHighlight>
      </motion.h1>

      {/* SUBTITLE */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-2"
      >
        Akselerasikan alur kerja akademik Anda. Dari riset hingga penulisan,
        manfaatkan kekuatan <em>Language Models</em> terdepan untuk hasil yang
        lebih cerdas dan efisien.
      </motion.p>

      {/* BUTTONS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10 sm:mt-12 w-full sm:w-auto"
      >
        {/* <Link  className="w-full sm:w-auto"> */}
          <Button
          href="#chat"
            variant="primary"
            size="lg"
            rounded="full"
            className="w-full sm:w-auto"
          >
            Mulai Sekarang
          </Button>
        {/* </Link> */}
        <Link to="/contributor" className="w-full sm:w-auto">
          <Button
            variant="secondary"
            size="lg"
            rounded="full"
            className="w-full sm:w-auto"
          >
            Lihat Kontributor
          </Button>
        </Link>
      </motion.div>

      {/* DIVIDER LINE */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="w-24 sm:w-32 h-[2px] bg-gradient-to-r from-[#C74559] to-[#EA2222] mt-16 sm:mt-20 mb-8 sm:mb-10 rounded-full"
      />

      {/* POWERED BY + LOGO MARQUEE + DESCRIPTION */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="flex flex-col items-center text-center space-y-4 sm:space-y-6 w-full"
      >
        <p className="text-xs sm:text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 px-4 sm:px-6 py-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
          ⚡ Powered by Smarter AI Models
        </p>

        {/* DESCRIPTION */}
        <p className="max-w-md sm:max-w-2xl text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed px-4 sm:px-0">
          <strong className="text-gray-800 dark:text-gray-200">
            SATSET AI
          </strong>{" "}
          dibangun di atas kombinasi model bahasa, analitik, dan pembelajaran
          mesin — dirancang untuk memahami ide, menjawab pertanyaan, dan
          menciptakan solusi yang efektif.
        </p>

        <div className="w-full max-w-5xl mt-4 sm:mt-6">
          <LogoMarquee />
        </div>
      </motion.div>
    </section>
  );
}
