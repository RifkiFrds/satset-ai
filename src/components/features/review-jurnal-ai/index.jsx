import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchCheck, Loader2 } from 'lucide-react';
import Button from '../../../components/ui/Button';
import { reviewJurnal } from './api';

// Komponen Card untuk menampilkan hasil
const ResultCard = ({ title, content }) => (
  <div className="bg-white  dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
    <h3 className="text-lg font-semibold text-[#647DEB] mb-2">{title}</h3>
    <p className="text-gray-700 dark:text-gray-300">{content}</p>
  </div>
);

export default function ReviewJurnalPage() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    setResult(null);
    const aiOutput = await reviewJurnal(inputText);
    setResult(aiOutput);
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16"
    >
      <div className="max-w-3xl pt-20 pb-10 px-4 mx-auto">
        {/* --- Header --- */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
            <SearchCheck size={16} className="text-green-500" />
            AI Review Jurnal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Review Jurnal Kilat
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Tempelkan abstrak atau bagian teks jurnal Anda untuk mendapatkan
            ekstraksi poin-poin kunci secara instan.
          </p>
        </div>

        {/* --- Form Input --- */}
        <form onSubmit={handleSubmit} className="mb-12">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tempelkan teks jurnal Anda di sini..."
            className="w-full h-48 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#647DEB] mb-4 resize-none"
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="primary"
            size="lg"
            rounded="full"
            className="w-full flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <SearchCheck size={20} />
            )}
            {isLoading ? "Sedang Menganalisis..." : "Review Sekarang"}
          </Button>
        </form>

        {/* --- Hasil Output --- */}
        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <Loader2 size={32} className="animate-spin text-[#647DEB]" />
          </div>
        )}

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {result.error ? (
              <ResultCard title="Error" content={result.error} />
            ) : (
              <>
                <ResultCard 
                  title="Metode Penelitian" 
                  content={result.metode_penelitian || "Tidak ditemukan."} 
                />
                <ResultCard 
                  title="Hasil Utama" 
                  content={result.hasil_utama || "Tidak ditemukan."} 
                />
                <ResultCard 
                  title="Kesimpulan" 
                  content={result.kesimpulan || "Tidak ditemukan."} 
                />
              </>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}