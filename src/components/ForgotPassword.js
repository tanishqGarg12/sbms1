import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleForgotPassword = async () => {
        try {
            const res = await axios.post('http://localhost:4000/api/v1/auth/forgot-password', { email });
            toast.success(res.data.message);
        } catch (err) {
            toast.error(err.response.data.message || 'Error sending password reset email.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white rounded-lg shadow-black p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Forgot Password</h2>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleForgotPassword}
                >
                    Send Reset Email
                </button>
                <ToastContainer />
            </div>
        </div>
    );
};

export default ForgotPassword;
