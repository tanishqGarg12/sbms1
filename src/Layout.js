import React, { useEffect, useContext } from 'react';
import Main from './Dashboard/Main';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DarkModeContext } from './DarkModeContext';

const Layout = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    if (!user) { toast.error('You need to login first'); navigate('/login'); }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex pt-[72px]">
        <Main />
        <main className={`flex-1 ml-60 min-h-screen p-8 transition-colors duration-300 ${
          darkMode ? 'bg-gray-950' : 'bg-gray-50'
        }`}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
