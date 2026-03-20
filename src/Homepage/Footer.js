import React, { useContext } from 'react';
import { DarkModeContext } from '../DarkModeContext';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
    const { darkMode } = useContext(DarkModeContext);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className={`${darkMode ? 'bg-gray-900/80 text-gray-300' : 'bg-gray-900 text-gray-400'} relative`}>
            {/* Back to top */}
            <div className="flex justify-center">
                <button
                    onClick={scrollToTop}
                    className="w-10 h-10 -mt-5 rounded-full bg-green-500 hover:bg-green-400 text-white flex items-center justify-center shadow-lg transition-all hover:-translate-y-1"
                    aria-label="Back to top"
                >
                    <FaArrowUp size={14} />
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold text-white">Smart Bill</h3>
                        <p className="mt-3 text-sm leading-relaxed">Streamlining your billing process with smart, reliable solutions trusted by businesses everywhere.</p>
                        <div className="flex space-x-3 mt-5">
                            {[
                                { Icon: FaFacebookF, label: 'Facebook' },
                                { Icon: FaTwitter, label: 'Twitter' },
                                { Icon: FaInstagram, label: 'Instagram' },
                                { Icon: FaLinkedinIn, label: 'LinkedIn' },
                            ].map(({ Icon, label }) => (
                                <a key={label} href="/" aria-label={label} className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-500 hover:scale-110 transition-all text-gray-400 hover:text-white">
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
                        <ul className="space-y-2.5">
                            {['Dashboard', 'Inventory', 'Bills', 'Reports'].map((item) => (
                                <li key={item}>
                                    <a href="/" className="text-sm hover:text-green-400 hover:pl-1 transition-all duration-200">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact Us</h4>
                        <div className="space-y-3 text-sm">
                            <a href="mailto:info@smartbill.com" className="flex items-center gap-2.5 hover:text-green-400 transition group">
                                <span className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-green-500/20 transition"><FaEnvelope size={12} /></span>
                                info@smartbill.com
                            </a>
                            <a href="tel:+1234567890" className="flex items-center gap-2.5 hover:text-green-400 transition group">
                                <span className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-green-500/20 transition"><FaPhone size={12} /></span>
                                +1 234 567 890
                            </a>
                            <div className="flex items-center gap-2.5">
                                <span className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center"><FaMapMarkerAlt size={12} /></span>
                                123 Business Street
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Newsletter</h4>
                        <p className="text-sm mb-3">Get the latest updates and tips delivered to your inbox.</p>
                        <div className="flex">
                            <input type="email" placeholder="Your email" className="flex-1 px-3 py-2.5 text-sm bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-500" />
                            <button className="px-5 py-2.5 bg-green-500 text-white text-sm font-semibold rounded-r-lg hover:bg-green-400 transition">Subscribe</button>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs">&copy; {new Date().getFullYear()} Smart Bill. All rights reserved.</p>
                    <div className="flex items-center gap-6 text-xs">
                        <a href="/" className="hover:text-green-400 transition">Privacy Policy</a>
                        <a href="/" className="hover:text-green-400 transition">Terms of Service</a>
                        <a href="/" className="hover:text-green-400 transition">Support</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
