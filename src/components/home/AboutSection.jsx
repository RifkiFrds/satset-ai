import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { MessageSquare, FileText, Zap } from "lucide-react";

export default function AboutSection() {

  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/lottie/about-ilustration.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  if (!animationData) return null;

  return (
    <section
      id="about"
      className="container mx-auto px-6 py-20 md:py-10 flex flex-col lg:grid lg:grid-cols-2 items-center gap-10 lg:gap-16"
    >
      {/* LEFT CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center lg:text-left"
      >
        <h2 className="text-4xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
          Meningkatkan Produktivitas Mahasiswa dengan{" "}
          <span className="bg-gradient-to-r from-blue-900 to-[#647DEB] bg-clip-text text-transparent">
            SATSET <span className="text-[#EA2222]">AI</span>
          </span>
        </h2>

        <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
          <strong>SATSET AI</strong> adalah aplikasi web berbasis AI yang
          dirancang untuk membantu mahasiswa menyelesaikan tugas akademik lebih
          cepat dan efisien — mulai dari riset, penulisan, hingga manajemen
          waktu.
        </p>

        <ul className="text-gray-700 dark:text-gray-300 space-y-5 mb-10 text-left inline-block">
          <li className="flex items-start gap-3">
            <MessageSquare className="text-[#C74559] w-6 h-6 mt-1 flex-shrink-0" />
            <span>
              <strong>Chatbot Interaktif</strong> — Jawab pertanyaan, diskusikan
              ide, atau bantu perbaiki tulisan akademik dengan kecerdasan AI.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <FileText className="text-[#EA2222] w-6 h-6 mt-1 flex-shrink-0" />
            <span>
              <strong>Generator Kerangka Makalah</strong> — Buat outline
              otomatis sesuai format populer seperti APA, IEEE, dan lainnya.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Zap className="text-[#647DEB] w-6 h-6 mt-1 flex-shrink-0" />
            <span>
              <strong>Review Jurnal Kilat</strong> — Ringkas jurnal ilmiah
              secara instan dan temukan poin penting dalam hitungan detik.
            </span>
          </li>
        </ul>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          Aplikasi ini dikembangkan oleh{" "}
          <strong>tim mahasiswa beranggotakan 6 orang</strong> sebagai proyek
          kolaboratif berbasis AI. Dibangun dengan teknologi modern —
          <em>Vite, Tailwind CSS, Serverless, dan Replicate API</em> — untuk
          memastikan performa yang ringan, cepat, dan aman.
        </p>
      </motion.div>

      {/* RIGHT ILLUSTRATION */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        viewport={{ once: true }}
        className="w-full flex justify-center"
      >
        <Lottie
           animationData={animationData}
          loop={true}
          className="w-72 sm:w-96 lg:w-[28rem]"
        />
      </motion.div>
    </section>
  );
}
