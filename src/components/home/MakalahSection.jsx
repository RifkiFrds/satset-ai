import React from "react";
import { motion } from "framer-motion";
import { FileText, PenTool, CheckCircle2, Sparkles } from "lucide-react";
import makalahIllustration from "../../assets/images/makalah.webp"; // ganti sesuai ilustrasimu
import Button from "../ui/Button";

export default function MakalahSection() {
  return (
    <section className="relative overflow-hidden py-28 px-6 lg:px-16 bg-[#F9FAFB] dark:bg-[#0B0F29]">
      {/* === BACKGROUND SHAPES === */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 -right-32 w-[500px] h-[500px] bg-gradient-to-br from-[#647DEB]/40 to-transparent rounded-full blur-[140px]" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-[#C74559]/40 to-transparent rounded-full blur-[160px]" />
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-20">
        {/* === LEFT SIDE - TEXT === */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#C74559]/10 to-[#647DEB]/10 border border-[#647DEB]/20 mb-6">
            <Sparkles className="text-[#C74559]" size={16} />
            <span className="text-sm font-semibold text-[#C74559]">
              AI Makalah Generator
            </span>
          </div>

          <h2 className="text-4xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            Tingkatkan <br />
            <span className="bg-gradient-to-r from-[#C74559] to-[#647DEB] bg-clip-text text-transparent">
              Produktivitas Akademik
            </span>
            <br /> dengan Template Makalah
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-10 max-w-xl">
            SATSET AI membantu mahasiswa dan peneliti menulis makalah dengan struktur akademik yang benar, lengkap dengan referensi dan gaya bahasa profesional.
          </p>

          {/* === FEATURE CARDS === */}
          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {[
              {
                icon: <PenTool className="text-[#C74559]" size={20} />,
                title: "Auto Struktur",
                desc: "AI menghasilkan outline otomatis: abstrak, pendahuluan, dan kesimpulan.",
              },
              {
                icon: <FileText className="text-[#647DEB]" size={20} />,
                title: "Citations Smart",
                desc: "Sisipkan referensi dengan format APA, MLA, atau IEEE secara instan.",
              },
              {
                icon: <CheckCircle2 className="text-[#10B981]" size={20} />,
                title: "Proofreading AI",
                desc: "Koreksi grammar dan tone agar sesuai dengan konteks akademik.",
              },
              {
                icon: <Sparkles className="text-[#F59E0B]" size={20} />,
                title: "Ekspor Mudah",
                desc: "Download hasil ke format DOCX atau PDF siap kirim.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 250, damping: 15 }}
                className="p-5 bg-white dark:bg-[#12172E] rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-white/10 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">{item.icon}
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* === CTA BUTTON === */}
          <Button variant="secondary" size="sm" rounded="full" as="a" href="/makalah"> 
            
            <span className="flex text-center">Coba Generator Makalah Sekarang</span>
            <FileText className="mr-2" size={16} />
          </Button>
        </motion.div>

        {/* === RIGHT SIDE - IMAGE === */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex-1 flex justify-center"
        >
          <div className="relative">
            {/* Floating Glow Border */}
            <div className="absolute -inset-6 bg-gradient-to-tr from-[#C74559]/50 to-[#647DEB]/40 rounded-[3rem] blur-2xl opacity-40"></div>
            <img
              src={makalahIllustration}
              alt="AI Makalah Illustration"
              className="relative z-10 w-full max-w-lg rounded-[2.5rem] shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
