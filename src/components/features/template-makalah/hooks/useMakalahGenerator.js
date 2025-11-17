import { useState } from 'react';
import { generateMakalah } from '../api';

export const useMakalahGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState("");

  const generate = async ({ topic, style, citationFormat }) => {
    if (!topic.trim()) {
      setError("Topik tidak boleh kosong.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResult(""); // Kosongkan hasil sebelumnya

    try {
      const aiOutput = await generateMakalah({ topic, style, citationFormat });
      setResult(aiOutput);
    } catch (err) {
      setError(err.message); // Tangkap error dari API
      setResult(""); // Pastikan result kosong jika error
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, result, generate };
};