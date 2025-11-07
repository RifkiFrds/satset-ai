import React, { useEffect, useRef } from "react";
import TypingBubble from "./TypingBubble";

export default function ChatBody({ messages, isLoading }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="px-4 lg:px-6 py-6 space-y-6">
      {messages.length === 0 && (
        <p className="text-center text-gray-400 text-sm">
          Mulai percakapan dengan mengetik pesan di bawah ✨
        </p>
      )}

      {messages.map((m, i) => (
        <div
          key={i}
          className={
            m.role === "assistant"
              ? "max-w-[80ch] bg-gray-100/80 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 px-4 py-3 rounded-xl text-gray-900 dark:text-white"
              : "max-w-[80ch] ml-auto text-right text-gray-800 dark:text-gray-200"
          }
        >
          {m.content}
        </div>
      ))}

     {isLoading && (
        <TypingBubble />
      )}

      <div ref={endRef} />
    </div>
  );
}
