import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { DarkModeContext } from '../DarkModeContext';

const CreateBill = () => {
  const { user } = useSelector((state) => state.auth);
  const [userPayments, setUserPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useContext(DarkModeContext);

  const formatDate = (d) => new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    (async () => {
      try {
        const url = user?.user?.role === 'admin'
          ? 'https://backend-sbms.onrender.com/api/v1/pay/getAllUserPayments'
          : `https://backend-sbms.onrender.com/api/v1/pay/getspe/${user?.user?._id}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setUserPayments(data.userPayments || []);
      } catch { setUserPayments([]); }
      finally { setLoading(false); }
    })();
  }, [user]);

  const thClass = `px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`;
  const tdClass = `px-5 py-4 text-sm ${darkMode ? 'border-gray-700' : 'border-gray-100'}`;

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className={`animate-spin w-8 h-8 border-4 rounded-full border-t-transparent ${darkMode ? 'border-green-400' : 'border-[#029c78]'}`} />
    </div>
  );

  return (
    <div className={darkMode ? 'text-gray-200' : 'text-gray-900'}>
      <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Payment History</h1>

      <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
              <tr>
                <th className={thClass}>Name</th>
                <th className={thClass}>Email</th>
                <th className={thClass}>Amount</th>
                <th className={thClass}>Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {userPayments.length > 0 ? userPayments.map((p, i) => (
                <tr key={i} className={`transition ${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}>
                  <td className={`${tdClass} font-medium`}>{p.user?.firstName} {p.user?.lastName}</td>
                  <td className={`${tdClass} ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{p.user?.email}</td>
                  <td className={`${tdClass} font-semibold text-[#029c78]`}>₹{p.amount}</td>
                  <td className={`${tdClass} ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{formatDate(p.date)}</td>
                </tr>
              )) : (
                <tr><td colSpan="4" className="text-center py-12 text-gray-500">No payments found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateBill;
