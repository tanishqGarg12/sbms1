import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaHistory, FaFileInvoiceDollar, FaBoxOpen, FaCog, FaPlus, FaExclamationTriangle, FaLayerGroup, FaTags } from 'react-icons/fa';
import { DarkModeContext } from '../DarkModeContext';
import { useSelector } from 'react-redux';

const Main = () => {
  const { darkMode } = useContext(DarkModeContext);
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.user?.role === 'admin';

  const NavLink = ({ to, icon: Icon, label }) => {
    const active = location.pathname === to;
    return (
      <Link to={to} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
        active
          ? darkMode ? 'bg-green-500/20 text-green-400' : 'bg-[#029c78]/10 text-[#029c78]'
          : darkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}>
        <Icon className={`text-base ${active ? (darkMode ? 'text-green-400' : 'text-[#029c78]') : ''}`} />
        {label}
      </Link>
    );
  };

  const SectionLabel = ({ children }) => (
    <p className={`px-4 pt-5 pb-1 text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>{children}</p>
  );

  return (
    <aside className={`fixed top-[72px] left-0 w-60 h-[calc(100vh-72px)] overflow-y-auto border-r transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
    }`}>
      <div className="p-4 space-y-1">
        <SectionLabel>Overview</SectionLabel>
        {isAdmin && <NavLink to="/dashboard/business" icon={FaHome} label="Business Overview" />}
        <NavLink to="/dashboard/all-inventory" icon={FaBoxOpen} label="All Inventory" />
        <NavLink to="/dashboard/low-inventory" icon={FaExclamationTriangle} label="Low Stock" />

        {isAdmin && (
          <>
            <SectionLabel>Manage</SectionLabel>
            <NavLink to="/dashboard/addinventory" icon={FaPlus} label="Add Stock" />
            <NavLink to="/dashboard/stock-details" icon={FaLayerGroup} label="Stock Details" />
            <NavLink to="/dashboard/create-category" icon={FaTags} label="Categories" />
            <NavLink to="/dashboard/create_sub-category" icon={FaTags} label="Subcategories" />
          </>
        )}

        <SectionLabel>Billing</SectionLabel>
        <NavLink to="/dashboard/history" icon={FaFileInvoiceDollar} label="Create Bill" />
        <NavLink to="/dashboard/create-bill" icon={FaHistory} label="History" />

        <SectionLabel>Account</SectionLabel>
        <NavLink to="/dashboard/settings" icon={FaCog} label="Settings" />
      </div>
    </aside>
  );
};

export default Main;
