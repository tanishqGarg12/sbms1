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
      <div className={`animate-spin w-8 h-8 border-[3px] rounded-full border-t-transparent ${darkMode ? 'border-brand-400' : 'border-brand-500'}`} />
    </div>
  );
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  const thClass = `px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-gray-600' : 'text-gray-300'}`;
  const tdClass = `px-4 py-3.5 text-sm`;

  return (
    <div className={darkMode ? 'text-gray-200' : 'text-gray-900'}>
      <h1 className={`text-2xl font-black mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Stock Details</h1>
      {data.map((category, i) => (
        <div key={i} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-sm font-bold">{category._id.category} / {category._id.subcategory}</h2>
            <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${darkMode ? 'bg-brand-500/10 text-brand-400' : 'bg-brand-50 text-brand-600'}`}>
              {category.totalQuantity} total
            </span>
          </div>
          <div className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-100 shadow-sm'}`}>
            <table className="w-full">
              <thead className={darkMode ? 'bg-gray-900' : 'bg-gray-50/50'}>
                <tr>
                  <th className={thClass}>Name</th><th className={thClass}>Added</th><th className={thClass}>Updated</th>
                  <th className={thClass}>Qty</th><th className={thClass}>Purchase ₹</th><th className={thClass}>Selling ₹</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-gray-800' : 'divide-gray-50'}`}>
                {category.items.map((item, idx) => (
                  <tr key={idx} className={`transition ${darkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50/50'}`}>
                    <td className={`${tdClass} font-semibold`}>{item.name}</td>
                    <td className={`${tdClass} ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{new Date(item.addedTime).toLocaleDateString()}</td>
                    <td className={`${tdClass} ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{new Date(item.updatedTime).toLocaleDateString()}</td>
                    <td className={tdClass}>{item.quantity}</td>
                    <td className={tdClass}>₹{item.purchasedPrice}</td>
                    <td className={`${tdClass} font-semibold text-brand-500`}>₹{item.sellingPrice}</td>
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
