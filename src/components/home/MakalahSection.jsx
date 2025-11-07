import React from "react";
import { motion } from "framer-motion";
import { FileText, PenTool, CheckCircle2, Sparkles } from "lucide-react";
import makalahIllustration from "../../assets/images/makalah.webp";
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
    <section className="relative overflow-hidden py-20 px-4 sm:px-8 lg:px-16 bg-transparent">

  <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-14 lg:gap-20">

    {/* LEFT TEXT */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center lg:text-left"
    >
      <span className="inline-flex items-center justify-center lg:justify-start gap-2 px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full bg-white/60 dark:bg-white/10 shadow-sm backdrop-blur border border-white/20 mb-6">
        <Sparkles size={16} className="text-indigo-400" />
        AI Makalah Generator
      </span>

      <h2 className="text-4xl md:text-4xl font-bold text-gray-900 dark:text-white leading-snug mb-5">
         Buat Makalah Lebih Cepat
       <br />
        <span className="bg-gradient-to-r from-[#C74559] to-[#647DEB] bg-clip-text text-transparent">
          Tanpa Mengorbankan Kualitas
        </span>
      </h2>

      <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
        SATSET AI membantu mahasiswa dan peneliti menulis makalah dengan struktur akademik yang benar dan profesional.
      </p>

      {/* FEATURES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-10 max-w-lg mx-auto lg:mx-0">
        {features.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="p-4 sm:p-5 rounded-xl border border-gray-200/40 dark:border-white/10 bg-transparent backdrop-blur-sm hover:border-indigo-400/40 transition"
          >
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
              {item.icon}
              <h4 className="font-medium text-gray-900 dark:text-white">
                {item.title}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center lg:text-left">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA BUTTON */}
      <div className="flex justify-center lg:justify-start">
        <NavLink to="/features/template-makalah">
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

    {/* RIGHT IMAGE */}
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex justify-center"
    >
      <div className="relative group w-full max-w-[270px] sm:max-w-[350px] md:max-w-[450px]">
        <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-[#C74559]/40 to-[#647DEB]/40 opacity-40 blur-2xl transition group-hover:opacity-80"></div>
        <img
          src={makalahIllustration}
          alt="Makalah"
          className="relative z-10 rounded-[1.8rem] shadow-xl w-full h-auto object-cover"
        />
      </div>
    </motion.div>

  </div>
</section>

  );
}
