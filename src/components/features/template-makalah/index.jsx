import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles, Download, Loader2, ChevronDown } from 'lucide-react';
import Button from '../../ui/Button';
import { generateMakalah } from './api';
import { generateDocx } from '../../../lib/DocxGenerator'; 

// Helper untuk render Markdown sederhana
const SimpleMarkdown = ({ text }) => {
  return text.split('\n').map((line, index) => {
    line = line.trim();
    if (line.match(/^\d+\.\s.+/)) {
      return <h2 key={index} className="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-white">{line}</h2>;
    }
    if (line.match(/^\d\.\d/)) {
      return <h3 key={index} className="text-lg font-semibold mt-3 mb-1 text-gray-800 dark:text-gray-200 pl-4">{line}</h3>;
    }
    if (line.length > 0) {
      return <p key={index} className="mb-2 text-gray-700 dark:text-gray-300">{line}</p>;
    }
    return <br key={index} />;
  });
};

export default function TemplateMakalahPage() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("formal akademik");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    setIsLoading(true);
    setResult("");
    const aiOutput = await generateMakalah(topic, style);
    setResult(aiOutput);
    setIsLoading(false);
  };

  const handleDownload = () => {
    if (!result || result.startsWith("⚠️")) return;
    generateDocx(topic || "Makalah", result);
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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium dark:text-gray-50 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
            <Sparkles size={16} className="text-[#647DEB]" />
            AI Makalah Generator
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Generator Kerangka Makalah
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Masukkan topik Anda, dan biarkan AI menyusun kerangka penulisan yang terstruktur.
          </p>
        </div>

        {/* --- Form Input --- */}
        <form onSubmit={handleSubmit} className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Contoh: Dampak AI pada pasar kerja..."
              className="md:col-span-2 w-full dark:text-gray-50 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#647DEB]"
            />
            <div className="relative w-full">
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="
                  w-full appearance-none px-4 py-3 pr-12 
                  rounded-xl border border-gray-300 dark:border-gray-700 
                  bg-white dark:bg-gray-800 
                  focus:outline-none focus:ring-2 focus:ring-[#647DEB]
                  text-gray-800 dark:text-gray-200
                "
              >
                <option value="formal akademik">Formal Akademik</option>
                <option value="kreatif">Kreatif</option>
                <option value="deskriptif">Deskriptif</option>
              </select>

              <ChevronDown 
                className="
                  absolute right-4 top-1/2 -translate-y-1/2
                  w-5 h-5 text-gray-500 dark:text-gray-400 pointer-events-none
                "
              />
            </div>
          </div>
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
              <FileText size={20} />
            )}
            {isLoading ? "Sedang Membuat Kerangka..." : "Generate Kerangka"}
          </Button>
        </form>

        {/* --- Hasil Output --- */}
        {(isLoading || result) && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Hasil Kerangka</h3>
              <Button
                variant="secondary"
                size="sm"
                rounded="lg"
                onClick={handleDownload}
                disabled={isLoading || !result || result.startsWith("⚠️")}
                className="flex items-center gap-2"
              >
                <Download size={16} />
                Export .docx
              </Button>
            </div>
            
            <div className="p-6">
              {isLoading && (
                <div className="flex justify-center items-center h-40">
                  <Loader2 size={32} className="animate-spin text-[#647DEB]" />
                </div>
              )}
              {result && (
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <SimpleMarkdown text={result} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}