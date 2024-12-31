import React, { useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DarkModeContext } from '../DarkModeContext';

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
  if(!user){
    toast.error("please log in")
  }
  const { darkMode } = useContext(DarkModeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('https://backend-sbms.onrender.com/api/v1/inventory/getallinventory');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data)
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

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`https://backend-sbms.onrender.com/api/v1/inventory/inventory/${id}`, {
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

  const addToCart = async (productId, quantity) => {
    try {
      const response = await fetch(`https://backend-sbms.onrender.com/api/v1/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity, id: user.user._id }),
        credentials: 'include',
      });

      const result = await response.json();
      toast.success('Item added to cart successfully!');

      if (!response.ok) {
        toast.error(result.message || 'Failed to add item to cart.');
      }
    } catch (error) {
      toast.error('An error occurred while adding the item to the cart.');
    }
  };

  const handleQuantityChange = (productId, change, maxQuantity, isGrocery) => {
    setQuantities((prevQuantities) => {
      const increment = isGrocery ? 0.5 : 1;
      const newQuantity = (prevQuantities[productId] || 1) + change * increment;
      if (newQuantity < 0.5 || newQuantity > maxQuantity) return prevQuantities;
      return { ...prevQuantities, [productId]: newQuantity };
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  if (loading) {
    return <p>Loading inventory...</p>;
  }

  return (
    <div className={`container mx-auto p-4 transition-colors duration-300 ${darkMode ? 'bg-transparent text-green-500' : 'bg-transparent text-gray-900'}`}>
      <h1 className="text-2xl font-bold mb-4 text-center">Inventory</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`border rounded-md p-2 w-full max-w-lg focus:outline-none ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
        />
        <button className="ml-2 p-2 rounded bg-blue-500 text-white hover:bg-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a7 7 0 100 14 7 7 0 000-14zm0 0l6 6" />
          </svg>
        </button>
      </div>

      {editingProduct && (
        <form onSubmit={handleEditSubmit} className={`p-4 mb-4 rounded ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <h2 className="text-xl font-bold mb-2">Edit Product</h2>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleEditChange}
            className={`border rounded-md p-2 mb-2 w-full ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleEditChange}
            className={`border rounded-md p-2 mb-2 w-full ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            required
          />
          <input
            type="text"
            name="subcategory"
            placeholder="Subcategory"
            value={formData.subcategory}
            onChange={handleEditChange}
            className={`border rounded-md p-2 mb-2 w-full ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleEditChange}
            className={`border rounded-md p-2 mb-2 w-full ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            required
          />
          <input
            type="text"
            name="unit"
            placeholder="Unit"
            value={formData.unit}
            onChange={handleEditChange}
            className={`border rounded-md p-2 mb-2 w-full ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleEditChange}
            className={`border rounded-md p-2 mb-2 w-full ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
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

      {Object.keys(groupedProducts).length === 0 ? (
        <p className="text-center">No inventory data available.</p>
      ) : (
        Object.keys(groupedProducts).map((category) => (
          <div key={category} className="mb-8">
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-green-500' : 'text-gray-900'}`}>{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {groupedProducts[category].map((product) => (
                <div key={product._id} className={`border rounded-lg shadow-md p-4 ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}>
                 <img 
                  src={product.file ? `https://backend-sbms.onrender.com${product.file}` : 'WWWW'} 
                   
                  className="w-full h-32 object-cover rounded-md mb-4" 
                />
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-green-600 font-bold">₹{Number(product.price).toFixed(2)}</p>
                <p className="text-green-500">Quantity: {product.quantity} {product.unit}</p>
                <p className="text-gray-600">Category: {product.category}</p>
                <p className="text-gray-600">Subcategory: {product.subcategory}</p>

                  <div className="flex mt-4">
                    <button
                      onClick={() => handleQuantityChange(product._id, -1, product.quantity, category === 'grocery')}
                      className="bg-green-700 text-white px-2 py-1 rounded mr-2 hover:bg-red-600"
                      disabled={quantities[product._id] <= (category === 'Grocery' ? 0.5 : 1)}
                    >
                      -
                    </button>
                    <span className="text-lg">{quantities[product._id] || 1}</span>
                    <button
                      onClick={() => handleQuantityChange(product._id, 1, product.quantity, category === 'grocery')}
                      className=  "bg-green-400 text-white px-2 py-1 rounded ml-2 hover:bg-yellow-500"
                      disabled={quantities[product._id] >= product.quantity}
                    >
                      +
                    </button>
                  </div>

                  <div className="mt-2">
                    <button
                      onClick={() => addToCart(product._id, quantities[product._id] || 1)}
                      className="bg-green-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
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
          </div>
        ))
      )}
      <ToastContainer />
    </div>
  );
};

export default AllInventory;