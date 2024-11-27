import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Redux/action/authActions";
import { DarkModeContext } from "../DarkModeContext";
import axios from "axios"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { darkMode } = useContext(DarkModeContext);
  // const [email, setEmail] = useState('');
  const text= "THANK YOU FOR LOGIN TO THE SMART MANAGMENT BILLING SYSTEM."

  // const handleForgotPassword = async () => {
  //     try {
  //         const res = await axios.post('http://localhost:4000/api/v1/auth/forgot-password', { email,text });
  //         console.log(res)
  //         toast.success(res.data.message);
  //     } catch (err) {
  //         console.log(err)
  //         toast.error(err.response.data.message || 'Error sending password reset email.');
  //     }
  // };
  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      await dispatch(login(email, password));
      toast.success("Logged in successfully");
      const res = await axios.post('http://localhost:4000/api/v1/auth/forgot-password', { email,text });
      console.log(res)
      toast.success(res.data.message);
      navigate("/dashboard/all-inventory");
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleForgotPassword = () => {
    navigate("/signup");
  };

  // Dynamic classes based on dark mode
  const containerClass = darkMode ? "bg-transparent text-green-500" : "bg-gray-100 text-gray-900";
  const inputClass = darkMode
    ? "bg-transparent text-green-800 border-green-500 focus:ring-green-500"
    : "bg-white text-gray-900 border-gray-300 focus:ring-blue-500";
  const buttonClass = darkMode
    ? "bg-green-700 hover:bg-green-800 text-white"
    : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white";

  return (
    <div className={`flex justify-center items-center min-h-screen ${containerClass}`}>
      <div className={`flex flex-col lg:flex-row bg-white rounded-lg shadow-lg p-6 lg:p-8 w-full max-w-6xl h-auto lg:h-[600px] ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        {/* Left side - Login Form */}
        <div className="w-full lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 lg:mb-8 text-center lg:text-left">
            Welcome Back
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-center lg:text-left mb-8 lg:mb-10">
            Login to your account to continue
          </p>

          <div className="mb-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 md:px-6 md:py-4 border-2 text-base md:text-lg rounded-lg focus:outline-none transition-all ${inputClass}`}
            />
          </div>

          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 md:px-6 md:py-4 border-2 text-base md:text-lg rounded-lg focus:outline-none transition-all pr-10 ${inputClass}`}
            />
            <span
              className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="text-green-500"
              />
            </span>
          </div>

          <button
            className={`w-full font-bold py-3 px-4 rounded-lg transition-all ${buttonClass}`}
            onClick={handleLogin}
          >
            Log In
          </button>

          <div className="mt-4 text-center">
            <a
              href="#"
              className={`hover:underline ${darkMode ? "text-green-400" : "text-blue-500"}`}
              onClick={handleForgotPassword}
            >
              Sign up?
            </a>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="w-full lg:w-1/2 p-6 flex items-center justify-center">
          <img
            src="https://www.shutterstock.com/image-vector/professional-businesswoman-working-her-computer-600nw-2215180615.jpg"
            alt="Login Illustration"
            className="w-full h-full max-h-[600px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
