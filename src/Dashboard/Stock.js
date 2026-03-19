import React, { useEffect, useState, useContext } from "react";
import { DarkModeContext } from "../DarkModeContext";

const Stock = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://backend-sbms.onrender.com/api/v1/inventory/getallinventoryc");
        if (!res.ok) throw new Error("Failed to fetch");
        setData(await res.json());
      } catch (err) { setError(err.message); }
      finally { setLoading(false); }
    })();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className={`animate-spin w-8 h-8 border-4 rounded-full border-t-transparent ${darkMode ? 'border-green-400' : 'border-[#029c78]'}`} />
    </div>
  );
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  const thClass = `px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`;
  const tdClass = `px-4 py-3 text-sm ${darkMode ? 'border-gray-700' : 'border-gray-100'}`;

  return (
    <div className={darkMode ? 'text-gray-200' : 'text-gray-900'}>
      <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Stock Details</h1>
      {data.map((category, i) => (
        <div key={i} className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-base font-bold">{category._id.category} / {category._id.subcategory}</h2>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${darkMode ? 'bg-green-500/20 text-green-400' : 'bg-[#029c78]/10 text-[#029c78]'}`}>
              Total: {category.totalQuantity}
            </span>
          </div>
          <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
            <table className="w-full">
              <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
                <tr>
                  <th className={thClass}>Name</th>
                  <th className={thClass}>Added</th>
                  <th className={thClass}>Updated</th>
                  <th className={thClass}>Qty</th>
                  <th className={thClass}>Purchase ₹</th>
                  <th className={thClass}>Selling ₹</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {category.items.map((item, idx) => (
                  <tr key={idx} className={`transition ${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}>
                    <td className={`${tdClass} font-medium`}>{item.name}</td>
                    <td className={tdClass}>{new Date(item.addedTime).toLocaleDateString()}</td>
                    <td className={tdClass}>{new Date(item.updatedTime).toLocaleDateString()}</td>
                    <td className={tdClass}>{item.quantity}</td>
                    <td className={tdClass}>₹{item.purchasedPrice}</td>
                    <td className={tdClass}>₹{item.sellingPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stock;
