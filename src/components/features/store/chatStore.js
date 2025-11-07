import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useChatStore = create(
  persist(
    (set) => ({
      chats: [],
      currentChatId: null,

      setCurrentChat: (id) => set({ currentChatId: id }),

      addChat: (chat) => set((s) => ({ chats: [...s.chats, chat] })),

      addMessage: (chatId, msg) =>
        set((s) => ({
          chats: s.chats.map((c) =>
            c.id === chatId ? { ...c, messages: [...c.messages, msg] } : c
          ),
        })),

      deleteChat: (id) =>
        set((s) => {
          const next = s.chats.filter((c) => c.id !== id);
          const nextId = s.currentChatId === id ? (next[0]?.id || null) : s.currentChatId;
          return { chats: next, currentChatId: nextId };
        }),

      renameChat: (id, title) =>
        set((s) => ({
          chats: s.chats.map((c) => (c.id === id ? { ...c, title } : c)),
        })),
    }),
    { name: "satset-chat-history" }
  )
);
