import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  // Ambil 'pathname' (bagian URL setelah domain, cth: /features/chat-bot-ai)
  const { pathname } = useLocation();

  // Gunakan 'useEffect' untuk menjalankan sesuatu SETIAP KALI 'pathname' berubah
  useEffect(() => {
    // Paksa window untuk scroll ke paling atas
    window.scrollTo(0, 0);
  }, [pathname]); // <-- Ini adalah 'dependency array', efek ini akan jalan lagi jika pathname berubah

  // Komponen ini tidak me-render UI apapun
  return null;
}
