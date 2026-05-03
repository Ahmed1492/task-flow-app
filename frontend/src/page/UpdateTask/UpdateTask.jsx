import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import PageHeader from "../../components/PageHeader/PageHeader";

const STATUS_OPTIONS = [
  { value: "pending",    label: "⏳ Pending" },
  { value: "inprogress", label: "🔄 In Progress" },
  { value: "completed",  label: "✅ Completed" },
  { value: "deferred",   label: "📌 Deferred" },
  { value: "deployed",   label: "🚀 Deployed" },
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

const UpdateTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [updatedTask, setUpdatedTask] = useState(location.state?.task);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { backEndUrl } = useAppContext();

  useEffect(() => {
    if (!updatedTask) navigate("/");
  }, [updatedTask, navigate]);

  const collectDate = (e) => {
    setError(null);
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await axios.patch(`${backEndUrl}/task/${updatedTask._id}`, updatedTask, {
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      if (res.status === 200) navigate("/");
    } catch (e) {
      setError(e?.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!updatedTask) return null;

  return (
    <div className="px-4 py-6 fade-up">
      <PageHeader type="updatetask" />

      <div className="max-w-2xl mx-auto bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 p-8">
        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border-l-4 border-red-400 text-red-600 text-sm rounded-xl flex items-center gap-2">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/>
              <path d="M12 8v4M12 16h.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {error}
          </div>
        )}

        <div className="flex flex-col gap-5">
          <Field label="Title">
            <input onChange={collectDate} value={updatedTask.title} name="title"
              className={inputCls} type="text" placeholder="Task Title" />
          </Field>

          <Field label="Description">
            <textarea onChange={collectDate} value={updatedTask.content} name="content"
              className={`${inputCls} resize-none h-24`} placeholder="Task Description" />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Start Date">
              <input onChange={collectDate}
                value={updatedTask.startDate ? updatedTask.startDate.slice(0, 10) : ""}
                name="startDate" className={inputCls} type="date" />
            </Field>
            <Field label="End Date">
              <input onChange={collectDate}
                value={updatedTask.endDate ? updatedTask.endDate.slice(0, 10) : ""}
                name="endDate" className={inputCls} type="date" />
            </Field>
          </div>

          <Field label="Status">
            <select value={updatedTask.type} onChange={collectDate} name="type" className={inputCls}>
              <option value="" disabled>Select status</option>
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => navigate("/")}
              className="flex-1 py-3.5 rounded-xl font-bold text-sm text-gray-600 dark:text-white/60
                         border-2 border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-50 dark:hover:bg-white/5
                         transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={loading}
              className={`flex-1 py-3.5 rounded-xl font-bold text-sm text-white
                         flex items-center justify-center gap-2
                         shadow-lg transition-all duration-200
                         ${loading
                           ? "bg-[#FF735C]/70 cursor-not-allowed"
                           : "bg-[#FF735C] hover:bg-[#ff5a3f] shadow-[#FF735C]/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                         }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
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
    </div>
  );
};

export default UpdateTask;
