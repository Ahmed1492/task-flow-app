import { useNavigate } from "react-router-dom";

const NoTasks = ({ type = "empty" }) => {
  const navigate = useNavigate();

  const configs = {
    empty: {
      emoji: "📭",
      title: "No tasks here yet",
      desc: "This list is empty. Create your first task and it will show up here.",
      btnLabel: "Add a Task",
      btnAction: () => navigate("/addTask"),
      btnColor: "bg-[#FF735C] hover:bg-[#ff5a3f] shadow-[#FF735C]/25",
    },
    error: {
      emoji: "⚠️",
      title: "Something went wrong",
      desc: "We couldn't load your tasks. This might be a network issue or the server is unavailable.",
      btnLabel: "Try Again",
      btnAction: () => window.location.reload(),
      btnColor: "bg-red-500 hover:bg-red-600 shadow-red-500/25",
    },
    notfound: {
      emoji: "🔍",
      title: "No results found",
      desc: "There are no tasks matching this filter. Try a different category.",
      btnLabel: "Go to Dashboard",
      btnAction: () => navigate("/"),
      btnColor: "bg-[#6366f1] hover:bg-[#4f46e5] shadow-indigo-500/25",
    },
  };

  const c = configs[type] || configs.empty;

  return (
    <div className="flex flex-col items-center justify-center min-h-[420px] px-6 py-12 fade-up">
      {/* Illustration card */}
      <div className="relative mb-8">
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full bg-gray-100 dark:bg-white/5 scale-150 blur-2xl" />
        <div className="relative w-28 h-28 rounded-3xl bg-white dark:bg-[#1e293b] border border-gray-100 dark:border-white/10
                        shadow-xl flex items-center justify-center text-5xl">
          {c.emoji}
        </div>
        {/* Floating dots */}
        <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#FF735C]/30 animate-bounce" style={{ animationDelay: "0ms" }} />
        <div className="absolute -bottom-1 -left-3 w-3 h-3 rounded-full bg-indigo-400/30 animate-bounce" style={{ animationDelay: "200ms" }} />
        <div className="absolute top-1/2 -right-5 w-2 h-2 rounded-full bg-emerald-400/40 animate-bounce" style={{ animationDelay: "400ms" }} />
      </div>

      {/* Text */}
      <h3 className="text-xl font-extrabold text-gray-800 dark:text-white mb-2 text-center">
        {c.title}
      </h3>
      <p className="text-sm text-gray-400 dark:text-white/40 text-center max-w-xs leading-relaxed mb-8">
        {c.desc}
      </p>

      {/* Action button */}
      <button
        onClick={c.btnAction}
        className={`px-6 py-3 rounded-xl font-bold text-sm text-white
                   shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0
                   transition-all duration-200 ${c.btnColor}`}
      >
        {c.btnLabel}
      </button>
    </div>
  );
};

export default NoTasks;
