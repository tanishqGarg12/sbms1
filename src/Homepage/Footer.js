import React, { useContext } from 'react';
import { DarkModeContext } from '../DarkModeContext';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <footer className={`${darkMode ? 'bg-gray-900/80 text-gray-300' : 'bg-gray-900 text-gray-400'} pt-16 pb-8`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div>
                        <h3 className="text-xl font-bold text-white">Smart Bill</h3>
                        <p className="mt-3 text-sm leading-relaxed">Streamlining your billing process with smart solutions.</p>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {['Dashboard', 'Inventory', 'Bills', 'Reports'].map((item) => (
                                <li key={item}><a href="#" className="text-sm hover:text-green-400 transition">{item}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h4>
                        <div className="space-y-3 text-sm">
                            <a href="mailto:info@smartbill.com" className="flex items-center gap-2 hover:text-green-400 transition"><FaEnvelope className="flex-shrink-0" /> info@smartbill.com</a>
                            <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-green-400 transition"><FaPhone className="flex-shrink-0" /> +1 234 567 890</a>
                            <div className="flex items-center gap-2"><FaMapMarkerAlt className="flex-shrink-0" /> 123 Business Street</div>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Newsletter</h4>
                        <p className="text-sm mb-3">Subscribe for updates</p>
                        <div className="flex">
                            <input type="email" placeholder="Email" className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-green-500 text-white" />
                            <button className="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-r-lg hover:bg-green-400 transition">Go</button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs">&copy; {new Date().getFullYear()} Smart Bill. All rights reserved.</p>
                    <div className="flex space-x-3">
                        {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                            <a key={i} href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-500 transition text-gray-400 hover:text-white">
                                <Icon size={14} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
