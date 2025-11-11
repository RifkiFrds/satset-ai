import React from "react";
import { Link } from "react-router-dom";
import { X, Instagram, Youtube, Github } from "lucide-react";

// (Asumsi) Logo Anda ada di public/assets/logo.svg
// Pastikan path ini benar
import Logo from "../assets/logo.png";

// --- Data Link (Tetap sama) ---
const linkColumns = [
  {
    title: "Features",
    links: [
      { name: "Chatbot AI", href: "/chat" },
      { name: "Template Makalah", href: "/outline" },
      { name: "Review Jurnal", href: "/review" },
    ],
  },
  {
    title: "Project",
    links: [
      { name: "About Us", href: "/about" },
      { name: "GitHub", href: "https://github.com/your-repo/satset-ai" },
      { name: "Contributors", href: "/contributors" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/" },
      { name: "Terms of Service", href: "/" },
    ],
  },
];

// --- Ikon Sosial Media (Tetap sama) ---
const socialIcons = [
  {
    icon: Github,
    href: "https://github.com/your-repo/satset-ai",
    name: "GitHub",
  },
  { icon: X, href: "#", name: "X (Twitter)" },
  { icon: Instagram, href: "#", name: "Instagram" },
  { icon: Youtube, href: "#", name: "YouTube" },
];

export default function Footer() {
  return (
    // [REVISI 1: Background] Ganti ke 'bg-white' dengan border atas
    <footer className="bg-white text-gray-900 border-t border-gray-200">
      <div className="container mx-auto px-6 py-16">
        {/* === Bagian Atas: Grid Link === */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          {/* Kolom 1: Logo & Slogan */}
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              {/* [REVISI 2: Logo] Ukuran dibesarkan (h-10), teks dihapus */}
              <img src={Logo} alt="SATSET AI Logo" className="h-12 w-auto" />
              {/* Teks "SATSET AI" dihapus dari sini */}
            </Link>
            <p className="text-gray-600 text-sm max-w-xs">
              {/* <-- Warna teks disesuaikan untuk light mode */}
              AI-powered tools designed to boost student productivity.
            </p>
          </div>

          {/* Kolom 2-4: Link Navigasi */}
          {linkColumns.map((column) => (
            <div key={column.title}>
              <h5 className="mb-4 font-semibold text-gray-500 uppercase tracking-wider text-sm">
                {/* <-- Warna teks disesuaikan */}
                {column.title}
              </h5>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      // [REVISI 3: Accent Color]
                      // Teks abu-abu, saat hover menjadi warna primary Anda
                      className="
                        text-gray-700 
                        hover:text-[#647DEB] 
                        transition-colors duration-200 text-sm
                      "
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>{" "}
        {/* === Akhir Grid Atas === */}
        {/* === Garis Pemisah === */}
        <hr className="my-10 border-gray-200" />
        {/* <-- Warna border disesuaikan */}
        {/* === Bagian Bawah: Copyright & Sosial Media === */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-sm text-gray-500 order-2 md:order-1">
            © {new Date().getFullYear()} SATSET AI. All rights reserved.
          </p>

          {/* Ikon Sosial Media */}
          <div className="flex space-x-6 order-1 md:order-2">
            {socialIcons.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="
                  text-gray-500 
                  hover:text-[#647DEB] 
                  transition-colors duration-200
                "
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
