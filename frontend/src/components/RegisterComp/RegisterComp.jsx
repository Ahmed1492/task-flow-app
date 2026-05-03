import axios from "axios";
import { useState } from "react";
import { useAppContext } from "../../context/appContext";

const RegisterComp = ({ setMode, setToast }) => {
  const [userRegister, setUserRegister] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { backEndUrl } = useAppContext();

  const collectDate = (e) => {
    setError(null);
    const { name, value } = e.target;
    setUserRegister((prev) => ({ ...prev, [name]: value }));
  };

  const handleregister = async () => {
    try {
      if (!userRegister.name || !userRegister.age || !userRegister.email || !userRegister.password) {
        return setError("All fields are required!");
      }
      setLoading(true);
      setError(null);
      await axios.post(`${backEndUrl}/register`, userRegister, {
        headers: { "ngrok-skip-browser-warning": "true" },
      });
      setSuccess(true);
      setToast({ message: "Account created! Redirecting to login...", type: "success" });
      setTimeout(() => setMode("login"), 1200);
    } catch (err) {
      const message = err?.response?.data?.message || "Registration failed. Please try again.";
      setError(message);
      setToast({ message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Heading */}
      <div className="mb-7">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Create account </h1>
        <p className="text-gray-400 text-sm">Join TaskFlow and start managing your work.</p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 px-4 py-3 bg-red-50 border-l-4 border-red-400 text-red-600 text-sm rounded-xl flex items-center gap-2">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/>
            <path d="M12 8v4M12 16h.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          {error}
        </div>
      )}

      {/* Fields */}
      <div className="flex flex-col gap-4">
        {/* Name + Age row */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#FF735C] transition-colors duration-200">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </span>
              <input
                onChange={collectDate}
                name="name"
                type="text"
                placeholder="John Doe"
                className="w-full pl-11 pr-3 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-800 text-sm
                           outline-none transition-all duration-200
                           focus:border-[#FF735C] focus:bg-white focus:shadow-md focus:shadow-[#FF735C]/10
                           hover:border-gray-200 placeholder-gray-300"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5 w-24">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Age</label>
            <input
              onChange={collectDate}
              name="age"
              type="number"
              placeholder="25"
              className="w-full px-3 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-800 text-sm text-center
                         outline-none transition-all duration-200
                         focus:border-[#FF735C] focus:bg-white focus:shadow-md focus:shadow-[#FF735C]/10
                         hover:border-gray-200 placeholder-gray-300"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email</label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#FF735C] transition-colors duration-200">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <input
              onChange={collectDate}
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-800 text-sm
                         outline-none transition-all duration-200
                         focus:border-[#FF735C] focus:bg-white focus:shadow-md focus:shadow-[#FF735C]/10
                         hover:border-gray-200 placeholder-gray-300"
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Password</label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#FF735C] transition-colors duration-200">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
            <input
              onChange={collectDate}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full pl-11 pr-11 py-3.5 rounded-xl border-2 border-gray-100 bg-gray-50 text-gray-800 text-sm
                         outline-none transition-all duration-200
                         focus:border-[#FF735C] focus:bg-white focus:shadow-md focus:shadow-[#FF735C]/10
                         hover:border-gray-200 placeholder-gray-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#FF735C] transition-colors duration-200"
            >
              {showPassword ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleregister}
          disabled={loading || success}
          className={`mt-1 w-full py-3.5 rounded-xl font-bold text-sm text-white
                     shadow-lg transition-all duration-200 flex items-center justify-center gap-2
                     ${success
                       ? "bg-green-500 shadow-green-500/25 cursor-default"
                       : loading
                       ? "bg-[#FF735C]/70 shadow-[#FF735C]/20 cursor-not-allowed"
                       : "bg-[#FF735C] hover:bg-[#ff5a3f] shadow-[#FF735C]/25 hover:shadow-xl hover:shadow-[#FF735C]/35 hover:-translate-y-0.5 active:translate-y-0"
                     }`}
        >
          {success ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Account Created!
            </>
          ) : loading ? (
            <>
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3"/>
                <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              </svg>
              Creating account...
            </>
          ) : (
            "Create Account →"
          )}
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 mt-5">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-xs text-gray-300 font-medium">OR</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>
      <p className="mt-4 text-sm text-gray-400">
        Already have an account?{" "}
        <span
          onClick={() => setMode("login")}
          className="text-[#FF735C] font-bold cursor-pointer hover:underline underline-offset-2"
        >
          Sign in
        </span>
      </p>
    </div>
  );
};

export default RegisterComp;
