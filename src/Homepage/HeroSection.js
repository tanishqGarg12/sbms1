import React, { useRef, useState, useEffect, useContext } from "react";
import CountUp from "react-countup";
import ParticlesBackground from "../components/ParticlesBackground";
import { DarkModeContext } from "../DarkModeContext";
import ruppe from "./Assests/ruppe.png";

const HeroSection = () => {
  const [startCount, setStartCount] = useState(false);
  const sectionRef = useRef(null);
  const targetNumber = 2500; // Target number for CountUp
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.unobserve(entry.target); // Stop observing after counting starts
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Reusable SVG Icon
  const Icon = () => (
    <span className="elementor-icon-list-icon mt-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
      >
        <path
          d="M6.70164 20L6.47213 19.5894C4.75082 16.5217 0.183607 9.97585 0.137705 9.90338L0 9.71014L1.72131 7.92271L6.63279 11.5459C9.7082 7.343 12.5771 4.4686 14.459 2.77778C16.5475 0.917874 17.8557 0.0724638 17.9016 0.0483092L17.9705 0H21L20.4951 0.483092C14.023 6.54589 7 19.4686 6.93115 19.5894L6.70164 20Z"
          fill="white"
        ></path>
      </svg>
    </span>
  );

  return (
    <div
      className={`relative w-full h-auto overflow-hidden ${
        darkMode ? "bg-transparent" : "bg-[#029c78]"
      }`}
    >
      <ParticlesBackground id="particles" />

      {/* Header Section */}
      <div className="flex flex-col justify-center mt-24 px-4 md:px-24">
        <h1
          className={`${
            darkMode ? "text-green-500" : "text-white"
          } text-4xl md:text-6xl lg:text-9xl font-bold`}
        >
          Welcome to the <br /> Powerful
        </h1>
        <br />
        <div className="flex flex-col md:flex-row items-center">
          <h1
            className={`${
              darkMode ? "text-green-500" : "text-white"
            } text-4xl md:text-8xl lg:text-8.5xl font-bold`}
          >
            <span className="text-4xl md:text-8xl lg:text-9xl font-bold"> BILLING AND </span>  
            <span className="text-4xl md:text-8xl lg:text-8xl font-bold"> INVOICE SYSTEM</span>  
            {/* INVOICE SYSTEM */}
          </h1>
          <div className="flex flex-col  md:flex-row items-center  mt-4 md:mt-0">
            <h1
              className={`${
                darkMode ? "text-green-500" : "text-white"
              } text-2xl md:text-4xl lg:text-5xl font-bold mt-4 md:mt-32 mr-4`}
            >
              Your <br /> Business
            </h1>
            <img
              src={ruppe}
              alt="Rupee Icon"
              className="w-16 md:w-28 mt-4 md:mt-36 mr-8 rounded-xl h-16 shadow-lg"
            />
            <h1
              className={`${
                darkMode ? "text-green-500" : "text-white"
              } text-2xl md:text-4xl lg:text-5xl font-bold mt-4 md:mt-32 mr-28`}
            >
              Your <br /> Client
            </h1>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex flex-col md:flex-row justify-between mt-16 px-4 md:px-24">
        {/* Text Section */}
        <div
          className={`flex flex-col ${
            darkMode ? "text-green-500" : "text-white"
          } text-lg md:text-2xl lg:text-3xl mt-11`}
        >
          <p>A simple payment process helps you get paid on time.</p>
          <p>Provide multiple payment options that your customers can use.</p>
          <p>A simple payment process helps you get paid on time.</p>

          {/* Features List */}
          <div className="mt-10 md:mt-20">
            <ul className="elementor-icon-list-items">
              <li className="elementor-icon-list-item flex">
                <Icon />
                <span className="elementor-icon-list-text ml-2">
                  Send invoices via SMS, email, and client portal
                </span>
              </li>
              <li className="elementor-icon-list-item flex mt-5">
                <Icon />
                <span className="elementor-icon-list-text ml-2">
                  Keep track of customers' invoice status
                </span>
              </li>
              <li className="elementor-icon-list-item flex mt-5">
                <Icon />
                <span className="elementor-icon-list-text ml-2">
                  Follow up with automated payment reminders
                </span>
              </li>
            </ul>

            {/* CountUp and Images */}
            <div className="flex flex-col md:flex-row mt-10">
              <img
                decoding="async"
                width="400"
                height="130"
                src="https://saasplate.themepreview.xyz/invoice-app/wp-content/uploads/sites/6/2022/10/Group-20481.svg"
                alt="Group Icon"
                className="mr-0 md:mr-10 mb-4 md:mb-0"
              />
              <section ref={sectionRef} className="flex items-center">
                <h1
                  className={`text-4xl md:text-6xl font-extrabold ${
                    darkMode ? "text-green-500" : "text-white-600"
                  }`}
                >
                  {startCount ? <CountUp end={targetNumber} duration={2.5} /> : 0}
                  + users
                </h1>
              </section>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="mt-52 md:mt-52">
          <img
            decoding="async"
            width="783"
            height="600"
            src="https://saasplate.themepreview.xyz/invoice-app/wp-content/uploads/sites/6/2022/12/hello.png"
            alt="Welcome Illustration"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;