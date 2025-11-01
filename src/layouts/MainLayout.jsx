import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import AppNavbar from "../components/Navbar.jsx";
import StripesBackground from "../components/ui/Background.jsx";

export default function Index() {
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden bg-base-100">
      {/* Navbar */}
      <AppNavbar />

      {/* Konten utama dengan background */}
      <main className="relative z-10 flex-1 p-6 lg:p-8 rounded-tl-2xl shadow-inner overflow-hidden">
        <StripesBackground
          position="right"
          width="w-full"
          height="h-full"
          opacity="opacity-20"
        />
        <div className="relative z-20">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
