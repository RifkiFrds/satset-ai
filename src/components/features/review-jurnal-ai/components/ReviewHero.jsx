import { SearchCheck } from "lucide-react";

export default function ReviewHero() {
  return (
    <div className="text-center mb-12">
      <span className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium dark:text-gray-50 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
        <SearchCheck size={16} className="text-green-500" />
        AI Review Jurnal
      </span>

      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
        Review Jurnal Kilat
      </h1>

      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
        SATSET AI menganalisis jurnal ilmiah menggunakan teknologi NLP modern
        untuk menghasilkan ringkasan, critical review, highlight, dan tren riset.
      </p>
    </div>
  );
}
