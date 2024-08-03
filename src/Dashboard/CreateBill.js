import React, { useState, useContext } from 'react';
import { DarkModeContext } from '../DarkModeContext';

const items = [
    { id: 1, name: 'Item 1', price: 10.99 },
    { id: 2, name: 'Item 2', price: 15.50 },
    { id: 3, name: 'Item 3', price: 8.75 },
    { id: 4, name: 'Item 4', price: 20.00 },
    { id: 5, name: 'Item 5', price: 12.99 },
];

const CreateBill = () => {
    const { darkMode } = useContext(DarkModeContext);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [discounts, setDiscounts] = useState({});

    const handleCustomerChange = (e) => {
        setSelectedCustomer(e.target.value);
    };

    const handleItemSelect = (itemId) => {
        setSelectedItems((prevItems) => {
            if (prevItems.includes(itemId)) {
                return prevItems.filter((id) => id !== itemId);
            } else {
                return [...prevItems, itemId];
            }
        });
    };

    const handleQuantityChange = (itemId, quantity) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [itemId]: quantity,
        }));
    };

    const handleDiscountChange = (itemId, discount) => {
        setDiscounts((prevDiscounts) => ({
            ...prevDiscounts,
            [itemId]: discount,
        }));
    };

    const calculateTotal = () => {
        return selectedItems.reduce((total, itemId) => {
            const item = items.find((i) => i.id === itemId);
            const quantity = quantities[itemId] || 1;
            const discount = discounts[itemId] || 0;
            const itemTotal = (item.price * quantity) * (1 - discount / 100);
            return total + itemTotal;
        }, 0);
    };

    return (
        <div className={`min-h-screen p-8 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-r from-blue-200 to-purple-300'}`}>
            <div className={`max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg transition-colors duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                <h1 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Create Bill</h1>
                <div className="mb-4">
                    <label htmlFor="customer" className={`block font-medium mb-2 transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                        Select Customer
                    </label>
                    <input
                        type="text"
                        id="customer"
                        value={selectedCustomer}
                        onChange={handleCustomerChange}
                        className={`w-full px-4 py-2 rounded-md border transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'border-gray-300 focus:border-blue-500'}`}
                    />
                </div>
                <div className="mb-4">
                    <label className={`block font-medium mb-2 transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                        Select Items
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {items.map((item) => (
                            <div key={item.id} className={`bg-gray-100 p-4 rounded-md transition-colors duration-300 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'hover:bg-gray-200'}`}>
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(item.id)}
                                    onChange={() => handleItemSelect(item.id)}
                                    className={`mr-2 transition-colors duration-300 ${darkMode ? 'text-blue-500' : 'text-gray-700'}`}
                                />
                                <label className={`font-medium transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                    {item.name} - ₹{item.price}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className={`bg-gray-100 transition-colors duration-300 ${darkMode ? 'bg-gray-700 text-white' : 'text-gray-800'}`}>
                                <th className="py-2 px-4 text-left font-medium">Item</th>
                                <th className="py-2 px-4 text-left font-medium">Quantity</th>
                                <th className="py-2 px-4 text-left font-medium">Discount</th>
                                <th className="py-2 px-4 text-left font-medium">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedItems.map((itemId) => {
                                const item = items.find((i) => i.id === itemId);
                                const quantity = quantities[itemId] || 1;
                                const discount = discounts[itemId] || 0;
                                const itemTotal = (item.price * quantity) * (1 - discount / 100);
                                return (
                                    <tr key={itemId} className={`border-b transition-colors duration-300 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                                        <td className="py-2 px-4">{item.name}</td>
                                        <td className="py-2 px-4">
                                            <input
                                                type="number"
                                                min="1"
                                                value={quantity}
                                                onChange={(e) => handleQuantityChange(itemId, e.target.value)}
                                                className={`w-20 px-2 py-1 rounded-md border transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'border-gray-300 focus:border-blue-500'}`}
                                            />
                                        </td>
                                        <td className="py-2 px-4">
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={discount}
                                                onChange={(e) => handleDiscountChange(itemId, e.target.value)}
                                                className={`w-20 px-2 py-1 rounded-md border transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' : 'border-gray-300 focus:border-blue-500'}`}
                                            />
                                        </td>
                                        <td className="py-2 px-4">₹{itemTotal.toFixed(2)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className={`text-right font-medium text-2xl transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Total: ₹{calculateTotal().toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default CreateBill;