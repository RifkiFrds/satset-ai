import React from "react";
import { motion } from "framer-motion";
import { BookOpenCheck, Sparkles, Brain, LineChart } from "lucide-react";
import { NavLink } from "react-router-dom";
import Button from "../ui/Button";

export default function JurnalSection() {
  const features = [
    {
      icon: <BookOpenCheck size={22} className="text-[#C74559]" />,
      title: "Auto Paper Summary",
      desc: "Meringkas ribuan kata menjadi ringkasan padat dan akurat.",
    },
    {
      icon: <Brain size={22} className="text-[#647DEB]" />,
      title: "AI Critical Review",
      desc: "AI menilai kekuatan dan kelemahan metodologi riset.",
    },
    {
      icon: <Sparkles size={22} className="text-[#F59E0B]" />,
      title: "Smart Highlight",
      desc: "Tandai kalimat penting otomatis berdasarkan konteks penelitian.",
    },
    {
      icon: <LineChart size={22} className="text-[#10B981]" />,
      title: "Trend Insight",
      desc: "Lihat tren penelitian dan keyword populer di bidangmu.",
    },
  ];

  return (
    <section className="relative overflow-hidden py-28 px-6 lg:px-16 rounded-[3rem] bg-[#0E1226] text-white">
      {/* === Decorative Background === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-[#647DEB]/30 to-transparent rotate-45 opacity-20 blur-2xl" />
        <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-gradient-to-tr from-[#C74559]/30 to-transparent -rotate-45 opacity-20 blur-2xl" />
      </div>

      <div className="relative container mx-auto flex flex-col lg:flex-row items-center gap-20 z-10">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-[#F59E0B] mb-3">
            Jurnal Review AI
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6">
            Analisis Jurnal Lebih{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#C74559] to-[#647DEB] bg-clip-text text-transparent">
                Cepat, Cerdas, dan Akurat
              </span>
              <span className="absolute left-0 bottom-0 w-full h-[3px] bg-gradient-to-r from-[#C74559] to-[#647DEB] rounded-full blur-sm opacity-80"></span>
            </span>
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl">
            SATSET AI memproses jurnal ilmiah dengan teknologi NLP modern untuk
            menganalisis struktur, metodologi, dan hasil penelitian secara
            otomatis. Dapatkan insight mendalam tanpa membaca ratusan halaman.
          </p>

          {/* FEATURE CARDS */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-lg">
            {features.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 250 }}
                className="group p-5 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-[#647DEB]/40 hover:shadow-[0_0_25px_rgba(100,125,235,0.25)] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-xl bg-white/10 group-hover:bg-white/20 transition">
                    {item.icon}
                  </div>
                  <h4 className="font-semibold text-white">{item.title}</h4>
                </div>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 flex justify-start">
            <NavLink to="/features/review-jurnal-ai">
              <Button
                variant="primary"
                size="md"
                className="flex items-center gap-2"
              >
                Coba Review Jurnal
                <BookOpenCheck size={16} />
              </Button>
            </NavLink>
          </div>
        </motion.div>

        {/* RIGHT SIDE IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex-1 flex justify-center"
        >
          <div className="relative w-full max-w-lg">
            <motion.img
              src="/images/jurnal.webp"
              alt="AI Journal Review"
              className="w-full h-auto rounded-3xl shadow-[0_25px_60px_rgba(100,125,235,0.3)]"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
            <div className="absolute inset-0 rounded-3xl border border-white/10 shadow-[inset_0_0_30px_rgba(100,125,235,0.2)]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
