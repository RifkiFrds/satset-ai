import { useState, useMemo } from "react";
import { v4 as uuid } from "uuid";
import { useChatStore, availableModels } from "../store";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function useChat() {
  const {
    chats,
    currentChatId,
    setCurrentChat,
    currentModel,
    setCurrentModel,
    addChat,
    addMessage,
    deleteChat,
    renameChat,
  } = useChatStore();

  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const activeConversation = useMemo(
    () => chats.find((c) => c.id === currentChatId) || null,
    [chats, currentChatId],
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
      .map((m) => `${m.role === "user" ? "Anda" : "SATSET AI"}:\n${m.content}\n`)
      .join("\n");
    navigator.clipboard.writeText(text);
  };

  const exportToPDF = async () => {
    if (!activeConversation) return;
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.left = "-99999px";
    container.style.top = "0";
    container.style.width = "794px";
    container.style.padding = "24px";
    container.style.background = "#ffffff";
    container.style.color = "#111827";
    container.style.fontFamily =
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'";
    container.style.lineHeight = "1.6";
    container.style.border = "1px solid #e5e7eb";
    container.style.borderRadius = "12px";
    container.style.boxSizing = "border-box";

    const header = document.createElement("div");
    header.style.marginBottom = "16px";
    header.innerHTML = `<div style="font-weight:600;font-size:18px;margin-bottom:4px;">${
      activeConversation.title || "Percakapan"
    }</div>
      <div style="font-size:12px;color:#6b7280;">Diekspor ${new Date().toLocaleString()}</div>`;
    container.appendChild(header);

    activeConversation.messages.forEach((m) => {
      const bubble = document.createElement("div");
      bubble.style.maxWidth = "680px";
      bubble.style.padding = "12px 14px";
      bubble.style.margin =
        m.role === "assistant" ? "0 0 10px 0" : "0 0 10px auto";
      bubble.style.borderRadius = "12px";
      bubble.style.border = "1px solid rgba(0,0,0,0.08)";
      bubble.style.whiteSpace = "pre-wrap";
      bubble.style.wordBreak = "break-word";
      if (m.role === "assistant") {
        bubble.style.background = "rgba(249,250,251,1)";
        bubble.style.color = "#111827";
      } else {
        bubble.style.background = "rgba(243,244,246,0.6)";
        bubble.style.color = "#1f2937";
        bubble.style.textAlign = "right";
      }
      bubble.textContent = m.content;
      container.appendChild(bubble);
    });

    document.body.appendChild(container);

    const canvas = await html2canvas(container, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = (canvas.height * pdfW) / canvas.width;
    let y = 0;

    let remainingHeight = pdfH;
    let position = 0;
    const pageH = pdf.internal.pageSize.getHeight();

    if (pdfH <= pageH) {
      pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH);
    } else {
      while (remainingHeight > 0) {
        pdf.addImage(imgData, "PNG", 0, y, pdfW, pdfH);
        remainingHeight -= pageH;
        position -= pageH;
        if (remainingHeight > 0) {
          pdf.addPage();
          y = 0;
        }
      }
    }

    pdf.save(`${activeConversation.title || "Percakapan"}.pdf`);
    document.body.removeChild(container);
  };

  const handleSubmit = async (text) => {
    const modelToUse = useChatStore.getState().currentModel;
    const chat = chats.find((c) => c.id === currentChatId);
    if (!chat || !text.trim()) return;

    if (chat.messages.filter((m) => m.role === "user").length === 0) {
      renameChat(currentChatId, text.slice(0, 40));
    }
    
    const newMessage = { role: "user", content: text };
    addMessage(currentChatId, newMessage);

    // [FIX 1] Ambil state TERBARU setelah 'addMessage'
    const updatedChat = useChatStore
      .getState()
      .chats.find((c) => c.id === currentChatId);
      
    // [FIX 2] Batasi konteks ke 10 pesan terakhir
    const messagesToSend = updatedChat.messages.slice(-10);

    try {
      setIsLoading(true);
      const res = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messagesToSend, // <-- Mengirim konteks terbatas
          model: modelToUse,
        }),
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
    currentModel,
    setCurrentModel,
    availableModels,
  };
}