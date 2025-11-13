import { create } from "zustand";
import { persist } from "zustand/middleware";

export const availableModels = [
  { id: "ibm-granite/granite-3.3-8b-instruct", name: "Granite (IBM)" },
  { id: "meta/meta-llama-3-8b-instruct", name: "Llama 3 (Meta)" },
  { id: "mistralai/mistral-7b-instruct-v0.2", name: "Mistral (7B)" },
];

export const useChatStore = create(
  persist(
    (set) => ({
      chats: [],
      currentChatId: null,

      currentModel: availableModels[0].id,
      
      setCurrentModel: (modelId) => set({ currentModel: modelId }),

      setCurrentChat: (id) => set({ currentChatId: id }),

      // [UX FIX] Chat baru muncul di ATAS, bukan di bawah
      addChat: (chat) => set((s) => ({ chats: [chat, ...s.chats] })),

      addMessage: (chatId, msg) =>
        set((s) => ({
          chats: s.chats.map((c) =>
            c.id === chatId ? { ...c, messages: [...c.messages, msg] } : c,
          ),
        })),

      // [UX FIX] Logika delete yang lebih cerdas
      deleteChat: (id) =>
        set((s) => {
          const currentIdx = s.chats.findIndex((c) => c.id === id);
          const nextChats = s.chats.filter((c) => c.id !== id);
          
          let nextChatId = s.currentChatId;
          if (s.currentChatId === id) {
            if (nextChats.length === 0) {
              nextChatId = null;
            } else {
              // Pilih chat di atasnya, atau jika tidak ada, pilih chat di bawahnya
              nextChatId = nextChats[Math.max(0, currentIdx - 1)]?.id || nextChats[0]?.id;
            }
          }
          return { chats: nextChats, currentChatId: nextChatId };
        }),

      renameChat: (id, title) =>
        set((s) => ({
          chats: s.chats.map((c) => (c.id === id ? { ...c, title } : c)),
        })),
    }),
    { name: "satset-chat-history" },
  ),
);