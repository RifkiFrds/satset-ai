import ResultCard from "./ResultCard";

export default function ResultSection({ result }) {
  if (!result) return null;

  if (result.error) {
    return <ResultCard title="Error" content={result.error} />;
  }

  return (
    <div className="space-y-6">
      <ResultCard title="Auto Summary" content={result.summary || "Tidak ditemukan."} />
      <ResultCard title="Critical Review" content={result.critical_review || "Tidak ditemukan."} />
      <ResultCard title="Smart Highlights" content={(result.highlights || []).join("\n")} />
      <ResultCard title="Trend Insight" content={result.trend_insight || "Tidak ditemukan."} />
      <ResultCard title="Metode Penelitian" content={result.metode_penelitian} />
      <ResultCard title="Hasil Utama" content={result.hasil_utama} />
      <ResultCard title="Kesimpulan" content={result.kesimpulan} />
    </div>
  );
}
