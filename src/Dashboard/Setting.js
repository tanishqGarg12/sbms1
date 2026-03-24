import React, { useContext } from 'react';
import { DarkModeContext } from '../DarkModeContext';
import { useSelector } from 'react-redux';
import { FaUser, FaEnvelope, FaShieldAlt } from 'react-icons/fa';

const Setting = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useSelector((state) => state.auth);
  const u = user?.user;

  const InfoRow = ({ icon: Icon, label, value }) => (
    <div className={`flex items-center gap-4 p-4 rounded-2xl ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${darkMode ? 'bg-brand-500/10 text-brand-400' : 'bg-brand-50 text-brand-500'}`}>
        <Icon size={15} />
      </div>
      <div>
        <p className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>{label}</p>
        <p className="text-sm font-semibold mt-0.5">{value || '—'}</p>
      </div>
    </div>
  );

  return (
    <div className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
      <h1 className={`text-2xl font-black mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Settings</h1>

      <div className={`p-8 rounded-3xl ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-100 shadow-sm'}`}>
        <div className={`flex items-center gap-5 mb-8 pb-8 border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black ${
            darkMode ? 'bg-gradient-to-br from-brand-500 to-emerald-400 text-white' : 'bg-gradient-to-br from-brand-500 to-emerald-400 text-white'
          }`}>
            {u?.firstName?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <p className="font-black text-lg">{u?.firstName || 'User'} {u?.lastName || ''}</p>
            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mt-1 ${
              darkMode ? 'bg-brand-500/10 text-brand-400' : 'bg-brand-50 text-brand-600'
            }`}>{u?.role || 'user'}</span>
          </div>
        </div>
        <div className="space-y-3">
          <InfoRow icon={FaUser} label="Full Name" value={`${u?.firstName || ''} ${u?.lastName || ''}`} />
          <InfoRow icon={FaEnvelope} label="Email Address" value={u?.email} />
          <InfoRow icon={FaShieldAlt} label="Account Role" value={u?.role} />
        </div>
      </div>
    </div>
  );
};

export default Setting;
