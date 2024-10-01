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
import ForgotPassword from './components/ForgotPassword';
import PaymentSuccess from "./components/PaymentSuccess"
import ResetPassword from './components/ResetPassword';
import Signup from './components/Signup';
import InventoryApp from './components/InventoryApp';
import AllInventory from './Dashboard/AllInventory';
import LowStock from './Dashboard/LowStock';
import FeedbackForm from './Dashboard/FeedbackForm';
import CategoryForm from './Dashboard/CategoryForm';
import SubcategoryForm from './Dashboard/SubcategoryForm';

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
                {/* <FeedbackForm/> */}
                  <HeroSection />
                  <AboutUs />
                  <InfoCard />
                  <Organizers />
                  <Partners />
                  <Footer />
                </>
              } />
              {/* <Route path="pay-success" element={<PaymentSuccess/>}/> */}

              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/signup" element={<Signup />} />

              {/* Dashboard Routes with common layout */}
              <Route path="/dashboard" element={<Layout />}>
                <Route index path="history" element={<History />} />
                {/* <Route path='Bussiness' element={<Busiiness}/> */}
                <Route path="addinventory" element={<InventoryApp />} />
                <Route path="business" element={<Busiiness />} />
                <Route path="create-bill" element={<CreateBill />} />
                <Route path="stock-details" element={<Stock />} />
                <Route path="all-inventory" element={<AllInventory/>} />
                <Route path="low-inventory" element={<LowStock/>} />
                <Route path="settings" element={<Setting />} />
                <Route path="history/pay-success" element={<PaymentSuccess/>}/>
                <Route path="create-category" element={<CategoryForm/>} />
                <Route path="create_sub-category" element={<SubcategoryForm/>} />
              </Route>
            </Routes>
          </div>
        </div>
      {/* </Router> */}
    </DarkModeProvider>
  );
}
