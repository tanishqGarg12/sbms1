import React from 'react';
import './App.css';
import ParticlesBackground from './components/ParticlesBackground';
import Navbar from './Homepage/Navbar';
import HeroSection from './Homepage/HeroSection';
import InfoCard from './Homepage/InfoCard';
import Organizers from './Homepage/Organizers';
import Partners from './Homepage/Partners';
import Footer from './Homepage/Footer';
import AboutUs from './Homepage/About';
import { DarkModeProvider } from './DarkModeContext';
import Layout from './Layout';
import History from './Dashboard/History';
import CreateBill from './Dashboard/CreateBill';
import Setting from './Dashboard/Setting';
import Stock from './Dashboard/Stock';
import Busiiness from './Dashboard/Busiiness';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './components/Login';
// import Login from './components/login';
// import Login from "./components/Login"
import Login from './components/login';
import Signup from './components/Signup';
import InventoryApp from './components/InventoryApp';

export default function App() {
  return (
    <DarkModeProvider>
      {/* <Router> */}
        <div className='relative w-full h-screen'>
          <ParticlesBackground id="particles" />
          <div className='relative z-10'>
            <Navbar />
            <Routes>
              {/* Homepage Routes */}
              <Route path="/" element={
                <>
                  <HeroSection />
                  <AboutUs />
                  <InfoCard />
                  <Organizers />
                  <Partners />
                  <Footer />
                </>
              } />

              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
                <Route path="inventory" element={<InventoryApp />} />

              {/* Dashboard Routes with common layout */}
              <Route path="/dashboard" element={<Layout />}>
                <Route index path="history" element={<History />} />
                {/* <Route path='Bussiness' element={<Busiiness}/> */}
                <Route path="business" element={<Busiiness />} />
                <Route path="create-bill" element={<CreateBill />} />
                <Route path="stock-details" element={<Stock />} />
                <Route path="settings" element={<Setting />} />
              </Route>
            </Routes>
          </div>
        </div>
      {/* </Router> */}
    </DarkModeProvider>
  );
}
