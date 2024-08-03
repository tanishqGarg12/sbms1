import React, { useContext } from 'react';
import { DarkModeContext } from '../DarkModeContext';
import { FaHandsHelping, FaProjectDiagram, FaTrophy, FaUsers, FaCloud, FaComments } from 'react-icons/fa'; // Importing icons

const InfoCard = () => {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className={`max-w-screen-xl mx-auto my-10 p-8 rounded-lg shadow-lg transition-colors duration-300 bg-transparent`}>
            <h3 className="text-4xl font-bold mb-6 text-center">What We Do:</h3>
            <ul className="list-disc list-inside mb-6 space-y-3">
                <li className="flex items-center text-lg">
                    <FaHandsHelping className="text-blue-500 mr-3" size={24} /> Perfect bills at one place
                </li>
                <li className="flex items-center text-lg">
                    <FaProjectDiagram className="text-blue-500 mr-3" size={24} /> Proper invoicing
                </li>
                <li className="flex items-center text-lg">
                    <FaTrophy className="text-blue-500 mr-3" size={24} /> Compete in the Solution Challenge
                </li>
                <li className="flex items-center text-lg">
                    <FaUsers className="text-blue-500 mr-3" size={24} /> Networking events
                </li>
                <li className="flex items-center text-lg">
                    <FaCloud className="text-blue-500 mr-3" size={24} /> Google Cloud Study Jams
                </li>
                <li className="flex items-center text-lg">
                    <FaComments className="text-blue-500 mr-3" size={24} /> GDG / GDE expert talks
                </li>
            </ul>
            <h3 className="text-4xl font-bold mb-6 text-center">How to Join:</h3>
            <ol className="list-decimal list-inside mb-6 space-y-3 text-lg">
                <li>Create a profile</li>
                <li>Join the chapter</li>
                <li>Get a confirmation email</li>
                {/* <li>Attend Events</li> */}
            </ol>
            <p className="mt-4 text-center text-lg">
                Email us at <a href="mailto:cse.dsc@chitkara.edu.in" className="text-blue-500 underline">abcd@gmail.com</a> for questions and more information!
            </p>
        </div>
    );
};

export default InfoCard;