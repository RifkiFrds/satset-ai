export default function ResultCard({ title, content }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-[#647DEB] mb-2">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
        {content}
      </p>
    </div>
  );
}
