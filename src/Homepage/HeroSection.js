import React from 'react';
import ParticlesBackground from '../components/ParticlesBackground';
import Front1 from "./Assests/Front1.png";
import Front2 from "./Assests/Front2.png";
import Front3 from "./Assests/Front3.png";

const HeroSection = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden flex">
            {/* Particles Background */}
            <ParticlesBackground id="particles" />

            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Content with left alignment */}
            <div className="relative flex flex-col items-start justify-center text-white text-left ml-10 p-8 w-1/2">
                <h1 className="text-4xl md:text-6xl font-bold animate__animated animate__fadeInDown transition duration-300"
                    style={{
                        background: 'linear-gradient(to right, #FF6F20, #3B82F6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                    }}>
                    Welcome to Smart Billing System
                </h1>
                <p className="mt-4 text-lg md:text-xl animate__animated animate__fadeInUp transition duration-300 shadow-md"
                    style={{
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
                    }}>
                    It is the solution to many problems
                </p>
                <button className="mt-6 px-6 py-2 bg-blue-600 rounded hover:bg-blue-500 transition duration-300 animate__animated animate__bounceIn">
                    Learn More
                </button>
            </div>

            {/* Images on the right */}
            <div className="relative flex flex-col items-center justify-center w-1/2 p-4">
                <img
                    src={Front1}
                    alt="Image 1"
                    className="mb-2 mr-36 w-60 rounded shadow-lg transition-transform duration-300 transform hover:scale-105"
                />
                <img
                    src={Front2}
                    alt="Image 2"
                    className="mb-2 h-44 w-60 rounded shadow-lg transition-transform duration-300 transform hover:scale-105 translate-x-20"
                />
                <img
                    src={Front3}
                    alt="Image 3"
                    className="w-60 mr-36 rounded shadow-lg transition-transform duration-300 transform hover:scale-105"
                />
            </div>
        </div>
    );
};

export default HeroSection;