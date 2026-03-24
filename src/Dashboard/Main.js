import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaFileInvoiceDollar, FaBoxOpen, FaCog, FaPlus, FaExclamationTriangle, FaLayerGroup, FaTags, FaHistory, FaChevronRight } from 'react-icons/fa';
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
      <Link to={to} className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
        active
          ? darkMode ? 'bg-brand-500/10 text-brand-400' : 'bg-brand-50 text-brand-600'
          : darkMode ? 'text-gray-500 hover:text-gray-300 hover:bg-white/5' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
      }`}>
        <Icon size={15} className={active ? (darkMode ? 'text-brand-400' : 'text-brand-500') : ''} />
        <span className="flex-1">{label}</span>
        {active && <FaChevronRight size={8} className="opacity-40" />}
      </Link>
    );
  };

  const SectionLabel = ({ children }) => (
    <p className={`px-3 pt-6 pb-2 text-[10px] font-bold uppercase tracking-[0.15em] ${darkMode ? 'text-gray-700' : 'text-gray-300'}`}>{children}</p>
  );

  return (
    <aside className={`fixed top-[72px] left-0 w-60 h-[calc(100vh-72px)] overflow-y-auto transition-colors duration-300 ${
      darkMode ? 'bg-gray-950 border-r border-gray-800/50' : 'bg-white border-r border-gray-100'
    }`}>
      <div className="p-3 space-y-0.5">
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
