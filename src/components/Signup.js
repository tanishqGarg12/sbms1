import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { DarkModeContext } from '../DarkModeContext';
import { Link } from 'react-router-dom';
import ParticlesBackground from './ParticlesBackground';

const Signup = () => {
    const { darkMode } = useContext(DarkModeContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState(false); // Checkbox for role (admin/user)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSignup = async () => {
        if (!firstName || !lastName || !username || !email || !phone || !password || !confirmPassword) {
            toast.error('Please fill in all fields!');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post('https://backend-sbms.onrender.com/api/v1/auth/signup', {
                firstName,
                lastName,
                username,
                email,
                phone,
                password,
                confirmPassword,
                role: role ? 'admin' : 'user',
            });

            toast.success('Account created successfully!');
            console.log('Signup successful:', response.data);

        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message || 'Signup failed');
            } else if (err.request) {
                toast.error('No response from server');
            } else {
                toast.error('An error occurred during signup');
            }
        }
    };

    return (
        <div className={`flex justify-center items-center min-h-screen ${darkMode ? 'bg-transparent' : 'bg-transparent'}`}>
            <ParticlesBackground id="particles" />
            <div className="flex w-full max-w-6xl rounded-lg shadow-lg overflow-hidden">
                {/* Image Section */}
                <div className={`hidden md:flex w-1/2 h-auto justify-center items-center ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <img
                        src="https://factech.co.in/fronts/images/billing-img/recurring-billing-management-system-real-estate.png"
                        alt="Signup Illustration"
                        className="mt-8" // Ensure the image covers its container properly
                    />
                </div>

                {/* Form Section */}
                <div className={`p-10 w-full md:w-1/2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                    <h2 className="text-3xl font-bold mb-6 text-center">Create an Account</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className={`w-full px-4 py-4 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white border-gray-300 text-gray-900'} hover:border-blue-400`}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className={`w-full px-4 py-4 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white border-gray-300 text-gray-900'} hover:border-blue-400`}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={`w-full px-4 py-4 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white border-gray-300 text-gray-900'} hover:border-blue-400`}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-4 py-4 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white border-gray-300 text-gray-900'} hover:border-blue-400`}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <input
                            type="tel"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={`w-full px-4 py-4 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white border-gray-300 text-gray-900'} hover:border-blue-400`}
                        />
                    </div>
                    <div className="mb-3 relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-4 py-4 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white border-gray-300 text-gray-900'} hover:border-blue-400`}
                        />
                        <span
                            className="absolute right-3 top-3 cursor-pointer text-blue-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    <div className="mb-3 relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full px-4 py-4 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white border-gray-300 text-gray-900'} hover:border-blue-400`}
                        />
                        <span
                            className="absolute right-3 top-3 cursor-pointer text-blue-500"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    <div className="mb-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={role}
                                onChange={() => setRole(!role)}
                                className="mr-2"
                            />
                            <span className="text-sm">Register as Admin</span>
                        </label>
                    </div>
                    <button
                        onClick={handleSignup}
                        className={`w-full py-3 text-lg font-semibold rounded-md transition-colors ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-blue-500 text-white hover:bg-blue-400'}`}
                    >
                        Sign Up
                    </button>
                    <div className="text-center mt-4">
                        <Link
                            to="/login"
                            className={`underline ${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:text-blue-500`}
                        >
                            Already have an account? Login here.
                        </Link>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Signup;