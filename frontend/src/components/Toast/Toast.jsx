import { useEffect, useState } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // slide in
    const showTimer = setTimeout(() => setVisible(true), 10);
    // slide out then remove
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 400);
    }, 3000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [onClose]);

  const styles = {
    success: {
      bg: "bg-white",
      border: "border-green-400",
      icon: (
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      ),
      title: "Success",
      titleColor: "text-green-600",
      bar: "bg-green-400",
    },
    error: {
      bg: "bg-white",
      border: "border-red-400",
      icon: (
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/>
            <path d="M12 8v4M12 16h.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      ),
      title: "Error",
      titleColor: "text-red-600",
      bar: "bg-red-400",
    },
  };

  const s = styles[type];

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-start gap-3 
                  ${s.bg} border-l-4 ${s.border} 
                  rounded-2xl shadow-2xl shadow-black/10 px-4 py-3.5 w-80
                  transition-all duration-400
                  ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
    >
      {s.icon}
      <div className="flex-1 min-w-0">
        <p className={`text-xs font-bold uppercase tracking-widest ${s.titleColor}`}>{s.title}</p>
        <p className="text-sm text-gray-700 mt-0.5 leading-snug">{message}</p>
      </div>
      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 400); }}
        className="text-gray-300 hover:text-gray-500 transition-colors mt-0.5 flex-shrink-0"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Progress bar */}
      <div className={`absolute bottom-0 left-0 h-1 ${s.bar} rounded-bl-2xl animate-shrink`} />
    </div>
  );
};

export default Toast;
