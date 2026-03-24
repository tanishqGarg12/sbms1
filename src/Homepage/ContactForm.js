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
    } catch { setStatus({ msg: 'Error sending message. Please try again.', type: 'error' }); }
    finally { setLoading(false); }
  };

  const inputClass = `w-full px-4 py-3.5 rounded-2xl border text-sm transition-all duration-200 focus:outline-none focus:ring-2 ${
    darkMode
      ? 'bg-gray-800/50 border-gray-700 text-white focus:ring-brand-500 focus:border-brand-500 placeholder-gray-500'
      : 'bg-gray-50 border-gray-200 text-gray-900 focus:ring-brand-500 focus:border-brand-500 placeholder-gray-400'
  }`;

  const subjects = ['General Inquiry', 'Support', 'Feedback', 'Others'];

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 pt-24 pb-12 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className={`absolute inset-0 ${darkMode ? 'mesh-gradient-dark' : 'mesh-gradient'}`} />

      <div className={`relative w-full max-w-5xl rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl ${
        darkMode ? 'bg-gray-900 border border-gray-800 shadow-brand-500/5' : 'bg-white shadow-gray-200/50'
      }`}>
        {/* Left */}
        <div className={`md:w-5/12 p-8 md:p-10 flex flex-col justify-between relative overflow-hidden ${
          darkMode ? 'bg-gradient-to-br from-brand-500/10 to-gray-900' : 'bg-gradient-to-br from-brand-500 to-brand-700'
        }`}>
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <h2 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-white'}`}>Get in touch</h2>
            <p className={`text-sm mt-2 mb-10 ${darkMode ? 'text-gray-400' : 'text-white/70'}`}>We'd love to hear from you!</p>
            <div className="space-y-4">
              {[
                { icon: FaPhone, text: '+1012 3456 789' },
                { icon: FaEnvelope, text: 'demo@gmail.com' },
                { icon: FaMapMarkerAlt, text: '132 Dartmouth Street, Boston' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-white/5 text-brand-400' : 'bg-white/15 text-white'}`}>
                    <item.icon size={14} />
                  </div>
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-white/90'}`}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex gap-2 mt-10">
            {[FaFacebookF, FaTwitter, FaInstagram, FaDiscord].map((Icon, i) => (
              <a key={i} href="/" className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                darkMode ? 'bg-gray-800 text-gray-400 hover:bg-brand-500 hover:text-white' : 'bg-white/15 text-white hover:bg-white hover:text-brand-600'
              }`}><Icon size={13} /></a>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="md:w-7/12 p-8 md:p-10">
          <h2 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Send a message</h2>
          <p className={`text-sm mt-1 mb-6 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Fill out the form and we'll get back to you shortly</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={update} className={inputClass} />
              <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={update} className={inputClass} />
            </div>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={update} className={inputClass} />
            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={update} className={inputClass} />

            <div>
              <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>Subject</p>
              <div className="flex flex-wrap gap-2">
                {subjects.map((s) => (
                  <button key={s} type="button" onClick={() => setFormData({ ...formData, subject: s })}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      formData.subject === s
                        ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                        : darkMode ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}>{s}</button>
                ))}
              </div>
            </div>

            <textarea name="message" placeholder="Your message..." value={formData.message} onChange={update} rows="4" className={`${inputClass} resize-none`} />

            <button type="submit" disabled={loading}
              className={`w-full py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 bg-brand-500 text-white hover:bg-brand-400 shadow-lg shadow-brand-500/20 ${
                loading ? 'opacity-60 cursor-not-allowed' : ''
              }`}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {status.msg && (
            <p className={`text-center text-sm mt-4 font-semibold ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {status.msg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
