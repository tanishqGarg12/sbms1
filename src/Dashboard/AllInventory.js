import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AllInventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    quantity: 0,
    unit: '',
    price: 0
  });
  const { user } = useSelector((state) => state.auth);
  const token = user.token;

  // Search term state
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch inventory data
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/inventory/getallinventory');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching inventory:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  // Delete an item
  const deleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/inventory/inventory/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (response.ok) {
        const newItems = products.filter(item => item._id !== id);
        setProducts(newItems);
        toast.success('Item deleted successfully!');
      } else {
        toast.error(result.message || 'Failed to delete item.');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the item.');
    }
  };

  // Edit an item
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
        const updatedItems = products.map(item =>
          item._id === id ? { ...item, ...formData } : item
        );
        setProducts(updatedItems);
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

  // Handle edit button click
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

  // Handle form field changes during editing
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle edit form submission
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      editItem(editingProduct);
    }
  };

  // Handle cancel editing
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

  // Add item to cart
  const addToCart = async (productId, quantity) => {
    try {
      const response = await fetch(`http://localhost:4000/api/v1/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity, id: user.user._id }),
        credentials: 'include',
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Item added to cart successfully!');
      } else {
        toast.error(result.message || 'Failed to add item to cart.');
      }
    } catch (error) {
      toast.error('An error occurred while adding the item to the cart.');
    }
  };

  // Manage quantity for each product locally in the frontend
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productId, change) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(0, (prevQuantities[productId] || 0) + change),
    }));
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Match by product name
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) // Match by category
  );

  if (loading) {
    return <p>Loading inventory...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <div className="flex border-blue-950 font-bold mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full max-w-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
          <button className="border-red-700 bg-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800 "fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a7 7 0 100 14 7 7 0 000-14zm0 0l6 6" />
                        </svg>
          </button>
      </div>

      {editingProduct && (
        <form onSubmit={handleEditSubmit} className="bg-gray-100 p-4 mb-4 rounded">
          <h2 className="text-xl font-bold mb-2">Edit Product</h2>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleEditChange}
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleEditChange}
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            required
          />
          <input
            type="text"
            name="subcategory"
            placeholder="Subcategory"
            value={formData.subcategory}
            onChange={handleEditChange}
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleEditChange}
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            required
          />
          <input
            type="text"
            name="unit"
            placeholder="Unit"
            value={formData.unit}
            onChange={handleEditChange}
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleEditChange}
            className="border border-gray-300 rounded-md p-2 mb-2 w-full"
            required
          />
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

      {filteredProducts.length === 0 ? (
        <p>No inventory data available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white border rounded-lg shadow-md p-4">
              <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} className="w-full h-32 object-cover rounded-md mb-4" />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-green-600 font-bold">${Number(product.price).toFixed(2)}</p>
              <p className="text-gray-600">Quantity: {product.quantity} {product.unit}</p>
              <p className="text-gray-600">Category: {product.category}</p>
              <p className="text-gray-600">Subcategory: {product.subcategory}</p>

              <div className="flex mt-4">
                <button
                  onClick={() => handleQuantityChange(product._id, -1)}
                  className="bg-red-700 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-500"
                  disabled={quantities[product._id] <= 0}
                >
                  -
                </button>
                <span className="text-lg">{quantities[product._id] || 0}</span>
                <button
                  onClick={() => handleQuantityChange(product._id, 1)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded ml-2 hover:bg-yellow-500"
                >
                  +
                </button>
              </div>

              <div className="mt-2">
                <button
                  onClick={() => addToCart(product._id, quantities[product._id] || 1)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
                >
                  Add to Cart
                </button>
                {user.user.role === 'admin' && (
                <>
                  <button
                    onClick={() => handleEditClick(product)}
                    className="mt-2 ml-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(product._id)}
                    className="mt-2 ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </>
              )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllInventory;
