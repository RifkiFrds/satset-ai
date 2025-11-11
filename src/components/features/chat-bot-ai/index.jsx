import React from "react";
import { motion } from "framer-motion";
import ChatLayout from "./components/ChatLayout";

export default function ChatBotAIPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="w-full min-h-screen dark:bg-[#0B0F29] text-gray-900 dark:text-white"
    >
      {/* === HERO SECTION === */}
      <div className="text-center pt-30 pb-10 px-4">
        <h1 className="text-4xl sm:text-4xl lg:text-6xl font-bold max-w-3xl mx-auto leading-tight">
          <span className="bg-gradient-to-r from-[#C74559] to-[#647DEB] bg-clip-text text-transparent">
            ChatBot SATSET AI
          </span>
        </h1>
        <p className="mt-3 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Asisten AI cepat untuk menjawab pertanyaan, membantu tugas, menyusun ide,
          dan merapikan tulisan. Tinggal chat, sat-set beres.
        </p>
      </div>

      {/* === CHAT SECTION === */}
      <div className="pb-10 px-4">
        <ChatLayout />
      </div>
    </motion.div>
  );
}
