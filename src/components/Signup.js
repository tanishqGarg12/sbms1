import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { DarkModeContext } from '../DarkModeContext';

const Signup = () => {
    const { darkMode } = useContext(DarkModeContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState(false); // Checkbox for role
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSignup = async () => {
        if (!firstName || !lastName || !username || !email || !phone || !password || !confirmPassword) {
            toast.error("Please fill in all fields!", {
                // position: toast.POSITION.TOP_RIGHT,
                // autoClose: 5000,
                // hideProgressBar: false,
                // closeOnClick: true,
                // pauseOnHover: true,
                // draggable: true,
            });
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/v1/auth/signup', {
                firstName,
                lastName,
                username,
                email,
                phone,
                password,
                confirmPassword,
                role: role ? 'admin' : 'user',
            });
            toast.success("Account created successfully!");
            console.log('Signup successful:', response.data);
        } catch (err) {
            toast.error(err);
            // console.error('Error during signup:', err);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center">
            <div className={`rounded-lg shadow-lg p-10 w-full max-w-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500 ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'border-gray-300'}`}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500 ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'border-gray-300'}`}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500 ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'border-gray-300'}`}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500 ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'border-gray-300'}`}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <input
                        type="tel"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500 ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'border-gray-300'}`}
                    />
                </div>
                <div className="mb-4 relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500 pr-10 ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'border-gray-300'}`}
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
                <div className="mb-4 relative">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500 pr-10 ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'border-gray-300'}`}
                    />
                    <span
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        <FontAwesomeIcon
                            icon={showConfirmPassword ? faEyeSlash : faEye}
                            className="text-blue-500"
                        />
                    </span>
                </div>
                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            checked={role}
                            onChange={(e) => setRole(e.target.checked)}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">Sign up as admin</span>
                    </label>
                </div>
                <button
                    className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}
                    onClick={handleSignup}
                >
                    Sign Up
                </button>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Signup;
