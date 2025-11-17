import { useChatStore } from "../hooks/useChatStore";

export async function sendMessage(chatId) {
  const chats = useChatStore.getState().chats;
  const chat = chats.find((c) => c.id === chatId);

  const messages = chat?.messages || [];

  const res = await fetch("/.netlify/functions/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  const data = await res.json();
  return data.reply;
}
