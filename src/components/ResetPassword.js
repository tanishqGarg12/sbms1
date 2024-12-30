import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');

    const handleResetPassword = async () => {
        try {
            const res = await axios.post(`https://backend-sbms.onrender.com/api/v1/auth/reset-password/${token}`, { newPassword });
            toast.success(res.data.message);
            navigate('/login'); // Redirect to login after success
        } catch (err) {
            toast.error(err.response.data.message || 'Error resetting password.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white rounded-lg shadow-black p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Reset Password</h2>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleResetPassword}
                >
                    Reset Password
                </button>
                <ToastContainer />
            </div>
        </div>
    );
};

export default ResetPassword;
