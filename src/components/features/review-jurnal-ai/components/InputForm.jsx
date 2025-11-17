import Button from "../../../ui/Button";
import { Loader2, SearchCheck } from "lucide-react";

export default function InputForm({ inputText, setInputText, isLoading, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="mb-12">
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Tempelkan abstrak atau teks jurnal…"
        className="w-full h-48 px-4 py-3 rounded-xl dark:text-white border border-gray-300 
                   dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none 
                   focus:ring-2 focus:ring-[#647DEB] mb-4 resize-none"
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
        {isLoading ? <Loader2 className="animate-spin" /> : <SearchCheck />}
        {isLoading ? "Sedang Menganalisis..." : "Review Sekarang"}
      </Button>
    </form>
  );
}
