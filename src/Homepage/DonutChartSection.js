import React, { useState, useContext } from 'react';
import { DarkModeContext } from '../DarkModeContext';

const DonutChartSection = () => {
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const { darkMode } = useContext(DarkModeContext);

  const segments = [
    { key: 'invoiced', label: 'Invoiced', pct: 40, amount: '$28,479', color: '#029c78', dash: '40 60', rotate: -90 },
    { key: 'outstanding', label: 'Outstanding', pct: 20, amount: '$30,124', color: '#ef4444', dash: '20 80', rotate: 50 },
    { key: 'collected', label: 'Collected', pct: 30, amount: '$56,479', color: '#f59e0b', dash: '30 70', rotate: 100 },
  ];

  return (
    <section className={`py-24 ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
      <div className={`absolute inset-0 ${darkMode ? 'mesh-gradient-dark' : ''}`} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* Left */}
          <div className="lg:w-1/2">
            <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 ${
              darkMode ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-600'
            }`}>Why Choose Us</span>
            <h2 className={`text-4xl md:text-5xl font-black leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Real-time invoice
              <span className="gradient-text"> tracking & insights</span>
            </h2>
            <p className={`mt-5 text-lg leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Join 15,000+ businesses creating and sending professional invoices to customers online.
            </p>

            <div className="mt-10 space-y-6">
              {[
                { icon: '⚡', title: 'Save More Time', desc: 'Automate repetitive billing tasks and focus on growing your business.' },
                { icon: '📈', title: 'Get More Productive', desc: 'Streamline workflows with smart tools that adapt to your needs.' },
              ].map((item, i) => (
                <div key={i} className={`flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 ${
                  darkMode ? 'bg-gray-900 border border-gray-800 hover:border-gray-700' : 'bg-gray-50 border border-gray-100 hover:shadow-md'
                }`}>
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                    <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Chart */}
          <div className="lg:w-1/2 flex flex-col items-center">
            <div className={`relative w-64 h-64 sm:w-80 sm:h-80 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white shadow-xl border border-gray-100'
            }`}>
              <div className="text-center">
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Invoice Status</p>
                <p className={`text-2xl font-black mt-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {hoveredSegment ? `${hoveredSegment.pct}%` : '90%'}
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                  {hoveredSegment ? hoveredSegment.label : 'Total'}
                </p>
              </div>
              <svg viewBox="0 0 36 36" className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke={darkMode ? '#1f2937' : '#f3f4f6'} strokeWidth="3" />
                {segments.map((seg) => (
                  <circle key={seg.key} cx="18" cy="18" r="15.5" fill="none" stroke={seg.color} strokeWidth="3.5"
                    strokeDasharray={seg.dash} strokeLinecap="round"
                    transform={`rotate(${seg.rotate + 90} 18 18)`}
                    className="transition-all duration-300 cursor-pointer"
                    style={{ opacity: hoveredSegment && hoveredSegment.key !== seg.key ? 0.3 : 1 }}
                    onMouseOver={() => setHoveredSegment(seg)}
                    onMouseOut={() => setHoveredSegment(null)} />
                ))}
              </svg>
            </div>

            <div className="flex gap-6 mt-10">
              {segments.map((seg) => (
                <div key={seg.key} className="text-center">
                  <div className="flex items-center gap-2 justify-center mb-1">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
                    <span className={`text-xs font-medium ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{seg.label}</span>
                  </div>
                  <p className={`text-lg font-bold`} style={{ color: seg.color }}>{seg.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonutChartSection;
