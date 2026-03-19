import React, { useContext } from "react";
import { DarkModeContext } from "../DarkModeContext";

const Green = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`rounded-2xl overflow-hidden mx-4 my-8 ${darkMode ? "bg-gray-800/50" : "bg-[#029c78]"}`}>
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="max-w-lg space-y-6">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight ${darkMode ? "text-green-400" : "text-white"}`}>
            Start Creating Your Invoices Now
          </h2>
          <p className={`text-lg ${darkMode ? "text-green-300" : "text-white/90"}`}>
            Free for 30 Days! Experience seamless invoice creation and boost your productivity.
          </p>
          <button className={`px-8 py-3 rounded-xl font-semibold transition duration-300 ${
            darkMode ? "bg-green-400 text-gray-900 hover:bg-green-300" : "bg-white text-[#029c78] hover:bg-gray-100"
          }`}>
            Start Free Trial
          </button>
        </div>
        <div className="flex items-end gap-2">
          <img
            loading="lazy"
            src="https://saasplate.themepreview.xyz/invoice-app/wp-content/uploads/sites/6/2022/10/iPhone-13-mini-1-1.png"
            alt="Phone Preview"
            className="h-64 md:h-80 w-auto object-contain"
          />
          <img
            loading="lazy"
            src="https://saasplate.themepreview.xyz/invoice-app/wp-content/uploads/sites/6/2022/10/Group-20429.svg"
            alt="Illustration"
            className="h-48 md:h-64 w-auto object-contain hidden sm:block"
          />
        </div>
      </div>
    </div>
  );
};

export default Green;
