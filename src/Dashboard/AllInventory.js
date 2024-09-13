import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to access the Redux store
import { toast } from 'react-toastify'; // Import toast for notifications

const AllInventory = () => {
  const [products, setProducts] = useState([]); // Initially, products are empty
  const [loading, setLoading] = useState(true); // Loading state to show a spinner or message
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
  const a=user 
  console.log("user from the redux is "+a);
  const token=user.token;
  console.log("tokennnnnnnnnnn "+token);
  // Fetch the inventory data from the backend
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/inventory/getallinventory');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProducts(data || []); // Ensure products is always an array
      } catch (error) {
        console.error('Error fetching inventory:', error);
        setProducts([]); // Set products to an empty array if there's an error
      } finally {
        setLoading(false); // Set loading to false after the data is fetched
      }
    };

    fetchInventory();
  }, []); // Empty dependency array to run once on component mount

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
  const id=user.user._id;
  const addToCart = async (productId, quantity) => {
    try {
      console.log(`Product ID: ${productId}, Quantity: ${quantity}`);
      const response = await fetch(`http://localhost:4000/api/v1/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({ productId, quantity,id}), // Pass both productId and quantity
        credentials: 'include', // Send cookies with the request (optional if you're using cookies)
      });
  
      const result = await response.json();
      console.log(result);
  
      if (response.ok) {
        toast.success('Item added to cart successfully!');
      } else {
        toast.error(result.message || 'Failed to add item to cart.');
      }
    } catch (error) {
      toast.error('An error occurred while adding the item to the cart.');
    }
  };
  

  if (loading) {
    return <p>Loading inventory...</p>; // Show loading message while fetching data
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
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
      {products.length === 0 ? (
        <p>No inventory data available.</p> // Display this if there are no products
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product._id} className="bg-white border rounded-lg shadow-md p-4">
              <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} className="w-full h-32 object-cover rounded-md mb-4" />
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
                    onClick={() => addToCart(product._id,product.quantity)} // Handle adding to cart
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

export default AllInventory;
