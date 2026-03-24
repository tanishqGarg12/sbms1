import React, { useContext, useState } from 'react';
import { DarkModeContext } from '../DarkModeContext';
import { FaMinus, FaPlus } from 'react-icons/fa';

const InfoCard = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    { question: "What is Smart Billing Management System (SBMS)?", answer: "SBMS is a comprehensive invoicing solution designed to help businesses streamline their billing process, manage invoices efficiently, and track payments effortlessly." },
    { question: "How does SBMS simplify invoicing?", answer: "SBMS automates the invoicing process, allowing users to create, send, and track invoices in real time. This reduces manual errors and saves time." },
    { question: "Can I customize my invoices?", answer: "Yes! SBMS allows users to customize invoice templates, including adding logos, changing colors, and adjusting layouts to match your brand." },
    { question: "Is there a mobile app available?", answer: "Yes, our SBMS mobile app allows you to manage your invoicing on the go, enabling you to create and send invoices from your smartphone or tablet." },
    { question: "What payment methods are supported?", answer: "SBMS supports various payment methods including credit cards, bank transfers, UPI, and digital wallets." },
    { question: "Is my data secure?", answer: "Absolutely. We use industry-standard encryption and security protocols to ensure your billing data and customer information remain safe and private." },
  ];

  const toggle = (i) => setActiveIndex(activeIndex === i ? null : i);

  return (
    <div className={`py-24 relative z-10 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-20">
          {[
            { label: 'Weekly Active Users', value: '40%', sub: 'Growth this quarter', gradient: 'from-brand-500 to-emerald-400' },
            { label: 'Total Revenue', value: '$23,830', sub: '+9.2% from last month', gradient: 'from-violet-500 to-purple-400' },
            { label: 'Customer Satisfaction', value: '98%', sub: 'Based on 1,200+ reviews', gradient: 'from-orange-500 to-amber-400' },
          ].map((stat, i) => (
            <div key={i} className={`p-6 rounded-2xl card-hover ${
              darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-100 shadow-sm'
            }`}>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4`}>
                <span className="text-white text-sm font-bold">{i + 1}</span>
              </div>
              <p className={`text-3xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
              <p className={`text-sm font-medium mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 ${
              darkMode ? 'bg-brand-500/10 text-brand-400' : 'bg-brand-50 text-brand-600'
            }`}>FAQ</span>
            <h2 className={`text-4xl md:text-5xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Got questions?
            </h2>
            <p className={`text-base mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Everything you need to know about SBMS
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isActive = activeIndex === index;
              return (
                <div key={index} className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                  isActive
                    ? darkMode ? 'bg-gray-900 border border-brand-500/30 shadow-lg shadow-brand-500/5' : 'bg-white border border-brand-200 shadow-lg shadow-brand-500/5'
                    : darkMode ? 'bg-gray-900/50 border border-gray-800 hover:border-gray-700' : 'bg-white border border-gray-100 hover:border-gray-200 shadow-sm'
                }`}>
                  <button className="w-full flex items-center justify-between p-5 text-left gap-4" onClick={() => toggle(index)} aria-expanded={isActive}>
                    <span className={`font-semibold text-sm ${isActive ? (darkMode ? 'text-brand-400' : 'text-brand-600') : (darkMode ? 'text-gray-200' : 'text-gray-800')}`}>
                      {faq.question}
                    </span>
                    <span className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                      isActive
                        ? darkMode ? 'bg-brand-500/20 text-brand-400' : 'bg-brand-50 text-brand-600'
                        : darkMode ? 'bg-gray-800 text-gray-500' : 'bg-gray-50 text-gray-400'
                    }`}>
                      {isActive ? <FaMinus size={10} /> : <FaPlus size={10} />}
                    </span>
                  </button>
                  {isActive && (
                    <div className="px-5 pb-5">
                      <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
