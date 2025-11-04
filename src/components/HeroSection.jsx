import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button'; // Impor Tombol Anda
import { PointerHighlight } from '../components/ui/PointerHighlight'; // Impor PointerHighlight
import LogoMarquee from '../components/ui/LogoMarquee'; // Impor Marquee

export default function HeroSection() {
  return (
    <section 
      id="hero" 
      // Beri padding atas yang besar untuk memberi ruang dari navbar
      className="pt-40 pb-20 container mx-auto px-6 text-center"
    >
      {/* HEADING */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-gray-900 dark:text-white">
        Semua Kebutuhan Risetmu,
        <br />
        Dalam Satu Platform{" "}
        
        {/* Ini dia komponen PointerHighlight! */}
        <PointerHighlight
          containerClassName="inline-block"
          // Gunakan warna primary Anda
          rectangleClassName="border-[#647DEB]" 
          pointerClassName="text-[#647DEB]"
        >
          {/* Teks di dalamnya juga diberi warna */}
          <span className="text-[#647DEB]">
            Terintegrasi AI
          </span>
        </PointerHighlight>
      </h1>

      {/* SUBTITLE */}
      <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        Akselerasikan alur kerja akademik Anda. Dari riset hingga penulisan, 
        manfaatkan kekuatan *Language Models* terdepan untuk hasil yang lebih 
        cerdas dan lebih cepat.
      </p>

      {/* BUTTONS */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <Link to="/chat">
          <Button variant="primary" size="lg" rounded="full">
            Mulai Sekarang
          </Button>
        </Link>
        <Link to="/contributor">
          <Button variant="secondary" size="lg" rounded="full">
            Lihat Kontributor
          </Button>
        </Link>
      </div>

      {/* LOGO MARQUEE */}
      <div className="mt-24">
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-6">
          DIDUKUNG OLEH MODEL LLM TERKEMUKA
        </p>
        <LogoMarquee />
      </div>
    </section>
  );
}