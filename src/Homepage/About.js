import React, { useContext } from 'react';
import { DarkModeContext } from '../DarkModeContext';
import invoice from "./Assests/invoice.png"
const AboutUs = () => {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <section className={`py-20 px-4 md:px-8 lg:px-16 transition-colors duration-300 ${darkMode ? 'bg-transparent text-gray-200' : 'bg-transparent text-gray-800'}`}>
            <div className="max-w-screen-xl mx-auto">
                <h2 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'} animate__animated animate__fadeInDown`}>
                    About Us
                </h2>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="animate__animated animate__fadeInLeft">
                        <img
                            src={invoice} // Using the imported image
                            alt="Invoice Image"
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="animate__animated animate__fadeInRight">
                        <h3 className={`text-2xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            Welcome to the Smart Billing System, QUICK BILL
                        </h3>
                        <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Google Developer Student Clubs (GDSC) are community groups for students from any academic background in their undergraduate or graduate term. By joining a GDSC, students build their professional and personal network, get access to Google Developer Resources, and work together to build solutions for local problems in a peer-to-peer learning environment.🔥
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
