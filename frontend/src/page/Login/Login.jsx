import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginComp from "../../components/Login/Login";
import RegisterComp from "../../components/RegisterComp/RegisterComp";
import Toast from "../../components/Toast/Toast";
import { useAppContext } from "../../context/appContext";

const Login = ({ onLogin }) => {
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const { backEndUrl } = useAppContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

  const collectDate = (e) => {
    setError(null);
    const { name, value } = e.target;
    setUserLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      if (!userLogin.email || !userLogin.password) {
        return setError("All fields are required!");
      }
      setLoading(true);
      setError(null);
      const response = await axios.post(`${backEndUrl}/login`, userLogin, {
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      if (response.status === 200) {
        localStorage.setItem("userTasksToken", response.data.token);
      }
      setSuccess(true);
      setToast({ message: "Welcome back! Redirecting you now...", type: "success" });
      setTimeout(() => {
        if (onLogin) onLogin();
        navigate("/");
      }, 1000);
    } catch (err) {
      const message = err?.response?.data?.message || "Login failed. Please try again.";
      setError(message);
      setToast({ message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f7f8fc] px-4 py-10">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col xl:flex-row min-h-[600px]">

        {/* ── Left: Form ── */}
        <div className="flex-1 flex flex-col px-10 py-10">

          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-[#FF735C] flex items-center justify-center shadow-lg shadow-[#FF735C]/30">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 11l3 3L22 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-[#FF735C] font-extrabold text-xl tracking-tight">TaskFlow</span>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-gray-100 rounded-2xl p-1 gap-1 mb-8 w-fit">
            <button
              onClick={() => setMode("login")}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all duration-250 ${
                mode === "login"
                  ? "bg-white text-[#FF735C] shadow-md"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("register")}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all duration-250 ${
                mode === "register"
                  ? "bg-white text-[#FF735C] shadow-md"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Register
            </button>
          </div>

          {/* Form content */}
          {mode === "login" ? (
            <LoginComp error={error} collectDate={collectDate} handleLogin={handleLogin} loading={loading} success={success} />
          ) : (
            <RegisterComp setMode={setMode} setToast={setToast} />
          )}
        </div>

        {/* ── Right: Visual panel ── */}
        <div className="hidden xl:flex w-[45%] relative bg-gradient-to-br from-[#FF735C] to-[#ffb39e] flex-col justify-between p-10 overflow-hidden">
          {/* Blobs */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10" />
          <div className="absolute bottom-10 -left-10 w-48 h-48 rounded-full bg-white/10" />
          <div className="absolute top-1/2 right-4 w-32 h-32 rounded-full bg-white/10" />

          {/* Badge */}
          <div className="relative z-10 flex items-center gap-2 bg-white/20 backdrop-blur-sm w-fit px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white text-xs font-semibold tracking-wide">Task Manager</span>
          </div>

          {/* Image + floating cards */}
          <div className="relative z-10 flex items-center justify-center flex-1 py-6">
            <div className="relative">
              <div className="w-56 h-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30">
                <img src="/bg2.jpg" alt="visual" className="w-full h-full object-cover" />
              </div>
              {/* Stat card top */}
              <div className="absolute -top-5 -left-10 bg-white rounded-2xl px-3 py-2.5 shadow-xl flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 leading-none">Completed</p>
                  <p className="text-xs font-bold text-gray-800 mt-0.5">24 Tasks</p>
                </div>
              </div>
              {/* Stat card bottom */}
              <div className="absolute -bottom-5 -right-10 bg-white rounded-2xl px-3 py-2.5 shadow-xl flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#f97316" strokeWidth="2"/>
                    <polyline points="12,6 12,12 16,14" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 leading-none">In Progress</p>
                  <p className="text-xs font-bold text-gray-800 mt-0.5">8 Tasks</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom text */}
          <div className="relative z-10">
            <h2 className="text-white text-xl font-bold mb-1">Stay on top of your tasks</h2>
            <p className="text-white/70 text-sm leading-relaxed">
              Organize, track, and complete your work efficiently.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
