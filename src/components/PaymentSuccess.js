import React, { useContext } from 'react';
import { DarkModeContext } from '../DarkModeContext';
import successImage from '../../src/Homepage/Assests/success.png'; // Ensure you have a success image in your assets

const PaymentSuccess = () => {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <section className={`py-20 px-4 md:px-8 lg:px-16 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
            <div className="max-w-screen-xl mx-auto">
                <h2 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'} animate__animated animate__fadeInDown`}>
                    Payment Successful!
                </h2>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="animate__animated animate__fadeInLeft">
                        <img
                            src={successImage} // Using the imported success image
                            alt="Payment Success"
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="animate__animated animate__fadeInRight">
                        <h3 className={`text-2xl font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            Thank You for Your Payment!
                        </h3>
                        <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Your payment has been processed successfully. We appreciate your business and look forward to serving you again! 🎉
                        </p>
                        <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            If you have any questions or need further assistance, feel free to contact our support team.
                        </p>
                        <button className={`mt-6 px-6 py-2 rounded-lg font-semibold transition duration-300 ${darkMode ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-green-600 text-white hover:bg-green-700'}`}>
                            Continue purchasing
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaymentSuccess;