import React, { useState, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DarkModeContext } from "../DarkModeContext";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { darkMode } = useContext(DarkModeContext);
  const text = "THANK YOU FOR LOGIN TO THE SMART MANAGMENT BILLING SYSTEM.";

  const handleForgotPassword = async () => {
    if (!email) { toast.error("Please enter your email"); return; }
    setLoading(true);
    try {
      const res = await axios.post("https://backend-sbms.onrender.com/api/v1/auth/forgot-password", { email, text });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending reset email.");
    } finally {
      setLoading(false);
    }
  };

  const inputBase = `w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-all duration-200 focus:outline-none focus:ring-2 ${
    darkMode
      ? "bg-gray-800 border-gray-700 text-white focus:ring-green-500 focus:border-green-500 placeholder-gray-500"
      : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-[#029c78] focus:border-[#029c78] placeholder-gray-400"
  }`;

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 pt-24 pb-12 ${darkMode ? "bg-transparent" : "bg-gray-50"}`}>
      <div className={`w-full max-w-md p-8 md:p-10 rounded-2xl shadow-2xl ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="text-center mb-8">
          <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-2xl ${darkMode ? "bg-green-500/10" : "bg-[#029c78]/10"}`}>🔑</div>
          <h2 className={`text-2xl font-bold mt-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Forgot password?</h2>
          <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Enter your email and we'll send you a reset link</p>
        </div>

        <div className="relative">
          <FaEnvelope className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
          <input
            type="email" placeholder="Email address" value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleForgotPassword()}
            className={inputBase}
          />
        </div>

        <button
          onClick={handleForgotPassword}
          disabled={loading}
          className={`w-full mt-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          } ${darkMode ? "bg-green-500 hover:bg-green-400 text-gray-900" : "bg-[#029c78] hover:bg-[#028a6b] text-white"}`}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className={`text-center text-sm mt-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          <Link to="/login" className={`font-semibold hover:underline ${darkMode ? "text-green-400" : "text-[#029c78]"}`}>← Back to login</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
