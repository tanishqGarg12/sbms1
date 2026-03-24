import React, { useContext } from 'react';
import { DarkModeContext } from '../DarkModeContext';
import { FaFileInvoiceDollar, FaChartLine, FaCloudUploadAlt, FaUsers } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';

const features = [
  { icon: FaFileInvoiceDollar, title: "Effortless Invoicing", desc: "Create professional invoices in seconds with our intuitive generator and beautiful templates.", color: "from-brand-500 to-emerald-400" },
  { icon: FaChartLine, title: "Smart Automation", desc: "Automate invoicing, subscriptions, payments, time tracking and reports effortlessly.", color: "from-blue-500 to-cyan-400" },
  { icon: FaCloudUploadAlt, title: "Cloud-First", desc: "Access your data anywhere, anytime. Your billing data is always synced and secure.", color: "from-violet-500 to-purple-400" },
  { icon: FaUsers, title: "3M+ Subscribers", desc: "Join a global family of 3 million users from 40+ countries who trust our platform.", color: "from-orange-500 to-amber-400" },
];

const FeaturesSection = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div id="features" className={`relative py-24 ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
      <div className={`absolute inset-0 ${darkMode ? 'mesh-gradient-dark' : 'mesh-gradient'}`} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 ${
              darkMode ? 'bg-brand-500/10 text-brand-400' : 'bg-brand-50 text-brand-600'
            }`}>Features</span>
            <h2 className={`text-4xl md:text-5xl font-black leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Everything you need to
              <span className="gradient-text"> manage billing</span>
            </h2>
            <p className={`mt-5 text-lg leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Track your entire project from start to finish with beautiful views that make project planning a breeze. One platform, zero hassle.
            </p>
            <ScrollLink to="pricing" smooth duration={500}>
              <button className={`mt-8 px-8 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                darkMode ? 'bg-brand-500 text-white hover:bg-brand-400 shadow-lg shadow-brand-500/20' : 'bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/20'
              }`}>
                View Pricing Plans
              </button>
            </ScrollLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className={`group p-6 rounded-2xl card-hover ${
                darkMode ? 'bg-gray-900 border border-gray-800 hover:border-gray-700' : 'bg-white border border-gray-100 shadow-sm hover:shadow-xl'
              }`}>
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg transition-transform group-hover:scale-110`}>
                  <f.icon className="text-white" size={20} />
                </div>
                <h3 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{f.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
