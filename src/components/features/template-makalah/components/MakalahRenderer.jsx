import React from 'react';

// Regex untuk mendeteksi heading (berdasarkan output AI Anda)
const heading1Regex = /^\d+\.\s\*\*(.*)\*\*$/; // Cth: 1. **Latar Belakang**
const heading2Regex = /^\d\.\d\s\*\*(.*)\*\*$/; // Cth: 5.1 **Teori A**
const titleRegex = /^\*\*(.*)\*\*$/; // Cth: **Judul Makalah**

export default function MakalahRenderer({ content }) {
  if (!content) return null;

  const lines = content.split('\n');

  return (
    <div>
      {lines.map((line, index) => {
        line = line.trim();

        // Render H1 (Judul Utama)
        let match = line.match(heading1Regex);
        if (match) {
          return (
            <h2 key={index} className="text-xl font-semibold mt-5 mb-2 text-gray-900 dark:text-white">
              {match[1]}
            </h2>
          );
        }

        // Render H2 (Sub-bab)
        match = line.match(heading2Regex);
        if (match) {
          return (
            <h3 key={index} className="text-lg font-semibold mt-4 mb-1.5 ml-4 text-gray-800 dark:text-gray-200">
              {match[1]}
            </h3>
          );
        }

        // Render Judul (jika ada)
        match = line.match(titleRegex);
        if (match && line.length < 100) {
           return (
            <h1 key={index} className="text-2xl font-bold mt-2 mb-4 text-gray-900 dark:text-white">
              {match[1]}
            </h1>
          );
        }

        // Render Paragraf
        if (line.length > 0) {
          return (
            <p key={index} className="mb-3 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              {line.replace(/\*\*/g, '')} 
            </p>
          );
        }

        // Render baris kosong
        if (line.length === 0) {
          return <br key={index} />;
        }

        return null;
      })}
    </div>
  );
}