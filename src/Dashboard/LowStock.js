import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to access the Redux store
import { toast } from 'react-toastify'; // Import toast for notifications
import { DarkModeContext } from '../DarkModeContext';

const LowStock = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // State for editing
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    quantity: 0,
    unit: '',
    price: 0
  }); // Form data for editing
  const { user } = useSelector((state) => state.auth); // Get the user object from the Redux store
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const fetchLowStockProducts = async () => {
      try {
        const response = await fetch('https://backend-sbms.onrender.com/api/v1/inventory/getlowinventory');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setLowStockProducts(data);
      } catch (error) {
        console.error('Error fetching low stock products:', error);
      }
    };

    fetchLowStockProducts();
  }, []); // Empty dependency array means this effect runs once after initial render

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`https://backend-sbms.onrender.com/api/v1/inventory/inventory/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok) {
        const newItems = lowStockProducts.filter(item => item._id !== id);
        setLowStockProducts(newItems);
        toast.success('Item deleted successfully!');
      } else {
        toast.error(result.message || 'Failed to delete item.');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the item.');
    }
  };

  const editItem = async (id) => {
    try {
      const response = await fetch(`https://backend-sbms.onrender.com/api/v1/inventory/inventory/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        const updatedItems = lowStockProducts.map(item =>
          item._id === id ? { ...item, ...formData } : item
        );
        setLowStockProducts(updatedItems);
        setEditingProduct(null);
        setFormData({
          name: '',
          category: '',
          subcategory: '',
          quantity: 0,
          unit: '',
          price: 0
        });
        toast.success('Item updated successfully!');
      } else {
        toast.error(result.message || 'Failed to update item.');
      }
    } catch (error) {
      toast.error('An error occurred while updating the item.');
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product._id);
    setFormData({
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      quantity: product.quantity,
      unit: product.unit,
      price: product.price
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      editItem(editingProduct);
    }
  };

  const handleEditCancel = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: '',
      subcategory: '',
      quantity: 0,
      unit: '',
      price: 0
    });
  };

  return (
    <div className={`container mx-auto p-4 transition-colors duration-300 ${darkMode ? 'bg-transparent text-green-500' : 'bg-white text-gray-900'}`}>
      <h1 className="text-2xl font-bold mb-4 text-center">Low Stock Products</h1>
      {editingProduct && (
        <form onSubmit={handleEditSubmit} className={`p-4 mb-4 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <h2 className="text-xl font-bold mb-2">Edit Product</h2>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleEditChange}
              className={`border p-2 w-full ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
          </label>
          <label className="block mb-2">
            Category:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleEditChange}
              className={`border p-2 w-full ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
          </label>
          <label className="block mb-2">
            Subcategory:
            <input
              type="text"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleEditChange}
              className={`border p-2 w-full ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
          </label>
          <label className="block mb-2">
            Quantity:
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleEditChange}
              className={`border p-2 w-full ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
          </label>
          <label className="block mb-2">
            Unit:
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleEditChange}
              className={`border p-2 w-full ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
          </label>
          <label className="block mb-2">
            Price:
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleEditChange}
              className={`border p-2 w-full ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleEditCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      )}
      {lowStockProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products available</p> // Display if there are no products
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {lowStockProducts.map((product) => (
            <div key={product._id} className={`border rounded-lg shadow-md p-4 ${darkMode ? 'bg-gray-800 border-red-500' : 'bg-white border-red-500'}`}>
              <div className={`text-sm font-bold px-2 py-1 rounded mb-2 ${darkMode ? 'bg-red-900 text-red-500' : 'bg-red-100 text-red-600'}`}>Low Stock</div>
              <img
                src={product.file || 'https://via.placeholder.com/150'}
                alt={product.name}
                className="w-full h-32 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-green-600 font-bold">₹{Number(product.price).toFixed(2)}</p>
              <p className="text-orange-500">In Stock: {product.quantity}</p>
              <div className="mt-4">
                {/* Conditionally render buttons based on the user's role */}
                {user.user?.role === 'admin' ? (
                  <>
                    <button
                      onClick={() => handleEditClick(product)}
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteItem(product._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <p className="text-red-500">Low stock</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LowStock;