import React, { useState } from "react";

const faqs = [
  {
    question: "Apa itu SATSET AI?",
    answer:
      "SATSET AI adalah aplikasi web berbasis AI yang dirancang untuk membantu mahasiswa menyelesaikan tugas akademik lebih cepat dan efisien — mulai dari riset, penulisan, hingga manajemen waktu.",
  },
  {
    question: "Apakah SATSET AI sulit digunakan?",
    answer:
      "Tidak sama sekali. Platform ini dirancang agar mudah digunakan oleh siapa pun, bahkan tanpa latar belakang teknis. Cukup masukkan kebutuhanmu, dan AI akan menyesuaikan hasilnya secara otomatis.",
  },
  {
    question: "Mengapa SATSET AI berbeda dari platform AI lainnya?",
    answer:
      "Satset AI berfokus pada kecepatan, kemudahan, dan hasil yang relevan. Setiap fiturnya dikembangkan agar membantu pengguna berpikir lebih produktif — bukan sekadar menghasilkan teks, tapi mempermudah proses belajar dan bekerja.",
  },
  {
    question: "Apakah SATSET AI gratis digunakan?",
    answer:
      "Ya, Satset AI dapat digunakan sepenuhnya secara gratis. Semua pengguna bisa langsung memanfaatkan fitur-fiturnya tanpa biaya, sehingga pengalaman belajar dan bekerja dengan AI menjadi lebih mudah.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-transparent">
      <div className="max-w-3xl px-6 mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>

        <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300">
          Cari tahu tentang kami lewat pertanyaan yang paling sering diajukan.
        </p>

        <div className="mt-12 space-y-4 text-left">
          {faqs.map((faq, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                onClick={() => toggleFAQ(index)}
                className={`relative border rounded-2xl p-6 cursor-pointer transition-all duration-300 
                ${
                  isActive
                    ? "bg-white dark:bg-[#0F152E] border-transparent shadow-xl"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
                style={
                  isActive
                    ? {
                        boxShadow:
                          "0 0 25px rgba(100, 125, 235, 0.25), 0 0 25px rgba(199, 69, 89, 0.25)",
                        borderImage:
                          "linear-gradient(90deg,#647DEB,#C74559,#FFB86C,#8B5CF6) 1",
                      }
                    : {}
                }
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>

                  <span
                    className={`text-2xl transition-colors ${
                      isActive
                        ? "text-[#647DEB]"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {isActive ? "−" : "+"}
                  </span>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isActive ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
