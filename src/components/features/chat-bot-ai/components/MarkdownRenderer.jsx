import React from "react";
import { marked } from "marked";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

// Bahasa penting
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-css";
import "prismjs/components/prism-bash";

marked.setOptions({
  breaks: true,
  highlight: (code, lang) => {
    if (Prism.languages[lang]) {
      return Prism.highlight(code, Prism.languages[lang], lang);
    }
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  }
});

export default function MarkdownRenderer({ text }) {
  const safeText = typeof text === "string" ? text : "";
  const html = marked.parse(safeText);

  return (
    <div
      className="
      /* PROSE base */
      prose dark:prose-invert max-w-none prose-sm sm:prose-base md:prose-lg
      leading-relaxed tracking-normal

      /* RESPONSIVE FONT + WIDTH */
      w-full break-words
      sm:max-w-[90%] md:max-w-[95%] lg:max-w-none

      /* Paragraph spacing */
      prose-p:my-3 sm:prose-p:my-4

      /* List spacing */
      prose-ul:my-3 prose-ol:my-3
      prose-li:my-1.5 sm:prose-li:my-2

      /* Heading spacing */
      prose-h1:mt-6 prose-h1:mb-3 
      prose-h2:mt-5 prose-h2:mb-3
      prose-h3:mt-4 prose-h3:mb-2
      prose-h4:mt-3 prose-h4:mb-1

      /* Blockquote */
      prose-blockquote:pl-4 sm:prose-blockquote:pl-6
      prose-blockquote:my-3 sm:prose-blockquote:my-4

      /* Inline code */
      prose-code:bg-gray-800 prose-code:text-gray-200 
      prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded

      /* Table responsive */
      prose-table:my-4 prose-table:border-collapse prose-table:border 
      prose-th:border prose-td:border 
      prose-th:p-2 prose-td:p-2
      overflow-x-auto block
      "
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
