import React from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Brain,
  Sparkles,
  MessageCircleCode,
} from "lucide-react";
import Button from "../ui/Button";
import { NavLink } from "react-router-dom";

export default function ChatbotSection() {
  return (
    <section className="container mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-20">
      {/* === LEFT SIDE - ILLUSTRATION === */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex-1 flex justify-center relative order-1 lg:order-1"
      >
        <div className="relative max-w-lg w-full rounded-3xl overflow-hidden bg-white dark:bg-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-gray-800">
          <img
            src="/images/ai-search.webp"
            alt="SATSET AI Chatbot Illustration"
            className="w-full h-auto object-cover"
          />
          {/* Subtle bottom gradient for depth */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
        </div>
      </motion.div>

      {/* === RIGHT SIDE - TEXT === */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex-1 order-2 lg:order-2"
      >
        <p className="text-sm font-semibold uppercase text-[#C74559] tracking-wide mb-3">
          Chatbot Interaktif
        </p>

        <h2 className="text-4xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
          Asisten Cerdas untuk <br />
          <span className="bg-gradient-to-r from-[#C74559] to-[#647DEB] bg-clip-text text-transparent">
            Diskusi, Ide, dan Riset
          </span>
        </h2>

        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-10 max-w-xl">
          SATSET AI menghadirkan chatbot berbasis AI yang membantu mahasiswa
          berdiskusi, merapikan tulisan, serta mendapatkan insight akademik
          dengan cepat dan kontekstual.
        </p>

        {/* === FEATURE LIST === */}
        <div className="space-y-6">
          {[
            {
              icon: <MessageCircle className="text-[#C74559]" size={22} />,
              bg: "bg-[#C74559]/10",
              title: "Interaksi Natural dan Kontekstual",
              desc: "Chat layaknya teman diskusi, dengan pemahaman konteks akademik.",
            },
            {
              icon: <Brain className="text-[#647DEB]" size={22} />,
              bg: "bg-[#647DEB]/10",
              title: "Ditenagai Model Bahasa Modern",
              desc: "Menggunakan kombinasi AI dari Replicate dan LLM untuk hasil presisi dan efisien.",
            },
            {
              icon: <Sparkles className="text-[#F59E0B]" size={22} />,
              bg: "bg-[#F59E0B]/10",
              title: "Penulisan Lebih Rapi dan Akademis",
              desc: "Bantu merapikan grammar, format kutipan, dan struktur tulisan.",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className={`p-2 rounded-xl ${item.bg}`}>{item.icon}</div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-start">
          <NavLink to="/features/chat-bot-ai">
            <Button
              variant="secondary"
              size="md"
              className="flex items-center gap-2"
              rounded="full"
            >
              Coba Chatbot Interaktif
              <MessageCircleCode size={16} />
            </Button>
          </NavLink>
        </div>
      </motion.div>
    </section>
  );
}
