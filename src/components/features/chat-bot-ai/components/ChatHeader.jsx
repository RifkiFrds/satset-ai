import React, { useState, useEffect, useRef } from "react";
import {
  MoreVertical,
  Menu,
  FileText,
  Edit2,
  Trash2,
  Copy,
  X,
} from "lucide-react";

export default function ChatHeader({
  title,
  sidebarOpen,
  onToggleSidebar,
  onRename,
  onCopy,
  onExport,
  onDelete,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);
  const menuRef = useRef(null);

  useEffect(() => setTempTitle(title), [title]);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const submitRename = () => {
    const t = tempTitle.trim();
    if (t) onRename(t);
    setRenameOpen(false);
  };

  return (
    <header className="sticky top-0 z-10 bg-white/90 dark:bg-[#0B0F29]/90 backdrop-blur-xl border-b border-gray-200 dark:border-white/10">
      <div className="h-14 px-4 lg:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className={`
      inline-flex w-9 h-9 items-center justify-center rounded-lg shadow-sm transition
      bg-[#647DEB] hover:bg-[#5267d4] text-white
      lg:flex 
    `}
          >
            <Menu size={18} />
          </button>

          <h1 className="font-semibold truncate">{title}</h1>
        </div>

        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition flex items-center justify-center"
          >
            <MoreVertical size={18} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#11172E] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setRenameOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <Edit2 size={16} /> Rename
              </button>
              <button
                onClick={() => {
                  onExport();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <FileText size={16} /> Export PDF
              </button>
              <button
                onClick={() => {
                  onCopy();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <Copy size={16} /> Salin Chat
              </button>
              <button
                onClick={() => {
                  onDelete();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-400/10"
              >
                <Trash2 size={16} /> Hapus
              </button>
            </div>
          )}
        </div>
      </div>

      {renameOpen && (
        <div className="fixed inset-0 z-20 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setRenameOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-white dark:bg-[#11172E] rounded-xl p-4 shadow-xl border border-gray-200 dark:border-white/10">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Rename Percakapan</h3>
              <button onClick={() => setRenameOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <input
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitRename()}
              className="w-full rounded-lg px-3 py-2 border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/10 outline-none"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setRenameOpen(false)}
                className="px-3 py-1 rounded-lg border border-gray-200 dark:border-white/10"
              >
                Batal
              </button>
              <button
                onClick={submitRename}
                className="px-3 py-1 rounded-lg bg-[#647DEB] hover:bg-[#5267d4] text-white"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
