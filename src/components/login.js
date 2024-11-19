import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/action/authActions';
import axios from 'axios'
import rupee from "./Assets/LOGIN.png";  // Adjust path if necessary

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const text= "THANK YOU FOR LOGIN TO THE SMART MANAGMENT BILLING SYSTEM."
    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Please fill in all fields!");
            return;
        }

        try {
            await dispatch(login(email, password));
            const res = await axios.post('http://localhost:4000/api/v1/auth/forgot-password', { email,text });
            console.log(res)
            toast.success(res.data.message);
            toast.success("Logged in successfully");
            navigate("/dashboard/all-inventory");
        } catch (err) {
            toast.error("Login failed. Please check your credentials.");
        }
    };

    const handleForgotPassword = () => {
        navigate("/forgot-password");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg w-full max-w-6xl h-auto lg:h-[600px]">
                <div 
                    className="w-full lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center relative"
                    style={{
                        backgroundImage: `url(${rupee})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                
                {/* Left side - Login Form with Background Image */}
                    <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 lg:mb-8 text-white text-center lg:text-left">
                            Welcome Back
                        </h2>
                        <p className="text-white text-sm md:text-base lg:text-lg text-center lg:text-left mb-8 lg:mb-10">
                            Login to your account to continue
                        </p>

                        <div className="mb-6">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 md:px-6 md:py-4 border-2 border-gray-300 text-base md:text-lg rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>

                        <div className="mb-6 relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 md:px-6 md:py-4 border-2 border-gray-300 text-base md:text-lg rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all pr-10"
                            />
                            <span
                                className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    className="text-blue-500"
                                />
                            </span>
                        </div>

                        <button
                            className="w-full bg-[#029C78] text-white font-bold py-3 px-4 rounded-lg transition-all hover:bg-blue-600"
                            onClick={handleLogin}
                        >
                            Log In
                        </button>

                        <div className="mt-4 text-center">
                            <a
                                href="#"
                                className="text-blue-200 hover:text-blue-300"
                                onClick={handleForgotPassword}
                            >
                                Forgot Password?
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right side - Image */}
                <div className="w-full lg:w-1/2 p-6 flex items-center justify-center">
                    <img 
                        src="https://cdni.iconscout.com/illustration/premium/thumb/login-illustration-download-in-svg-png-gif-file-formats--select-an-account-join-the-forum-password-digital-marketing-pack-business-illustrations-8333958.png?f=webp"
                        alt="Login Illustration"
                        className="w-full h-auto max-h-[600px] object-cover roundezd-lg shadow-lg"
                    />
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
