import { useState, useMemo } from "react";
import { v4 as uuid } from "uuid";
import { useChatStore } from "../store";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function useChat() {
  const {
    chats,
    currentChatId,
    setCurrentChat,
    addChat,
    addMessage,
    deleteChat,
    renameChat,
  } = useChatStore();

  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const activeConversation = useMemo(
    () => chats.find((c) => c.id === currentChatId) || null,
    [chats, currentChatId]
  );

  const filteredChats = useMemo(() => {
    const t = searchTerm.trim().toLowerCase();
    if (!t) return chats;
    return chats.filter((c) => c.title.toLowerCase().includes(t));
  }, [chats, searchTerm]);

  const handleNewConversation = () => {
    const id = uuid();
    addChat({
      id,
      title: "Percakapan Baru",
      createdAt: Date.now(),
      messages: [
        {
          role: "assistant",
          content:
            "Halo! Aku SATSET AI 🤖. Siap bantu diskusi, riset, dan ngerapiin tulisanmu. Tulis pertanyaanmu di bawah.",
        },
      ],
    });
    setCurrentChat(id);
  };

  const handleSwitchConversation = (id) => setCurrentChat(id);

  const handleDeleteConversation = (id) => deleteChat(id);

  const renameCurrentConversation = (newTitle) => {
    if (!currentChatId || !newTitle.trim()) return;
    renameChat(currentChatId, newTitle.trim());
  };

  const copyConversation = () => {
    if (!activeConversation) return;

    const text = activeConversation.messages
      .map(
        (m) =>
          `${m.role === "user" ? "Anda" : "SATSET AI"}:\n${m.content}\n`
      )
      .join("\n");

    navigator.clipboard.writeText(text);
  };

  const exportToPDF = async () => {
    if (!activeConversation) return;

    const chatElement = document.getElementById("chat-body");
    if (!chatElement) return;

    const canvas = await html2canvas(chatElement, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${activeConversation.title || "Percakapan"}.pdf`);
  };

  const handleSubmit = async (text) => {
    const chat = chats.find((c) => c.id === currentChatId);
    if (!chat || !text.trim()) return;

    if (chat.messages.filter((m) => m.role === "user").length === 0) {
      renameChat(currentChatId, text.slice(0, 40));
    }

    addMessage(currentChatId, { role: "user", content: text });

    try {
      setIsLoading(true);
      const res = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chat.messages.concat({ role: "user", content: text }) }),
      });

      const data = await res.json();
      const reply = data?.reply || "Maaf, terjadi kendala teknis.";

      addMessage(currentChatId, { role: "assistant", content: reply });
    } catch {
      addMessage(currentChatId, {
        role: "assistant",
        content: "⚠️ Maaf, server sedang bermasalah. Coba lagi sebentar ya.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    chats: filteredChats,
    activeConversation,
    activeConversationId: currentChatId,
    isLoading,
    searchTerm,
    setSearchTerm,
    handleNewConversation,
    handleDeleteConversation,
    handleSwitchConversation,
    renameCurrentConversation,
    copyConversation,
    exportToPDF,
    handleSubmit,
  };
}
