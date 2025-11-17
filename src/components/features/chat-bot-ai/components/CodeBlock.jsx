import React, { useState } from "react";
import { Clipboard, Check } from "lucide-react";

const CodeBlock = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-[#1e1e1e] rounded-lg my-3 border border-gray-700 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-3 md:px-4 py-2 bg-[#2c2c2c] border-b border-gray-700">
        <span className="text-[10px] md:text-xs text-gray-400 font-mono">Code</span>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[11px] md:text-xs text-gray-300 hover:text-white py-1 px-2 rounded transition"
        >
          {isCopied ? (
            <>
              <Check className="text-green-400" size={14} />
              Tersalin!
            </>
          ) : (
            <>
              <Clipboard size={14} />
              Salin
            </>
          )}
        </button>
      </div>

      {/* Body - Wrapper untuk responsif */}
      <div className="overflow-x-auto w-full">
        <pre className="p-3 md:p-4 text-white text-xs md:text-sm font-mono whitespace-pre-wrap break-words">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
