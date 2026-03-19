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
  const gridColor = darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const textColor = darkMode ? '#9ca3af' : '#6b7280';

  const chartOpts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { labels: { color: textColor, font: { size: 12 } } } },
    scales: {
      y: { beginAtZero: true, grid: { color: gridColor }, ticks: { color: textColor, font: { size: 11 } } },
      x: { grid: { display: false }, ticks: { color: textColor, font: { size: 11 } } },
    },
  };

  const salesChart = {
    labels: months,
    datasets: [{ label: 'Sales', data: salesData, borderColor: '#029c78', backgroundColor: 'rgba(2,156,120,0.1)', fill: true, tension: 0.4, pointRadius: 3 }],
  };
  const purchasesChart = {
    labels: months,
    datasets: [{ label: 'Purchases', data: purchasesData, borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)', fill: true, tension: 0.4, pointRadius: 3 }],
  };

  const StatCard = ({ label, value, color }) => (
    <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
      <p className={`text-xs font-medium uppercase tracking-wide ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{label}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );

  return (
    <div className={darkMode ? 'text-gray-200' : 'text-gray-900'}>
      <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Business Overview</h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard label="New Items" value={newItems} color="text-blue-500" />
        <StatCard label="Purchased Items" value={purchasedItems} color={darkMode ? 'text-green-400' : 'text-green-600'} />
        <StatCard label="Sold Items" value={soldItems} color="text-orange-500" />
        <StatCard label="Purchased Value" value={`₹${purchasedValue.toFixed(2)}`} color="text-indigo-500" />
        <StatCard label="Sales Value" value={`₹${salesValue.toFixed(2)}`} color={darkMode ? 'text-green-400' : 'text-[#029c78]'} />
        <StatCard label="Total Stock" value={totalStock} color="text-teal-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
          <h3 className="text-sm font-semibold mb-4">Yearly Sales</h3>
          <div className="h-72"><Line data={salesChart} options={chartOpts} /></div>
        </div>
        <div className={`p-5 rounded-xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
          <h3 className="text-sm font-semibold mb-4">Yearly Purchases</h3>
          <div className="h-72"><Line data={purchasesChart} options={chartOpts} /></div>
        </div>
      </div>
    </div>
  );
};

export default Business;
