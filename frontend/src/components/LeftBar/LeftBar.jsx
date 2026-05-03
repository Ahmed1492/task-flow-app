import { jwtDecode } from "jwt-decode";
import { useNavigate, NavLink } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

const NAV = [
  { to: "/",                icon: "/dashboard.svg", label: "Dashboard"   },
  { to: "/completedTasks",  icon: "/complete.svg",  label: "Completed"   },
  { to: "/pendingTasks",    icon: "/pending.svg",   label: "Pending"     },
  { to: "/inProgressTasks", icon: "/progress.svg",  label: "In Progress" },
  { to: "/deployedTasks",   icon: "/cloud.svg",     label: "Deployed"    },
  { to: "/deferredTasks",   icon: "/defferd.svg",   label: "Deferred"    },
  { to: "/addTask",         icon: "/addTask.svg",   label: "Add Task"    },
];

const LeftBar = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useAppContext();

  const handleLogOut = () => {
    localStorage.removeItem("userTasksToken");
    navigate("/");
    window.location.reload();
  };

  const decodeToken = () => {
    try {
      const token = localStorage.getItem("userTasksToken");
      return token ? jwtDecode(token) : null;
    } catch { return null; }
  };

  const user = decodeToken();

  return (
    <aside className="sticky top-0 h-screen bg-[#0f172a] dark:bg-[#020617] text-white flex flex-col overflow-hidden transition-colors duration-300">

      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 rounded-xl bg-[#FF735C] flex items-center justify-center shadow-lg shadow-[#FF735C]/40 flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M9 11l3 3L22 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="font-extrabold text-lg tracking-tight hidden md:block">TaskFlow</span>
      </div>

      {/* User pill — links to profile */}
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `mx-3 mt-4 mb-1 rounded-2xl px-3 py-3 hidden md:flex items-center gap-3 transition-all duration-200
           ${isActive ? "bg-[#FF735C]/20 ring-1 ring-[#FF735C]/40" : "bg-white/5 hover:bg-white/10"}`
        }
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF735C] to-[#ff9a85] flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-md">
          {user?.name?.[0]?.toUpperCase() || "U"}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold truncate">{user?.name || "User"}</p>
          <p className="text-[11px] text-white/40 truncate">View profile</p>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white/30 flex-shrink-0">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </NavLink>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-3 mb-2 hidden md:block">Menu</p>
        <ul className="flex flex-col gap-0.5">
          {NAV.map(({ to, icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                   ${isActive
                     ? "bg-[#FF735C] text-white shadow-lg shadow-[#FF735C]/30"
                     : "text-white/55 hover:bg-white/10 hover:text-white"}`
                }
              >
                <img className="w-5 h-5 flex-shrink-0 opacity-75 group-hover:opacity-100 transition-opacity" src={icon} alt="" />
                <span className="text-sm font-semibold hidden md:block">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom actions */}
      <div className="px-3 pb-4 border-t border-white/10 pt-3 flex flex-col gap-1">

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/55
                     hover:bg-white/10 hover:text-white transition-all duration-200 group"
        >
          {darkMode ? (
            /* Sun icon */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            /* Moon icon */
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          <span className="text-sm font-semibold hidden md:block">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </span>
          {/* Toggle pill */}
          <div className={`ml-auto hidden md:flex w-10 h-5 rounded-full p-0.5 transition-colors duration-300 flex-shrink-0
                          ${darkMode ? "bg-[#FF735C]" : "bg-white/20"}`}>
            <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-300
                            ${darkMode ? "translate-x-5" : "translate-x-0"}`} />
          </div>
        </button>

        {/* Logout */}
        <button
          onClick={handleLogOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/55
                     hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 group"
        >
          <img className="w-5 h-5 flex-shrink-0 opacity-70 group-hover:opacity-100" src="/logOut.svg" alt="" />
          <span className="text-sm font-semibold hidden md:block">Log Out</span>
        </button>

        {/* Copyright */}
        <div className="hidden md:block mt-2 px-3 pt-2 border-t border-white/10">
          <p className="text-[10px] text-white/20 leading-relaxed">
            © {new Date().getFullYear()} Ahmed Mohamed.<br />All rights reserved.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default LeftBar;
