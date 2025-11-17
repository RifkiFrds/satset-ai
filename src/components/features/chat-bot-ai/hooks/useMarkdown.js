import { marked } from "marked";

export const useMarkdown = () => {
  const renderMarkdown = (text) => {
    return marked.parse(text);
  };

  return { renderMarkdown };
};
