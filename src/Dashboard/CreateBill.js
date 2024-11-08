import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { faTableCellsLarge } from '@fortawesome/free-solid-svg-icons';

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
      console.log("yser us")
      console.log(user.user._id
      )
  const [userPayments, setUserPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user payments from the backend
    const fetchUserPayments = async () => {
      try {
        const response =await axios.get(`http://localhost:4000/api/v1/pay/getspe/${user.user._id}`);
        console.log(response);
        setUserPayments(response.data.userPayments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user payments:", error);
        setLoading(false);
      }
    };

    fetchUserPayments();
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div className="container mx-auto my-8">
    <h1 className="text-2xl font-bold mb-4">User Payments</h1>
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Amount (₹)</th>
            <th className="px-4 py-2 border">Date and Time</th>
          </tr>
        </thead>
        <tbody>
          {userPayments.length > 0 ? (
            userPayments.map((payment, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">
                  {payment.user.firstName} {payment.user.lastName}
                </td>
                <td className="px-4 py-2 border">{payment.user.email}</td>
                <td className="px-4 py-2 border">{payment.amount}</td>
                <td className="px-4 py-2 border">{formatDate(payment.date)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No payments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>

  );
};

export default CreateBill;
