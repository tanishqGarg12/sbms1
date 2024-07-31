import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Please fill in all fields!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        try {
            // Replace with your actual API endpoint
            const response = await axios.post('/api/login', { email, password });
            console.log('Login successful:', response.data);
            // Handle successful login (e.g., redirect or store user info)
        } catch (err) {
            toast.error("Login failed. Please check your credentials.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4 relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 pr-10"
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
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleLogin}
                >
                    Log In
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;