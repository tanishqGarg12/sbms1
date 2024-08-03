// src/components/Main.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaHistory, FaFileInvoiceDollar, FaBoxOpen, FaCog } from 'react-icons/fa';
import { DarkModeContext } from '../DarkModeContext';

const Main = () => {
    const { darkMode } = useContext(DarkModeContext);
    const [activeLink, setActiveLink] = useState('/'); // Default active link

    const handleLinkClick = (path) => {
        setActiveLink(path); // Set the clicked link as active
    };

    return (
        <div className={` sidebar transition-colors duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`} style={{ width: '250px', position: 'fixed', height: '100%', top: 85, left: 0 }}>
            <h2 className="text-center text-2xl font-bold mb-4">Dashboard</h2>
            <ul className="mt-4">
                <li>
                    <Link 
                        to="/dashboard/business" 
                        className={`flex items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} p-4 rounded transition-colors duration-300 ${activeLink === '/' ? 'border-l-4 border-orange-500' : ''}`}
                        onClick={() => handleLinkClick('/dashboard/Busiiness')}
                    >
                        <FaHome className="mr-2 text-xl" />
                        <span className="text-lg font-semibold">Business Overview</span>
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/dashboard/history" 
                        className={`flex items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} p-4 rounded transition-colors duration-300 ${activeLink === '/history' ? 'border-4 border-orange-500' : ''}`}
                        onClick={() => handleLinkClick('/history')}
                    >
                        <FaHistory className="mr-2 text-xl" />
                        <span className="text-lg font-semibold">History</span>
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/dashboard/create-bill" 
                        className={`flex items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} p-4 rounded transition-colors duration-300 ${activeLink === '/create-bill' ? 'border-4 border-orange-500' : ''}`}
                        onClick={() => handleLinkClick('/create-bill')}
                    >
                        <FaFileInvoiceDollar className="mr-2 text-xl" />
                        <span className="text-lg font-semibold">Create Bill</span>
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/dashboard/stock-details" 
                        className={`flex items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} p-4 rounded transition-colors duration-300 ${activeLink === '/stock-details' ? 'border-4 border-orange-500' : ''}`}
                        onClick={() => handleLinkClick('/stock-details')}
                    >
                        <FaBoxOpen className="mr-2 text-xl" />
                        <span className="text-lg font-semibold">Stock Details</span>
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/dashboard/settings" 
                        className={`flex items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} p-4 rounded transition-colors duration-300 ${activeLink === '/settings' ? 'border-4 border-orange-500' : ''}`}
                        onClick={() => handleLinkClick('/settings')}
                    >
                        <FaCog className="mr-2 text-xl" />
                        <span className="text-lg font-semibold">Settings</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Main;