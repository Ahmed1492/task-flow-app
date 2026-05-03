import axios from "axios";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useAppContext } from "../../context/appContext";
import PageHeader from "../../components/PageHeader/PageHeader";

const STATUS_OPTIONS = [
  { value: "pending",    label: "⏳ Pending",     color: "text-amber-600" },
  { value: "inprogress", label: "🔄 In Progress", color: "text-blue-600" },
  { value: "completed",  label: "✅ Completed",   color: "text-emerald-600" },
  { value: "deferred",   label: "📌 Deferred",    color: "text-slate-600" },
  { value: "deployed",   label: "🚀 Deployed",    color: "text-violet-600" },
];

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-bold text-gray-500 dark:text-white/40 uppercase tracking-widest">{label}</label>
    {children}
  </div>
);

const inputCls = `w-full px-4 py-3 rounded-xl border-2 border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-800 dark:text-white text-sm
  outline-none transition-all duration-200
  focus:border-[#FF735C] focus:bg-white dark:focus:bg-white/10 focus:shadow-md focus:shadow-[#FF735C]/10
  hover:border-gray-200 dark:hover:border-white/20 placeholder-gray-300 dark:placeholder-white/20`;

const AddTask = () => {
  const decodeToken = () => {
    try {
      const token = localStorage.getItem("userTasksToken");
      return token ? jwtDecode(token) : null;
    } catch { return null; }
  };

  const { backEndUrl } = useAppContext();
  const [task, setTask] = useState({
    title: "", content: "", type: "",
    userId: decodeToken()?.id,
    startDate: "", endDate: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const collectDate = (e) => {
    setError(null);
    setSuccess(false);
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const createNewTask = async () => {
    if (!task.title || !task.content || !task.type) {
      return setError("Please fill in all required fields.");
    }
    setLoading(true);
    try {
      const res = await axios.post(`${backEndUrl}/task`, task, {
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      if (res.status === 201) {
        setSuccess(true);
        setTask({ title: "", content: "", type: "", userId: decodeToken()?.id, startDate: "", endDate: "" });
      }
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-6 fade-up">
      <PageHeader type="addtask" />

      <div className="max-w-2xl mx-auto bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 p-8">
        {/* Alerts */}
        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border-l-4 border-red-400 text-red-600 text-sm rounded-xl flex items-center gap-2">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/>
              <path d="M12 8v4M12 16h.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 px-4 py-3 bg-emerald-50 border-l-4 border-emerald-400 text-emerald-700 text-sm rounded-xl flex items-center gap-2">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Task created successfully!
          </div>
        )}

        <div className="flex flex-col gap-5">
          <Field label="Title *">
            <input value={task.title} onChange={collectDate} name="title"
              className={inputCls} type="text" placeholder="e.g. Design landing page" />
          </Field>

          <Field label="Description *">
            <textarea value={task.content} onChange={collectDate} name="content"
              className={`${inputCls} resize-none h-24`} placeholder="Describe the task..." />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Start Date">
              <input value={task.startDate} onChange={collectDate} name="startDate"
                className={inputCls} type="date" />
            </Field>
            <Field label="End Date">
              <input value={task.endDate} onChange={collectDate} name="endDate"
                className={inputCls} type="date" />
            </Field>
          </div>

          <Field label="Status *">
            <select value={task.type} onChange={collectDate} name="type" className={inputCls}>
              <option value="" disabled>Select a status...</option>
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>

          <button
            onClick={createNewTask}
            disabled={loading}
            className={`mt-2 w-full py-3.5 rounded-xl font-bold text-sm text-white
                       flex items-center justify-center gap-2
                       shadow-lg transition-all duration-200
                       ${loading
                         ? "bg-[#FF735C]/70 cursor-not-allowed shadow-[#FF735C]/20"
                         : "bg-[#FF735C] hover:bg-[#ff5a3f] shadow-[#FF735C]/25 hover:shadow-xl hover:shadow-[#FF735C]/35 hover:-translate-y-0.5 active:translate-y-0"
                       }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3"/>
                  <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                Creating...
              </>
            ) : "Create Task →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
