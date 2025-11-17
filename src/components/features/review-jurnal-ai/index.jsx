import React from "react";
import { motion } from "framer-motion";
import ReviewHero from "./components/ReviewHero";
import FeatureGrid from "./components/FeatureGrid";
import InputForm from "./components/InputForm";
import ResultSection from "./components/ResultSection";
import { Loader2 } from "lucide-react";
import { useReviewJurnal } from "./hooks/useReviewJurnal";

export default function ReviewJurnalPage() {
  const { inputText, setInputText, isLoading, result, handleSubmit } =
    useReviewJurnal();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16 max-w-4xl"
    >
      <ReviewHero />
      <FeatureGrid />

      <InputForm
        inputText={inputText}
        setInputText={setInputText}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />

      {isLoading && (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin text-[#647DEB]" size={32} />
        </div>
      )}

      <ResultSection result={result} />
    </motion.div>
  );
}
