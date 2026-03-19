import React, { useContext } from 'react';
import { DarkModeContext } from '../DarkModeContext';
import { useSelector } from 'react-redux';
import { FaUser, FaEnvelope, FaShieldAlt } from 'react-icons/fa';

const Setting = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useSelector((state) => state.auth);
  const u = user?.user;

  const InfoRow = ({ icon: Icon, label, value }) => (
    <div className={`flex items-center gap-4 p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${darkMode ? 'bg-green-500/20 text-green-400' : 'bg-[#029c78]/10 text-[#029c78]'}`}>
        <Icon size={16} />
      </div>
      <div>
        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{label}</p>
        <p className="text-sm font-medium">{value || '—'}</p>
      </div>
    </div>
  );

  return (
    <div className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
      <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Settings</h1>

      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold ${darkMode ? 'bg-green-500 text-gray-900' : 'bg-[#029c78] text-white'}`}>
            {u?.firstName?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <p className="font-bold text-lg">{u?.firstName || 'User'} {u?.lastName || ''}</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{u?.role || 'user'}</p>
          </div>
        </div>
        <div className="space-y-3">
          <InfoRow icon={FaUser} label="Name" value={`${u?.firstName || ''} ${u?.lastName || ''}`} />
          <InfoRow icon={FaEnvelope} label="Email" value={u?.email} />
          <InfoRow icon={FaShieldAlt} label="Role" value={u?.role} />
        </div>
      </div>
    </div>
  );
};

export default Setting;
