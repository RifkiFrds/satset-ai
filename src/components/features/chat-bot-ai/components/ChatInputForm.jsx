import React, { useState } from "react";
import { Send } from "lucide-react";
import Button from "./../../../ui/Button";

export default function ChatInputForm({ onSubmit, disabled }) {
  const [value, setValue] = useState("");

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

  return (
    <div className="border-t border-gray-200 dark:border-white/10 p-2 bg-white dark:bg-[#0B0F29]">
      <div className="max-w-4xl mx-auto flex items-end gap-3">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Tulis pesan…"
          className="flex-1 resize-none rounded-xl bg-gray-50 dark:bg-white/5 px-9 py-2 border border-gray-200 dark:border-white/10 shadow-sm text-sm outline-none focus:ring-2 focus:ring-[#647DEB]/40 transition"
        />

        <Button
          variant="primary"
          onClick={send}
          disabled={disabled}
          className="h-14 px-5 rounded-xl bg-[#647DEB] hover:bg-[#5267d4] transition shadow-sm text-white flex items-center gap-2 disabled:opacity-50"
        >
          <Send size={18} />
          Kirim
        </Button>
      </div>
    </div>
  );
}
