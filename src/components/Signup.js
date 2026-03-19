import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { DarkModeContext } from "../DarkModeContext";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaUserTag } from "react-icons/fa";

const Signup = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [form, setForm] = useState({ firstName: "", lastName: "", username: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [role, setRole] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSignup = async () => {
    const { firstName, lastName, username, email, phone, password, confirmPassword } = form;
    if (!firstName || !lastName || !username || !email || !phone || !password || !confirmPassword) { toast.error("Please fill in all fields!"); return; }
    if (password !== confirmPassword) { toast.error("Passwords do not match!"); return; }
    setLoading(true);
    try {
      await axios.post("https://backend-sbms.onrender.com/api/v1/auth/signup", { ...form, role: role ? "admin" : "user" });
      toast.success("Account created successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleSignup(); };

  const inputBase = `w-full pl-11 pr-4 py-3 rounded-xl border text-sm transition-all duration-200 focus:outline-none focus:ring-2 ${
    darkMode
      ? "bg-gray-800 border-gray-700 text-white focus:ring-green-500 focus:border-green-500 placeholder-gray-500"
      : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-[#029c78] focus:border-[#029c78] placeholder-gray-400"
  }`;

  const iconClass = `absolute left-4 top-1/2 -translate-y-1/2 text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`;

  const InputField = ({ icon: Icon, type = "text", placeholder, value, onChange, children }) => (
    <div className="relative">
      <Icon className={iconClass} />
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} onKeyDown={handleKeyDown} className={inputBase} />
      {children}
    </div>
  );

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 pt-24 pb-12 ${darkMode ? "bg-transparent" : "bg-gray-50"}`}>
      <div className={`w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        {/* Left - Illustration */}
        <div className={`hidden lg:flex w-5/12 items-center justify-center p-10 ${darkMode ? "bg-green-500/10" : "bg-[#029c78]"}`}>
          <div className="text-center space-y-6">
            <div className="text-7xl">🚀</div>
            <h2 className={`text-3xl font-bold ${darkMode ? "text-green-400" : "text-white"}`}>Get Started</h2>
            <p className={`text-sm max-w-xs mx-auto ${darkMode ? "text-green-300/70" : "text-white/80"}`}>
              Create your account and start managing your business billing in minutes.
            </p>
          </div>
        </div>

        {/* Right - Form */}
        <div className="w-full lg:w-7/12 p-8 md:p-10 flex flex-col justify-center">
          <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Create an account</h2>
          <p className={`text-sm mt-1 mb-6 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Fill in your details to get started</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InputField icon={FaUser} placeholder="First Name" value={form.firstName} onChange={update("firstName")} />
            <InputField icon={FaUser} placeholder="Last Name" value={form.lastName} onChange={update("lastName")} />
            <InputField icon={FaUserTag} placeholder="Username" value={form.username} onChange={update("username")} />
            <InputField icon={FaEnvelope} type="email" placeholder="Email" value={form.email} onChange={update("email")} />
          </div>

          <div className="space-y-3 mt-3">
            <InputField icon={FaPhone} type="tel" placeholder="Phone" value={form.phone} onChange={update("phone")} />
            <InputField icon={FaLock} type={showPassword ? "text" : "password"} placeholder="Password" value={form.password} onChange={update("password")}>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute right-4 top-1/2 -translate-y-1/2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} size="sm" />
              </button>
            </InputField>
            <InputField icon={FaLock} type={showConfirm ? "text" : "password"} placeholder="Confirm Password" value={form.confirmPassword} onChange={update("confirmPassword")}>
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className={`absolute right-4 top-1/2 -translate-y-1/2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} size="sm" />
              </button>
            </InputField>
          </div>

          <label className="flex items-center mt-4 cursor-pointer">
            <input type="checkbox" checked={role} onChange={() => setRole(!role)} className="w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-green-500" />
            <span className={`ml-2 text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Register as Admin</span>
          </label>

          <button
            onClick={handleSignup}
            disabled={loading}
            className={`w-full mt-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            } ${darkMode ? "bg-green-500 hover:bg-green-400 text-gray-900" : "bg-[#029c78] hover:bg-[#028a6b] text-white"}`}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className={`text-center text-sm mt-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Already have an account?{" "}
            <Link to="/login" className={`font-semibold hover:underline ${darkMode ? "text-green-400" : "text-[#029c78]"}`}>Sign in</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
