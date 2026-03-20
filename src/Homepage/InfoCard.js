import React, { useContext, useState } from 'react';
import { DarkModeContext } from '../DarkModeContext';
import { FaChevronDown, FaMinus, FaPlus } from 'react-icons/fa';

const InfoCard = () => {
    const { darkMode } = useContext(DarkModeContext);
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        { question: "What is Smart Billing Management System (SBMS)?", answer: "SBMS is a comprehensive invoicing solution designed to help businesses streamline their billing process, manage invoices efficiently, and track payments effortlessly." },
        { question: "How does SBMS simplify invoicing?", answer: "SBMS automates the invoicing process, allowing users to create, send, and track invoices in real time. This reduces manual errors and saves time." },
        { question: "Can I customize my invoices?", answer: "Yes! SBMS allows users to customize invoice templates, including adding logos, changing colors, and adjusting layouts to match your brand." },
        { question: "Is there a mobile app available?", answer: "Yes, our SBMS mobile app allows you to manage your invoicing on the go, enabling you to create and send invoices from your smartphone or tablet." },
        { question: "What payment methods are supported?", answer: "SBMS supports various payment methods including credit cards, bank transfers, UPI, and digital wallets." },
        { question: "Is my data secure?", answer: "Absolutely. We use industry-standard encryption and security protocols to ensure your billing data and customer information remain safe and private." },
        { question: "Can I export my invoices?", answer: "Yes, you can export invoices in PDF, CSV, and Excel formats for easy sharing and record-keeping." },
    ];

    const toggle = (i) => setActiveIndex(activeIndex === i ? null : i);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-900'} text-white relative overflow-hidden`}>
                    <span className="absolute top-3 left-3 bg-yellow-500 text-xs font-bold px-2 py-0.5 rounded text-gray-900">New</span>
                    <h3 className="text-xl font-bold mt-6">We've Added New Templates</h3>
                    <p className="mt-2 text-sm text-gray-300">Track your entire project start to finish with beautiful views.</p>
                    <button className="mt-4 bg-white text-gray-900 text-sm font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition">Download Now</button>
                </div>
                <div className={`rounded-2xl p-6 text-white ${darkMode ? 'bg-slate-700' : 'bg-slate-600'}`}>
                    <div className="text-3xl mb-3">📊</div>
                    <h3 className="text-xl font-bold">Greeting Cards</h3>
                    <p className="mt-2 text-sm text-gray-200">Effortlessly track time and billing with our smart tools.</p>
                </div>
                <div className="rounded-2xl p-6 text-white bg-amber-600">
                    <div className="text-3xl mb-3">📈</div>
                    <h3 className="text-xl font-bold">Revenue Tracking</h3>
                    <p className="mt-2 text-sm text-amber-100">Monitor your revenue streams in real-time.</p>
                </div>
            </div>

            {/* Heading */}
            <div className="text-center mb-12">
                <h2 className={`text-4xl md:text-6xl font-extrabold ${darkMode ? 'text-green-400' : 'text-gray-900'}`}>Invoicing</h2>
                <p className={`text-lg md:text-xl mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Invoicing Solution For All</p>
            </div>

            {/* FAQ */}
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <span className={`inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3 ${darkMode ? 'bg-green-500/10 text-green-400' : 'bg-[#029c78]/10 text-[#029c78]'}`}>
                        FAQ
                    </span>
                    <h3 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Frequently Asked Questions
                    </h3>
                    <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Everything you need to know about SBMS
                    </p>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <div
                                key={index}
                                className={`rounded-xl overflow-hidden transition-all duration-300 ${
                                    isActive
                                        ? darkMode
                                            ? 'bg-gray-800 border border-green-500/40 shadow-lg shadow-green-500/5'
                                            : 'bg-white border border-[#029c78]/30 shadow-lg shadow-[#029c78]/5'
                                        : darkMode
                                            ? 'bg-gray-800/60 border border-gray-700 hover:border-gray-600'
                                            : 'bg-white border border-gray-200 hover:border-gray-300 shadow-sm'
                                }`}
                            >
                                <button
                                    className="w-full flex items-center justify-between p-5 text-left gap-4"
                                    onClick={() => toggle(index)}
                                    aria-expanded={isActive}
                                >
                                    <div className="flex items-center gap-3.5 min-w-0">
                                        <span className={`flex-shrink-0 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
                                            isActive
                                                ? darkMode ? 'bg-green-500 text-gray-900' : 'bg-[#029c78] text-white'
                                                : darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                            {index + 1}
                                        </span>
                                        <span className={`font-semibold text-sm ${
                                            isActive
                                                ? darkMode ? 'text-green-400' : 'text-[#029c78]'
                                                : darkMode ? 'text-gray-100' : 'text-gray-800'
                                        }`}>
                                            {faq.question}
                                        </span>
                                    </div>
                                    <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                                        isActive
                                            ? darkMode ? 'bg-green-500/20 text-green-400 rotate-0' : 'bg-[#029c78]/10 text-[#029c78] rotate-0'
                                            : darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                        {isActive ? <FaMinus size={10} /> : <FaPlus size={10} />}
                                    </span>
                                </button>
                                <div
                                    className="grid transition-all duration-300 ease-in-out"
                                    style={{ gridTemplateRows: isActive ? '1fr' : '0fr' }}
                                >
                                    <div className="overflow-hidden">
                                        <p className={`px-5 pb-5 pl-[3.75rem] text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
                <div className={`rounded-2xl p-6 text-center ${darkMode ? 'bg-green-500/10 border border-green-500/30' : 'bg-[#029c78]'} text-white`}>
                    <h3 className="text-3xl font-bold">40%</h3>
                    <p className="mt-1 text-sm opacity-80">Weekly Wallet Usage</p>
                </div>
                <div className={`rounded-2xl p-6 text-center ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                    <h3 className={`text-3xl font-bold ${darkMode ? 'text-green-400' : 'text-gray-900'}`}>$23,830</h3>
                    <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Revenue <span className="text-green-500 ml-1">+9.2%</span></p>
                </div>
                <div className="rounded-2xl p-6 text-center bg-pink-500 text-white">
                    <img className="w-12 h-12 mx-auto rounded-full mb-2" src="https://saasplate.themepreview.xyz/invoice-app/wp-content/uploads/sites/6/2022/10/Image.png" alt="Samuel" />
                    <h3 className="text-lg font-bold">Samuel</h3>
                    <span className="bg-pink-300/40 px-3 py-0.5 rounded-full text-xs mt-1 inline-block">Investment</span>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;
