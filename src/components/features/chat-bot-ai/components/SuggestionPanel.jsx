import React from "react";
import { motion } from "framer-motion";
import { FileText, Brain, Lightbulb, PenSquare } from "lucide-react";
import { useChat } from "../hooks/useChat";

// Daftar saran
const suggestions = [
  {
    icon: <FileText size={18} />,
    title: "Buatkan Coding Web, Sederhana",
    prompt: "Bantu saya buat web sederhana HTML dan CSS.",
  },
  {
    icon: <Brain size={18} />,
    title: "Jelaskan konsep",
    prompt: "Jelaskan konsep 'machine learning' dengan analogi sederhana.",
  },
  {
    icon: <Lightbulb size={18} />,
    title: "Beri ide judul",
    prompt: "Berikan 3 ide judul skripsi untuk topik 'keamanan siber'.",
  },
  {
    icon: <PenSquare size={18} />,
    title: "Buatkan Artikel Singkat",
    prompt: "Buatkan artikel tentang 'manfaat olahraga pagi'.",
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 10 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1 + 0.3,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
};

// Typing bubble untuk SuggestionPanel
const TypingBubble = () => (
  <div className="flex gap-2 items-center w-fit bg-white/80 dark:bg-white/5 px-4 py-3 rounded-xl shadow-sm border border-gray-200/50 dark:border-white/10 mx-auto">
    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce" />
    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce delay-150" />
    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce delay-300" />
  </div>
);

export default function SuggestionPanel({ isLoading }) {
  const { handleSubmit } = useChat();

  const handleSuggestionClick = (prompt) => {
    handleSubmit(prompt);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-3 sm:px-4">
      {/* Jika loading → tampilkan typing bubble */}
      {isLoading ? (
        <TypingBubble />
      ) : (
        <div
          className="
            grid grid-cols-1 
            sm:grid-cols-2 
            gap-3 sm:gap-4
          "
        >
          {suggestions.map((item, i) => (
            <motion.button
              key={i}
              custom={i}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              onClick={() => handleSuggestionClick(item.prompt)}
              className="
                flex items-center gap-3 p-4 w-full
                bg-white/80 dark:bg-white/5 
                border border-gray-200/50 dark:border-white/10
                rounded-xl shadow-sm
                text-left text-gray-800 dark:text-gray-200
                hover:bg-gray-100 dark:hover:bg-white/10
                transition-colors duration-150
              "
            >
              <div className="flex-shrink-0 text-[#647DEB]">
                {item.icon}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold leading-tight">
                  {item.title}
                </h4>

                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                  {item.prompt}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
