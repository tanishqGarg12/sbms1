import React from 'react';
import Main from './Dashboard/Main';
import { Outlet } from 'react-router-dom'; // Only import Outlet, no need for Route or nested Routes

const Layout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Main className="sidebar" style={{ position: 'fixed', width: '250px', height: '100vh' }} />
      <main style={{ marginLeft: '250px', padding: '1rem', width: 'calc(100% - 250px)' }}>
        <Outlet /> {/* This will render the nested routes */}
      </main>
    </div>
  );
};

export default Layout;