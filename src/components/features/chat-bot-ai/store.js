import { create } from "zustand";
import { persist } from "zustand/middleware";

// =========================
//  SYSTEM PROMPT SATSET AI
// =========================

export const systemPrompt = `
Kamu adalah SATSET AI — Asisten Akademik Cerdas yang dirancang khusus untuk mahasiswa dan peneliti.

TUJUAN UTAMA:
1. Membantu riset akademik.
2. Merapikan tulisan ilmiah.
3. Menghasilkan ringkasan, analisis, dan ide berbasis AI.
4. Menjawab pertanyaan dengan cepat, tepat, dan berbasis bukti.

GAYA KOMUNIKASI:
- Profesional tetapi ramah.
- Penjelasan singkat namun padat dan informatif.
- Gunakan struktur rapi, bullet point, dan Markdown.
- Hindari penjelasan bertele-tele.

FUNGSI INTI:
- Meringkas jurnal, PDF, artikel, atau teks panjang.
- Membuat outline makalah (APA, IEEE, MLA).
- Memperbaiki grammar dan gaya akademik.
- Memberikan critical review ilmiah.
- Menjelaskan konsep akademik dengan sederhana.
- Membantu brainstorming ide dan penulisan.

ATURAN:
- Jangan membuat fakta palsu.
- Jika tidak yakin, minta klarifikasi.
- Selalu tampilkan jawaban dalam format Markdown yang bersih dan responsif.
- Utamakan akurasi, kejelasan, dan efisiensi.

PESAN PEMBUKA (default):
"Halo! Aku SATSET AI 🤖 — asisten akademik cerdas untuk riset, ringkasan jurnal, penulisan makalah, dan perbaikan tulisan ilmiah. Siap bantu kamu belajar lebih cepat dan efisien. Apa yang ingin kamu kerjakan hari ini?"
`;

export const availableModels = [
  { id: "openai/gpt-4.1-nano", name: "GPT-4.1" },
  { id: "anthropic/claude-3.7-sonnet", name: "Claude-3.7"},
  { id: "ibm-granite/granite-3.3-8b-instruct", name: "Granite (IBM)" },
  { id: "mistralai/mistral-7b-v0.1", name: "Mistral (7B)" },
];

export const useChatStore = create(
  persist(
    (set) => ({
      chats: [],
      currentChatId: null,

      // MODEL UTAMA
      currentModel: availableModels[0].id,
      setCurrentModel: (modelId) => set({ currentModel: modelId }),

      // GANTI CHAT AKTIF
      setCurrentChat: (id) => set({ currentChatId: id }),

      // ===============================
      //  CREATE NEW CHAT (dengan intro)
      // ===============================
      addChat: (chat) =>
        set((s) => ({
          chats: [chat, ...s.chats],
        })),

      // Tambah pesan user / ai ke chat
      addMessage: (chatId, msg) =>
        set((s) => ({
          chats: s.chats.map((c) =>
            c.id === chatId ? { ...c, messages: [...c.messages, msg] } : c
          ),
        })),

      // Delete chat + Smart Fallback Navigation
      deleteChat: (id) =>
        set((s) => {
          const currentIdx = s.chats.findIndex((c) => c.id === id);
          const nextChats = s.chats.filter((c) => c.id !== id);

          let nextChatId = s.currentChatId;

          if (s.currentChatId === id) {
            if (nextChats.length === 0) {
              nextChatId = null;
            } else {
              nextChatId =
                nextChats[Math.max(0, currentIdx - 1)]?.id ||
                nextChats[0]?.id;
            }
          }

          return { chats: nextChats, currentChatId: nextChatId };
        }),

      // Rename chat
      renameChat: (id, title) =>
        set((s) => ({
          chats: s.chats.map((c) =>
            c.id === id ? { ...c, title } : c
          ),
        })),
    }),
    { name: "satset-chat-history" }
  )
);
