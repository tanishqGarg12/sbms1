import React, { useState, useContext } from 'react';
import { DarkModeContext } from '../DarkModeContext';

const DonutChartSection = () => {
  const [hoveredSegment, setHoveredSegment] = useState(null);

  const segmentData = {
    invoiced: 40,
    outstanding: 20,
    collected: 30,
  };

  const handleMouseOver = (segment) => {
    setHoveredSegment({ name: segment, percentage: segmentData[segment] });
  };

  const handleMouseOut = () => {
    setHoveredSegment(null);
  };

  const { darkMode } = useContext(DarkModeContext);

  return (
    <section
      className={`${
        darkMode ? 'bg-transparent' : 'bg-transparent'
      } py-16 px-4 md:px-8 lg:px-32`}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between">
        {/* Left Column - Text Content */}
        <div className="lg:w-1/2 lg:pr-16 xl:pr-24">
          <h2
            className={`${
              darkMode ? 'text-yellow-400' : 'text-yellow-600'
            } font-semibold text-2xl md:text-3xl`}
          >
            Why Choose Us
          </h2>
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold ${
              darkMode ? 'text-green-500' : 'text-green-500'
            } mt-4`}
          >
            An Online Invoicing Software
          </h1>
          <p
            className={`${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            } mt-6 text-lg md:text-xl lg:text-2xl`}
          >
            Join 15,000+ businesses that are creating and sending professional invoices to customers online.
          </p>

          <div className="mt-12 space-y-6 md:space-y-8">
            <div className="flex items-start space-x-4 md:space-x-6">
              <div className="bg-green-100 p-3 md:p-5 rounded-full">
                <i className="text-green-500 fas fa-clock text-2xl md:text-4xl"></i>
              </div>
              <div>
                <h3
                  className={`text-2xl md:text-3xl lg:text-4xl font-semibold ${
                    darkMode ? 'text-gray-100' : 'text-gray-800'
                  }`}
                >
                  Save More Time
                </h3>
                <p
                  className={`${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  } text-base md:text-lg lg:text-xl`}
                >
                  Enthusiastically enable emerging web-readiness for economically sound systems. Proactively customize.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4 md:space-x-6">
              <div className="bg-green-100 p-3 md:p-5 rounded-full">
                <i className="text-green-500 fas fa-box text-2xl md:text-4xl"></i>
              </div>
              <div>
                <h3
                  className={`text-2xl md:text-3xl lg:text-4xl font-semibold ${
                    darkMode ? 'text-gray-100' : 'text-gray-800'
                  }`}
                >
                  Get More Productive
                </h3>
                <p
                  className={`${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  } text-base md:text-lg lg:text-xl`}
                >
                  Proactively parallel task value-added sources vis-a-vis accurate bandwidth.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Invoice Status Chart */}
        <div className="lg:w-1/2 flex flex-col items-center lg:items-end mt-12 lg:mt-0 relative">
          <div
            className={`relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-full flex items-center justify-center shadow-lg`}
          >
            <h2
              className={`absolute text-xl md:text-2xl lg:text-3xl font-bold ${
                darkMode ? 'text-gray-100' : 'text-gray-800'
              }`}
            >
              Invoice Status
            </h2>
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="#ccc" strokeWidth="5" />
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke="#28a745"
                strokeWidth="5"
                strokeDasharray="40 60"
                transform="rotate(-90 18 18)"
                onMouseOver={() => handleMouseOver('invoiced')}
                onMouseOut={handleMouseOut}
              />
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke="#ff6f61"
                strokeWidth="5"
                strokeDasharray="20 80"
                transform="rotate(50 18 18)"
                onMouseOver={() => handleMouseOver('outstanding')}
                onMouseOut={handleMouseOut}
              />
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke="#ffa500"
                strokeWidth="5"
                strokeDasharray="30 70"
                transform="rotate(100 18 18)"
                onMouseOver={() => handleMouseOver('collected')}
                onMouseOut={handleMouseOut}
              />
            </svg>
          </div>

          {hoveredSegment && (
            <div
              className={`absolute top-1/2 right-[-220px] transform -translate-y-1/2 p-4 ${
                darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'
              } border border-gray-300 shadow-md rounded-lg w-[200px]`}
            >
              <p className="text-2xl font-bold">
                {hoveredSegment.name.charAt(0).toUpperCase() + hoveredSegment.name.slice(1)}
              </p>
              <p className="text-xl">{hoveredSegment.percentage}%</p>
            </div>
          )}

          <div className="flex justify-around w-full mt-12">
            <div className="text-center">
              <span className="text-green-500 font-bold">$28,479</span>
              <p className={darkMode ? 'text-gray-100' : 'text-gray-800'}>Invoiced</p>
            </div>
            <div className="text-center">
              <span className="text-red-500 font-bold">$30,124</span>
              <p className={darkMode ? 'text-gray-100' : 'text-gray-800'}>Outstanding</p>
            </div>
            <div className="text-center">
              <span className="text-orange-500 font-bold">$56,479</span>
              <p className={darkMode ? 'text-gray-100' : 'text-gray-800'}>Collected</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonutChartSection;
