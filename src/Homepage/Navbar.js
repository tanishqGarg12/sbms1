import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/action/authActions';
import { DarkModeContext } from '../DarkModeContext';
import { Link, useNavigate } from 'react-router-dom';
import Quick from './Assests/Quick.jpg';
import { Link as ScrollLink } from 'react-scroll';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const { isAuthenticated, user } = useSelector((state) => state.auth);

    useEffect(() => {
        document.body.classList[darkMode ? 'add' : 'remove']('bg-gray-900', 'text-green-500');
        document.body.classList[!darkMode ? 'add' : 'remove']('bg-gray-100', 'text-gray-900');
    }, [darkMode]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleLogin = () => navigate('/login');
    const handleLogout = () => { dispatch(logout()); navigate('/'); };
    const getUserInitials = (name) => name.split(' ').map((n) => n[0]).join('').toUpperCase();

    const navLinkClass = `hover:text-green-300 text-lg font-medium transition duration-300 cursor-pointer ${darkMode ? 'text-green-400' : 'text-white'}`;
    const btnClass = `px-5 py-2.5 rounded-lg text-sm font-semibold transition duration-300 ${
        darkMode
            ? 'border border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900'
            : 'border border-white text-white hover:bg-white hover:text-[#029C78]'
    }`;

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? 'py-2 shadow-lg backdrop-blur-md' : 'py-4'
        } ${darkMode ? 'bg-gray-900/90' : 'bg-[#029C78]/95'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <Link to="/">
                    <img src={Quick} className="w-36 rounded-md" alt="Quick Logo" />
                </Link>

                {/* Desktop Nav */}
                <ul className="hidden md:flex items-center space-x-8">
                    <li><Link to="/" className={navLinkClass}>Home</Link></li>
                    {isAuthenticated && <li><Link to="/dashboard/all-inventory" className={navLinkClass}>Dashboard</Link></li>}
                    <li><ScrollLink to="pricing" smooth duration={500} className={navLinkClass}>About</ScrollLink></li>
                    <li><Link to="/contact" className={navLinkClass}>Contact</Link></li>
                    <li><ScrollLink to="pricing" smooth duration={500} className={navLinkClass}>Pricing</ScrollLink></li>
                </ul>

                <div className="hidden md:flex items-center space-x-3">
                    <button onClick={toggleDarkMode} className={`p-2.5 rounded-lg transition duration-300 ${darkMode ? 'text-yellow-400 hover:bg-gray-800' : 'text-white hover:bg-white/20'}`}>
                        {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
                    </button>
                    {isAuthenticated ? (
                        <div className="flex items-center space-x-3">
                            <button onClick={handleLogout} className={btnClass}>Logout</button>
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${darkMode ? 'bg-green-500 text-gray-900' : 'bg-white text-[#029C78]'}`}>
                                {getUserInitials(user?.user?.firstName || 'User')}
                            </div>
                        </div>
                    ) : (
                        <button onClick={handleLogin} className={btnClass}>Login</button>
                    )}
                </div>

                {/* Mobile toggle */}
                <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden p-2 ${darkMode ? 'text-green-400' : 'text-white'}`}>
                    {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className={`md:hidden px-4 pb-4 pt-2 space-y-3 ${darkMode ? 'bg-gray-900' : 'bg-[#029C78]'}`}>
                    <Link to="/" className={`block ${navLinkClass}`} onClick={() => setIsOpen(false)}>Home</Link>
                    {isAuthenticated && <Link to="/dashboard/all-inventory" className={`block ${navLinkClass}`} onClick={() => setIsOpen(false)}>Dashboard</Link>}
                    <ScrollLink to="pricing" smooth duration={500} className={`block ${navLinkClass}`} onClick={() => setIsOpen(false)}>About</ScrollLink>
                    <Link to="/contact" className={`block ${navLinkClass}`} onClick={() => setIsOpen(false)}>Contact</Link>
                    <ScrollLink to="pricing" smooth duration={500} className={`block ${navLinkClass}`} onClick={() => setIsOpen(false)}>Pricing</ScrollLink>
                    <div className="flex items-center space-x-3 pt-2">
                        <button onClick={toggleDarkMode} className={`p-2 rounded-lg ${darkMode ? 'text-yellow-400' : 'text-white'}`}>
                            {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
                        </button>
                        {isAuthenticated ? (
                            <button onClick={handleLogout} className={btnClass}>Logout</button>
                        ) : (
                            <button onClick={handleLogin} className={btnClass}>Login</button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
