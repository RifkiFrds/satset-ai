import { create } from "zustand";
import { persist } from "zustand/middleware";

/*  
  SYSTEM PROMPT — digunakan sebagai instruksi dasar untuk AI
*/
export const systemPrompt = `
Kamu adalah SATSET AI — Asisten Akademik Cerdas untuk mahasiswa dan peneliti.

TUJUAN:
1. Membantu riset akademik.
2. Merapikan tulisan ilmiah.
3. Memberikan ringkasan dan analisis berbasis AI.
4. Menjawab pertanyaan secara akurat & efisien.

GAYA:
- Profesional, ramah, ringkas, jelas
- Gunakan Markdown rapi
- Hindari penjelasan yang terlalu panjang

ATURAN:
- Jangan membuat fakta palsu
- Jika tidak yakin, minta klarifikasi
- Selalu prioritaskan akurasi

PESAN PEMBUKA:
"Halo! Aku SATSET AI 🤖 — siap bantu kamu riset, ringkasan jurnal, penulisan makalah, dan perbaikan tulisan ilmiah. Apa yang ingin kamu kerjakan hari ini?"
`;

/*  
  MODEL AI YANG TERSEDIA
*/
export const availableModels = [
  { id: "openai/gpt-4.1-nano", name: "GPT-4.1" },
  { id: "anthropic/claude-3.7-sonnet", name: "Claude-3.7" },
  { id: "ibm-granite/granite-3.3-8b-instruct", name: "Granite (IBM)" },
  { id: "mistralai/mistral-7b-v0.1", name: "Mistral (7B)" },
];

/*
  Zustand store — menyimpan seluruh data percakapan
*/
export const useChatStore = create(
  persist(
    (set) => ({
      chats: [],            // daftar percakapan
      currentChatId: null,  // id percakapan aktif

      /* MODEL AI */
      currentModel: availableModels[0].id,
      setCurrentModel: (modelId) => set({ currentModel: modelId }),

      /* SET CHAT AKTIF */
      setCurrentChat: (id) => set({ currentChatId: id }),

      /* 
        Tambah percakapan baru (dengan system prompt + welcome message)
      */
      addChat: (chat) =>
        set((state) => ({
          chats: [chat, ...state.chats],
        })),

      /*
        Tambah pesan baru ke percakapan tertentu
      */
      addMessage: (chatId, msg) =>
        set((state) => ({
          chats: state.chats.map((c) =>
            c.id === chatId
              ? { ...c, messages: [...c.messages, msg] }
              : c
          ),
        })),

      /*
        Hapus percakapan + navigasi otomatis ke chat sebelumnya/selanjutnya
      */
      deleteChat: (id) =>
        set((state) => {
          const index = state.chats.findIndex((c) => c.id === id);
          const remaining = state.chats.filter((c) => c.id !== id);

          let nextChatId = state.currentChatId;

          // Jika chat aktif dihapus → pindah ke chat lain
          if (state.currentChatId === id) {
            if (remaining.length === 0) {
              nextChatId = null;
            } else {
              nextChatId =
                remaining[Math.max(0, index - 1)]?.id ||
                remaining[0]?.id;
            }
          }

          return {
            chats: remaining,
            currentChatId: nextChatId,
          };
        }),

      /*
        Rename judul chat
      */
      renameChat: (id, title) =>
        set((state) => ({
          chats: state.chats.map((c) =>
            c.id === id ? { ...c, title } : c
          ),
        })),
    }),

    /* Penyimpanan lokal browser */
    { name: "satset-chat-history" }
  )
);
