import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../context/appContext";

const STAT_CARDS = [
  { label: "Total Tasks",  key: "total",       color: "from-[#6366f1] to-[#818cf8]",    icon: "📋" },
  { label: "Completed",    key: "completed",   color: "from-emerald-500 to-emerald-400", icon: "✅" },
  { label: "In Progress",  key: "inprogress",  color: "from-blue-500 to-blue-400",       icon: "🔄" },
  { label: "Pending",      key: "pending",     color: "from-amber-500 to-amber-400",     icon: "⏳" },
];

const inputCls = `w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-white/10
  bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-white text-sm
  outline-none transition-all duration-200
  focus:border-[#FF735C] focus:bg-white dark:focus:bg-white/10 focus:shadow-md focus:shadow-[#FF735C]/10
  hover:border-gray-200 dark:hover:border-white/20 placeholder-gray-300 dark:placeholder-white/20
  disabled:opacity-50 disabled:cursor-not-allowed`;

const Profile = ({ allTasks }) => {
  const navigate = useNavigate();
  const { toggleDarkMode, darkMode, backEndUrl } = useAppContext();

  const decodeToken = () => {
    try {
      const token = localStorage.getItem("userTasksToken");
      return token ? jwtDecode(token) : null;
    } catch { return null; }
  };

  // Keep user in state so it re-renders after token update
  const [user, setUser] = useState(() => decodeToken());

  const [editing, setEditing]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(null);
  const [error, setError]       = useState(null);
  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState({
    name:     user?.name  || "",
    email:    user?.email || "",
    age:      user?.age   || "",
    password: "",
  });

  const handleChange = (e) => {
    setError(null);
    setSuccess(null);
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!form.name || !form.email) {
      return setError("Name and email are required.");
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = { name: form.name, email: form.email, age: form.age };
      if (form.password) payload.password = form.password;

      const res = await axios.patch(`${backEndUrl}/profile/${user.id}`, payload, {
        headers: { "ngrok-skip-browser-warning": "true" },
      });

      // Save the fresh token so decoded data is up-to-date
      if (res.data.token) {
        localStorage.setItem("userTasksToken", res.data.token);
        // Re-decode so the UI updates immediately without reload
        const fresh = jwtDecode(res.data.token);
        setUser(fresh);
        setForm({ name: fresh.name, email: fresh.email, age: fresh.age || "", password: "" });
      }

      setSuccess("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      setError(err?.response?.data?.message || "Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setError(null);
    setSuccess(null);
    setForm({
      name:     user?.name  || "",
      email:    user?.email || "",
      age:      user?.age   || "",
      password: "",
    });
  };

  const handleLogOut = () => {
    localStorage.removeItem("userTasksToken");
    navigate("/");
    window.location.reload();
  };

  const stats = {
    total:      Array.isArray(allTasks) ? allTasks.length : 0,
    completed:  Array.isArray(allTasks) ? allTasks.filter(t => t.type === "completed").length  : 0,
    inprogress: Array.isArray(allTasks) ? allTasks.filter(t => t.type === "inprogress").length : 0,
    pending:    Array.isArray(allTasks) ? allTasks.filter(t => t.type === "pending").length    : 0,
  };

  // Use live form values when editing, decoded token otherwise
  const displayName  = editing ? form.name  : (user?.name  || "User");
  const displayEmail = editing ? form.email : (user?.email || "—");

  return (
    <div className="px-4 py-6 fade-up max-w-3xl mx-auto">

      {/* ── Hero card ── */}
      <div className="relative bg-gradient-to-br from-[#FF735C] to-[#ff9a85] rounded-3xl p-8 mb-6 overflow-hidden shadow-xl shadow-[#FF735C]/20">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/10" />

        <div className="relative z-10 flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30
                          flex items-center justify-center text-4xl font-extrabold text-white shadow-lg flex-shrink-0">
            {displayName?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-extrabold text-white truncate">{displayName}</h1>
            <p className="text-white/70 text-sm mt-0.5 truncate">{displayEmail}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">Task Manager</span>
              {(form.age || user?.age) && (
                <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Age {editing ? form.age : user?.age}
                </span>
              )}
            </div>
          </div>
          {/* Edit toggle */}
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="flex-shrink-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white
                         px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {STAT_CARDS.map(({ label, key, color, icon }) => (
          <div key={key}
            className="bg-white dark:bg-[#1e293b] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-white/10
                       hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-lg mb-3 shadow-md`}>
              {icon}
            </div>
            <p className="text-2xl font-extrabold text-gray-800 dark:text-white">{stats[key]}</p>
            <p className="text-xs text-gray-400 dark:text-white/40 font-semibold mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* ── Edit form / Info + Settings ── */}
      {editing ? (
        /* ── EDIT FORM ── */
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-extrabold text-gray-800 dark:text-white uppercase tracking-widest">Edit Profile</h3>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 dark:bg-red-500/10 border-l-4 border-red-400 text-red-600 dark:text-red-400 text-sm rounded-xl flex items-center gap-2">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            {/* Name + Age */}
            <div className="flex gap-3">
              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-widest">Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange}
                  className={inputCls} type="text" placeholder="John Doe" />
              </div>
              <div className="flex flex-col gap-1.5 w-24">
                <label className="text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-widest">Age</label>
                <input name="age" value={form.age} onChange={handleChange}
                  className={`${inputCls} text-center`} type="number" placeholder="25" />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-widest">Email *</label>
              <input name="email" value={form.email} onChange={handleChange}
                className={inputCls} type="email" placeholder="you@example.com" />
            </div>

            {/* New password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-widest">
                New Password <span className="normal-case font-normal text-gray-400">(leave blank to keep current)</span>
              </label>
              <div className="relative">
                <input name="password" value={form.password} onChange={handleChange}
                  className={`${inputCls} pr-11`}
                  type={showPass ? "text" : "password"} placeholder="••••••••" />
                <button type="button" onClick={() => setShowPass(p => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#FF735C] transition-colors">
                  {showPass ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-2">
              <button onClick={handleCancel}
                className="flex-1 py-3 rounded-xl font-bold text-sm text-gray-600 dark:text-white/60
                           border-2 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5
                           transition-all duration-200">
                Cancel
              </button>
              <button onClick={handleSave} disabled={loading}
                className={`flex-1 py-3 rounded-xl font-bold text-sm text-white
                           flex items-center justify-center gap-2 shadow-lg transition-all duration-200
                           ${loading
                             ? "bg-[#FF735C]/70 cursor-not-allowed"
                             : "bg-[#FF735C] hover:bg-[#ff5a3f] shadow-[#FF735C]/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                           }`}>
                {loading ? (
                  <>
                    <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3"/>
                      <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Saving...
                  </>
                ) : "Save Changes →"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ── INFO + SETTINGS ── */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Account info */}
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-extrabold text-gray-800 dark:text-white uppercase tracking-widest">Account Info</h3>
              <button onClick={() => setEditing(true)}
                className="text-xs font-bold text-[#FF735C] hover:underline underline-offset-2">
                Edit
              </button>
            </div>

            {success && (
              <div className="mb-4 px-3 py-2.5 bg-emerald-50 dark:bg-emerald-500/10 border-l-4 border-emerald-400 text-emerald-700 dark:text-emerald-400 text-xs rounded-lg flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
                {success}
              </div>
            )}

            <div className="flex flex-col gap-4">
              {[
                { label: "Full Name", value: user?.name,  icon: "👤" },
                { label: "Email",     value: user?.email, icon: "✉️" },
                { label: "Age",       value: user?.age ? `${user.age} years` : "—", icon: "🎂" },
                { label: "User ID",   value: user?.id ? `#${user.id.slice(-6).toUpperCase()}` : "—", icon: "🔑" },
              ].map(({ label, value, icon }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-lg w-7 flex-shrink-0">{icon}</span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-white/30">{label}</p>
                    <p className="text-sm font-semibold text-gray-700 dark:text-white/80 truncate">{value || "—"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/10">
            <h3 className="text-sm font-extrabold text-gray-800 dark:text-white uppercase tracking-widest mb-4">Settings</h3>
            <div className="flex flex-col gap-3">

              {/* Dark mode */}
              <div onClick={toggleDarkMode}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-white/5
                           hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{darkMode ? "☀️" : "🌙"}</span>
                  <div>
                    <p className="text-sm font-bold text-gray-700 dark:text-white/80">{darkMode ? "Light Mode" : "Dark Mode"}</p>
                    <p className="text-xs text-gray-400 dark:text-white/30">Toggle appearance</p>
                  </div>
                </div>
                <div className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 flex-shrink-0 ${darkMode ? "bg-[#FF735C]" : "bg-gray-200"}`}>
                  <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${darkMode ? "translate-x-5" : "translate-x-0"}`} />
                </div>
              </div>

              {/* Add task */}
              <button onClick={() => navigate("/addTask")}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5
                           hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-left w-full">
                <span className="text-lg">➕</span>
                <div>
                  <p className="text-sm font-bold text-gray-700 dark:text-white/80">New Task</p>
                  <p className="text-xs text-gray-400 dark:text-white/30">Create a new task</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="ml-auto text-gray-300 dark:text-white/20">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Logout */}
              <button onClick={handleLogOut}
                className="flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-500/10
                           hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors text-left w-full">
                <span className="text-lg">🚪</span>
                <div>
                  <p className="text-sm font-bold text-red-600 dark:text-red-400">Log Out</p>
                  <p className="text-xs text-red-400/70 dark:text-red-400/50">Sign out of your account</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
