import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../DarkModeContext';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [email, setEmail] = useState('');
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }
    toast.success('Thanks for subscribing!');
    setEmail('');
  };

  const quickLinks = [
    { label: 'Dashboard', to: '/dashboard/all-inventory' },
    { label: 'Inventory', to: '/dashboard/all-inventory' },
    { label: 'Create Bill', to: '/dashboard/history' },
    { label: 'Contact Us', to: '/contact' },
  ];

  const socials = [
    { Icon: FaFacebookF, href: 'https://facebook.com' },
    { Icon: FaTwitter, href: 'https://twitter.com' },
    { Icon: FaInstagram, href: 'https://instagram.com' },
    { Icon: FaLinkedinIn, href: 'https://linkedin.com' },
  ];

  return (
    <footer className={`relative ${darkMode ? 'bg-gray-950 border-t border-gray-800' : 'bg-gray-900'}`}>
      <ToastContainer position="bottom-right" autoClose={2000} />
      <div className="flex justify-center">
        <button onClick={scrollToTop} aria-label="Back to top"
          className="w-10 h-10 -mt-5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white flex items-center justify-center shadow-lg shadow-brand-500/20 transition-all hover:-translate-y-1">
          <FaArrowUp size={12} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white text-xs font-black">SB</div>
              <span className="text-lg font-bold text-white">SmartBill</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">Streamlining your billing process with smart, reliable solutions trusted by businesses everywhere.</p>
            <div className="flex gap-2 mt-6">
              {socials.map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-brand-500 hover:text-white transition-all duration-300">
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-sm text-gray-400 hover:text-brand-400 transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Contact</h4>
            <div className="space-y-3">
              {[
                { icon: FaEnvelope, text: 'info@smartbill.com', href: 'mailto:info@smartbill.com' },
                { icon: FaPhone, text: '+1 234 567 890', href: 'tel:+1234567890' },
                { icon: FaMapMarkerAlt, text: '123 Business Street' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-500 flex-shrink-0">
                    <item.icon size={11} />
                  </span>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-gray-400 hover:text-brand-400 transition-colors">{item.text}</a>
                  ) : (
                    <span className="text-sm text-gray-400">{item.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Get the latest updates delivered to your inbox.</p>
            <form onSubmit={handleNewsletter} className="flex">
              <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 text-sm bg-gray-800 border border-gray-700 rounded-l-xl focus:outline-none focus:border-brand-500 text-white placeholder-gray-500" />
              <button type="submit" className="px-5 py-3 bg-brand-500 text-white text-sm font-bold rounded-r-xl hover:bg-brand-400 transition-colors">
                →
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} SmartBill. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <Link to="/about" className="hover:text-brand-400 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-brand-400 transition-colors">Contact</Link>
            <Link to="/signup" className="hover:text-brand-400 transition-colors">Sign Up</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
