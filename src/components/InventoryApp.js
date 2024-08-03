import React, { useState, useContext } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DarkModeContext } from '../DarkModeContext';

const InventoryApp = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const categories = {
    Electronics: ['Mobile', 'Laptop', 'Tablet'],
    Clothing: ['Men', 'Women', 'Kids'],
    Groceries: ['Fruits', 'Vegetables', 'Dairy'],
  };

  const addItem = () => {
    if (itemName && itemPrice && itemQuantity && category && subcategory) {
      if (editIndex !== null) {
        const updatedItems = items.map((item, index) => (
          index === editIndex
            ? { name: itemName, price: itemPrice, quantity: itemQuantity, category, subcategory }
            : item
        ));
        setItems(updatedItems);
        setEditIndex(null);
        toast.success('Item updated successfully!');
      } else {
        setItems([...items, { name: itemName, price: itemPrice, quantity: itemQuantity, category, subcategory }]);
        toast.success('Item added successfully!');
      }
      setItemName('');
      setItemPrice('');
      setItemQuantity('');
      setCategory('');
      setSubcategory('');
    } else {
      toast.error('Please fill in all fields!');
    }
  };

  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    toast.success('Item deleted successfully!');
  };

  const startEdit = (index) => {
    const { name, price, quantity, category, subcategory } = items[index];
    setItemName(name);
    setItemPrice(price);
    setItemQuantity(quantity);
    setCategory(category);
    setSubcategory(subcategory);
    setEditIndex(index);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`w-2/3 w-full shadow-lg rounded-lg p-8 transition-colors duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <h1 className={`text-3xl font-bold text-center transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Inventory Management</h1>
        <div className="flex flex-col mt-6 space-y-4">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory('');
            }}
            className={`border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
          >
            <option value="">Select Category</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className={`border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
            disabled={!category}
          >
            <option value="">Select Subcategory</option>
            {category && categories[category].map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>

          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Item Name"
            className={`border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
          />
          <input
            type="number"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            placeholder="Item Price"
            className={`border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
          />
          <input
            type="number"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
            placeholder="Item Quantity"
            className={`border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
          />
          <button onClick={addItem} className={`text-white rounded-lg px-6 py-3 hover:opacity-80 transition w-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}>Add Item</button>
        </div>
        <div className="mt-6">
          <h2 className={`text-xl font-semibold transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-700'}`}>Inventory List</h2>
          {items.length === 0 ? (
            <p className={`transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No items in inventory.</p>
          ) : (
            <table className={`min-w-full border-collapse mt-4 transition-colors duration-300 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
              <thead>
                <tr className={`transition-colors duration-300 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}>
                  <th className={`border p-3 text-left transition-colors duration-300 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Name</th>
                  <th className={`border p-3 text-left transition-colors duration-300 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Price</th>
                  <th className={`border p-3 text-left transition-colors duration-300 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Quantity</th>
                  <th className={`border p-3 text-left transition-colors duration-300 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Category</th>
                  <th className={`border p-3 text-left transition-colors duration-300 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Subcategory</th>
                  <th className={`border p-3 text-left transition-colors duration-300 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className={`border-b hover:bg-gray-50 transition-colors duration-300 ${darkMode ? 'hover:bg-gray-700' : ''}`}>
                    <td className={`border p-3 transition-colors duration-300 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>{item.name}</td>
                    <td className={`border p-3 transition-colors duration-300 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>${item.price}</td>
                    <td className={`border p-3 transition-colors duration-300 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>{item.quantity}</td>
                    <td className={`border p-3 transition-colors duration-300 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>{item.category}</td>
                    <td className={`border p-3 transition-colors duration-300 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>{item.subcategory}</td>
                    <td className={`border p-3 flex space-x-2 transition-colors duration-300 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                      <button onClick={() => startEdit(index)} className={`hover:underline flex items-center transition-colors duration-300 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'}`}>
                        <FaEdit className="mr-1" /> Edit
                      </button>
                      <button onClick={() => deleteItem(index)} className={`hover:underline flex items-center transition-colors duration-300 ${darkMode ? 'text-red-400' : 'text-red-500'}`}>
                        <FaTrash className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default InventoryApp;