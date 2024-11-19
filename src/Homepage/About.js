import React, { useContext } from 'react';
import { DarkModeContext } from '../DarkModeContext';

const FeaturesSection = () => {
  const { darkMode } = useContext(DarkModeContext);

  // Conditional colors based on dark mode
  const textColor = darkMode ? 'text-green-500' : 'text-green-500';
  const subTextColor = darkMode ? 'text-gray-400' : 'text-[#666666]';
  const bgColor = darkMode ? 'bg-gray-800' : 'bg-gray-50';
  const buttonBgColor = darkMode ? 'bg-[#009B72]' : 'bg-[#00C896]';
  const buttonHoverColor = darkMode ? 'hover:bg-[#00C896]' : 'hover:bg-[#009B72]';

  return (
    <div className={`flex flex-col lg:flex-row items-center justify-center min-h-screen p-6 md:p-12 ${darkMode ? 'bg-transparent' : 'bg-transparent'}`}>
      {/* Left Section - Centered Vertically */}
      <div className="w-full lg:w-1/2 lg:pr-12 flex flex-col justify-center items-start lg:items-start text-center lg:text-left mb-10 ml-32 lg:mb-0">
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold ${textColor} mt-2 md:mt-4 leading-tight`}>
          All-in-One Invoice Platform
        </h1>
        <p className={`${subTextColor} mt-4 md:mt-6 text-lg md:text-xl px-4 md:px-0`}>
          Track your entire project from start to finish with beautiful views that make project planning a breeze, managing your resources.
        </p>

        {/* Button aligned to the left */}
        <div className="mt-6 md:mt-8">
          <button className={`px-8 py-4 md:px-10 md:py-5 ${buttonBgColor} text-white rounded-lg text-lg md:text-xl ${buttonHoverColor} transition duration-300 transform hover:scale-105`}>
            View All Features
          </button>
        </div>
      </div>

      {/* Right Section with Larger Feature Boxes and Animations */}
      <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-8 lg:mt-0">
        {/* Feature Card 1 */}
        <div className={`flex flex-col items-center text-center p-8 md:p-10 ${bgColor} rounded-xl shadow-xl transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl`}>
          <div className="text-[#00C896] text-5xl md:text-7xl mb-4">📃</div>
          <h3 className={`text-2xl md:text-3xl font-semibold ${textColor}`}>Effortless Invoicing</h3>
          <p className={`${subTextColor} mt-3 md:mt-4 text-base md:text-lg`}>
            The uncomplicated invoice generator to let you create your first invoice professionally.
          </p>
        </div>

        {/* Feature Card 2 */}
        <div className={`flex flex-col items-center text-center p-8 md:p-10 ${bgColor} rounded-xl shadow-xl transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl`}>
          <div className="text-[#00C896] text-5xl md:text-7xl mb-4">📈</div>
          <h3 className={`text-2xl md:text-3xl font-semibold ${textColor}`}>Automation At Its Best</h3>
          <p className={`${subTextColor} mt-3 md:mt-4 text-base md:text-lg`}>
            Invoicing, subscriptions, payments, and more. Track time and manage reports.
          </p>
        </div>

        {/* Feature Card 3 */}
        <div className={`flex flex-col items-center text-center p-8 md:p-10 ${bgColor} rounded-xl shadow-xl transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl`}>
          <div className="text-[#00C896] text-5xl md:text-7xl mb-4">☁</div>
          <h3 className={`text-2xl md:text-3xl font-semibold ${textColor}`}>Save With Cloud</h3>
          <p className={`${subTextColor} mt-3 md:mt-4 text-base md:text-lg`}>
            We live with cloud, so you can easily access us with the best invoice software.
          </p>
        </div>

        {/* Feature Card 4 */}
        <div className={`flex flex-col items-center text-center p-8 md:p-10 ${bgColor} rounded-xl shadow-xl transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl`}>
          <div className="text-[#00C896] text-5xl md:text-7xl mb-4">👥</div>
          <h3 className={`text-2xl md:text-3xl font-semibold ${textColor}`}>3M+ Subscribers</h3>
          <p className={`${subTextColor} mt-3 md:mt-4 text-base md:text-lg`}>
            One big family of 3 million users from 40+ countries. Complete customization of online.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
