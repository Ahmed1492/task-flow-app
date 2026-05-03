const CONFIGS = {
  dashboard:   { label: "Dashboard",       sub: "All your tasks at a glance",        icon: "📋", accent: "bg-[#6366f1]" },
  completed:   { label: "Completed Tasks", sub: "Tasks you've finished",              icon: "✅", accent: "bg-emerald-500" },
  pending:     { label: "Pending Tasks",   sub: "Tasks waiting to be started",        icon: "⏳", accent: "bg-amber-500" },
  inprogress:  { label: "In Progress",     sub: "Tasks currently being worked on",    icon: "🔄", accent: "bg-blue-500" },
  deployed:    { label: "Deployed Tasks",  sub: "Tasks live in production",           icon: "🚀", accent: "bg-violet-500" },
  deferred:    { label: "Deferred Tasks",  sub: "Tasks postponed for later",          icon: "📌", accent: "bg-slate-500" },
  addtask:     { label: "Add New Task",    sub: "Create and assign a new task",       icon: "➕", accent: "bg-[#FF735C]" },
  updatetask:  { label: "Update Task",     sub: "Edit task details and status",       icon: "✏️", accent: "bg-[#FF735C]" },
};

const PageHeader = ({ type = "dashboard", count }) => {
  const c = CONFIGS[type] || CONFIGS.dashboard;

  return (
    <div className="relative bg-white dark:bg-[#1e293b] rounded-2xl mb-8
                    border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden
                    flex items-center gap-5 px-6 py-5">

      {/* Left coral accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${c.accent} rounded-l-2xl`} />

      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl ${c.accent} bg-opacity-10 flex items-center justify-center text-2xl flex-shrink-0 shadow-sm`}>
        {c.icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-extrabold text-gray-800 dark:text-white leading-tight">
          {c.label}
        </h2>
        <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5">{c.sub}</p>
      </div>

      {/* Count badge */}
      {count !== undefined && (
        <div className={`flex-shrink-0 ${c.accent} bg-opacity-10 rounded-xl px-4 py-2 text-center`}>
          <p className="text-2xl font-extrabold text-gray-800 dark:text-white leading-none">{count}</p>
          <p className="text-[10px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-widest mt-0.5">
            task{count !== 1 ? "s" : ""}
          </p>
        </div>
      )}
    </div>
  );
};

export default PageHeader;
