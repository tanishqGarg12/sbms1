import React, { useContext, useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { DarkModeContext } from '../DarkModeContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

const Business = ({ items = [] }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [newItems, setNewItems] = useState(0);
  const [purchasedValue, setPurchasedValue] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const [salesValue, setValue] = useState(0);
  const [purchasedItems, setpurchasedItems] = useState(0);
  const soldItems = 8;
  const [purchasesData, setPurchasesData] = useState([]);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const f = (url) => fetch(url).then(r => r.json()).catch(() => null);
    Promise.all([
      f('https://backend-sbms.onrender.com/api/v1/inventory/getnewitems'),
      f('https://backend-sbms.onrender.com/api/v1/inventory/getpurchasedprice'),
      f('https://backend-sbms.onrender.com/api/v1/inventory/getAllInventory'),
      f('https://backend-sbms.onrender.com/api/v1/pay/gettotal'),
      f('https://backend-sbms.onrender.com/api/v1/inventory/getmonthwise'),
      f('https://backend-sbms.onrender.com/api/v1/pay/allsell'),
    ]).then(([ni, pv, ts, tot, mp, sd]) => {
      if (ni) setNewItems(ni.data || 0);
      if (pv?.data?.[0]) { setPurchasedValue(pv.data[0].totalPurchasedValue || 0); setpurchasedItems(pv.data.length); }
      if (ts) setTotalStock(ts.length || 0);
      if (tot) setValue(tot.totalAmount || 0);
      if (mp?.data) setPurchasesData(mp.data.map(i => i.totalPurchasedPrice));
      if (sd?.data) setSalesData(sd.data.map(i => i.totalSellingAmount));
    });
  }, []);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const gridColor = darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
  const textColor = darkMode ? '#6b7280' : '#9ca3af';

  const chartOpts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { labels: { color: textColor, font: { size: 12, family: 'Inter' }, usePointStyle: true, pointStyle: 'circle' } } },
    scales: {
      y: { beginAtZero: true, grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 } } },
      x: { grid: { display: false }, ticks: { color: textColor, font: { size: 11 } } },
    },
  };

  const salesChart = {
    labels: months,
    datasets: [{ label: 'Sales', data: salesData, borderColor: '#029c78', backgroundColor: 'rgba(2,156,120,0.08)', fill: true, tension: 0.4, pointRadius: 0, pointHoverRadius: 5, borderWidth: 2 }],
  };
  const purchasesChart = {
    labels: months,
    datasets: [{ label: 'Purchases', data: purchasesData, borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.08)', fill: true, tension: 0.4, pointRadius: 0, pointHoverRadius: 5, borderWidth: 2 }],
  };

  const stats = [
    { label: 'New Items', value: newItems, color: 'from-blue-500 to-cyan-400', textColor: 'text-blue-500' },
    { label: 'Purchased', value: purchasedItems, color: 'from-brand-500 to-emerald-400', textColor: 'text-brand-500' },
    { label: 'Sold Items', value: soldItems, color: 'from-orange-500 to-amber-400', textColor: 'text-orange-500' },
    { label: 'Purchase Value', value: `₹${purchasedValue.toFixed(0)}`, color: 'from-violet-500 to-purple-400', textColor: 'text-violet-500' },
    { label: 'Sales Value', value: `₹${salesValue.toFixed(0)}`, color: 'from-brand-500 to-emerald-400', textColor: 'text-brand-500' },
    { label: 'Total Stock', value: totalStock, color: 'from-teal-500 to-cyan-400', textColor: 'text-teal-500' },
  ];

  const card = `p-5 rounded-2xl ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-100 shadow-sm'}`;

  return (
    <div className={darkMode ? 'text-gray-200' : 'text-gray-900'}>
      <h1 className={`text-2xl font-black mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Business Overview</h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className={`${card} card-hover`}>
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
              <span className="text-white text-xs font-bold">{i + 1}</span>
            </div>
            <p className={`text-2xl font-black ${s.textColor}`}>{s.value}</p>
            <p className={`text-xs font-medium mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={card}>
          <h3 className="text-sm font-bold mb-4">Yearly Sales</h3>
          <div className="h-72"><Line data={salesChart} options={chartOpts} /></div>
        </div>
        <div className={card}>
          <h3 className="text-sm font-bold mb-4">Yearly Purchases</h3>
          <div className="h-72"><Line data={purchasesChart} options={chartOpts} /></div>
        </div>
      </div>
    </div>
  );
};

export default Business;
