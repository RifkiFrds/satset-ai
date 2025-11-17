import { useState, useMemo } from "react";
import { v4 as uuid } from "uuid";
import { useChatStore, availableModels } from "./useChatStore";
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
    systemPrompt,
  } = useChatStore();

  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Ambil chat aktif
  const activeConversation = useMemo(
    () => chats.find((c) => c.id === currentChatId) || null,
    [chats, currentChatId]
  );

  // Filter daftar chat
  const filteredChats = useMemo(() => {
    const t = searchTerm.trim().toLowerCase();
    if (!t) return chats;
    return chats.filter((c) => c.title.toLowerCase().includes(t));
  }, [chats, searchTerm]);

  // Membuat percakapan baru
  const handleNewConversation = () => {
    const id = uuid();
    addChat({
      id,
      title: "Percakapan Baru",
      createdAt: Date.now(),
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
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

  // Rename otomatis di pesan user pertama
  const renameCurrentConversation = (newTitle) => {
    if (!currentChatId || !newTitle.trim()) return;
    renameChat(currentChatId, newTitle.trim());
  };

  // Copy seluruh pesan
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

  // Export percakapan ke PDF
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
      "ui-sans-serif, Segoe UI, Roboto, Helvetica Neue";
    container.style.lineHeight = "1.6";
    container.style.border = "1px solid #e5e7eb";
    container.style.borderRadius = "12px";

    // Judul PDF
    const header = document.createElement("div");
    header.style.marginBottom = "16px";
    header.innerHTML = `
      <div style="font-weight:600;font-size:18px;margin-bottom:4px;">
        ${activeConversation.title || "Percakapan"}
      </div>
      <div style="font-size:12px;color:#6b7280;">
        Diekspor ${new Date().toLocaleString()}
      </div>
    `;
    container.appendChild(header);

    // Bubble chat
    activeConversation.messages.forEach((m) => {
      const bubble = document.createElement("div");
      bubble.style.maxWidth = "680px";
      bubble.style.padding = "12px 14px";
      bubble.style.margin =
        m.role === "assistant" ? "0 0 10px 0" : "0 0 10px auto";
      bubble.style.borderRadius = "12px";
      bubble.style.border = "1px solid rgba(0,0,0,0.08)";
      bubble.style.whiteSpace = "pre-wrap";

      if (m.role === "assistant") {
        bubble.style.background = "#f9fafb";
        bubble.style.color = "#111827";
      } else {
        bubble.style.background = "#f3f4f6";
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
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = (canvas.height * pdfW) / canvas.width;

    if (pdfH <= pdf.internal.pageSize.getHeight()) {
      pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH);
    } else {
      let position = 0;
      let heightLeft = pdfH;

      pdf.addImage(imgData, "PNG", 0, position, pdfW, pdfH);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft > 0) {
        pdf.addPage();
        position = heightLeft - pdfH;
        pdf.addImage(imgData, "PNG", 0, position, pdfW, pdfH);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }
    }

    pdf.save(`${activeConversation.title || "Percakapan"}.pdf`);
    container.remove();
  };

  // Kirim pesan (manual & suggestion)
  const handleSubmit = async (text) => {
    const modelToUse = useChatStore.getState().currentModel;
    const chat = chats.find((c) => c.id === currentChatId);
    if (!chat || !text.trim()) return;

    // Penting: tampilkan typing bubble lebih dulu
    setIsLoading(true);
    await Promise.resolve();

    // Rename otomatis
    if (chat.messages.filter((m) => m.role === "user").length === 0) {
      renameChat(currentChatId, text.slice(0, 40));
    }

    // Tambah pesan user
    addMessage(currentChatId, { role: "user", content: text });

    // Ambil pesan terbaru
    const updated = useChatStore
      .getState()
      .chats.find((c) => c.id === currentChatId);

    const messagesToSend = updated.messages.slice(-10);

    try {
      const res = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messagesToSend,
          model: modelToUse,
        }),
      });

      const data = await res.json();

      addMessage(currentChatId, {
        role: "assistant",
        content: data?.reply || "Maaf, terjadi kendala teknis.",
      });
    } catch (err) {
      addMessage(currentChatId, {
        role: "assistant",
        content: "⚠️ Server error, coba lagi.",
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
