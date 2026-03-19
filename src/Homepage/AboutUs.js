import React, { useContext } from "react";
import { DarkModeContext } from "../DarkModeContext";
import { FaRocket, FaBullseye, FaUsers, FaShieldAlt, FaChartLine, FaHeadset } from "react-icons/fa";

const values = [
  { icon: <FaRocket />, title: "Innovation", desc: "Constantly evolving our platform with cutting-edge features." },
  { icon: <FaBullseye />, title: "Simplicity", desc: "Making billing effortless so you can focus on your business." },
  { icon: <FaShieldAlt />, title: "Security", desc: "Your data is protected with enterprise-grade encryption." },
  { icon: <FaChartLine />, title: "Growth", desc: "Tools designed to scale with your business needs." },
  { icon: <FaUsers />, title: "Community", desc: "3M+ users across 40+ countries trust our platform." },
  { icon: <FaHeadset />, title: "Support", desc: "Dedicated team available to help you 24/7." },
];

const stats = [
  { value: "3M+", label: "Active Users" },
  { value: "40+", label: "Countries" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
];

const AboutUs = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`min-h-screen pt-24 pb-16 px-4 ${darkMode ? "bg-transparent" : "bg-gray-50"}`}>
      <div className="max-w-6xl mx-auto">

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className={`text-sm font-semibold uppercase tracking-widest ${darkMode ? "text-green-400" : "text-[#029c78]"}`}>About Us</span>
          <h1 className={`text-3xl md:text-5xl font-bold mt-3 leading-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
            We make billing <span className={darkMode ? "text-green-400" : "text-[#029c78]"}>simple</span> for everyone
          </h1>
          <p className={`mt-4 text-base md:text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Smart Billing Management System (SBMS) helps businesses create invoices, track payments, and manage inventory — all from one powerful platform.
          </p>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 p-8 rounded-2xl ${darkMode ? "bg-green-500/10 border border-green-500/20" : "bg-[#029c78]"}`}>
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className={`text-3xl md:text-4xl font-bold ${darkMode ? "text-green-400" : "text-white"}`}>{s.value}</p>
              <p className={`text-sm mt-1 ${darkMode ? "text-green-300/70" : "text-white/80"}`}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          <div className={`p-8 rounded-2xl ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white shadow-lg"}`}>
            <div className="text-3xl mb-4">🎯</div>
            <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Our Mission</h3>
            <p className={`mt-3 text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              To empower small and medium businesses with an intuitive, affordable billing solution that eliminates manual work and accelerates growth.
            </p>
          </div>
          <div className={`p-8 rounded-2xl ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white shadow-lg"}`}>
            <div className="text-3xl mb-4">🔭</div>
            <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Our Vision</h3>
            <p className={`mt-3 text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              To become the go-to billing platform for businesses worldwide, making financial management accessible and stress-free for everyone.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-10">
          <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>What we stand for</h2>
          <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>The core values that drive everything we do</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((v, i) => (
            <div key={i} className={`p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
              darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100 shadow-md"
            }`}>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg ${
                darkMode ? "bg-green-500/20 text-green-400" : "bg-[#029c78]/10 text-[#029c78]"
              }`}>
                {v.icon}
              </div>
              <h3 className={`text-base font-bold mt-4 ${darkMode ? "text-white" : "text-gray-900"}`}>{v.title}</h3>
              <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
