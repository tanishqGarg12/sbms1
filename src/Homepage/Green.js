import React, { useContext } from "react";
import { DarkModeContext } from "../DarkModeContext"; // Adjust the path as necessary

const Green = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`h-screen rounded-2xl overflow-hidden w-full flex items-center justify-between p-8 ${
        darkMode ? "bg-transparent" : "bg-[#029c78]"
      }`}
    >
      <div className="flex flex-col justify-center lg:justify-start max-w-lg space-y-6 px-6">
        <p
          className={`text-5xl md:text-7xl font-extrabold leading-tight tracking-wide ${
            darkMode ? "text-green-400" : "text-white"
          }`}
        >
          Start Creating Your <br /> Invoices Now <br /> Free for 30 Days!
        </p>
        <p
          className={`text-lg md:text-xl font-medium ${
            darkMode ? "text-green-300" : "text-white"
          }`}
        >
          Experience seamless invoice creation and management, and boost your
          productivity with our 30-day free trial.
        </p>
      </div>
      <div className="flex mt-28">
        <img
          decoding="async"
          loading="lazy"
          src="https://saasplate.themepreview.xyz/invoice-app/wp-content/uploads/sites/6/2022/10/iPhone-13-mini-1-1.png"
          alt="Phone Preview"
          className="h-1/2 w-auto object-cover ml-1"
        />
        <img
          decoding="async "
          loading="lazy"
          src="https://saasplate.themepreview.xyz/invoice-app/wp-content/uploads/sites/6/2022/10/Group-20429.svg"
          alt="Illustration"
          className="h-full overflow-hidden w-auto object-cover"
        />
      </div>
    </div>
  );
};

export default Green;
