import React, { useState } from "react";
import { Send, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; 
import Button from "./../../../ui/Button";

export default function ChatInputForm({
  onSubmit,
  disabled,
  currentModel,
  setCurrentModel,
  availableModels,
}) {
  const [value, setValue] = useState("");
  // State baru untuk mengontrol dropdown kustom
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);

  const send = () => {
    if (!value.trim() || disabled) return;
    onSubmit(value.trim());
    setValue("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  // Fungsi helper untuk mendapatkan nama model yang sedang aktif
  const getModelName = () => {
    const model = availableModels?.find((m) => m.id === currentModel);
    return model ? model.name : "Pilih Model";
  };

  return (
    <div className="border-t border-gray-200 dark:border-white/10 p-2 bg-white dark:bg-[#0B0F29]">
      {/* [REVISI] Tambahkan 'relative' agar dropdown bisa diposisikan */}
      <div className="relative max-w-4xl mx-auto flex items-end gap-3">
        
        {/* [REVISI] Ini adalah menu dropdown kustom Anda */}
        <AnimatePresence>
          {isModelSelectorOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              
              // [FIX] Ini adalah kuncinya:
              // 'absolute' -> 'bottom-full' (di atas elemen induk) -> 'mb-2' (beri jarak)
              className="absolute bottom-full right-0 mb-2 w-72 
                         bg-white dark:bg-gray-900 
                         border border-gray-200 dark:border-gray-700 
                         rounded-xl shadow-2xl overflow-hidden z-20"
            >
              <div className="p-2 grid gap-1">
                {availableModels?.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      setCurrentModel(model.id);
                      setIsModelSelectorOpen(false);
                    }}
                    // Style untuk item yang aktif dan item biasa
                    className={`w-full text-left p-2 rounded-lg text-sm
                               ${currentModel === model.id
                                 ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold"
                                 : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                               }`}
                  >
                    {model.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Textarea (Tidak berubah) */}
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Tulis pesan…"
          className="flex-1 resize-none rounded-xl bg-gray-50 dark:bg-white/5 px-4 py-3.5 border border-gray-200 dark:border-white/10 shadow-sm text-sm outline-none focus:ring-2 focus:ring-[#647DEB]/40 transition"
          rows="1"
          style={{ minHeight: "56px" }}
          disabled={disabled}
        />

        {/* Tombol Kirim (Tidak berubah) */}
        <Button
          variant="primary"
          onClick={send}
          disabled={disabled}
          className="h-14 px-5 rounded-xl bg-[#647DEB] hover:bg-[#5267d4] transition shadow-sm text-white flex items-center gap-2 disabled:opacity-50"
        >
          <Send size={18} />
          Kirim
        </Button>

        {/* [REVISI] <select> diganti menjadi <button> trigger */}
        <button
          type="button"
          onClick={() => setIsModelSelectorOpen((prev) => !prev)}
          disabled={disabled}
          className="h-14 w-auto min-w-[150px] px-4 rounded-xl 
                     flex items-center justify-between gap-2
                     bg-gray-50 dark:bg-white/5 
                     border border-gray-200 dark:border-white/10 
                     shadow-sm text-sm text-gray-900 dark:text-white 
                     outline-none focus:ring-2 focus:ring-[#647DEB]/40 
                     transition"
          aria-label="Pilih Model AI"
        >
          <span className="truncate">{getModelName()}</span>
          <ChevronUp
            size={16}
            className={`transition-transform duration-200 ${
              isModelSelectorOpen ? "" : "rotate-180"
            }`}
          />
        </button>
        
      </div>
    </div>
  );
}