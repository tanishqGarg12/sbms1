import React, { useState } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to access the Redux store

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
    stock: 3, // Low stock
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Product 3',
    price: 39.99,
    stock: 2, // Low stock
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

const LowStock = () => {
  const [products] = useState(initialProducts);
  const { user } = useSelector((state) => state.auth); // Get the user object from the Redux store

  // Filter products with low stock (e.g., stock less than or equal to 5)
  const lowStockProducts = products.filter(product => product.stock <= 5);

  const handleEdit = (id) => {
    alert(`Edit functionality not implemented for product ID: ${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete product with ID: ${id}?`)) {
      alert(`Product with ID: ${id} deleted.`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Low Stock Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {lowStockProducts.map((product) => (
          <div key={product.id} className="bg-white border border-red-500 rounded-lg shadow-md p-4">
            <div className="bg-red-100 text-red-600 text-sm font-bold px-2 py-1 rounded mb-2">Low Stock</div>
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
    </div>
  );
};

export default LowStock;
