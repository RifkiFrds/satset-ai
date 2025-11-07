import React, { useEffect } from "react";
import { Menu } from "lucide-react";
import { useUIStore } from "../../../../store/uiStore";
import { useChat } from "../hooks/useChat";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatInputForm from "./ChatInputForm";

export default function ChatLayout() {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const {
    chats,
    activeConversation,
    activeConversationId,
    handleNewConversation,
    handleSwitchConversation,
    handleDeleteConversation,
    handleRenameConversation,
   renameCurrentConversation,
    copyConversation,
    exportToPDF,
    handleSubmit,
    isLoading,
    searchTerm,
    setSearchTerm,
  } = useChat();

  useEffect(() => {
    if (chats.length === 0) handleNewConversation();
  }, [chats.length]);

  return (
    <div className="flex h-screen bg-white dark:bg-[#0B0F29] text-gray-900 dark:text-white overflow-hidden">
      <ChatSidebar
        sidebarOpen={sidebarOpen}
        onClose={toggleSidebar}
        chats={chats}
        activeId={activeConversationId}
        onSwitch={handleSwitchConversation}
        onNew={handleNewConversation}
        onDelete={handleDeleteConversation}
        onRename={handleRenameConversation}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
      />

      <div className="relative flex flex-col flex-1 min-w-0">
        <button
          onClick={toggleSidebar}
          className="lg:hidden absolute top-4 left-4 z-20 bg-[#647DEB] hover:bg-[#5267d4] text-white p-2 rounded-lg shadow-md"
        >
          <Menu size={20} />
        </button>

        <ChatHeader
          title={activeConversation?.title || "Percakapan Baru"}
          onToggleSidebar={toggleSidebar}
          onRename={renameCurrentConversation}
          onCopy={copyConversation}
          onExport={exportToPDF}
          onDelete={() => handleDeleteConversation(activeConversationId)}
        />

        <div className="flex-1 overflow-y-auto">
          <ChatBody messages={activeConversation?.messages || []} isLoading={isLoading} />
        </div>

        <ChatInputForm
          disabled={isLoading || !activeConversationId}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
