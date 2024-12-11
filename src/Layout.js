import React, { useEffect } from 'react';
import Main from './Dashboard/Main';
import { Outlet, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      toast.error('You need to login first'); // Ensure this is being called
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} /> {/* Ensure this is correctly placed */}
      {user ? (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Main className="sidebar" style={{ position: 'fixed', width: '250px', height: 'auto' }} />
          <main style={{ marginLeft: '250px', padding: '1rem', width: 'calc(100% - 250px)' }}>
            <Outlet /> {/* This will render the nested routes */}
          </main>
        </div>
      ) : null}
    </>
  );
};

export default Layout;
