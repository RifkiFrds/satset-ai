import React from "react";
import { motion } from "framer-motion";
import { FileText, PenTool, CheckCircle2, Sparkles } from "lucide-react";
import Button from "../ui/Button";
import { NavLink } from "react-router-dom";

export default function MakalahSection() {
  const features = [
    {
      icon: <PenTool size={20} className="text-indigo-500" />,
      title: "Auto Struktur",
      desc: "AI menghasilkan outline otomatis: abstrak, pendahuluan, dan kesimpulan.",
    },
    {
      icon: <FileText size={20} className="text-pink-500" />,
      title: "Citations Smart",
      desc: "Sisipkan referensi dengan format APA, MLA, atau IEEE secara instan.",
    },
    {
      icon: <CheckCircle2 size={20} className="text-emerald-500" />,
      title: "Proofreading AI",
      desc: "Koreksi grammar dan tone agar sesuai dengan konteks akademik.",
    },
    {
      icon: <Sparkles size={20} className="text-amber-400" />,
      title: "Ekspor Mudah",
      desc: "Download hasil ke format DOCX atau PDF siap kirim.",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 px-4 sm:px-8 lg:px-16 bg-transparent">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-left"
        >
          <span className="inline-flex items-center gap-2 px-6 py-2 text-xs sm:text-sm font-medium rounded-full text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
            <Sparkles size={16} className="text-indigo-400" />
            AI Makalah Generator
          </span>

          <h2 className="text-4xl md:text-4xl font-bold text-gray-900 dark:text-white leading-snug mt-3 mb-3">
            Buat Makalah Lebih Cepat
            <br />
            <span className="bg-gradient-to-r from-[#C74559] to-[#647DEB] bg-clip-text text-transparent">
              Tanpa Mengorbankan Kualitas
            </span>
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-12 max-w-lg">
            SATSET AI membantu mahasiswa dan peneliti menulis makalah dengan struktur akademik yang benar dan profesional.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-10">
            {features.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="p-4 sm:p-5 rounded-xl border border-gray-200/40 dark:border-white/10 backdrop-blur-sm hover:border-indigo-400/40 transition text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  {item.icon}
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-start">
            <NavLink to="/template-makalah">
              <Button
                variant="secondary"
                size="md"
                className="gap-2 flex items-center"
              >
                Coba Generator Makalah
                <FileText size={16} />
              </Button>
            </NavLink>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative group w-full max-w-[260px] sm:max-w-[350px] md:max-w-[450px]">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-[#C74559]/10 to-[#647DEB]/10 opacity-40 blur-2xl transition group-hover:opacity-80"></div>
            <img
              src="/images/makalah.webp"
              alt="Makalah"
              className="relative z-10 rounded-[1.8rem] shadow-xl w-full h-auto object-cover"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
