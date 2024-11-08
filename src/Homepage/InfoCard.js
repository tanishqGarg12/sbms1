import React, { useContext, useState } from 'react';
import { DarkModeContext } from '../DarkModeContext';
import { FaHandsHelping, FaProjectDiagram, FaTrophy, FaUsers, FaCloud, FaComments } from 'react-icons/fa';

const InfoCard = () => {
    const { darkMode } = useContext(DarkModeContext);
    const [activeIndex, setActiveIndex] = useState(null); // Fixed typo here

    const faqs = [
        {
            question: "What is Smart Billing Management System (SBMS)?",
            answer: "SBMS is a comprehensive invoicing solution designed to help businesses streamline their billing process, manage invoices efficiently, and track payments effortlessly."
        },
        {
            question: "How does SBMS simplify invoicing?",
            answer: "SBMS automates the invoicing process, allowing users to create, send, and track invoices in real time. This reduces manual errors and saves time."
        },
        {
            question: "Can I customize my invoices?",
            answer: "Yes! SBMS allows users to customize invoice templates, including adding logos, changing colors, and adjusting layouts to match your brand."
        },
        {
            question: "Is there a mobile app available?",
            answer: "Yes, our SBMS mobile app allows you to manage your invoicing on the go, enabling you to create and send invoices from your smartphone or tablet."
        },
        {
            question: "What payment methods are supported?",
            answer: "SBMS supports various payment methods"
        },
    ];

    const toggleFAQ = index => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className={`max-w-screen-xl mx-auto my-10 p-8 rounded-lg shadow-lg transition-colors duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} flex flex-wrap gap-6`}>
            <div className="w-1/4 aspect-square bg-black rounded-lg relative text-center text-white flex flex-col">
                <span className="absolute top-2 left-2 bg-yellow-500 text-sm px-2 py-1 rounded">New</span>
                <h3 className="text-2xl font-bold mt-10">We've Added New Templates</h3>
                <p className="mt-2">Track your entire project start to finish with beautiful views.</p>
                <a href="#" className="mt-4 w-32 ml-24 inline-block bg-white hover:bg-blue-800 text-black py-2 px-4 rounded">Download Now</a>
            </div>
            <div className="w-1/3 md:w-1/4 p-4 bg-slate-600 rounded-lg text-center text-white ml-28 ">
                <div className="text-5xl mb-2"><FaProjectDiagram /></div>
                <h3 className="text-2xl font-bold">Greeting Cards</h3>
                <p className="mt-2">Effortlessly track time and billing.</p>
                <p className="mt-2">Effortlessly track time and billing.</p>
                <p className="mt-2">Effortlessly track time and billing.</p>
            </div>
            <div className="w-1/3 md:w-1/4 p-4 bg-yellow-600 rounded-lg text-center text-white ml-28 ">
                <div className="text-5xl mb-2"><FaProjectDiagram /></div>
                <h3 className="text-2xl font-bold">Greeting Cards</h3>
                <p className="mt-2">Effortlessly track time and billing.</p>
                <p className="mt-2">Effortlessly track time and billing.</p>
                <p className="mt-2">Effortlessly track time and billing.</p>
            </div>
            
            <div className="mt-8 ">
                <h3 className="font-extrabold text-8xl ml-64">Invoicing</h3>
                <h3 className="font-extrabold text-4xl ml-64 mt-2">Invoicing Solution For All</h3>
                <div className="mt-12">
                    <h2 className="font-extrabold text-5xl mb-6">Frequently Asked Questions (FAQ)</h2>
                    {faqs.map((faq, index) => (
                        <div key={index} className="mb-4 border-b">
                            <h4 
                                className="font-bold text-2xl cursor-pointer py-2" 
                                onClick={() => toggleFAQ(index)}
                            >
                                {faq.question}
                            </h4>
                            {activeIndex === index && (
                                <p className="mt-2">{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full md:w-1/2 p-4 bg-[#029c78] rounded-lg text-center text-white">
                <h3 className="text-4xl font-bold">40%</h3>
                <p className="mt-2">Weekly Wallet Usage</p>
            </div>
            <div className='flex space-x-5'>

            <div className="w-full md:w-1/2 p-4 bg-white rounded-lg text-center text-black border-2">
                <div className="text-5xl mb-2"><FaHandsHelping /></div>
                <h3 className="text-3xl font-bold">$23,830</h3>
                <p>Total Revenue <span className="text-green-300 ml-2">+9.2%</span></p>
            </div>
          
            <div className="w-full md:w-1/2 p-4 bg-pink-500 rounded-lg text-center text-white">
                <img className="w-16 h-16 mx-auto rounded-full mb-2" src="https://saasplate.themepreview.xyz/invoice-app/wp-content/uploads/sites/6/2022/10/Image.png" alt="Samuel" />
                <h3 className="text-2xl font-bold">Samuel</h3>
                <p>@samuel</p>
                <span className="bg-pink-300 px-3 py-1 rounded-full mt-2 inline-block">Investment</span>
            </div>
            </div>
        </div>
    );
};

export default InfoCard;
