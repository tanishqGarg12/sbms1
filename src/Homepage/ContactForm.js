import React, { useState, useContext } from 'react';
import axios from 'axios';
import { DarkModeContext } from '../DarkModeContext';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaDiscord } from 'react-icons/fa';

const ContactForm = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState({ msg: '', type: '' });
  const [loading, setLoading] = useState(false);
  const { darkMode } = useContext(DarkModeContext);

  const update = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setStatus({ msg: 'Message sent successfully!', type: 'success' });
      setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setStatus({ msg: 'Error sending message. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 focus:outline-none focus:ring-2 ${
    darkMode
      ? 'bg-gray-800 border-gray-700 text-white focus:ring-green-500 focus:border-green-500 placeholder-gray-500'
      : 'bg-gray-50 border-gray-200 text-gray-900 focus:ring-[#029c78] focus:border-[#029c78] placeholder-gray-400'
  }`;

  const subjects = ['General Inquiry', 'Support', 'Feedback', 'Others'];

  const contactInfo = [
    { icon: <FaPhone />, text: '+1012 3456 789' },
    { icon: <FaEnvelope />, text: 'demo@gmail.com' },
    { icon: <FaMapMarkerAlt />, text: '132 Dartmouth Street, Boston, MA 02156' },
  ];

  const socials = [
    { icon: <FaFacebookF />, url: 'https://www.facebook.com' },
    { icon: <FaTwitter />, url: 'https://twitter.com' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com' },
    { icon: <FaDiscord />, url: 'https://discord.com' },
  ];

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 pt-24 pb-12 ${darkMode ? 'bg-transparent' : 'bg-gray-50'}`}>
      <div className={`w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>

        {/* Left - Contact Info */}
        <div className={`md:w-5/12 p-8 md:p-10 flex flex-col justify-between ${darkMode ? 'bg-green-500/10' : 'bg-[#029c78]'}`}>
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-white'}`}>Get in touch</h2>
            <p className={`text-sm mt-2 mb-10 ${darkMode ? 'text-green-300/70' : 'text-white/80'}`}>We'd love to hear from you. Send us a message!</p>

            <div className="space-y-5">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-green-500/20 text-green-400' : 'bg-white/20 text-white'}`}>
                    {item.icon}
                  </div>
                  <span className={`text-sm mt-2.5 ${darkMode ? 'text-gray-300' : 'text-white/90'}`}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-10">
            {socials.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition ${
                  darkMode ? 'bg-gray-800 text-green-400 hover:bg-green-500 hover:text-gray-900' : 'bg-white/20 text-white hover:bg-white hover:text-[#029c78]'
                }`}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right - Form */}
        <div className="md:w-7/12 p-8 md:p-10">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Send a message</h2>
          <p className={`text-sm mt-1 mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Fill out the form and we'll get back to you shortly</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={update} className={inputClass} />
              <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={update} className={inputClass} />
            </div>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={update} className={inputClass} />
            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={update} className={inputClass} />

            {/* Subject Pills */}
            <div>
              <p className={`text-xs font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Subject</p>
              <div className="flex flex-wrap gap-2">
                {subjects.map((s) => (
                  <button key={s} type="button" onClick={() => setFormData({ ...formData, subject: s })}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                      formData.subject === s
                        ? darkMode ? 'bg-green-500 text-gray-900' : 'bg-[#029c78] text-white'
                        : darkMode ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <textarea name="message" placeholder="Your message..." value={formData.message} onChange={update} rows="4"
              className={`${inputClass} resize-none`} />

            <button type="submit" disabled={loading}
              className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                loading ? 'opacity-60 cursor-not-allowed' : ''
              } ${darkMode ? 'bg-green-500 hover:bg-green-400 text-gray-900' : 'bg-[#029c78] hover:bg-[#028a6b] text-white'}`}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {status.msg && (
            <p className={`text-center text-sm mt-4 font-medium ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {status.msg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
