import React from "react";
import { motion } from "framer-motion";
import { RocketIcon } from "lucide-react";
import ChatLayout from "./components/ChatLayout";

export default function ChatBotAIPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="w-full min-h-screen text-gray-900 dark:text-white bg-transparent"
    >
      <div className="text-center pt-32 pb-12 px-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-full shadow-sm border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-[#0F152E]/70 backdrop-blur-sm mb-5">
          <RocketIcon size={16} className="text-green-500" />
          Chatbot Interaktif
        </span>

        <h1 className="text-4xl sm:text-4xl lg:text-6xl font-bold max-w-3xl mx-auto leading-tight text-gray-900 dark:text-white">
          Chatbot{" "}
          <span className="bg-gradient-to-r from-blue-900 via-[#647DEB] to-[#C74559] bg-clip-text text-transparent">
            SATSET <span className="text-[#EA2222] dark:text-[#FF6767]">AI</span>
          </span>
        </h1>

        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Asisten AI cepat untuk menjawab pertanyaan, membantu tugas, menyusun ide,
          dan merapikan tulisan. Tinggal chat, sat-set beres.
        </p>
      </div>

      <div className="pb-16 px-4">
        <ChatLayout />
      </div>
    </motion.div>
  );
}
