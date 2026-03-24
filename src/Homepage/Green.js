import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../DarkModeContext";
import { FaArrowRight } from "react-icons/fa";

const Green = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  return (
    <div className="mx-4 sm:mx-8 my-8">
      <div className={`relative rounded-3xl overflow-hidden ${
        darkMode ? 'bg-gradient-to-br from-brand-500/10 to-gray-900 border border-brand-500/20' : 'bg-gradient-to-br from-brand-500 to-brand-700'
      }`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto px-8 py-20 lg:py-24 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-lg space-y-6">
            <h2 className={`text-4xl md:text-5xl font-black leading-tight ${darkMode ? 'text-white' : 'text-white'}`}>
              Ready to streamline your billing?
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-white/80'}`}>
              Start your 30-day free trial today. No credit card required. Cancel anytime.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate('/signup')} className={`group px-8 py-4 rounded-2xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                darkMode ? 'bg-brand-500 text-white hover:bg-brand-400' : 'bg-white text-brand-600 hover:bg-white/90 shadow-lg'
              }`}>
                Start Free Trial
                <FaArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={() => navigate('/contact')} className={`px-8 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                darkMode ? 'text-gray-300 border border-white/10 hover:bg-white/5' : 'text-white border border-white/30 hover:bg-white/10'
              }`}>
                Talk to Sales
              </button>
            </div>
          </div>

          <div className="flex items-end gap-3">
            <img loading="lazy"
              src="https://saasplate.themepreview.xyz/invoice-app/wp-content/uploads/sites/6/2022/10/iPhone-13-mini-1-1.png"
              alt="Phone Preview" className="h-56 md:h-72 w-auto object-contain drop-shadow-2xl" />
            <img loading="lazy"
              src="https://saasplate.themepreview.xyz/invoice-app/wp-content/uploads/sites/6/2022/10/Group-20429.svg"
              alt="Illustration" className="h-40 md:h-56 w-auto object-contain hidden sm:block" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Green;
