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
      "Tidak sama sekali. Platform ini dirancang agar mudah digunakan oleh siapa pun, bahkan tanpa latar belakang teknis. Cukup masukkan kebutuhanmu, dan AI akan menyesuaikan hasilnya secara otomatis.e provide lifetime updates and 1 year of dedicated support with every license.",
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
    <section className="py-16 bg-transparent sm:py-20 lg:py-24">
      <div className="max-w-3xl px-6 mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl font-pj">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-base text-4xl text-gray-600">
         Cari tahu tentang kami lewat pertanyaan yang paling sering diajukan.
        </p>

        <div className="mt-12 space-y-4 text-left">
          {faqs.map((faq, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                onClick={() => toggleFAQ(index)}
                className={`relative border rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "bg-white shadow-xl border-transparent ring-1 ring-transparent"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                style={
                  isActive
                    ? {
                        boxShadow:
                          "0 0 30px rgba(68,176,255,0.2), 0 0 30px rgba(255,102,68,0.2)",
                        borderImage:
                          "linear-gradient(90deg,#44ff9a,#44b0ff,#8b44ff,#ff6644,#ebff70) 1",
                      }
                    : {}
                }
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <span className="text-2xl text-gray-500">
                    {isActive ? "−" : "+"}
                  </span>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isActive ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
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
