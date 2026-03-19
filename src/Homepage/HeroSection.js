import React, { useRef, useState, useEffect, useContext } from "react";
import CountUp from "react-countup";
import { DarkModeContext } from "../DarkModeContext";
import ruppe from "./Assests/ruppe.png";

const HeroSection = () => {
  const [startCount, setStartCount] = useState(false);
  const sectionRef = useRef(null);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    const ref = sectionRef.current;
    return () => { if (ref) observer.unobserve(ref); };
  }, []);

  const textColor = darkMode ? "text-green-400" : "text-white";

  return (
    <div className={`relative w-full min-h-screen overflow-hidden pt-28 ${darkMode ? "bg-transparent" : "bg-[#029c78]"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="animate-fadeIn">
          <h1 className={`${textColor} text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight`}>
            Welcome to the <br /> Powerful
          </h1>
          <h2 className={`${textColor} text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mt-4`}>
            BILLING & INVOICE SYSTEM
          </h2>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <div className="flex items-center gap-3">
              <h3 className={`${textColor} text-xl sm:text-2xl md:text-3xl font-bold`}>Your Business</h3>
              <img src={ruppe} alt="Rupee" className="w-12 h-12 md:w-16 md:h-16 rounded-xl shadow-lg" />
              <h3 className={`${textColor} text-xl sm:text-2xl md:text-3xl font-bold`}>Your Client</h3>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mt-16 items-center">
          {/* Features */}
          <div className={`${textColor} space-y-6 animate-slideUp`}>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              A simple payment process helps you get paid on time. Provide multiple payment options that your customers can use.
            </p>

            <ul className="space-y-4 mt-8">
              {[
                "Send invoices via SMS, email, and client portal",
                "Keep track of customers' invoice status",
                "Follow up with automated payment reminders",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <svg width="12" height="10" viewBox="0 0 21 20" fill="none"><path d="M6.70164 20L6.47213 19.5894C4.75082 16.5217 0.183607 9.97585 0.137705 9.90338L0 9.71014L1.72131 7.92271L6.63279 11.5459C9.7082 7.343 12.5771 4.4686 14.459 2.77778C16.5475 0.917874 17.8557 0.0724638 17.9016 0.0483092L17.9705 0H21L20.4951 0.483092C14.023 6.54589 7 19.4686 6.93115 19.5894L6.70164 20Z" fill="white"/></svg>
                  </span>
                  <span className="text-base md:text-lg">{text}</span>
                </li>
              ))}
            </ul>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-8 mt-10">
              <img
                width="300"
                src="https://saasplate.themepreview.xyz/invoice-app/wp-content/uploads/sites/6/2022/10/Group-20481.svg"
                alt="Group Icon"
              />
              <section ref={sectionRef}>
                <h4 className={`text-4xl md:text-5xl font-extrabold ${textColor}`}>
                  {startCount ? <CountUp end={2500} duration={2.5} /> : 0}+ users
                </h4>
              </section>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center lg:justify-end animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <img
              src="https://saasplate.themepreview.xyz/invoice-app/wp-content/uploads/sites/6/2022/12/hello.png"
              alt="Welcome Illustration"
              className="w-full max-w-lg h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
