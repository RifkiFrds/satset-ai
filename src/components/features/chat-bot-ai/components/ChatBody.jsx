import React, { useRef } from "react";
import CodeBlock from "./CodeBlock";
import MarkdownRenderer from "./MarkdownRenderer";
import TypingBubble from "./TypingBubble";

export default function ChatBody({ messages, isLoading }) {
  const endRef = useRef(null);

  const extractCode = (text = "") => {
    if (typeof text !== "string") return null;
    const codeMatch = text.match(/```([\s\S]*?)```/);
    return codeMatch ? codeMatch[1].trim() : null;
  };

  return (
    <div id="chat-body" className="px-4 md:px-6 py-6 space-y-4 md:space-y-6">
      {messages
        .filter((m) => m.role !== "system")
        .map((m, i) => {
          const content = typeof m.content === "string" ? m.content : "";
          const isAssistant = m.role === "assistant";
          const extractedCode = extractCode(content);

          return (
            <div
              key={i}
              className={
                isAssistant
                  ? "w-fit max-w-[80%] md:max-w-[65%] bg-white/80 dark:bg-white/5 backdrop-blur-sm shadow-sm border border-gray-200/50 dark:border-white/10 px-4 py-3 rounded-xl text-left text-gray-900 dark:text-white animate-[fadeIn_0.25s_ease]"
                  : "w-fit max-w-[80%] md:max-w-[65%] ml-auto bg-[#647DEB]/15 dark:bg-[#647DEB]/30 shadow px-4 py-3 rounded-xl text-right text-gray-800 dark:text-gray-200 animate-[fadeIn_0.25s_ease]"
              }
            >
              {isAssistant ? (
                extractedCode ? (
                  <CodeBlock code={extractedCode} />
                ) : (
                  <MarkdownRenderer text={content} />
                )
              ) : (
                <MarkdownRenderer text={content} />
              )}
            </div>
          );
        })}

      {isLoading && <TypingBubble />}

      <div ref={endRef} />
    </div>
  );
}
