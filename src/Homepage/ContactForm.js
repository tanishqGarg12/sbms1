import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faInstagram, faDiscord, faFacebook } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import { DarkModeContext } from '../DarkModeContext';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const { darkMode } = useContext(DarkModeContext);

  // Handle form data change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      setStatusMessage('Message sent successfully!');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' }); // Clear form
    } catch (error) {
      setStatusMessage('Error sending message. Please try again.');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-5 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`shadow-lg rounded-lg p-10 max-w-6xl w-full flex flex-col md:flex-row h-auto transition-colors duration-300 ${darkMode ? 'bg-gray-800 text-green-500' : 'bg-white text-gray-900'}`}>
        {/* Contact Information Section */}
        <div className={`p-8 rounded-lg md:w-1/2 flex flex-col justify-between ${darkMode ? 'bg-gray-700 text-green-500' : 'bg-black text-white'}`}>
          <div>
            <h2 className="text-3xl font-semibold mb-4">Contact Information</h2>
            <p className="mb-8">Say something to start a live chat!</p>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faPhone} />
                <span>+1012 3456 789</span>
              </li>
              <li className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faEnvelope} />
                <span>demo@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span>132 Dartmouth Street, Boston, MA 02156, United States</span>
              </li>
            </ul>
          </div>
          {/* Social Media Links */}
          <div className="flex space-x-4 mt-8">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl cursor-pointer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl cursor-pointer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl cursor-pointer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-xl cursor-pointer">
              <FontAwesomeIcon icon={faDiscord} />
            </a>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8 md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-6">Any question or remarks? Just write us a message!</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <label className="block">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full border rounded px-3 py-2 focus:outline-none transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                  />
                </div>
                <div className="flex-1">
                  <label className="block">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full border rounded px-3 py-2 focus:outline-none transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                  />
                </div>
              </div>
              <div>
                <label className="block">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full border rounded px-3 py-2 focus:outline-none transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                />
              </div>
              <div>
                <label className="block">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full border rounded px-3 py-2 focus:outline-none transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                />
              </div>
              <div>
                <label className="block">Select Subject</label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="subject" value="General Inquiry" onChange={handleInputChange} />
                    <span>General Inquiry</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="subject" value="Support" onChange={handleInputChange} />
                    <span>Support</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="subject" value="Feedback" onChange={handleInputChange} />
                    <span>Feedback</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="subject" value="Others" onChange={handleInputChange} />
                    <span>Others</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full border rounded px-3 py-2 focus:outline-none transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
                  rows="4"
                ></textarea>
              </div>
              <button
                type="submit"
                className={`w-full py-3 rounded hover:bg-gray-800 transition duration-200 ${darkMode ? 'bg-green-600 text-white' : 'bg-black text-white'}`}
              >
                Send Message
              </button>
            </form>
          </div>
          {statusMessage && <div className="mt-4 text-center">{statusMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;