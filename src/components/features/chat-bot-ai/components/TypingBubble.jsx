export default function TypingBubble() {
  return (
    <div className="flex gap-2 items-center w-fit bg-white/70 dark:bg-white/5 px-4 py-3 rounded-xl shadow-sm border border-gray-200/50 dark:border-white/10 backdrop-blur">
      <span className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce"></span>
      <span className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce delay-150"></span>
      <span className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce delay-300"></span>
    </div>
  );
}
