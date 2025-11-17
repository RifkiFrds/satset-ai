import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useUIStore } from "../../../../store/uiStore";
import { useChat } from "../hooks/useChat";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatInputForm from "./ChatInputForm";
import SuggestionPanel from "./SuggestionPanel";

export default function ChatLayout() {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const {
    chats,
    activeConversation,
    activeConversationId,
    handleNewConversation,
    handleSwitchConversation,
    handleDeleteConversation,
    renameCurrentConversation,
    copyConversation,
    exportToPDF,
    handleSubmit,
    isLoading,
    searchTerm,
    setSearchTerm,
    currentModel,
    setCurrentModel,
    availableModels
  } = useChat();

  useEffect(() => {
    if (chats.length === 0) handleNewConversation();
  }, [chats.length]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="h-screen flex justify-center text-gray-900 dark:text-white"
    >
      <div
        className={`
          w-full max-w-6xl h-full grid grid-cols-1 
          ${sidebarOpen ? "lg:grid-cols-[288px_1fr]" : "lg:grid-cols-[1fr]"} 
          border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden shadow-xl
        `}
      >
        <ChatSidebar
          sidebarOpen={sidebarOpen}
          onClose={toggleSidebar}
          chats={chats}
          activeId={activeConversationId}
          onSwitch={handleSwitchConversation}
          onNew={handleNewConversation}
          onDelete={handleDeleteConversation}
          onRename={renameCurrentConversation}
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
        />

        <div 
          className={`flex-col relative bg-white dark:bg-[#0B0F29] min-h-0
            ${sidebarOpen ? "hidden lg:flex" : "flex"}
          `}
        >
          <ChatHeader
            title={activeConversation?.title || "Percakapan Baru"}
            onToggleSidebar={toggleSidebar}
            onRename={renameCurrentConversation}
            onCopy={copyConversation}
            onExport={exportToPDF}
            onDelete={() => handleDeleteConversation(activeConversationId)}
          />
          <div className="flex-1 overflow-y-auto min-h-0">
            <ChatBody
              messages={activeConversation?.messages || []}
              isLoading={isLoading}
            />
          </div>

          {activeConversation?.messages.length === 1 && !isLoading && (
            <div className="px-4 md:px-6 py-4">
              <SuggestionPanel />
            </div>
          )}
          
          <ChatInputForm
            disabled={isLoading || !activeConversationId}
            onSubmit={handleSubmit}
            currentModel={currentModel}
          setCurrentModel={setCurrentModel}
          availableModels={availableModels}
          />
        </div>
      </div>
    </motion.div>
  );
}
