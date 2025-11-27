import React, { useState, useEffect } from "react";
import { Send, ChevronUp, Mic, MicOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./../../../ui/Button";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function ChatInputForm({
  onSubmit,
  disabled,
  currentModel,
  setCurrentModel,
  availableModels,
}) {
  const [value, setValue] = useState("");
  const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setValue(transcript);
  }, [transcript]);

  const send = () => {
    if (!value.trim() || disabled) return;
    onSubmit(value.trim());
    setValue("");
    resetTranscript();
    SpeechRecognition.stopListening();
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const handleMicClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: "id-ID" });
    }
  };

  const getModelName = () => {
    const model = availableModels?.find((m) => m.id === currentModel);
    return model ? model.name : "Pilih Model";
  };

  return (
    <div className="relative z-10 border-t border-gray-200 dark:border-white/10 p-2 bg-white dark:bg-[#0B0F29]">
      <div className="relative max-w-4xl mx-auto flex flex-col sm:flex-row items-end gap-2 sm:gap-3">
        <AnimatePresence>
          {isModelSelectorOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute bottom-full mb-2 w-full sm:w-72 right-0 
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
                    className={`w-full text-left p-2 rounded-lg text-sm
                               ${
                                 currentModel === model.id
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

        <div
          className="relative flex-1 flex items-center w-full 
                     rounded-xl bg-gray-50 dark:bg-white/5 
                     border border-gray-200 dark:border-white/10 
                     shadow-sm 
                     focus-within:ring-2 focus-within:ring-[#647DEB]/40 
                     transition-all"
        >
          {browserSupportsSpeechRecognition ? (
            <button
              type="button"
              onClick={handleMicClick}
              disabled={disabled}
              className={`flex-shrink-0 ml-3.5 p-1 rounded-full 
                          transition-colors
                         ${
                           listening
                             ? "bg-red-500 text-white"
                             : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300"
                         }`}
            >
              {listening ? <MicOff size={25} /> : <Mic size={25} />}
            </button>
          ) : (
            <div className="flex-shrink-0 ml-3.5 p-1">
              <MicOff size={30} className="text-gray-400" />
            </div>
          )}

          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={listening ? "Mendengarkan..." : "Tulis pesan…"}
            className="flex-1 w-full resize-none 
                       bg-transparent 
                       pl-3 pr-4 py-3.5 
                       border-none 
                       shadow-none text-sm 
                       outline-none focus:ring-0"
            rows="1"
            style={{ minHeight: "56px" }}
            disabled={disabled}
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <Button
            variant="primary"
            onClick={send}
            disabled={disabled || (!value.trim() && !listening)}
            className="flex-1 sm:flex-none h-14 px-5 rounded-xl bg-[#647DEB] hover:bg-[#5267d4] transition shadow-sm text-white flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send size={18} />
            <span className="sm:hidden">Kirim</span>
            <span className="hidden sm:inline">Kirim</span>
          </Button>

          <button
            type="button"
            onClick={() => setIsModelSelectorOpen((prev) => !prev)}
            disabled={disabled}
            className="flex-1 sm:w-auto sm:min-w-[150px] h-14 px-4 rounded-xl 
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
    </div>
  );
}