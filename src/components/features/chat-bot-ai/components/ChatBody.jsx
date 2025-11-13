import React, { useRef } from "react";
import TypingBubble from "./TypingBubble";

export default function ChatBody({ messages, isLoading }) {
  const endRef = useRef(null);

  return (
    <div
      id="chat-body"
      className="px-4 md:px-6 py-6 space-y-4 md:space-y-6"
    >
      {messages.map((m, i) => (
        <div
          key={i}
          className={
            m.role === "assistant"
              ? "w-fit max-w-[80%] md:max-w-[65%] bg-white/80 dark:bg-white/5 backdrop-blur-sm shadow-sm border border-gray-200/50 dark:border-white/10 px-4 py-3 rounded-xl text-gray-900 dark:text-white animate-[fadeIn_0.25s_ease] text-left"
              : "w-fit max-w-[80%] md:max-w-[65%] ml-auto bg-[#647DEB]/15 dark:bg-[#647DEB]/30 shadow px-4 py-3 rounded-xl text-right text-gray-800 dark:text-gray-200 animate-[fadeIn_0.25s_ease]"
          }
        >
          {m.content}
        </div>
      ))}

      {isLoading && <TypingBubble />}
      <div ref={endRef} />
    </div>
  );
}