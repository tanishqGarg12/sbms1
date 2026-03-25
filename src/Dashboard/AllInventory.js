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
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'quantity' || name === 'price' ? Number(value) : value });
  };
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
      const min = isGrocery ? 0.5 : 1;
      const val = (prev[productId] || min) + change * inc;
      if (val < min || val > maxQuantity) return prev;
      return { ...prev, [productId]: val };
    });
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase()));
  const grouped = filtered.reduce((acc, p) => { (acc[p.category] = acc[p.category] || []).push(p); return acc; }, {});

  const inputClass = `w-full px-4 py-3 rounded-2xl border text-sm focus:outline-none focus:ring-2 ${
    darkMode ? 'bg-gray-800/50 border-gray-700 text-white focus:ring-brand-500' : 'bg-gray-50 border-gray-200 text-gray-900 focus:ring-brand-500'
  }`;

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className={`animate-spin w-8 h-8 border-[3px] rounded-full border-t-transparent ${darkMode ? 'border-brand-400' : 'border-brand-500'}`} />
    </div>
  );

  return (
    <div className={darkMode ? 'text-gray-200' : 'text-gray-900'}>
      <div className="flex items-center justify-between mb-8">
        <h1 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Inventory</h1>
        <div className="relative w-72">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className={`${inputClass} pl-10`} />
        </div>
      </div>

      {editingProduct && (
        <form onSubmit={handleEditSubmit} className={`p-6 mb-6 rounded-2xl ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-100 shadow-sm'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black">Edit Product</h2>
            <button type="button" onClick={handleEditCancel} className="text-gray-400 hover:text-gray-600"><FaTimes /></button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['name', 'category', 'subcategory', 'quantity', 'unit', 'price'].map(f => (
              <input key={f} type={f === 'quantity' || f === 'price' ? 'number' : 'text'} name={f} placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                value={formData[f]} onChange={handleEditChange} className={inputClass} required />
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <button type="submit" className="px-6 py-2.5 rounded-xl text-sm font-bold bg-brand-500 text-white hover:bg-brand-400 transition shadow-lg shadow-brand-500/20">Save</button>
            <button type="button" onClick={handleEditCancel} className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>Cancel</button>
          </div>
        </form>
      )}

      {Object.keys(grouped).length === 0 ? (
        <div className={`text-center py-20 rounded-3xl ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-100'}`}>
          <p className="text-5xl mb-4">📦</p>
          <p className={`font-semibold ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>No inventory data available</p>
        </div>
      ) : (
        Object.keys(grouped).map(category => (
          <div key={category} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <h2 className={`text-lg font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>{category}</h2>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${darkMode ? 'bg-brand-500/10 text-brand-400' : 'bg-brand-50 text-brand-600'}`}>
                {grouped[category].length} items
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {grouped[category].map(product => {
                const lowStock = product.quantity <= 5;
                return (
                  <div key={product._id} className={`group rounded-2xl overflow-hidden card-hover ${
                    darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-100 shadow-sm'
                  }`}>
                    <div className="relative h-40 overflow-hidden">
                      <img src={product.file ? `https://backend-sbms.onrender.com${product.file}` : 'https://via.placeholder.com/300x180?text=No+Image'}
                        alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold backdrop-blur-md ${
                          darkMode ? 'bg-gray-900/70 text-brand-400' : 'bg-white/80 text-brand-600'
                        }`}>{product.subcategory}</span>
                      </div>
                      {lowStock && (
                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-red-500/90 text-white backdrop-blur-sm">Low</span>
                      )}
                      <div className="absolute bottom-3 left-3">
                        <p className="text-white text-xl font-black drop-shadow-lg">₹{Number(product.price).toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${lowStock ? 'bg-red-500' : 'bg-green-500'}`} />
                        <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{product.quantity} {product.unit} in stock</span>
                      </div>

                      <div className={`flex items-center gap-2 mt-4 pt-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                        <div className={`flex items-center rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} ${product.quantity === 0 ? 'opacity-50 pointer-events-none' : ''}`}>
                          <button onClick={() => handleQuantityChange(product._id, -1, product.quantity, category.toLowerCase() === 'grocery')}
                            className={`w-8 h-9 flex items-center justify-center text-sm font-bold transition ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`}>−</button>
                          <span className="w-7 text-center text-xs font-bold">{quantities[product._id] || 1}</span>
                          <button onClick={() => handleQuantityChange(product._id, 1, product.quantity, category.toLowerCase() === 'grocery')}
                            className={`w-8 h-9 flex items-center justify-center text-sm font-bold transition ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`}>+</button>
                        </div>
                        <button onClick={() => addToCart(product._id, quantities[product._id] || 1)}
                          disabled={product.quantity === 0}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                            product.quantity === 0
                              ? 'bg-gray-400 text-white cursor-not-allowed'
                              : 'bg-brand-500 text-white hover:bg-brand-400 hover:shadow-lg hover:shadow-brand-500/20'
                          }`}>
                          <FaShoppingCart size={10} /> {product.quantity === 0 ? 'Out of Stock' : 'Add'}
                        </button>
                      </div>

                      {user?.user?.role === 'admin' && (
                        <div className="flex gap-2 mt-3">
                          <button onClick={() => handleEditClick(product)} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition ${
                            darkMode ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20' : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                          }`}><FaEdit size={10} /> Edit</button>
                          <button onClick={() => deleteItem(product._id)} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition ${
                            darkMode ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-red-50 text-red-600 hover:bg-red-100'
                          }`}><FaTrash size={10} /> Delete</button>
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
