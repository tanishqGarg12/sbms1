import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/action/authActions';
import { DarkModeContext } from '../DarkModeContext';
import { Link, useNavigate } from 'react-router-dom';
import Quick from './Assests/Quick.jpg';
import { Link as ScroolLink } from 'react-scroll';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const [isOpen, setIsOpen] = useState(false);

    const { isAuthenticated, user } = useSelector((state) => state.auth);
    console.log(user)

    useEffect(() => {
        document.body.classList[darkMode ? 'add' : 'remove']('bg-gray-900');
        document.body.classList[darkMode ? 'add' : 'remove']('text-green-500');
        document.body.classList[!darkMode ? 'add' : 'remove']('bg-gray-100');
        document.body.classList[!darkMode ? 'add' : 'remove']('text-gray-900');
    }, [darkMode]);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };
    const getUserInitials = (name) => {
        const initials = name.split(' ').map((n) => n[0]).join('');
        return initials.toUpperCase();
    };

    return (
        <nav
            className={`flex items-center justify-between p-4 h-32 shadow-md transition duration-300 ease-in-out border-b-2 ${
                darkMode ? 'bg-transparent' : 'bg-[#029C78]'
            }`}
        >
            <div className="text-2xl font-bold ml-8 mt-3">
                <img src={Quick} className="w-52 rounded-md" alt="Quick Logo" />
            </div>
            <div className="md:hidden">
                <button
                    onClick={toggleMenu}
                    className={`p-2 rounded-md focus:outline-none ${darkMode ? 'text-green-500' : 'text-white'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
            <ul className={`md:flex space-x-6 ${isOpen ? 'block' : 'hidden'} md:block`}>
                <li>
                    <Link
                        to="/"
                        className={`hover:text-green-300 text-3xl font-semibold transition duration-300 ease-in-out ${
                            darkMode ? 'text-green-500' : 'text-white'
                        }`}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/about"
                        className={`hover:text-green-300 text-3xl font-semibold transition duration-300 ease-in-out ${
                            darkMode ? 'text-green-500' : 'text-white'
                        }`}
                    >
                        About
                    </Link>
                </li>
                <li>
                    <Link
                        to="/contact"
                        className={`hover:text-green-300 text-3xl font-semibold transition duration-300 ease-in-out ${
                            darkMode ? 'text-green-500' : 'text-white'
                        }`}
                    >
                        Contact
                    </Link>
                </li>
                <li>
                    <ScroolLink
                        to="pricing"
                        className={`hover:text-green-300 text-3xl font-semibold transition duration-300 ease-in-out ${
                            darkMode ? 'text-green-500' : 'text-white'
                        }`}
                    >
                        Pricing
                    </ScroolLink>
                </li>
            </ul>
            <div className={`md:flex items-center space-x-4 ${isOpen ? 'block' : 'hidden'} md:block`}>
                <button
                    onClick={toggleDarkMode}
                    className={`ml-4 p-3 w-56 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${
                        darkMode
                            ? 'bg-transparent border-4 border-white text-green-500 hover:bg-green-700'
                            : 'bg-transparent border-4 border-white text-white hover:bg-green-600'
                    }`}
                >
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>

                {isAuthenticated ? (
                    <>
                        <button
                            onClick={handleLogout}
                            className={`mr-28 p-3 w-56 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${
                                darkMode
                                    ? 'bg-transparent border-4 border-white text-green-500 hover:bg-green-700'
                                    : 'bg-transparent border-4 border-white text-white hover:bg-green-600'
                            }`}
                        >
                            Logout
                        </button>
                         <div className="flex flex-col items-center mt-1">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold ${
                                    darkMode ? 'bg-green-500 text-gray-900' : 'bg-white text-green-500'
                                }`}
                            >
                                {getUserInitials(user?.user?.firstName || 'User')}
                            </div>
                            <span className={`text-lg font-bold ${darkMode ? 'text-green-500' : 'text-white'}`}>{user?.user?.firstName || 'User'}</span>
                        </div>
                    </>
                ) : (
                    <button
                        onClick={handleLogin}
                        className={`mr-28 p-3 w-56 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out ${
                            darkMode
                                ? 'bg-transparent border-4 border-white text-green-500 hover:bg-green-700'
                                : 'bg-transparent border-4 border-white text-white hover:bg-green-600'
                        }`}
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;