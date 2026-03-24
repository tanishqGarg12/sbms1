import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/action/authActions';
import { DarkModeContext } from '../DarkModeContext';
import { Link, useNavigate } from 'react-router-dom';
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
    document.body.classList[darkMode ? 'add' : 'remove']('bg-gray-950', 'text-green-500');
    document.body.classList[!darkMode ? 'add' : 'remove']('bg-gray-50', 'text-gray-900');
  }, [darkMode]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const getUserInitials = (name) => name.split(' ').map((n) => n[0]).join('').toUpperCase();

  const navLink = `relative text-[15px] font-medium transition-all duration-300 cursor-pointer
    after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:rounded-full after:transition-all after:duration-300 hover:after:w-full
    ${darkMode ? 'text-gray-300 hover:text-white after:bg-brand-400' : 'text-white/90 hover:text-white after:bg-white'}`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? darkMode
          ? 'py-2 bg-gray-950/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/10'
          : 'py-2 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-black/5'
        : 'py-4 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm ${
            scrolled && !darkMode ? 'bg-brand-500 text-white' : darkMode ? 'bg-brand-500/20 text-brand-400' : 'bg-white/20 text-white'
          }`}>SB</div>
          <span className={`text-xl font-bold tracking-tight ${
            scrolled && !darkMode ? 'text-gray-900' : darkMode ? 'text-white' : 'text-white'
          }`}>SmartBill</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {[
            { label: 'Home', to: '/', type: 'link' },
            ...(isAuthenticated ? [{ label: 'Dashboard', to: '/dashboard/all-inventory', type: 'link' }] : []),
            { label: 'Features', to: 'features', type: 'scroll' },
            { label: 'Pricing', to: 'pricing', type: 'scroll' },
            { label: 'Contact', to: '/contact', type: 'link' },
          ].map((item) => (
            <li key={item.label}>
              {item.type === 'scroll' ? (
                <ScrollLink to={item.to} smooth duration={500} className={`${navLink} ${scrolled && !darkMode ? '!text-gray-600 hover:!text-gray-900 after:!bg-brand-500' : ''}`}>{item.label}</ScrollLink>
              ) : (
                <Link to={item.to} className={`${navLink} ${scrolled && !darkMode ? '!text-gray-600 hover:!text-gray-900 after:!bg-brand-500' : ''}`}>{item.label}</Link>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={toggleDarkMode} className={`p-2.5 rounded-xl transition-all duration-300 ${
            scrolled && !darkMode ? 'text-gray-500 hover:bg-gray-100' : darkMode ? 'text-yellow-400 hover:bg-white/5' : 'text-white/80 hover:bg-white/10'
          }`}>
            {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <button onClick={() => { dispatch(logout()); navigate('/'); }}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  scrolled && !darkMode
                    ? 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                    : darkMode
                      ? 'border border-white/10 text-gray-300 hover:bg-white/5'
                      : 'border border-white/30 text-white hover:bg-white/10'
                }`}>Logout</button>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold ${
                darkMode ? 'bg-brand-500 text-white' : scrolled ? 'bg-brand-500 text-white' : 'bg-white text-brand-500'
              }`}>
                {getUserInitials(user?.user?.firstName || 'User')}
              </div>
            </div>
          ) : (
            <button onClick={() => navigate('/login')}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                scrolled && !darkMode
                  ? 'bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/20'
                  : darkMode
                    ? 'bg-brand-500 text-white hover:bg-brand-400'
                    : 'bg-white text-brand-500 hover:bg-white/90 shadow-lg shadow-black/10'
              }`}>Get Started</button>
          )}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden p-2 ${
          scrolled && !darkMode ? 'text-gray-700' : darkMode ? 'text-gray-300' : 'text-white'
        }`}>
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className={`md:hidden px-4 pb-5 pt-3 space-y-2 border-t mt-2 ${
          darkMode ? 'bg-gray-950/95 backdrop-blur-xl border-white/5' : 'bg-white/95 backdrop-blur-xl border-gray-200/50'
        }`}>
          {[
            { label: 'Home', to: '/', type: 'link' },
            ...(isAuthenticated ? [{ label: 'Dashboard', to: '/dashboard/all-inventory', type: 'link' }] : []),
            { label: 'Features', to: 'features', type: 'scroll' },
            { label: 'Pricing', to: 'pricing', type: 'scroll' },
            { label: 'Contact', to: '/contact', type: 'link' },
          ].map((item) => (
            item.type === 'scroll' ? (
              <ScrollLink key={item.label} to={item.to} smooth duration={500} onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition ${darkMode ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'}`}>{item.label}</ScrollLink>
            ) : (
              <Link key={item.label} to={item.to} onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition ${darkMode ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'}`}>{item.label}</Link>
            )
          ))}
          <div className="flex items-center gap-3 pt-3 px-4">
            <button onClick={toggleDarkMode} className={`p-2 rounded-xl ${darkMode ? 'text-yellow-400' : 'text-gray-500'}`}>
              {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
            </button>
            {isAuthenticated ? (
              <button onClick={() => { dispatch(logout()); navigate('/'); setIsOpen(false); }}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-brand-500 text-white">Logout</button>
            ) : (
              <button onClick={() => { navigate('/login'); setIsOpen(false); }}
                className="px-5 py-2 rounded-xl text-sm font-semibold bg-brand-500 text-white">Get Started</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
