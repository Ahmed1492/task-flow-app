import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NoTasks from "../NoTasks/NoTasks";
import TaskSkeleton from "../TaskSkeleton/TaskSkeleton";
import axios from "axios";
import { useAppContext } from "../../context/appContext";

const STATUS = {
  completed:  { bg: "bg-emerald-50",  border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-700",  dot: "bg-emerald-400",  label: "Completed"   },
  pending:    { bg: "bg-amber-50",    border: "border-amber-200",   badge: "bg-amber-100 text-amber-700",     dot: "bg-amber-400",    label: "Pending"     },
  inprogress: { bg: "bg-blue-50",     border: "border-blue-200",    badge: "bg-blue-100 text-blue-700",       dot: "bg-blue-400",     label: "In Progress" },
  deployed:   { bg: "bg-violet-50",   border: "border-violet-200",  badge: "bg-violet-100 text-violet-700",   dot: "bg-violet-400",   label: "Deployed"    },
  deferred:   { bg: "bg-slate-50",    border: "border-slate-200",   badge: "bg-slate-100 text-slate-600",     dot: "bg-slate-400",    label: "Deferred"    },
};

const fmt = (d) => {
  if (!d) return "—";
  const date = new Date(d);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const TaskCard = ({ allTasks, setAllTasks, loadingTasks }) => {
  const [menu, setMenu] = useState({ id: null, open: false });
  const [deleting, setDeleting] = useState(null);
  const { backEndUrl } = useAppContext();
  const navigate = useNavigate();

  const toggleMenu = (task) => {
    setMenu((prev) =>
      prev.id === task._id && prev.open
        ? { id: null, open: false }
        : { id: task._id, open: true }
    );
  };

  const handleUpdate = (task) => navigate("/updateTask", { state: { task } });

  const handleDelete = async (task) => {
    setDeleting(task._id);
    try {
      await axios.delete(`${backEndUrl}/task/${task._id}`);
      setAllTasks((prev) => prev.filter((t) => t._id !== task._id));
    } catch (e) {
      console.error(e);
    } finally {
      setDeleting(null);
      setMenu({ id: null, open: false });
    }
  };

  if (loadingTasks) return <TaskSkeleton />;

  // Backend error (axios error object stored in state)
  if (allTasks instanceof Error || (allTasks && allTasks.isAxiosError)) {
    return <NoTasks type="error" />;
  }

  // 404 from backend or empty array
  if (!allTasks || allTasks?.status === 404) return <NoTasks type="notfound" />;
  if (Array.isArray(allTasks) && allTasks.length === 0) return <NoTasks type="empty" />;

  return (
    <div className="grid [grid-template-columns:repeat(auto-fill,minmax(270px,1fr))] gap-5 py-4 px-2">
      {allTasks?.map((task, i) => {
        const s = STATUS[task.type] || STATUS.pending;
        return (
          <div
            key={task._id || i}
            className={`relative flex flex-col rounded-2xl border ${s.border} bg-white dark:bg-[#1e293b] dark:border-white/10
                        shadow-sm hover:shadow-xl hover:-translate-y-1
                        transition-all duration-300 overflow-hidden fade-up`}
            style={{ animationDelay: `${i * 40}ms` }}
          >
            {/* Colored top strip */}
            <div className={`h-1.5 w-full ${s.dot}`} />

            {/* Header */}
            <div className={`${s.bg} px-5 pt-4 pb-5 relative`}>
              {/* 3-dot menu */}
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => toggleMenu(task)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400
                             hover:bg-white hover:text-gray-700 hover:shadow-sm transition-all duration-150"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
                  </svg>
                </button>

                {/* Dropdown */}
                {menu.id === task._id && menu.open && (
                  <div className="absolute right-0 top-9 bg-white dark:bg-[#1e293b] rounded-xl shadow-2xl border border-gray-100 dark:border-white/10 w-36 z-50 overflow-hidden">
                    <button
                      onClick={() => handleUpdate(task)}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-white/70
                                 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Edit Task
                    </button>
                    <div className="h-px bg-gray-100 mx-3" />
                    <button
                      onClick={() => handleDelete(task)}
                      disabled={deleting === task._id}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500
                                 hover:bg-red-50 transition-colors disabled:opacity-50"
                    >
                      {deleting === task._id ? (
                        <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="3" strokeOpacity="0.3"/>
                          <path d="M12 2a10 10 0 0110 10" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"/>
                        </svg>
                      ) : (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                          <polyline points="3,6 5,6 21,6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M10 11v6M14 11v6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      )}
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-gray-800 pr-8 leading-snug line-clamp-2">
                {task.title}
              </h3>

              {/* Badge */}
              <span className={`inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full text-xs font-bold ${s.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                {s.label}
              </span>
            </div>

            {/* Body */}
            <div className="px-5 py-4 flex flex-col gap-4 flex-1">
              {/* Description */}
              <p className="text-sm text-gray-500 dark:text-white/50 leading-relaxed line-clamp-2">
                {task.content || "No description provided."}
              </p>

              {/* Dates */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-white/10">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Start</span>
                  <span className="text-xs font-semibold text-gray-700 dark:text-white/70">{fmt(task.startDate)}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-300 dark:text-white/20">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex flex-col gap-0.5 items-end">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-white/30">End</span>
                  <span className="text-xs font-semibold text-gray-700 dark:text-white/70">{fmt(task.endDate)}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskCard;
