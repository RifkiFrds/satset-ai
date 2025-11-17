import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles, Download, Loader2, ChevronDown, AlertTriangle } from 'lucide-react';
import Button from '../../ui/Button.jsx';
import { generateDocx } from '../../../lib/DocxGenerator.js';
import { useMakalahGenerator } from './hooks/useMakalahGenerator.js';
import MakalahRenderer from './components/MakalahRenderer.jsx';

export default function TemplateMakalahPage() {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("formal akademik");
  const [citationFormat, setCitationFormat] = useState("APA");

  const { isLoading, error, result, generate } = useMakalahGenerator();

  const handleSubmit = async (e) => {
    e.preventDefault();
    generate({ topic, style, citationFormat }); 
  };

  const handleDownload = () => {
    if (!result || error) return;
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
            Generator Draf Makalah
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Masukkan topik, pilih gaya, dan biarkan AI menyusun draf awal yang terstruktur.
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
              className="md:col-span-3 w-full dark:text-gray-50 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#647DEB]"
            />
            
            {/* Gaya Bahasa */}
            <div className="relative w-full md:col-span-2">
              <label htmlFor="style-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 pl-1">Gaya Bahasa</label>
              <select
                id="style-select"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full appearance-none px-4 py-3 pr-12 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#647DEB] text-gray-800 dark:text-gray-200"
              >
                <option value="formal akademik">Formal Akademik</option>
                <option value="kreatif">Kreatif</option>
                <option value="deskriptif">Deskriptif</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400 pointer-events-none mt-3.5" />
            </div>
            
            {/* Format Sitasi Dropdown */}
            <div className="relative w-full md:col-span-1">
              <label htmlFor="citation-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 pl-1">Format Sitasi</label>
              <select
                id="citation-select"
                value={citationFormat}
                onChange={(e) => setCitationFormat(e.target.value)}
                className="w-full appearance-none px-4 py-3 pr-12 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#647DEB] text-gray-800 dark:text-gray-200"
              >
                <option value="APA">APA</option>
                <option value="MLA">MLA</option>
                <option value="IEEE">IEEE</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400 pointer-events-none mt-3.5" />
            </div>

          </div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            rounded="full"
            className="w-full flex items-center justify-center gap-2 mt-4"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <FileText size={20} />}
            {isLoading ? "Sedang Membuat Draf..." : "Generate Draf Makalah"}
          </Button>
        </form>

        {/* --- Error Display --- */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* --- Hasil Output --- */}
        {(isLoading || result) && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Hasil Draf Makalah</h3>
              <Button
                variant="secondary"
                size="sm"
                rounded="lg"
                onClick={handleDownload}
                disabled={isLoading || !result || !!error}
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
                <div className="max-w-none">
                  <MakalahRenderer content={result} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}