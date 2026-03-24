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
    } catch { toast.error("Login failed. Please check your credentials."); }
    finally { setLoading(false); }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleLogin(); };

  const inputBase = `w-full pl-11 pr-4 py-3.5 rounded-2xl border text-sm transition-all duration-200 focus:outline-none focus:ring-2 ${
    darkMode
      ? "bg-gray-800/50 border-gray-700 text-white focus:ring-brand-500 focus:border-brand-500 placeholder-gray-500"
      : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-brand-500 focus:border-brand-500 placeholder-gray-400"
  }`;

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 pt-24 pb-12 ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
      <div className={`absolute inset-0 ${darkMode ? 'mesh-gradient-dark' : 'mesh-gradient'}`} />

      <div className={`relative w-full max-w-4xl rounded-3xl overflow-hidden flex shadow-2xl ${
        darkMode ? "bg-gray-900 border border-gray-800 shadow-brand-500/5" : "bg-white shadow-gray-200/50"
      }`}>
        {/* Left */}
        <div className={`hidden lg:flex w-1/2 items-center justify-center p-12 relative overflow-hidden ${
          darkMode ? "bg-gradient-to-br from-brand-500/10 to-gray-900" : "bg-gradient-to-br from-brand-500 to-brand-700"
        }`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mx-auto">
              <span className="text-4xl">💼</span>
            </div>
            <h2 className={`text-3xl font-black ${darkMode ? "text-white" : "text-white"}`}>Smart Billing</h2>
            <p className={`text-sm max-w-xs mx-auto leading-relaxed ${darkMode ? "text-gray-400" : "text-white/70"}`}>
              Manage invoices, track payments, and grow your business — all in one place.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <h2 className={`text-2xl font-black ${darkMode ? "text-white" : "text-gray-900"}`}>Welcome back</h2>
          <p className={`text-sm mt-1 mb-8 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Sign in to your account</p>

          <div className="space-y-4">
            <div className="relative">
              <FaEnvelope className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm ${darkMode ? "text-gray-600" : "text-gray-300"}`} />
              <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown} className={inputBase} />
            </div>
            <div className="relative">
              <FaLock className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm ${darkMode ? "text-gray-600" : "text-gray-300"}`} />
              <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} className={inputBase} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute right-4 top-1/2 -translate-y-1/2 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} size="sm" />
              </button>
            </div>
          </div>

          <div className="flex justify-end mt-3">
            <Link to="/forgot-password" className={`text-xs font-medium hover:underline ${darkMode ? "text-brand-400" : "text-brand-500"}`}>Forgot password?</Link>
          </div>

          <button onClick={handleLogin} disabled={loading}
            className={`w-full mt-6 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            } bg-brand-500 text-white hover:bg-brand-400 shadow-lg shadow-brand-500/20`}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className={`text-center text-sm mt-6 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            Don't have an account?{" "}
            <Link to="/signup" className={`font-bold hover:underline ${darkMode ? "text-brand-400" : "text-brand-500"}`}>Sign up</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
