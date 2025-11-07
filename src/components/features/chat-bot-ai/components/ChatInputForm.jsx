import React, { useState } from "react";
import { Send } from "lucide-react";

export default function ChatInputForm({ onSubmit, disabled }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSubmit(value.trim());
    setValue("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-white/10 p-4">
      <div className="max-w-4xl mx-auto flex items-end gap-2">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Tulis pesan…"
          rows={1}
          className="flex-1 resize-none rounded-lg bg-gray-100 dark:bg-white/10 px-4 py-3 text-sm outline-none"
        />
        <button
          onClick={handleSend}
          disabled={disabled}
          className="h-11 px-4 rounded-lg bg-[#647DEB] hover:bg-[#5267d4] disabled:opacity-60 text-white inline-flex items-center gap-2"
        >
          <Send size={18} />
          Kirim
        </button>
      </div>
    </div>
  );
}
