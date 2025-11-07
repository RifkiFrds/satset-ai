import React, { useState, useEffect, useRef } from "react";
import { MoreVertical, Menu, FileText, Edit2, Trash2, Copy } from "lucide-react";

export default function ChatHeader({ title, onToggleSidebar, onRename, onCopy, onExport, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-[#0B0F29]/80 backdrop-blur-lg border-b border-gray-200/60 dark:border-white/10">
      <div className="h-14 px-4 lg:px-6 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden inline-flex w-9 h-9 rounded-md border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition"
          >
            <Menu size={18} />
          </button>
          <h1 className="font-semibold truncate">{title}</h1>
        </div>

        <div ref={menuRef} className="relative">
        <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center w-9 h-9 rounded-md border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition"
        >
            <MoreVertical size={18} />
        </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#11172E] border border-gray-200/60 dark:border-white/10 rounded-xl shadow-lg overflow-hidden animate-fade-in">
              <button
                onClick={() => {
                  const newTitle = prompt("Nama baru percakapan:", title);
                  if (newTitle) onRename(newTitle);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/10 w-full text-left"
              >
                <Edit2 size={16}/> Rename Percakapan
              </button>

              <button onClick={() => { onExport(); setMenuOpen(false); }} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/10 w-full text-left">
                <FileText size={16}/> Export ke PDF
              </button>

              <button onClick={() => { onCopy(); setMenuOpen(false); }} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/10 w-full text-left">
                <Copy size={16}/> Salin Percakapan
              </button>

              <button onClick={() => { onDelete(); setMenuOpen(false); }} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-400/10 w-full text-left">
                <Trash2 size={16}/> Hapus Chat
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
