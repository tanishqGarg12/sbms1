import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/action/authActions'; // Import the logout action
import { DarkModeContext } from '../DarkModeContext';
import { Link, useNavigate } from 'react-router-dom';
import Quick from './Assests/Quick.jpg';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const [isOpen, setIsOpen] = useState(false);

    // Get authentication state from Redux
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    useEffect(() => {
        document.body.classList[darkMode ? 'add' : 'remove']('bg-gray-900');
        document.body.classList[darkMode ? 'add' : 'remove']('text-white');
        document.body.classList[!darkMode ? 'add' : 'remove']('bg-gray-100');
        document.body.classList[!darkMode ? 'add' : 'remove']('text-gray-900');
    }, [darkMode]);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    const handleLogout = () => {
        dispatch(logout()); // Dispatch the logout action
        navigate('/');
        console.log("logout done"); // Redirect to home after logout
    };

    return (
        <nav className={`flex items-center justify-between p-4 shadow-md transition duration-300 ease-in-out bg-transparent`}>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                <img src={Quick} className="w-52 rounded-md" alt="Quick Logo" />
            </div>
            <div className="hidden md:flex items-center space-x-4">
                <button
                    onClick={toggleDarkMode}
                    className={`p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}
                >
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <div className="relative mx-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className={`p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a7 7 0 100 14 7 7 0 000-14zm0 0l6 6" />
                        </svg>
                    </button>
                </div>

                {/* Conditional rendering based on authentication status */}
                {isAuthenticated ? (
                    <>
                        <span className="ml-4 p-2 text-lg font-bold">
                            Welcome, {user.user?.firstName || 'User'}
                        </span>
                        <button
                            onClick={handleLogout}
                            className={`ml-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${darkMode ? 'bg-red-600 text-white' : 'bg-red-500 text-white'}`}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={handleLogin}
                            className={`ml-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}
                        >
                            Login
                        </button>
                        <button
                            onClick={handleSignUp}
                            className={`ml-4 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out ${darkMode ? 'bg-green-600 text-white' : 'bg-green-500 text-white'}`}
                        >
                            Sign Up
                        </button>
                    </>
                )}

                <ul className="flex space-x-6">
                    <li>
                        <Link to="/" className={`hover:text-blue-500 transition duration-300 ease-in-out ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Home</Link>
                    </li>
                    <li>
                        <Link to="/about" className={`hover:text-blue-500 transition duration-300 ease-in-out ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>About</Link>
                    </li>
                    <li>
                        <Link to="/contact" className={`hover:text-blue-500 transition duration-300 ease-in-out ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Contact</Link>
                    </li>
                </ul>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden flex items-center">
                <button
                    onClick={toggleMenu}
                    className={`p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}
                >
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                </button>
            </div>

            {isOpen && (
                <div className={`absolute top-16 right-0 w-full shadow-lg md:hidden transition duration-300 ease-in-out ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-800'}`}>
                    <ul className="flex flex-col p-4 space-y-2">
                        <li>
                            <Link to="/" className={`hover:text-blue-500 transition duration-300 ease-in-out ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Home</Link>
                        </li>
                        <li>
                            <Link to="/about" className={`hover:text-blue-500 transition duration-300 ease-in-out ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>About</Link>
                        </li>
                        <li>
                            <Link to="/events" className={`hover:text-blue-500 transition duration-300 ease-in-out ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Events</Link>
                        </li>
                        <li>
                            <Link to="/contact" className={`hover:text-blue-500 transition duration-300 ease-in-out ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>Contact</Link>
                        </li>

                        {isAuthenticated ? (
                            <>
                                <li>
                                    <span className="p-2 font-bold">
                                        Welcome, {user?.email || 'User'}
                                    </span>
                                </li>
                                <li>
                                    <button 
                                        onClick={handleLogout}
                                        className={`w-full text-left p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${darkMode ? 'bg-red-600 text-white' : 'bg-red-500 text-white'}`}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <button onClick={handleLogin} className={`w-full text-left p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}>
                                        Login
                                    </button>
                                </li>
                                <li>
                                    <button onClick={handleSignUp} className={`w-full text-left p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out ${darkMode ? 'bg-green-600 text-white' : 'bg-green-500 text-white'}`}>
                                        Sign Up
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
