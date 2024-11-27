import React, { useContext } from "react";
import { DarkModeContext } from "../DarkModeContext";
const plans = [
  {
    title: "Enterprise",
    price: "$19",
    features: [
      "Unlimited Clients",
      "Accept E-signatures",
      "Users & Companies",
      "Custom Emails & Subject",
    ],
    color: "bg-white",
    textColor: "text-gray-800",
    buttonColor: "bg-green-500 text-white",
    icon: "🕒",
  },
  {
    title: "Ninja Pro",
    price: "$49",
    features: [
      "Unlimited Clients",
      "Accept E-signatures",
      "Users & Companies",
      "Custom Emails & Subject",
    ],
    color: "bg-green-200",
    textColor: "text-green-800",
    buttonColor: "bg-white text-green-800",
    icon: "🥷",
  },
  {
    title: "Forever Free",
    price: "$99",
    features: [
      "Unlimited Clients",
      "Accept E-signatures",
      "Users & Companies",
      "Custom Emails & Subject",
    ],
    color: "bg-white",
    textColor: "text-gray-800",
    buttonColor: "bg-green-500 text-white",
    icon: "🕊",
  },
];

const PricingPlans = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`flex flex-col items-center py-16 px-4 md:px-8 ${
        darkMode ? "bg-transparent" : "bg-transparent"
      }`}
    >
      <h2 className={`text-4xl font-bold ${darkMode ? "text-green-500" : "text-gray-800"}`}>
        Choose Your Plan
      </h2>
      <p
        className={`text-lg mt-4 text-center max-w-2xl ${
          darkMode ? "text-green-300" : "text-gray-600"
        }`}
      >
        Track your entire project from start to finish with beautiful views that make project
        planning a breeze. Manage your resources on a List, Box, or Gantt.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl w-full">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-lg shadow-lg p-8 flex flex-col items-center ${
              darkMode ? "bg-gray-800 text-green-300" : `${plan.color} ${plan.textColor}`
            }`}
          >
            <div className="text-5xl mb-6">{plan.icon}</div>
            <h3 className="text-3xl font-semibold">{plan.title}</h3>
            <p className="text-5xl font-bold mt-4">
              {plan.price}
              <span className="text-2xl font-normal">/mo</span>
            </p>
            <ul className="mt-6 space-y-3 text-lg">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="text-green-500 mr-3 text-2xl">✔</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`mt-8 py-3 px-8 rounded-full font-semibold text-lg hover:opacity-90 ${
                darkMode ? "bg-green-500 text-white" : plan.buttonColor
              }`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
