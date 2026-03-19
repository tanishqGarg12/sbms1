import React, { useContext } from 'react';
import { DarkModeContext } from '../DarkModeContext';

const FeaturesSection = () => {
  const { darkMode } = useContext(DarkModeContext);

  const features = [
    { emoji: "📃", title: "Effortless Invoicing", desc: "Create your first invoice professionally with our uncomplicated generator." },
    { emoji: "📈", title: "Automation At Its Best", desc: "Invoicing, subscriptions, payments, time tracking and reports." },
    { emoji: "☁", title: "Save With Cloud", desc: "Access your data anywhere with our cloud-based invoice software." },
    { emoji: "👥", title: "3M+ Subscribers", desc: "One big family of 3 million users from 40+ countries." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <h2 className={`text-3xl md:text-5xl font-extrabold ${darkMode ? 'text-green-400' : 'text-green-600'} leading-tight`}>
            All-in-One Invoice Platform
          </h2>
          <p className={`mt-4 text-base md:text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Track your entire project from start to finish with beautiful views that make project planning a breeze.
          </p>
          <button className={`mt-8 px-8 py-3 rounded-xl text-white font-semibold transition duration-300 transform hover:scale-105 ${
            darkMode ? 'bg-green-500 hover:bg-green-400' : 'bg-[#029c78] hover:bg-[#028a6b]'
          }`}>
            View All Features
          </button>
        </div>

        {/* Right - Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((f, i) => (
            <div key={i} className={`p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
              darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-md'
            }`}>
              <div className="text-4xl mb-3">{f.emoji}</div>
              <h3 className={`text-lg font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{f.title}</h3>
              <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
