import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaHistory, FaFileInvoiceDollar, FaBoxOpen, FaCog } from 'react-icons/fa';
import { DarkModeContext } from '../DarkModeContext';
import { useSelector } from 'react-redux'; // Assuming you're using Redux for authentication

const Main = () => {
    const { darkMode } = useContext(DarkModeContext);
    const [activeLink, setActiveLink] = useState('/'); // Default active link
    const { user } = useSelector((state) => state.auth); // Get the user from Redux store
    console.log({user})
    // console.log(user.role)

    const handleLinkClick = (path) => {
        setActiveLink(path); // Set the clicked link as active
    };

    return (    
        <div className={`sidebar transition-colors fixed h-screen mt-10 duration-300 ${darkMode ? ' text-white' : 'bg-[#029c78] text-gray-800'}`} style={{ width: '250px',  position: 'absolute', top: 85, left: 0 , }}>
               <h2 className={`text-center text-2xl font-extrabold mb-4 ${darkMode ? 'text-[#00FF00]' : 'text-[#05120f]'}`}>
      Dashboard
    </h2>
            <ul className="mt-4">
                {/* Conditionally render Business Overview, Stock Details, and Settings for admins only */}
                {user.user?.role === 'admin' && (
                    <>
                        <li>
                            <Link 
                                to="/dashboard/business" 
                                className={`flex items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} p-4 rounded transition-colors duration-300 ${activeLink === '/dashboard/business' ? 'border-l-4 border-orange-500' : ''}`}
                                onClick={() => handleLinkClick('/dashboard/business')}
                            >
                                <FaHome className="mr-2 text-xl" />
                                <span className="text-lg font-semibold">Business Overview</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/dashboard/addinventory" 
                                className={`flex items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} p-4 rounded transition-colors duration-300 ${activeLink === '/dashboard/business' ? 'border-l-4 border-orange-500' : ''}`}
                                onClick={() => handleLinkClick('/dashboard/addinventory')}
                            >
                                <FaHome className="mr-2 text-xl" />
                                <span className="text-lg font-semibold">add stock</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/dashboard/stock-details" 
                                className={`flex items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} p-4 rounded transition-colors duration-300 ${activeLink === '/dashboard/stock-details' ? 'border-l-4 border-orange-500' : ''}`}
                                onClick={() => handleLinkClick('/dashboard/stock-details')}
                            >
                                <FaBoxOpen className="mr-2 text-xl" />
                                <span className="text-lg font-semibold">Stock Details</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/dashboard/create-category" 
                                className={`flex items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} p-4 rounded transition-colors duration-300 ${activeLink === '/dashboard/settings' ? 'border-l-4 border-orange-500' : ''}`}
                                onClick={() => handleLinkClick('/dashboard/create-category')}
                            >
                                <FaCog className="mr-2 text-xl" />
                                <span className="text-lg font-semibold">Create Category</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/dashboard/create_sub-category" 
                                className={`flex items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} p-4 rounded transition-colors duration-300 ${activeLink === '/dashboard/settings' ? 'border-l-4 border-orange-500' : ''}`}
                                onClick={() => handleLinkClick('/dashboard/create_sub-category')}
                            >
                                <FaCog className="mr-2 text-xl" />
                                <span className="text-lg font-semibold">Add Subcategories</span>
                            </Link>
                        </li>
                    </>
                )}
                {/* These menu items will be shown to all users */}
                <li>
                    <Link 
                        to="/dashboard/all-inventory" 
                        className={`flex items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} p-4 rounded transition-colors duration-300 ${activeLink === '/dashboard/all-inventory' ? 'border-l-4 border-orange-500' : ''}`}
                        onClick={() => handleLinkClick('/dashboard/all-inventory')}
                    >
                        <FaBoxOpen className="mr-2 text-xl" />
                        <span className="text-lg font-semibold">All Inventory</span>
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/dashboard/low-inventory" 
                        className={`flex items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} p-4 rounded transition-colors duration-300 ${activeLink === '/dashboard/low-inventory' ? 'border-l-4 border-orange-500' : ''}`}
                        onClick={() => handleLinkClick('/dashboard/low-inventory')}
                    >
                        <FaFileInvoiceDollar className="mr-2 text-xl" />
                        <span className="text-lg font-semibold">Low Inventory</span>
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/dashboard/history" 
                        className={`flex items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} p-4 rounded transition-colors duration-300 ${activeLink === '/dashboard/history' ? 'border-l-4 border-orange-500' : ''}`}
                        onClick={() => handleLinkClick('/dashboard/history')}
                    >
                        <FaHistory className="mr-2 text-xl" />
                        <span className="text-lg font-semibold">Create Bill</span>
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/dashboard/create-bill" 
                        className={`flex items-center ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} p-4 rounded transition-colors duration-300 ${activeLink === '/dashboard/create-bill' ? 'border-l-4 border-orange-500' : ''}`}
                        onClick={() => handleLinkClick('/dashboard/create-bill')}
                    >
                        <FaFileInvoiceDollar className="mr-2 text-xl" />
                        <span className="text-lg font-semibold">History</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Main;
