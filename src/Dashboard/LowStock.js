import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { DarkModeContext } from '../DarkModeContext';
import { FaEdit, FaTrash, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

const LowStock = () => {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: '', subcategory: '', quantity: 0, unit: '', price: 0 });
  const { user } = useSelector((state) => state.auth);
  const { darkMode } = useContext(DarkModeContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://backend-sbms.onrender.com/api/v1/inventory/getlowinventory');
        if (!res.ok) throw new Error();
        setLowStockProducts(await res.json());
      } catch { setLowStockProducts([]); }
      finally { setLoading(false); }
    })();
  }, []);

  const deleteItem = async (id) => {
    try {
      const res = await fetch(`https://backend-sbms.onrender.com/api/v1/inventory/inventory/${id}`, { method: 'DELETE' });
      if (res.ok) { setLowStockProducts(lowStockProducts.filter(i => i._id !== id)); toast.success('Deleted!'); }
      else toast.error('Failed to delete.');
    } catch { toast.error('Error deleting.'); }
  };

  const editItem = async (id) => {
    try {
      const res = await fetch(`https://backend-sbms.onrender.com/api/v1/inventory/inventory/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData),
      });
      if (res.ok) {
        setLowStockProducts(lowStockProducts.map(i => i._id === id ? { ...i, ...formData } : i));
        setEditingProduct(null); setFormData({ name: '', category: '', subcategory: '', quantity: 0, unit: '', price: 0 });
        toast.success('Updated!');
      } else toast.error('Failed to update.');
    } catch { toast.error('Error updating.'); }
  };

  const handleEditClick = (p) => { setEditingProduct(p._id); setFormData({ name: p.name, category: p.category, subcategory: p.subcategory, quantity: p.quantity, unit: p.unit, price: p.price }); };
  const handleEditChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleEditSubmit = (e) => { e.preventDefault(); if (editingProduct) editItem(editingProduct); };
  const handleEditCancel = () => { setEditingProduct(null); setFormData({ name: '', category: '', subcategory: '', quantity: 0, unit: '', price: 0 }); };

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
      <div className="flex items-center gap-3 mb-6">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Low Stock</h1>
        <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-red-500/10 text-red-500">{lowStockProducts.length} items</span>
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
            <button type="button" onClick={handleEditCancel} className={`px-5 py-2 rounded-lg text-sm font-semibold transition ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>Cancel</button>
          </div>
        </form>
      )}

      {lowStockProducts.length === 0 ? (
        <div className={`text-center py-16 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <p className="text-4xl mb-3">✅</p>
          <p className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>All stock levels are healthy</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {lowStockProducts.map(product => (
            <div key={product._id} className={`rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg ${
              darkMode ? 'bg-gray-800 border border-red-500/30' : 'bg-white border border-red-200 shadow-sm'
            }`}>
              <img src={product.file || 'https://via.placeholder.com/300x150?text=No+Image'} alt={product.name} className="w-full h-36 object-cover" />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FaExclamationTriangle className="text-red-500 text-xs" />
                  <span className="text-[10px] font-bold uppercase tracking-wide text-red-500">Low Stock</span>
                </div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-[#029c78] font-bold text-lg mt-1">₹{Number(product.price).toFixed(2)}</p>
                <p className="text-orange-500 text-sm mt-1">In Stock: {product.quantity}</p>

                {user?.user?.role === 'admin' ? (
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => handleEditClick(product)} className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-medium transition ${darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'}`}>
                      <FaEdit size={11} /> Edit
                    </button>
                    <button onClick={() => deleteItem(product._id)} className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-medium transition ${darkMode ? 'bg-gray-700 text-red-400 hover:bg-gray-600' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}>
                      <FaTrash size={11} /> Delete
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-red-500 mt-3">⚠ Stock running low</p>
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
