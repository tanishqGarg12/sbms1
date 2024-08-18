// src/Inventory.js
import React, { useState } from 'react';

// Static product data
const initialProducts = [
  {
    id: 1,
    name: 'Product 1',
    price: 29.99,
    stock: 50,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 19.99,
    stock: 30,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Product 3',
    price: 39.99,
    stock: 20,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Product 4',
    price: 49.99,
    stock: 15,
    image: 'https://via.placeholder.com/150',
  },
];

const AllInventory = () => {
  const [products, setProducts] = useState(initialProducts);

  const handleEdit = (id) => {
    // For now, we'll just alert the user that editing is not implemented
    alert(`Edit functionality not implemented for product ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete product with ID: ${id}?`)) {
      // Filter out the deleted product from the state
      const updatedProducts = products.filter(  product => product.id !== id);
      setProducts(updatedProducts);
      alert(`Product with ID: ${id} deleted.`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white border rounded-lg shadow-md p-4">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-md mb-4" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>
            <p className="text-orange-500">In Stock: {product.stock}</p>
            <div className="mt-4">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllInventory;