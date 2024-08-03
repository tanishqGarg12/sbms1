import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCreditCard, faUniversity, faMoneyCheckAlt, faBank } from '@fortawesome/free-solid-svg-icons';
import { DarkModeContext } from '../DarkModeContext';

const transactions = [
  {
      id: '880000909090908909809809809809809809809',
      date: '04:12 PM, 28 Feb',
      orderId: 'PYTM_BLINK_1234567890',
      paymentSource: 'Net Banking',
      gatewayName: 'Paytm',
      amount: '₹800',
      status: 'Success',
  },
  {
      id: '880000909090908909809809809809809809809',
      date: '04:12 PM, 28 Feb',
      orderId: 'PYTM_BLINK_1234567890',
      paymentSource: 'Net Banking',
      gatewayName: 'Paytm',
      amount: '₹800',
      status: 'Success',
  },
  {
      id: '880000909090908909809809809809809809809',
      date: '04:12 PM, 28 Feb',
      orderId: 'PYTM_BLINK_1234567890',
      paymentSource: 'EMI',
      gatewayName: 'Paytm',
      amount: '₹8,800',
      status: 'Success',
  },
  {
      id: '880000909090908909809809809809809809809',
      date: '04:12 PM, 28 Feb',
      orderId: 'PYTM_BLINK_1234567890',
      paymentSource: 'EMI',
      gatewayName: 'Paytm',
      amount: '₹800',
      status: 'Success',
  },
];

const History = () => {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className={`min-h-screen p-8 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-200 to-purple-300'}`}>
            <div className={`max-w-7xl mx-auto p-8 rounded-lg shadow-lg transition-colors duration-300 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}>
                <h1 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-800'} text-center`}>Payments</h1>
                <div className={`flex justify-between p-4 rounded-md shadow-md mb-8 transition-colors duration-300 ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                    <div>
                        <p className="font-medium"><span className="font-bold">Duration:</span> 1 May, 00:00 AM - 8 May, 11:30 PM</p>
                        <p className="font-medium"><span className="font-bold">Status:</span> Success</p>
                    </div>
                    <div>
                        <p className="font-medium"><span className="font-bold">Total Payments:</span> ₹1,00,000</p>
                        <p className="font-medium"><span className="font-bold">Transactions:</span> 1200</p>
                    </div>
                </div>
                <div className={`overflow-x-auto p-6 rounded-md shadow-md transition-colors duration-300 ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'}`}>
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className={`transition-colors duration-300 ${darkMode ? 'bg-gray-500 text-white' : 'bg-gray-300 text-gray-700'}`}>
                                <th className="py-3 px-4 text-left font-semibold">Transaction ID</th>
                                <th className="py-3 px-4 text-left font-semibold">Date</th>
                                <th className="py-3 px-4 text-left font-semibold">Order ID</th>
                                <th className="py-3 px-4 text-left font-semibold">Payment Source</th>
                                <th className="py-3 px-4 text-left font-semibold">Gateway Name</th>
                                <th className="py-3 px-4 text-left font-semibold">Amount</th>
                                <th className="py-3 px-4 text-left font-semibold">Success</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction.id} className={`transition-colors duration-300 ${darkMode ? 'bg-gray-500 odd:bg-gray-600 hover:bg-gray-400' : 'bg-white odd:bg-gray-100 hover:bg-gray-200'}`}>
                                    <td className="py-3 px-4 flex items-center">
                                        {transaction.id}
                                    </td>
                                    <td className="py-3 px-4">{transaction.date}</td>
                                    <td className="py-3 px-4">{transaction.orderId}</td>
                                    <td className="py-3 px-4 flex items-center">
                                        <FontAwesomeIcon icon={transaction.paymentSource === 'Net Banking' ? faBank : faMoneyCheckAlt} className="mr-2" />
                                        {transaction.paymentSource}
                                    </td>
                                    <td className="py-3 px-4">{transaction.gatewayName}</td>
                                    <td className="py-3 px-4">{transaction.amount}</td>
                                    <td className="py-3 px-4 flex items-center">
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default History;