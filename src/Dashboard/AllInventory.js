import React, { useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DarkModeContext } from '../DarkModeContext';
import { FaSearch, FaShoppingCart, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

const AllInventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: '', subcategory: '', quantity: 0, unit: '', price: 0 });
  const { user } = useSelector((state) => state.auth);
  const token = user?.token;
  const { darkMode } = useContext(DarkModeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://backend-sbms.onrender.com/api/v1/inventory/getallinventory');
        if (!res.ok) throw new Error();
        setProducts(await res.json() || []);
      } catch { setProducts([]); }
      finally { setLoading(false); }
    })();
  }, []);

  const deleteItem = async (id) => {
    try {
      const res = await fetch(`https://backend-sbms.onrender.com/api/v1/inventory/inventory/${id}`, { method: 'DELETE' });
      if (res.ok) { setProducts(products.filter(i => i._id !== id)); toast.success('Deleted!'); }
      else toast.error('Failed to delete.');
    } catch { toast.error('Error deleting item.'); }
  };

  const editItem = async (id) => {
    try {
      const res = await fetch(`https://backend-sbms.onrender.com/api/v1/inventory/inventory/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
      });
      if (res.ok) {
        setProducts(products.map(i => i._id === id ? { ...i, ...formData } : i));
        setEditingProduct(null);
        setFormData({ name: '', category: '', subcategory: '', quantity: 0, unit: '', price: 0 });
        toast.success('Updated!');
      } else toast.error('Failed to update.');
    } catch { toast.error('Error updating item.'); }
  };

  const handleEditClick = (p) => { setEditingProduct(p._id); setFormData({ name: p.name, category: p.category, subcategory: p.subcategory, quantity: p.quantity, unit: p.unit, price: p.price }); };
  const handleEditChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleEditSubmit = (e) => { e.preventDefault(); if (editingProduct) editItem(editingProduct); };
  const handleEditCancel = () => { setEditingProduct(null); setFormData({ name: '', category: '', subcategory: '', quantity: 0, unit: '', price: 0 }); };

  const addToCart = async (productId, quantity) => {
    try {
      const res = await fetch('https://backend-sbms.onrender.com/api/v1/cart/add', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ productId, quantity, id: user.user._id }), credentials: 'include',
      });
      if (res.ok) toast.success('Added to cart!'); else toast.error('Failed to add.');
    } catch { toast.error('Error adding to cart.'); }
  };

  const handleQuantityChange = (productId, change, maxQuantity, isGrocery) => {
    setQuantities(prev => {
      const inc = isGrocery ? 0.5 : 1;
      const val = (prev[productId] || 1) + change * inc;
      if (val < 0.5 || val > maxQuantity) return prev;
      return { ...prev, [productId]: val };
    });
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase()));
  const grouped = filtered.reduce((acc, p) => { (acc[p.category] = acc[p.category] || []).push(p); return acc; }, {});

  const inputClass = `w-full px-3 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 ${
    darkMode ? 'bg-gray-800 border-gray-700 text-white focus:ring-green-500' : 'bg-white border-gray-200 text-gray-900 focus:ring-[#029c78]'
  }`;

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className={`animate-spin w-8 h-8 border-4 rounded-full border-t-transparent ${darkMode ? 'border-green-400' : 'border-[#029c78]'}`} />
    </div>
  );

  return (
    <div className={darkMode ? 'text-gray-200' : 'text-gray-900'}>
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Inventory</h1>
        <div className="relative w-72">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className={`${inputClass} pl-9`} />
        </div>
      </div>

      {editingProduct && (
        <form onSubmit={handleEditSubmit} className={`p-5 mb-6 rounded-xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Edit Product</h2>
            <button type="button" onClick={handleEditCancel} className="text-gray-400 hover:text-gray-600"><FaTimes /></button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['name', 'category', 'subcategory', 'quantity', 'unit', 'price'].map(f => (
              <input key={f} type={f === 'quantity' || f === 'price' ? 'number' : 'text'} name={f} placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                value={formData[f]} onChange={handleEditChange} className={inputClass} required />
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <button type="submit" className="px-5 py-2 rounded-lg text-sm font-semibold bg-[#029c78] text-white hover:bg-[#028a6b] transition">Save</button>
            <button type="button" onClick={handleEditCancel} className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Cancel</button>
          </div>
        </form>
      )}

      {Object.keys(grouped).length === 0 ? (
        <div className={`text-center py-16 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <p className="text-4xl mb-3">📦</p>
          <p className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No inventory data available</p>
        </div>
      ) : (
        Object.keys(grouped).map(category => (
          <div key={category} className="mb-8">
            <h2 className={`text-lg font-bold mb-3 ${darkMode ? 'text-green-400' : 'text-gray-800'}`}>{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {grouped[category].map(product => {
                const lowStock = product.quantity <= 5;
                return (
                <div key={product._id} className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-md'
                }`}>
                  {/* Image with overlay */}
                  <div className="relative h-44 overflow-hidden">
                    <img src={product.file ? `https://backend-sbms.onrender.com${product.file}` : 'https://via.placeholder.com/300x180?text=No+Image'}
                      alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-sm ${
                        darkMode ? 'bg-gray-900/70 text-green-400' : 'bg-white/80 text-[#029c78]'
                      }`}>{product.subcategory}</span>
                    </div>
                    {lowStock && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/90 text-white backdrop-blur-sm">Low Stock</span>
                    )}
                    {/* Price on image */}
                    <div className="absolute bottom-3 left-3">
                      <p className="text-white text-xl font-bold drop-shadow-lg">₹{Number(product.price).toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <div className={`flex items-center gap-1.5 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <span className={`w-2 h-2 rounded-full ${lowStock ? 'bg-red-500' : 'bg-green-500'}`} />
                        {product.quantity} {product.unit} in stock
                      </div>
                    </div>

                    {/* Quantity + Add to Cart */}
                    <div className={`flex items-center gap-2 mt-4 pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                      <div className={`flex items-center rounded-xl overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <button onClick={() => handleQuantityChange(product._id, -1, product.quantity, category.toLowerCase() === 'grocery')}
                          className={`w-8 h-9 flex items-center justify-center text-sm font-bold transition ${darkMode ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}>−</button>
                        <span className="w-8 text-center text-sm font-bold">{quantities[product._id] || 1}</span>
                        <button onClick={() => handleQuantityChange(product._id, 1, product.quantity, category.toLowerCase() === 'grocery')}
                          className={`w-8 h-9 flex items-center justify-center text-sm font-bold transition ${darkMode ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}>+</button>
                      </div>
                      <button onClick={() => addToCart(product._id, quantities[product._id] || 1)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-[#029c78] text-white hover:bg-[#028a6b] transition-all duration-200 hover:shadow-lg hover:shadow-green-500/20">
                        <FaShoppingCart size={11} /> Add to Cart
                      </button>
                    </div>

                    {user?.user?.role === 'admin' && (
                      <div className="flex gap-2 mt-3">
                        <button onClick={() => handleEditClick(product)} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition ${darkMode ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20' : 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'}`}>
                          <FaEdit size={11} /> Edit
                        </button>
                        <button onClick={() => deleteItem(product._id)} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition ${darkMode ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}>
                          <FaTrash size={11} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        ))
      )}
      <ToastContainer />
    </div>
  );
};

export default AllInventory;
