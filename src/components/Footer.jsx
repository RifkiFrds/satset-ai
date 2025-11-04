import React from "react";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-auto bg-base-100 border-t border-white/10 backdrop-blur-md">
      {/* Decorative subtle wave (optional) */}
      <div className="absolute inset-x-0 -top-1">
        <svg
          className="w-full h-8 text-white/5"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M0,48 C240,96 360,0 720,32 C1080,64 1200,24 1440,48 L1440,80 L0,80 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center py-6 px-4 text-center">
        <div className="flex items-center gap-2 text-sm text-gray/80">
          <span>Made with</span>
          <Heart
            className="text-pink-500 fill-pink-500 animate-pulse"
            size={16}
          />
          <span>by</span>
          <span className="font-semibold text-gray-80">SATSET AI</span>
        </div>
        <p className="text-xs mt-2 text-white/50">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}
