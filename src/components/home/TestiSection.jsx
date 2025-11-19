import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Muhammad yusuf",
    role: "Mahasiswa UMT",
    avatar: "/images/testi/yusuf.jpeg",
    text:"Platform ini sangat membantu tugas kuliah berkat tiga fitur Utamanya Serta sumber belajar yang lengkap.",
    rating: 4,
  },    
  {
    name: "Syamyida al islam",
    role: "Mahasiswa UMT",
    avatar: "/images/testi/syam.jpeg",
    text: "Website ini sangat bermanfaat dengan fitur fitur yang sangat lengkap cocok untuk kalangan mahasiswa.",
    rating: 5,
  },
  {
    name: "Nabil Zaky Pratama",
    role: "Mahasiswa UMT",
    avatar: "/images/testi/nazky.jpeg",
    text: "untuk ui/ux nya sangat mudah dipahami dan di gunakan, fiturnya juga lengkap banget dan cocok.",
    rating: 4,
  },
  {
    name: "Muhammad Jatri",
    role: "Mahasiswa UNPAM",
    avatar: "/images/testi/jatri.jpeg",
    text: "satset-ai membantu mahasiswa mencari informasi, memeriksa jurnal, dan merangkum teks.",
    rating: 5,
  },
  {
    name: "Muhammad Isronun Najib",
    role: "Mahasiswa UMT",
    avatar: "/images/testi/najib.jpeg",
    text: "sangat menarik dan enak di lihat ui dan ux nya serta bagus unuk tugas tugas kuliah .",
    rating: 4,
  },
  {
    name: "Fachri Ramadhan",
    role: "Mahasiswa UMT",
    avatar: "/images/testi/fahri.jpeg",
    text: "fitur dark mode sangat bagus dan ui terlihat sangat modern serta baik untuk mahasiswa.",
    rating: 5,
  },
];

const allTestimonials = [...testimonials, ...testimonials];

const Star = () => (
  <svg
    className="w-5 h-5 text-[#FDB241]"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const TestimonialCard = ({ name, avatar, text, rating, role }) => {
  return (
    <div className="flex flex-col justify-between overflow-hidden border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg mx-4 w-[360px] h-[300px] flex-shrink-0 p-8 bg-white/70 dark:bg-[#0F152E]/60 backdrop-blur-sm">
      <div className="flex items-center">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} />
        ))}
      </div>

      <blockquote className="mt-4 flex-1">
        <p className="text-lg text-gray-800 dark:text-gray-200">“{text}”</p>
      </blockquote>

      <div className="flex items-center mt-6">
        <img className="w-12 h-12 rounded-full object-cover" src={avatar} alt={name} />
        <div className="ml-4 text-left">
          <p className="text-base font-semibold text-gray-900 dark:text-white">{name}</p>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default function TestimonialSection() {
  const marqueeVariants = {
    animate: {
      x: ["0%", "-50%"],
      transition: {
        repeat: Infinity,
        duration: 45,
        ease: "linear",
      },
    },
  };

  return (
    <section className="py-10 relative overflow-hidden bg-transparent">
      
      {/* SUBTLE GLOW */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] 
                   bg-[radial-gradient(circle_at_center,rgba(100,125,235,0.07),transparent_70%)]
                   dark:bg-[radial-gradient(circle_at_center,rgba(100,125,235,0.12),transparent_70%)]
                   pointer-events-none"
      />

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-5">
            Dipercaya oleh{" "}
            <span className="text-[#647DEB]">Ratusan Mahasiswa</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Kami membangun partner belajar yang membantu mulai dari awal sampai akhir.
          </p>
        </div>

        <div className="relative mt-20 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <motion.div className="flex w-max" variants={marqueeVariants} animate="animate">
            {allTestimonials.map((t, index) => (
              <TestimonialCard
                key={`marquee-${index}`}
                name={t.name}
                avatar={t.avatar}
                text={t.text}
                rating={t.rating}
                role={t.role}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
