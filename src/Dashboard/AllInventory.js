import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to access the Redux store
import axios from 'axios'; // Import axios for making API calls

const AllInventory = () => {
  const [products, setProducts] = useState([]); // Initially, products are empty
  const [loading, setLoading] = useState(true); // Loading state to show a spinner or message
  const { user } = useSelector((state) => state.auth); // Get the user object from the Redux store

  // Fetch the inventory data from the backend
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/inventory/getallinventory');
        console.log(response)
        setProducts(response.data || []); // Ensure products is always an array
      } catch (error) {
        console.error('Error fetching inventory:', error);
        setProducts([]); // Set products to an empty array if there's an error
      } finally {
        setLoading(false); // Set loading to false after the data is fetched
      }
    };

    fetchInventory();
  }, []); // Empty dependency array to run once on component mount

  const handleEdit = (id) => {
    alert(`Edit functionality not implemented for product ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete product with ID: ${id}?`)) {
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
      alert(`Product with ID: ${id} deleted.`);
    }
  };

  if (loading) {
    return <p>Loading inventory...</p>; // Show loading message while fetching data
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      {products.length === 0 ? (
        <p>No inventory data available.</p> // Display this if there are no products
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white border rounded-lg shadow-md p-4">
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-md mb-4" />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>
              <p className="text-orange-500">In Stock: {product.stock}</p>
              <div className="mt-4">
                {/* Conditionally render buttons based on the user's role */}
                {user.user?.role === 'admin' ? (
                  <>
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => alert(`Add functionality for product ID: ${product.id}`)}
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
