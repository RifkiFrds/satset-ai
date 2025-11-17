import { useState } from "react";
import { reviewJurnal } from "../api/reviewJurnal";

export function useReviewJurnal() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsLoading(true);
    setResult(null);

    const res = await reviewJurnal(inputText);
    setResult(res);

    setIsLoading(false);
  };

  return {
    inputText,
    setInputText,
    isLoading,
    result,
    handleSubmit,
  };
}
