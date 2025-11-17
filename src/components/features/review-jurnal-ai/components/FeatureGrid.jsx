import { Sparkles, Atom, FileText, LineChart } from "lucide-react";

const features = [
  {
    icon: <FileText size={22} />,
    title: "Auto Paper Summary",
    desc: "Ringkas jurnal ribuan kata menjadi poin penting yang padat dan jelas."
  },
  {
    icon: <Atom size={22} />,
    title: "AI Critical Review",
    desc: "Analisis kekuatan dan kelemahan metodologi riset secara otomatis."
  },
  {
    icon: <Sparkles size={22} />,
    title: "Smart Highlight",
    desc: "Menandai kalimat penting berdasarkan konteks penelitian."
  },
  {
    icon: <LineChart size={22} />,
    title: "Trend Insight",
    desc: "Deteksi tren penelitian dan keyword populer."
  }
];

export default function FeatureGrid() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      {features.map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-4 p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm"
        >
          <div className="text-[#647DEB]">{item.icon}</div>
          <div>
            <h3 className="text-lg font-semibold dark:text-white mb-1">
              {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
