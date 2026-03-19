import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Redux/action/authActions";
import { DarkModeContext } from "../DarkModeContext";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { darkMode } = useContext(DarkModeContext);
  const text = "THANK YOU FOR LOGIN TO THE SMART MANAGMENT BILLING SYSTEM.";

  const handleLogin = async () => {
    if (!email || !password) { toast.error("Please fill in all fields!"); return; }
    setLoading(true);
    try {
      await dispatch(login(email, password));
      toast.success("Logged in successfully");
      await axios.post("https://backend-sbms.onrender.com/api/v1/auth/forgot-password", { email, text });
      navigate("/dashboard/all-inventory");
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleLogin(); };

  const inputBase = `w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-all duration-200 focus:outline-none focus:ring-2 ${
    darkMode
      ? "bg-gray-800 border-gray-700 text-white focus:ring-green-500 focus:border-green-500 placeholder-gray-500"
      : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-[#029c78] focus:border-[#029c78] placeholder-gray-400"
  }`;

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 pt-24 pb-12 ${darkMode ? "bg-transparent" : "bg-gray-50"}`}>
      <div className={`w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        {/* Left - Illustration */}
        <div className={`hidden lg:flex w-1/2 items-center justify-center p-10 ${darkMode ? "bg-green-500/10" : "bg-[#029c78]"}`}>
          <div className="text-center space-y-6">
            <div className="text-7xl">💼</div>
            <h2 className={`text-3xl font-bold ${darkMode ? "text-green-400" : "text-white"}`}>Smart Billing</h2>
            <p className={`text-sm max-w-xs mx-auto ${darkMode ? "text-green-300/70" : "text-white/80"}`}>
              Manage invoices, track payments, and grow your business — all in one place.
            </p>
          </div>
        </div>

        {/* Right - Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Welcome back</h2>
          <p className={`text-sm mt-1 mb-8 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Sign in to your account</p>

          <div className="space-y-4">
            <div className="relative">
              <FaEnvelope className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
              <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown} className={inputBase} />
            </div>
            <div className="relative">
              <FaLock className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
              <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} className={inputBase} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute right-4 top-1/2 -translate-y-1/2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} size="sm" />
              </button>
            </div>
          </div>

          <div className="flex justify-end mt-3">
            <Link to="/forgot-password" className={`text-xs hover:underline ${darkMode ? "text-green-400" : "text-[#029c78]"}`}>Forgot password?</Link>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full mt-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            } ${darkMode ? "bg-green-500 hover:bg-green-400 text-gray-900" : "bg-[#029c78] hover:bg-[#028a6b] text-white"}`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className={`text-center text-sm mt-6 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Don't have an account?{" "}
            <Link to="/signup" className={`font-semibold hover:underline ${darkMode ? "text-green-400" : "text-[#029c78]"}`}>Sign up</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
