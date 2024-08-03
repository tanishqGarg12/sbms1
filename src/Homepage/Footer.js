import React, { useContext } from 'react';
import { DarkModeContext } from '../DarkModeContext';

const Footer = () => {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <footer className={`${darkMode ? 'bg-transparent text-gray-200 border-t border-gray-700 shadow-lg' : 'bg-transparent text-gray-800'} py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-16`}>
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center md:items-start">
                    <img src="gdsc-logo.png" alt="GDSC Logo" className="w-16 mb-2" />
                    <p className="text-lg font-bold">Google Developer Student Club</p>
                </div>

                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                    <ul>
                        <li><a href="#" className={`hover:text-blue-500 ${darkMode ? 'dark:hover:text-blue-400' : ''}`}>Home</a></li>
                        <li><a href="#" className={`hover:text-blue-500 ${darkMode ? 'dark:hover:text-blue-400' : ''}`}>About</a></li>
                        <li><a href="#" className={`hover:text-blue-500 ${darkMode ? 'dark:hover:text-blue-400' : ''}`}>Events</a></li>
                        <li><a href="#" className={`hover:text-blue-500 ${darkMode ? 'dark:hover:text-blue-400' : ''}`}>Contact Us</a></li> {/* Added Contact Us link */}
                    </ul>
                </div>

                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="#" className={`hover:text-blue-500 ${darkMode ? 'dark:hover:text-blue-400' : ''}`}>
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className={`hover:text-blue-500 ${darkMode ? 'dark:hover:text-blue-400' : ''}`}>
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className={`hover:text-blue-500 ${darkMode ? 'dark:hover:text-blue-400' : ''}`}>
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className={`hover:text-blue-500 ${darkMode ? 'dark:hover:text-blue-400' : ''}`}>
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div className={`max-w-screen-xl mx-auto mt-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-shadow`}>
                &copy; 2023 Google Developer Student Club. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;