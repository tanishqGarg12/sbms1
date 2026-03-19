import React, { useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DarkModeContext } from "../DarkModeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FaLock } from "react-icons/fa";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!newPassword) { toast.error("Please enter a new password"); return; }
    setLoading(true);
    try {
      const res = await axios.post(`https://backend-sbms.onrender.com/api/v1/auth/reset-password/${token}`, { newPassword });
      toast.success(res.data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error resetting password.");
    } finally {
      setLoading(false);
    }
  };

  const inputBase = `w-full pl-11 pr-12 py-3 rounded-xl border text-sm transition-all duration-200 focus:outline-none focus:ring-2 ${
    darkMode
      ? "bg-gray-800 border-gray-700 text-white focus:ring-green-500 focus:border-green-500 placeholder-gray-500"
      : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-[#029c78] focus:border-[#029c78] placeholder-gray-400"
  }`;

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 pt-24 pb-12 ${darkMode ? "bg-transparent" : "bg-gray-50"}`}>
      <div className={`w-full max-w-md p-8 md:p-10 rounded-2xl shadow-2xl ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="text-center mb-8">
          <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-2xl ${darkMode ? "bg-green-500/10" : "bg-[#029c78]/10"}`}>🔒</div>
          <h2 className={`text-2xl font-bold mt-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Reset password</h2>
          <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Enter your new password below</p>
        </div>

        <div className="relative">
          <FaLock className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
          <input
            type={showPassword ? "text" : "password"} placeholder="New password" value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleResetPassword()}
            className={inputBase}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute right-4 top-1/2 -translate-y-1/2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} size="sm" />
          </button>
        </div>

        <button
          onClick={handleResetPassword}
          disabled={loading}
          className={`w-full mt-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          } ${darkMode ? "bg-green-500 hover:bg-green-400 text-gray-900" : "bg-[#029c78] hover:bg-[#028a6b] text-white"}`}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        <p className={`text-center text-sm mt-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          <Link to="/login" className={`font-semibold hover:underline ${darkMode ? "text-green-400" : "text-[#029c78]"}`}>← Back to login</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
