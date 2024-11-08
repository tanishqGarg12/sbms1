import React from 'react';

const Green = () => {
  return (
    <div className="h-screen rounded-2xl w-full bg-[#029c78] flex items-center justify-between p-8">
      <div className="flex flex-col justify-center lg:justify-start max-w-lg space-y-6 px-6">
        <p className="text-5xl md:text-7xl text-white font-extrabold leading-tight tracking-wide">
          Start Creating Your <br /> Invoices Now <br /> Free for 30 Days!
        </p>
        <p className="text-lg md:text-xl text-white font-medium">
          Experience seamless invoice creation and management, and boost your productivity with our 30-day free trial.
        </p>
      </div>
      <div className="flex  mt-28">
        <img
          decoding="async"
          loading="lazy"
          src="https://saasplate.themepreview.xyz/invoice-app/wp-content/uploads/sites/6/2022/10/iPhone-13-mini-1-1.png"
          alt="Phone Preview"
          className="h-1/2 w-auto object-cover ml-1"
        />
        <img
          decoding="async"
          loading="lazy"
          src="https://saasplate.themepreview.xyz/invoice-app/wp-content/uploads/sites/6/2022/10/Group-20429.svg"
          alt="Illustration"
          className="h-full w-auto object-cover"
        />
      </div>
    </div>
  );
};

export default Green;
