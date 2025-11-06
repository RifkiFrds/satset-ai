import React from 'react';

const HeroSection = () => {
  return (
    // Section wrapper dengan padding vertikal
    <section className="w-full py-20 md:py-32">
      {/* Kontainer untuk membatasi lebar dan memusatkan konten */}
      <div className="container mx-auto max-w-4xl px-4 text-center">
        
        {/* Judul Utama */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900">
          Temui Tim {" "}
          {/* Sorotan gradien biru, konsisten dengan branding */}
          <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            SATSET AI
          </span>
        </h1>

        {/* Sub-Judul/Deskripsi */}
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-neutral-700">
          Kami adalah tim mahasiswa yang bersemangat, berkolaborasi untuk
          membangun alat yang bermanfaat bagi produktivitas akademik Anda.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;