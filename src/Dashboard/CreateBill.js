import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { DarkModeContext } from '../DarkModeContext';

const CreateBill = () => {
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const { user } = useSelector((state) => state.auth); // Get the user from Redux store
  console.log("------")
  console.log(user.user.role)
  const [userPayments, setUserPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    // Fetch user payments from the backend
    const fetchUserPayments = async () => {
      try {
        const apiUrl = user.user.role === 'admin'
          ? 'https://backend-sbms.vercel.app/api/v1/pay/getAllUserPayments'
          : `https://backend-sbms.vercel.app/api/v1/pay/getspe/${user.user._id}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUserPayments(data.userPayments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user payments:", error);
        setLoading(false);
      }
    };

    fetchUserPayments();
  }, [user.user.role, user.user._id]);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div className={`container mx-auto my-8 p-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-green-500' : 'bg-white text-gray-900'}`}>
      <h1 className="text-2xl font-bold mb-4 text-center">User Payments</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className={`${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Amount (₹)</th>
              <th className="px-4 py-2 border">Date and Time</th>
            </tr>
          </thead>
          <tbody>
            {userPayments.length > 0 ? (
              userPayments.map((payment, index) => (
                <tr key={index} className={`hover:${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <td className="px-4 py-2 border">{payment.user.firstName} {payment.user.lastName}</td>
                  <td className="px-4 py-2 border">{payment.user.email}</td>
                  <td className="px-4 py-2 border">{payment.amount}</td>
                  <td className="px-4 py-2 border">{formatDate(payment.date)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">No payments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateBill;