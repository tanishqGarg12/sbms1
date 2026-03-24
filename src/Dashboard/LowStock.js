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
      <div className="flex items-center gap-3 mb-8">
        <h1 className={`text-2xl font-black ${darkMode ? 'text-white' : 'text-gray-900'}`}>Low Stock</h1>
        <span className="text-xs px-3 py-1 rounded-full font-bold bg-red-500/10 text-red-500">{lowStockProducts.length} items</span>
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

      {lowStockProducts.length === 0 ? (
        <div className={`text-center py-20 rounded-3xl ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-100'}`}>
          <p className="text-5xl mb-4">✅</p>
          <p className={`font-semibold ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>All stock levels are healthy</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {lowStockProducts.map(product => (
            <div key={product._id} className={`rounded-2xl overflow-hidden card-hover ${
              darkMode ? 'bg-gray-900 border border-red-500/20' : 'bg-white border border-red-100 shadow-sm'
            }`}>
              <img src={product.file || 'https://via.placeholder.com/300x150?text=No+Image'} alt={product.name} className="w-full h-36 object-cover" />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FaExclamationTriangle className="text-red-500 text-xs" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">Low Stock</span>
                </div>
                <h3 className="font-bold text-sm">{product.name}</h3>
                <p className="text-brand-500 font-black text-lg mt-1">₹{Number(product.price).toFixed(2)}</p>
                <p className="text-orange-500 text-xs font-semibold mt-1">Only {product.quantity} left</p>

                {user?.user?.role === 'admin' ? (
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => handleEditClick(product)} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition ${
                      darkMode ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20' : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                    }`}><FaEdit size={10} /> Edit</button>
                    <button onClick={() => deleteItem(product._id)} className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition ${
                      darkMode ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-red-50 text-red-600 hover:bg-red-100'
                    }`}><FaTrash size={10} /> Delete</button>
                  </div>
                ) : (
                  <p className="text-xs text-red-500 font-semibold mt-3">⚠ Stock running low</p>
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
