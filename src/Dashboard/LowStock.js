import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to access the Redux store
import { toast } from 'react-toastify'; // Import toast for notifications

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

  useEffect(() => {
    const fetchLowStockProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/inventory/getlowinventory');
        
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
      const response = await fetch(`http://localhost:4000/api/v1/inventory/inventory/${id}`, {
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
      const response = await fetch(`http://localhost:4000/api/v1/inventory/inventory/${id}`, {
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Low Stock Products</h1>
      {editingProduct && (
        <form onSubmit={handleEditSubmit} className="bg-gray-100 p-4 mb-4 rounded">
          <h2 className="text-xl font-bold mb-2">Edit Product</h2>
          <label className="block mb-2">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleEditChange}
              className="border border-gray-300 p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Category:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleEditChange}
              className="border border-gray-300 p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Subcategory:
            <input
              type="text"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleEditChange}
              className="border border-gray-300 p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Quantity:
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleEditChange}
              className="border border-gray-300 p-2 w-full"
            />
          </label>
          <label className="block mb-2">
            Unit:
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleEditChange}
              className="border border-gray-300 p-2 w-full"
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
              className="border border-gray-300 p-2 w-full"
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
            <div key={product._id} className="bg-white border border-red-500 rounded-lg shadow-md p-4">
              <div className="bg-red-100 text-red-600 text-sm font-bold px-2 py-1 rounded mb-2">Low Stock</div>
              <img
                src={product.image || 'https://via.placeholder.com/150'}
                alt={product.name}
                className="w-full h-32 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-green-600 font-bold">${Number(product.price).toFixed(2)}</p>
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
                  <button
                    onClick={() => alert(`Add functionality for product ID: ${product._id}`)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Add
                  </button>
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
