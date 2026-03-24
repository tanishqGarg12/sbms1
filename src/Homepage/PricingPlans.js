import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../DarkModeContext";
import { FaCheck } from "react-icons/fa";

const plans = [
  {
    title: "Starter",
    price: "$19",
    desc: "Perfect for freelancers and small teams",
    features: ["Up to 50 Invoices/mo", "2 Team Members", "Basic Analytics", "Email Support", "Invoice Templates"],
    popular: false,
  },
  {
    title: "Professional",
    price: "$49",
    desc: "Best for growing businesses",
    features: ["Unlimited Invoices", "10 Team Members", "Advanced Analytics", "Priority Support", "Custom Branding", "API Access", "Automated Reminders"],
    popular: true,
  },
  {
    title: "Enterprise",
    price: "$99",
    desc: "For large-scale operations",
    features: ["Everything in Pro", "Unlimited Team", "Dedicated Manager", "Custom Integrations", "SLA Guarantee", "Audit Logs"],
    popular: false,
  },
];

const PricingPlans = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  return (
    <div id="pricing" className={`relative py-24 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className={`absolute inset-0 ${darkMode ? 'mesh-gradient-dark' : ''}`} />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 ${
            darkMode ? 'bg-brand-500/10 text-brand-400' : 'bg-brand-50 text-brand-600'
          }`}>Pricing</span>
          <h2 className={`text-4xl md:text-5xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Simple, transparent pricing
          </h2>
          <p className={`text-lg mt-4 max-w-xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            No hidden fees. No surprises. Choose the plan that fits your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div key={index} className={`relative rounded-3xl p-8 flex flex-col transition-all duration-300 card-hover ${
              plan.popular
                ? darkMode
                  ? 'bg-gradient-to-b from-brand-500/10 to-gray-900 border-2 border-brand-500/40 shadow-xl shadow-brand-500/10'
                  : 'bg-gradient-to-b from-brand-500 to-brand-700 text-white shadow-2xl shadow-brand-500/30 scale-[1.02]'
                : darkMode
                  ? 'bg-gray-900 border border-gray-800'
                  : 'bg-white border border-gray-200 shadow-sm'
            }`}>
              {plan.popular && (
                <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-bold ${
                  darkMode ? 'bg-brand-500 text-white' : 'bg-white text-brand-600 shadow-lg'
                }`}>Most Popular</span>
              )}

              <h3 className={`text-xl font-bold ${plan.popular && !darkMode ? 'text-white' : darkMode ? 'text-white' : 'text-gray-900'}`}>
                {plan.title}
              </h3>
              <p className={`text-sm mt-1 ${plan.popular && !darkMode ? 'text-white/70' : darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {plan.desc}
              </p>

              <div className="mt-6 mb-8">
                <span className={`text-5xl font-black ${plan.popular && !darkMode ? 'text-white' : darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm font-medium ml-1 ${plan.popular && !darkMode ? 'text-white/60' : darkMode ? 'text-gray-500' : 'text-gray-400'}`}>/month</span>
              </div>

              <ul className="space-y-3 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      plan.popular && !darkMode ? 'bg-white/20' : darkMode ? 'bg-brand-500/20' : 'bg-brand-50'
                    }`}>
                      <FaCheck size={8} className={plan.popular && !darkMode ? 'text-white' : 'text-brand-500'} />
                    </span>
                    <span className={`text-sm ${plan.popular && !darkMode ? 'text-white/90' : darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button onClick={() => navigate('/signup')} className={`mt-8 w-full py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                plan.popular
                  ? darkMode
                    ? 'bg-brand-500 text-white hover:bg-brand-400'
                    : 'bg-white text-brand-600 hover:bg-white/90 shadow-lg'
                  : darkMode
                    ? 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
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
