import React, { useContext } from 'react';
import { DarkModeContext } from '../DarkModeContext';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    const { darkMode } = useContext(DarkModeContext);

    const socialLinks = [
        { icon: <FaFacebookF size={20} />, url: "#", color: "hover:bg-blue-600" },
        { icon: <FaTwitter size={20} />, url: "#", color: "hover:bg-blue-400" },
        { icon: <FaInstagram size={20} />, url: "#", color: "hover:bg-pink-600" },
        { icon: <FaLinkedinIn size={20} />, url: "#", color: "hover:bg-blue-700" },
    ];

    return (
        <footer className={`${darkMode ? 'bg-transparent text-gray-200' :'border-t-2 bg-transparent text-gray-800'} py-12`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <img src="/logo.png" alt="Logo" className="w-10 h-10" />
                            <h3 className="text-xl font-bold">Smart Bill</h3>
                        </div>
                        <p className="text-sm">
                            Streamlining your billing process with smart solutions.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {['Dashboard', 'Inventory', 'Bills', 'Reports'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-sm hover:text-blue-500 transition-colors duration-300">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <div className="space-y-2">
                            <a href="mailto:info@smartbill.com" className="flex items-center space-x-2 text-sm">
                                <FaEnvelope />
                                <span>info@smartbill.com</span>
                            </a>
                            <a href="tel:+1234567890" className="flex items-center space-x-2 text-sm">
                                <FaPhone />
                                <span>+1 234 567 890</span>
                            </a>
                            <div className="flex items-center space-x-2 text-sm">
                                <FaMapMarkerAlt />
                                <span>123 Business Street</span>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
                        <div className="space-y-4">
                            <p className="text-sm">Subscribe for updates</p>
                            <div className="flex">
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    className={`flex-1 px-3 py-2 text-sm border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} rounded-l focus:outline-none`}
                                />
                                <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-r hover:bg-blue-600">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 flex justify-center space-x-4">
                    {socialLinks.map((social, index) => (
                        <a
                            key={index}
                            href={social.url}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-gray-700/20 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Smart Bill. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;