import React, { useContext } from 'react';
import { MailIcon, PhoneIcon, LocationMarkerIcon } from '@heroicons/react/outline';
import { DarkModeContext } from '../DarkModeContext';

const Stock = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`max-w-4xl w-full shadow-lg rounded-lg p-6 transition-colors duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Invoice</h1>
            <p className={`text-gray-600 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Invoice No: 37838</p>
          </div>
          <div className="text-right">
            <h2 className="text-red-500 font-bold">Unpaid</h2>
            <p className={`text-gray-600 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Nov 18th 2021</p>
            <p className={`text-gray-600 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Due Date: Nov 25th 2021</p>
          </div>
        </header>

        <section className="mb-6">
          <h2 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>From</h2>
          <div className="flex items-center mb-1">
            <MailIcon className="w-5 h-5 text-gray-500 mr-2" />
            <p className={` ${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>hello@hedgedecors.com</p>
          </div>
          <div className="flex items-center mb-1">
            <PhoneIcon className="w-5 h-5 text-gray-500 mr-2" />
            <p className={` ${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>08037604139</p>
          </div>
          <div className="flex items-center mb-1">
            <LocationMarkerIcon className="w-5 h-5 text-gray-500 mr-2" />
            <p className={` ${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>Hedge Interiors & Decors</p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Bill To</h2>
          <div className="flex items-center mb-1">
            <MailIcon className="w-5 h-5 text-gray-500 mr-2" />
            <p className={` ${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>michael@gmail.com</p>
          </div>
          <div className="flex items-center mb-1">
            <PhoneIcon className="w-5 h-5 text-gray-500 mr-2" />
            <p className={` ${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>Michael Coker</p>
          </div>
          <div className="flex items-center mb-1">
            <LocationMarkerIcon className="w-5 h-5 text-gray-500 mr-2" />
            <p className={` ${darkMode ? 'text-gray-400' : 'text-gray-800'}`}>13A Ahmadu Bello way, Jos Plateau State</p>
          </div>
        </section>

        <table className={`w-full mb-6 transition-colors duration-300 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}>
          <thead>
            <tr className={`transition-colors duration-300 ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-700'}`}>
              <th className="text-left border-b-2 p-2">Item</th>
              <th className="text-left border-b-2 p-2">Qty</th>
              <th className="text-left border-b-2 p-2">Price</th>
              <th className="text-left border-b-2 p-2">Disc(%)</th>
              <th className="text-left border-b-2 p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className={`border-b transition-colors duration-300 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
              <td className="border-b p-2">Window blind</td>
              <td className="border-b p-2">20</td>
              <td className="border-b p-2">5500</td>
              <td className="border-b p-2">10</td>
              <td className="border-b p-2">99000</td>
            </tr>
            <tr className={`border-b transition-colors duration-300 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
              <td className="border-b p-2">Tables</td>
              <td className="border-b p-2">10</td>
              <td className="border-b p-2">20000</td>
              <td className="border-b p-2">5</td>
              <td className="border-b p-2">190000</td>
            </tr>
            <tr className={`border-b transition-colors duration-300 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
              <td className="border-b p-2">Cushion set</td>
              <td className="border-b p-2">2</td>
              <td className="border-b p-2">60000</td>
              <td className="border-b p-2">10</td>
              <td className="border-b p-2">108000</td>
            </tr>
            <tr className={`border-b transition-colors duration-300 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
              <td className="border-b p-2">Chairs</td>
              <td className="border-b p-2">6</td>
              <td className="border-b p-2">8000</td>
              <td className="border-b p-2">5</td>
              <td className="border-b p-2">45600</td>
            </tr>
            <tr className={`border-b transition-colors duration-300 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
              <td className="border-b p-2">Service charge</td>
              <td className="border-b p-2">1</td>
              <td className="border-b p-2">55000</td>
              <td className="border-b p-2">25</td>
              <td className="border-b p-2">41250</td>
            </tr>
          </tbody>
        </table>

        <div className="text-right">
          <h2 className={`text-xl font-bold transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-800'}`}>NGN 520,138.75</h2>
        </div>
      </div>
    </div>
  );
};

export default Stock;