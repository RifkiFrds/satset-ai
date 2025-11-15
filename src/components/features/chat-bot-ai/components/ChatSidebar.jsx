import React from "react";
import { MessageSquare, Plus, Trash2, Search, X } from "lucide-react";

export default function ChatSidebar({
  sidebarOpen,
  onClose,
  chats,
  activeId,
  onSwitch,
  onNew,
  onDelete,
  onRename,
  searchTerm,
  onSearch,
}) {
  return (
 <aside
      className={`
        w-full h-full flex flex-col 
        border-r border-gray-200 dark:border-white/10 
        bg-white dark:bg-[#11172E]
        lg:w-72
        ${sidebarOpen ? "flex" : "hidden"}
      `}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-white/10">
      <img src="/images/logo.png" alt="Logo" className="h-12 w-auto flex-shrink-0" />
        <button
          className="lg:hidden text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-white/10 rounded-lg px-3 py-2">
          <Search size={16} className="text-gray-500 dark:text-gray-400" />
          <input
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Cari percakapan..."
            className="bg-transparent w-full text-sm outline-none text-gray-700 dark:text-gray-300"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSwitch(chat.id)}
            className={`group flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer
              ${
                chat.id === activeId
                  ? "bg-[#647DEB]/20 text-[#647DEB] font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-white/10"
              }
            `}
          >
            <div className="flex items-center gap-2 truncate flex-1">
              <MessageSquare size={18} />
              <input
                className="bg-transparent outline-none truncate w-full text-sm"
                value={chat.title}
                onChange={(e) => onRename(chat.id, e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(chat.id);
              }}
              className="opacity-0 group-hover:opacity-100 transition text-red-500 hover:text-red-600 p-1"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-white/10">
        <button
          onClick={() => {
            onNew();
            onClose(); 
          }}
          className="w-full flex items-center justify-center gap-2 bg-[#647DEB] hover:bg-[#5267d4] text-white py-3 rounded-xl text-sm font-medium transition"
        >
          <Plus size={18} />
          Chat Baru
        </button>
      </div>
    </aside>
  );
}
