import React, { useState, useContext,useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { DarkModeContext } from '../DarkModeContext';

const InventoryApp = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemPricep, setItemPricep] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [unit, setUnit] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const [categories, setCategories] = useState({});  // Categories with subcategories
  const [selectedCategory, setSelectedCategory] = useState(''); // To store selected category
  const [subcategories, setSubcategories] = useState([]); // To store subcategories for the selected category

  // Fetch all categories and their subcategories from API
  const fetchCategoriesAndSubcategories = async () => {
    try {
      const categoryResponse = await axios.get('http://localhost:4000/api/v1/categoryy/categories');
      const subcategoryResponse = await axios.get('http://localhost:4000/api/v1/categoryy/subcategories');
      
      const categoryData = {};
      
      // Organize categories and their corresponding subcategories
      categoryResponse.data.forEach(category => {
        categoryData[category.name] = [];
        subcategoryResponse.data.forEach(subcategory => {
          console.log(subcategory)
          console.log("id1"+subcategory.categoryId)
          console.log("id2"+category._id)
          if (subcategory.categoryId._id === category._id) {
            categoryData[category.name].push(subcategory.name);
          }
        });
      }); 
      console.log(categoryData)

      setCategories(categoryData); // Set categories with respective subcategories
    } catch (error) {
      console.error('Error fetching categories and subcategories:', error);
    }
  };

  useEffect(() => {
    fetchCategoriesAndSubcategories();
  }, []);
  const units = ['kg', 'g', 'pcs'];

  const resetForm = () => {
    setItemName('');
    setItemPrice('');
    setItemPricep('');
    setItemQuantity('');
    setCategory('');
    setSubcategory('');
    setUnit('');
    setEditIndex(null);
  };

  const addItem = async () => {
    if (itemName && itemPrice && itemQuantity && category && subcategory && unit) {
      try {
        const response = editIndex !== null 
          ? 
          await fetch(`http://localhost:4000/api/v1/inventory/inventory/${items[editIndex]._id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name: itemName, price: itemPrice, purchasedprice: itemPricep , quantity: itemQuantity, category, subcategory, unit })
            })
          : await fetch('http://localhost:4000/api/v1/inventory/createinventory', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name: itemName, price: itemPrice,purchasedprice: itemPricep , quantity: itemQuantity, category, subcategory, unit })
            });

        const result = await response.json();

        if (response.ok) {
          if (editIndex !== null) {
            const updatedItems = items.map((item, index) =>
              index === editIndex
                ? { ...result, _id: item._id }
                : item
            );
            setItems(updatedItems);
            toast.success('Item updated successfully!');
          } else {
            setItems([...items, result]);
            toast.success('Item added successfully!');
          }
        } else {
          toast.error(result.message || 'Failed to save item.');
        }
      } catch (error) {
        toast.error('An error occurred while saving the item.');
      }

      resetForm();
    } else {
      toast.error('Please fill in all fields!');
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/inventory/inventory/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok) {
        const newItems = items.filter(item => item._id !== id);
        setItems(newItems);
        toast.success('Item deleted successfully!');
      } else {
        toast.error(result.message || 'Failed to delete item.');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the item.');
    }
  };

  const startEdit = (index) => {
    const { name, price, quantity, category, subcategory, unit } = items[index];
    setItemName(name);
    setItemPrice(price);
    setItemQuantity(quantity);
    setCategory(category);
    setItemPricep()
    setSubcategory(subcategory);
    setUnit(unit);
    setEditIndex(index);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`w-2/3 shadow-lg rounded-lg p-8 transition-colors duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
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

          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className={`border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
          >
            <option value="">Select Unit</option>
            {units.map((u) => (
              <option key={u} value={u}>{u}</option>
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
            value={itemPricep}
            onChange={(e) => setItemPricep(e.target.value)}
            placeholder="Item purchased Price"
            className={`border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
          />
          <input
            type="number"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
            placeholder="Item Quantity"
            className={`border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}
          />
          <button onClick={addItem} className={`text-white rounded-lg px-6 py-3 hover:opacity-80 transition w-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}>
            {editIndex !== null ? 'Update Item' : 'Add Item'}
          </button>
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
                  <th className={`border p-3 text-left transition-colors dur  ation-300 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Subcategory</th>
                  <th className={`border p-3 text-left transition-colors duration-300 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Unit</th>
                  <th className={`border p-3 transition-colors duration-300 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item._id} className={`transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <td className={`border p-3 transition-colors duration-300 ${darkMode ? 'border-gray-600 text-white' : 'border-gray-300 text-gray-800'}`}>{item.name}</td>
                    <td className={`border p-3 transition-colors duration-300 ${darkMode ? 'border-gray-600 text-white' : 'border-gray-300 text-gray-800'}`}>{item.price}</td>
                    <td className={`border p-3 transition-colors duration-300 ${darkMode ? 'border-gray-600 text-white' : 'border-gray-300 text-gray-800'}`}>{item.purchasedprice}</td>
                    <td className={`border p-3 transition-colors duration-300 ${darkMode ? 'border-gray-600 text-white' : 'border-gray-300 text-gray-800'}`}>{item.quantity}</td>
                    <td className={`border p-3 transition-colors duration-300 ${darkMode ? 'border-gray-600 text-white' : 'border-gray-300 text-gray-800'}`}>{item.category}</td>
                    <td className={`border p-3 transition-colors duration-300 ${darkMode ? 'border-gray-600 text-white' : 'border-gray-300 text-gray-800'}`}>{item.subcategory}</td>
                    <td className={`border p-3 transition-colors duration-300 ${darkMode ? 'border-gray-600 text-white' : 'border-gray-300 text-gray-800'}`}>{item.unit}</td>
                    <td className="border p-3">
                      <button onClick={() => startEdit(index)} className="text-blue-500 mr-2"><FaEdit /></button>
                      <button onClick={() => deleteItem(item._id)} className="text-red-500"><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default InventoryApp;
