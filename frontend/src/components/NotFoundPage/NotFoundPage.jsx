import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 fade-up
                    bg-[#f7f8fc] dark:bg-[#0f172a]">
      {/* Big number */}
      <div className="relative mb-6 select-none">
        <span className="text-[10rem] font-extrabold leading-none
                         text-gray-100 dark:text-white/5">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-3xl bg-white dark:bg-[#1e293b] border border-gray-100 dark:border-white/10
                          shadow-2xl flex items-center justify-center text-5xl">
            🔍
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white mb-2 text-center">
        Page not found
      </h1>
      <p className="text-sm text-gray-400 dark:text-white/40 text-center max-w-sm leading-relaxed mb-8">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2.5 rounded-xl font-bold text-sm text-gray-600 dark:text-white/60
                     border-2 border-gray-200 dark:border-white/10
                     hover:bg-gray-100 dark:hover:bg-white/5 hover:border-gray-300 dark:hover:border-white/20
                     transition-all duration-200"
        >
          ← Go Back
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2.5 rounded-xl font-bold text-sm text-white
                     bg-[#FF735C] hover:bg-[#ff5a3f]
                     shadow-lg shadow-[#FF735C]/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0
                     transition-all duration-200"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
