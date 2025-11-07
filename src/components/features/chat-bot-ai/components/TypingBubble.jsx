import React from "react";

export default function TypingBubble() {
  return (
    <div className="max-w-[80ch] bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 px-4 py-3 rounded-xl inline-flex items-center gap-1 text-gray-500">
      <span className="animate-bounce [animation-delay:-0.2s]">●</span>
      <span className="animate-bounce [animation-delay:-0.1s]">●</span>
      <span className="animate-bounce">●</span>
    </div>
  );
}
