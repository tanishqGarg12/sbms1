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
    } catch (err) { toast.error(err.response?.data?.message || "Signup failed"); }
    finally { setLoading(false); }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleSignup(); };

  const inputBase = `w-full pl-11 pr-4 py-3.5 rounded-2xl border text-sm transition-all duration-200 focus:outline-none focus:ring-2 ${
    darkMode
      ? "bg-gray-800/50 border-gray-700 text-white focus:ring-brand-500 focus:border-brand-500 placeholder-gray-500"
      : "bg-gray-50 border-gray-200 text-gray-900 focus:ring-brand-500 focus:border-brand-500 placeholder-gray-400"
  }`;
  const iconClass = `absolute left-4 top-1/2 -translate-y-1/2 text-sm ${darkMode ? "text-gray-600" : "text-gray-300"}`;

  const Field = ({ icon: Icon, type = "text", placeholder, value, onChange, children }) => (
    <div className="relative">
      <Icon className={iconClass} />
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} onKeyDown={handleKeyDown} className={inputBase} />
      {children}
    </div>
  );

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 pt-24 pb-12 ${darkMode ? "bg-gray-950" : "bg-gray-50"}`}>
      <div className={`absolute inset-0 ${darkMode ? 'mesh-gradient-dark' : 'mesh-gradient'}`} />

      <div className={`relative w-full max-w-5xl rounded-3xl overflow-hidden flex shadow-2xl ${
        darkMode ? "bg-gray-900 border border-gray-800 shadow-brand-500/5" : "bg-white shadow-gray-200/50"
      }`}>
        {/* Left */}
        <div className={`hidden lg:flex w-5/12 items-center justify-center p-12 relative overflow-hidden ${
          darkMode ? "bg-gradient-to-br from-brand-500/10 to-gray-900" : "bg-gradient-to-br from-brand-500 to-brand-700"
        }`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center mx-auto">
              <span className="text-4xl">🚀</span>
            </div>
            <h2 className={`text-3xl font-black ${darkMode ? "text-white" : "text-white"}`}>Get Started</h2>
            <p className={`text-sm max-w-xs mx-auto leading-relaxed ${darkMode ? "text-gray-400" : "text-white/70"}`}>
              Create your account and start managing your business billing in minutes.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="w-full lg:w-7/12 p-8 md:p-10 flex flex-col justify-center">
          <h2 className={`text-2xl font-black ${darkMode ? "text-white" : "text-gray-900"}`}>Create an account</h2>
          <p className={`text-sm mt-1 mb-6 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Fill in your details to get started</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field icon={FaUser} placeholder="First Name" value={form.firstName} onChange={update("firstName")} />
            <Field icon={FaUser} placeholder="Last Name" value={form.lastName} onChange={update("lastName")} />
            <Field icon={FaUserTag} placeholder="Username" value={form.username} onChange={update("username")} />
            <Field icon={FaEnvelope} type="email" placeholder="Email" value={form.email} onChange={update("email")} />
          </div>

          <div className="space-y-3 mt-3">
            <Field icon={FaPhone} type="tel" placeholder="Phone" value={form.phone} onChange={update("phone")} />
            <Field icon={FaLock} type={showPassword ? "text" : "password"} placeholder="Password" value={form.password} onChange={update("password")}>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute right-4 top-1/2 -translate-y-1/2 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} size="sm" />
              </button>
            </Field>
            <Field icon={FaLock} type={showConfirm ? "text" : "password"} placeholder="Confirm Password" value={form.confirmPassword} onChange={update("confirmPassword")}>
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className={`absolute right-4 top-1/2 -translate-y-1/2 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
                <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} size="sm" />
              </button>
            </Field>
          </div>

          <label className="flex items-center mt-4 cursor-pointer">
            <input type="checkbox" checked={role} onChange={() => setRole(!role)} className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500" />
            <span className={`ml-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Register as Admin</span>
          </label>

          <button onClick={handleSignup} disabled={loading}
            className={`w-full mt-6 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            } bg-brand-500 text-white hover:bg-brand-400 shadow-lg shadow-brand-500/20`}>
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className={`text-center text-sm mt-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            Already have an account?{" "}
            <Link to="/login" className={`font-bold hover:underline ${darkMode ? "text-brand-400" : "text-brand-500"}`}>Sign in</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
