import React from "react";
import { Link } from "react-router-dom";
import { X, Instagram, Youtube, Github } from "lucide-react";

const linkColumns = [
  {
    title: "Features",
    links: [
      { name: "Chatbot AI", href: "/chat-bot-ai" },
      { name: "Template Makalah", href: "/review-jurnal-ai" },
      { name: "Review Jurnal", href: "/template-makalah" },
    ],
  },
  {
    title: "Project",
    links: [
      { name: "About Us", href: "/" },
      { name: "GitHub", href: "https://github.com/rifkifrds/satset-ai" },
      { name: "Contributors", href: "/contributor" },
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

const socialIcons = [
  {
    icon: Github,
    href: "https://github.com/rifkifrds/satset-ai",
    name: "GitHub",
  },
  { icon: X, href: "#", name: "X (Twitter)" },
  { icon: Instagram, href: "#", name: "Instagram" },
  { icon: Youtube, href: "#", name: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0B0F29] border-t border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">

          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo.png"
                alt="SATSET AI Logo"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs leading-relaxed">
              AI-powered tools designed to boost student productivity.
            </p>
          </div>

          {linkColumns.map((column) => (
            <div key={column.title}>
              <h5 className="mb-4 font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider text-sm">
                {column.title}
              </h5>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="
                        text-gray-600 
                        dark:text-gray-400 
                        hover:text-[#647DEB] 
                        dark:hover:text-[#647DEB]
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
        </div>

        <hr className="my-12 border-gray-200 dark:border-gray-700" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-sm text-gray-500 dark:text-gray-400 order-2 md:order-1">
            © {new Date().getFullYear()} SATSET AI. All rights reserved.
          </p>

          <div className="flex space-x-6 order-1 md:order-2">
            {socialIcons.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="
                  text-gray-600 
                  dark:text-gray-400
                  hover:text-[#647DEB] 
                  dark:hover:text-[#647DEB]
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
