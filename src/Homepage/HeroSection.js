import React, { useRef, useState, useEffect, useContext } from "react";
import CountUp from "react-countup";
import { DarkModeContext } from "../DarkModeContext";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const HeroSection = () => {
  const [startCount, setStartCount] = useState(false);
  const sectionRef = useRef(null);
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStartCount(true); observer.unobserve(entry.target); } },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    const ref = sectionRef.current;
    return () => { if (ref) observer.unobserve(ref); };
  }, []);

  const stats = [
    { end: 2500, suffix: '+', label: 'Active Users' },
    { end: 40, suffix: '+', label: 'Countries' },
    { end: 99, suffix: '%', label: 'Uptime' },
  ];

  return (
    <div className={`relative w-full min-h-screen overflow-hidden ${darkMode ? 'bg-gray-950' : ''}`}>
      <div className={`absolute inset-0 pointer-events-none ${darkMode ? 'mesh-gradient-dark' : ''}`} />
      <div className={`absolute inset-0 pointer-events-none ${darkMode ? '' : 'bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800'}`} />
      <div className="absolute top-20 right-10 w-72 h-72 bg-brand-400/20 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-300/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '3s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          <div className="animate-fadeIn">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 ${
              darkMode ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' : 'bg-white/15 text-white/90 border border-white/20'
            }`}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Trusted by 2,500+ businesses worldwide
            </div>

            <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight ${darkMode ? 'text-white' : 'text-white'}`}>
              Smart Billing<br />
              <span className={darkMode ? 'gradient-text' : 'text-white/90'}>Made Simple</span>
            </h1>

            <p className={`mt-6 text-lg leading-relaxed max-w-lg ${darkMode ? 'text-gray-400' : 'text-white/80'}`}>
              Create professional invoices, track payments in real-time, and manage your entire billing workflow — all from one beautiful dashboard.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-10">
              <button onClick={() => navigate('/signup')} className={`group px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                darkMode
                  ? 'bg-brand-500 text-white hover:bg-brand-400 shadow-xl shadow-brand-500/20 hover:shadow-brand-400/30'
                  : 'bg-white text-brand-600 hover:bg-white/90 shadow-xl shadow-black/10'
              }`}>
                Start Free Trial
                <FaArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
              </button>
              <ScrollLink to="features" smooth duration={500}>
                <button className={`group px-6 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 flex items-center gap-3 ${
                  darkMode ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}>
                  <span className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-white/10' : 'bg-white/20'
                  }`}><FaPlay size={10} className="ml-0.5" /></span>
                  See How It Works
                </button>
              </ScrollLink>
            </div>

            <div ref={sectionRef} className="flex items-center gap-10 mt-14">
              {stats.map((stat, i) => (
                <div key={i}>
                  <p className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-white'}`}>
                    {startCount ? <CountUp end={stat.end} duration={2} /> : 0}{stat.suffix}
                  </p>
                  <p className={`text-xs mt-1 font-medium ${darkMode ? 'text-gray-500' : 'text-white/60'}`}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Dashboard preview */}
          <div className="relative animate-slideUp hidden lg:block" style={{ animationDelay: '0.2s' }}>
            <div className={`relative rounded-3xl overflow-hidden shadow-2xl ${darkMode ? 'shadow-brand-500/10' : 'shadow-black/20'}`}>
              <div className={`p-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className={`text-xs font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Total Revenue</p>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹4,56,789</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-500">+12.5%</span>
                </div>
                <div className="flex items-end gap-2 h-32">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-lg bg-gradient-to-t from-brand-500 to-brand-400 transition-all duration-500"
                      style={{ height: `${h}%`, opacity: 0.3 + (h / 100) * 0.7 }} />
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {[
                    { label: 'Invoices', val: '234', color: 'text-brand-500' },
                    { label: 'Pending', val: '12', color: 'text-orange-500' },
                    { label: 'Paid', val: '222', color: 'text-green-500' },
                  ].map((s, i) => (
                    <div key={i} className={`p-3 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{s.label}</p>
                      <p className={`text-lg font-bold ${s.color}`}>{s.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={`absolute -bottom-4 -left-4 p-4 rounded-2xl animate-float ${
              darkMode ? 'bg-gray-800 border border-gray-700 shadow-xl' : 'bg-white shadow-xl border border-gray-100'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 text-lg">✓</div>
                <div>
                  <p className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Payment Received</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>₹12,500 from Client</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-20 pt-10 border-t ${darkMode ? 'border-white/5' : 'border-white/20'}`}>
          <p className={`text-center text-xs font-semibold uppercase tracking-widest mb-8 ${darkMode ? 'text-gray-600' : 'text-white/40'}`}>
            Trusted by leading businesses
          </p>
          <div className="flex items-center justify-center gap-12 opacity-50">
            {['Startup Co', 'TechFlow', 'BizPro', 'InvoiceHQ', 'PaySmart'].map((name) => (
              <span key={name} className={`text-lg font-bold tracking-wide ${darkMode ? 'text-gray-600' : 'text-white/50'}`}>{name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
