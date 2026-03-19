import React, { useContext } from "react";
import { DarkModeContext } from "../DarkModeContext";

const plans = [
  {
    title: "Enterprise",
    price: "$19",
    features: ["Unlimited Clients", "Accept E-signatures", "Users & Companies", "Custom Emails & Subject"],
    icon: "🕒",
    popular: false,
  },
  {
    title: "Ninja Pro",
    price: "$49",
    features: ["Unlimited Clients", "Accept E-signatures", "Users & Companies", "Custom Emails & Subject", "Priority Support", "Advanced Analytics"],
    icon: "🥷",
    popular: true,
  },
  {
    title: "Forever Free",
    price: "$99",
    features: ["Unlimited Clients", "Accept E-signatures", "Users & Companies", "Custom Emails & Subject", "Dedicated Manager"],
    icon: "🕊",
    popular: false,
  },
];

const PricingPlans = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div id="pricing" className="py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className={`text-3xl md:text-4xl font-bold ${darkMode ? "text-green-400" : "text-gray-800"}`}>
          Choose Your Plan
        </h2>
        <p className={`text-base md:text-lg mt-4 max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Track your entire project from start to finish with beautiful views that make project planning a breeze.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 flex flex-col items-center transition-all duration-300 hover:-translate-y-2 ${
                plan.popular
                  ? darkMode
                    ? "bg-green-500/10 border-2 border-green-400 shadow-xl shadow-green-500/10"
                    : "bg-[#029c78] text-white shadow-xl shadow-green-500/20"
                  : darkMode
                    ? "bg-gray-800/80 border border-gray-700"
                    : "bg-white border border-gray-200 shadow-lg"
              }`}
            >
              {plan.popular && (
                <span className={`absolute -top-3 px-4 py-1 rounded-full text-xs font-bold ${
                  darkMode ? "bg-green-400 text-gray-900" : "bg-yellow-400 text-gray-900"
                }`}>
                  MOST POPULAR
                </span>
              )}
              <div className="text-4xl mb-4">{plan.icon}</div>
              <h3 className={`text-2xl font-bold ${plan.popular && !darkMode ? "text-white" : darkMode ? "text-green-300" : "text-gray-800"}`}>
                {plan.title}
              </h3>
              <p className={`text-4xl font-bold mt-3 ${plan.popular && !darkMode ? "text-white" : darkMode ? "text-green-400" : "text-gray-900"}`}>
                {plan.price}<span className="text-lg font-normal opacity-70">/mo</span>
              </p>
              <ul className="mt-6 space-y-3 text-left w-full">
                {plan.features.map((feature, i) => (
                  <li key={i} className={`flex items-center text-sm ${
                    plan.popular && !darkMode ? "text-white/90" : darkMode ? "text-gray-300" : "text-gray-600"
                  }`}>
                    <span className={`mr-2 ${plan.popular && !darkMode ? "text-yellow-300" : "text-green-500"}`}>✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`mt-8 w-full py-3 rounded-xl font-semibold text-sm transition duration-300 ${
                plan.popular
                  ? darkMode
                    ? "bg-green-400 text-gray-900 hover:bg-green-300"
                    : "bg-white text-[#029c78] hover:bg-gray-100"
                  : darkMode
                    ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                    : "bg-[#029c78] text-white hover:bg-[#028a6b]"
              }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
