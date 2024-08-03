// src/components/Business.js
import React, { useContext } from 'react';
import { Line} from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, BarController, Title, Tooltip, Legend } from 'chart.js';
import { DarkModeContext } from '../DarkModeContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, BarController, Title, Tooltip, Legend);

const Business = ({ items = [] }) => {
    const { darkMode } = useContext(DarkModeContext);

    // Dummy data for demonstration purposes
    const newItems = 5;
    const purchasedItems = 12;
    const soldItems = 8;
    const purchasedValue = 30000;
    const salesValue = 50000;
    const totalStock = 15;

    // Different data for sales and purchases charts
    const salesData = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160];
    const purchasesData = [35, 55, 50, 45, 85, 95, 105, 115, 125, 100, 120, 110];

    const salesChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                type: 'line',
                label: 'Sales',
                data: salesData,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                fill: true,
                yAxisID: 'y',
            },
            {
                type: 'bar',
                label: 'Monthly Sales',
                data: salesData,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                yAxisID: 'y',
            },
        ],
    };

    const purchasesChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                type: 'line',
                label: 'Purchases',
                data: purchasesData,
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.5)',
                fill: true,
                yAxisID: 'y',
            },
            {
                type: 'bar',
                label: 'Monthly Purchases',
                data: purchasesData,
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.5)',
                yAxisID: 'y',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: darkMode ? 'white' : 'gray.700',
                },
            },
            title: {
                display: true,
                text: 'Sales and Purchases',
                color: darkMode ? 'white' : 'gray.700',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: darkMode ? 'white' : 'gray.700',
                },
            },
            x: {
                ticks: {
                    color: darkMode ? 'white' : 'gray.700',
                },
            },
        },
    };

    return (
        <div className={`transition-colors duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <h2 className="text-xl font-semibold mb-4 text-center">BUSINESS ANALYSIS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`rounded-lg shadow p-4 flex flex-col items-center ${darkMode ? 'bg-blue-700' : 'bg-blue-500'}`}>
                    <h2 className="text-lg font-bold text-white mb-2">New Items</h2>
                    <p className="text-xl font-bold text-white">{newItems}</p>
                </div>
                <div className={`rounded-lg shadow p-4 flex flex-col items-center ${darkMode ? 'bg-green-700' : 'bg-green-500'}`}>
                    <h2 className="text-lg font-bold text-white mb-2">Purchased Items</h2>
                    <p className="text-xl font-bold text-white">{purchasedItems}</p>
                </div>
                <div className={`rounded-lg shadow p-4 flex flex-col items-center ${darkMode ? 'bg-yellow-700' : 'bg-yellow-500'}`}>
                    <h2 className="text-lg font-bold text-white mb-2">Sold Items</h2>
                    <p className="text-xl font-bold text-white">{soldItems}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className={`rounded-lg shadow p-4 flex flex-col items-center ${darkMode ? 'bg-indigo-700' : 'bg-indigo-500'}`}>
                    <h2 className="text-lg font-bold text-white mb-2">Purchased Value</h2>
                    <p className="text-xl font-bold text-white">${purchasedValue.toFixed(2)}</p>
                </div>
                <div className={`rounded-lg shadow p-4 flex flex-col items-center ${darkMode ? 'bg-gray-700' : 'bg-red-500'}`}>
                    <h2 className="text-lg font-bold text-white mb-2">Sales Value</h2>
                    <p className="text-xl font-bold text-white">${salesValue.toFixed(2)}</p>
                </div>
                <div className={`rounded-lg shadow p-4 flex flex-col items-center ${darkMode ? 'bg-teal-700' : 'bg-teal-500'}`}>
                    <h2 className="text-lg font-bold text-white mb-2">Total Stock</h2>
                    <p className="text-xl font-bold text-white">{totalStock}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div style={{ height: '400px' }}>
                    <h2 className={`text-lg font-semibold mb-4 text-center ${darkMode ? 'text-white' : 'text-gray-700'}`}>Yearly Sales</h2>
                    <Line data={salesChartData} options={chartOptions} />
                </div>
                <div style={{ height: '400px' }}>
                    <h2 className={`text-lg font-semibold mb-4 text-center ${darkMode ? 'text-white' : 'text-gray-700'}`}>Yearly Purchases</h2>
                    <Line data={purchasesChartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};

export default Business;
