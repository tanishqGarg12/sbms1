import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { login } from '../Redux/action/authActions'; // Import login action

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Get dispatch function

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Please fill in all fields!");
            return;
        }

        try {
            await dispatch(login(email, password)); // Dispatch login action
            toast.success("Logged in successfully");
            navigate("/dashboard"); // Redirect to dashboard
        } catch (err) {
            toast.error("Login failed. Please check your credentials.");
        }
    };

    const handleForgotPassword = () => {
        navigate("/forgot-password"); // Navigate to forgot password page
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white rounded-lg shadow-black p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Welcome Back</h2>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4 relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 pr-10"
                    />
                    <span
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            className="text-blue-500"
                        />
                    </span>
                </div>
                <button
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleLogin}
                >
                    Log In
                </button>
                <div className="mt-4 text-center">
                    <a
                        href="#"
                        className="text-blue-500 hover:text-blue-600"
                        onClick={handleForgotPassword}
                    >
                        Forgot Password?
                    </a>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
