import React, { useState, useContext, useEffect } from 'react';
import { FaEdit, FaTrash, FaCloudUploadAlt, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { DarkModeContext } from '../DarkModeContext';

const InventoryApp = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemPricep, setItemPricep] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [unit, setUnit] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) { setFile(f); const r = new FileReader(); r.onloadend = () => setImagePreview(r.result); r.readAsDataURL(f); }
  };

  useEffect(() => {
    (async () => {
      try {
        const [catRes, subRes] = await Promise.all([
          axios.get('https://backend-sbms.onrender.com/api/v1/categoryy/categories'),
          axios.get('https://backend-sbms.onrender.com/api/v1/categoryy/subcategories'),
        ]);
        const data = {};
        catRes.data.forEach(c => {
          data[c.name] = subRes.data.filter(s => s.categoryId._id === c._id).map(s => s.name);
        });
        setCategories(data);
      } catch {}
    })();
  }, []);

  const units = ['kg', 'g', 'pcs'];

  const resetForm = () => {
    setItemName(''); setItemPrice(''); setItemPricep(''); setItemQuantity('');
    setCategory(''); setSubcategory(''); setUnit(''); setFile(null); setImagePreview(''); setEditIndex(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemName || !itemPrice || !itemQuantity || !category || !subcategory || !unit) { toast.error('Please fill in all fields!'); return; }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('name', itemName); fd.append('price', itemPrice); fd.append('purchasedprice', itemPricep);
      fd.append('quantity', itemQuantity); fd.append('category', category); fd.append('subcategory', subcategory);
      fd.append('unit', unit); if (file) fd.append('file', file);

      const res = editIndex !== null
        ? await fetch(`https://backend-sbms.onrender.com/api/v1/inventory/inventory/${items[editIndex]._id}`, { method: 'PUT', body: fd })
        : await fetch('https://backend-sbms.onrender.com/api/v1/inventory/createinventory', { method: 'POST', body: fd });
      const result = await res.json();
      if (res.ok) {
        if (editIndex !== null) { setItems(items.map((item, i) => i === editIndex ? { ...result, _id: item._id } : item)); toast.success('Updated!'); }
        else { setItems([...items, result]); toast.success('Added!'); }
      } else toast.error(result.message || 'Failed to save.');
    } catch { toast.error('Error saving item.'); } finally { setLoading(false); }
    resetForm();
  };

  const deleteItem = async (id) => {
    try {
      const res = await fetch(`https://backend-sbms.onrender.com/api/v1/inventory/inventory/${id}`, { method: 'DELETE' });
      if (res.ok) { setItems(items.filter(i => i._id !== id)); toast.success('Deleted!'); }
      else toast.error('Failed to delete.');
    } catch { toast.error('Error deleting.'); }
  };

  const startEdit = (index) => {
    const { name, price, purchasedprice, quantity, category, subcategory, unit, file } = items[index];
    setItemName(name); setItemPrice(price); setItemPricep(purchasedprice); setItemQuantity(quantity);
    setCategory(category); setSubcategory(subcategory); setUnit(unit); setImagePreview(file); setEditIndex(index);
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition ${
    darkMode ? 'bg-gray-800 border-gray-700 text-white focus:ring-green-500 placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900 focus:ring-[#029c78] placeholder-gray-400'
  }`;
  const selectClass = `${inputClass} appearance-none`;
  const cardClass = `rounded-xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`;
  const thClass = `px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`;
  const tdClass = `px-4 py-3 text-sm`;

  return (
    <div className={`max-w-4xl mx-auto ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
      <ToastContainer />
      <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {editIndex !== null ? 'Edit Stock Item' : 'Add New Stock'}
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className={`${cardClass} p-6 mb-8`} encType="multipart/form-data">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Category</label>
            <select value={category} onChange={(e) => { setCategory(e.target.value); setSubcategory(''); }} className={selectClass}>
              <option value="">Select Category</option>
              {Object.keys(categories).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Subcategory</label>
            <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} disabled={!category} className={selectClass}>
              <option value="">Select Subcategory</option>
              {category && categories[category]?.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Unit</label>
            <select value={unit} onChange={(e) => setUnit(e.target.value)} className={selectClass}>
              <option value="">Select Unit</option>
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Item Name</label>
            <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="e.g. Basmati Rice" className={inputClass} />
          </div>
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Selling Price (₹)</label>
            <input type="number" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} placeholder="0.00" className={inputClass} />
          </div>
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Purchase Price (₹)</label>
            <input type="number" value={itemPricep} onChange={(e) => setItemPricep(e.target.value)} placeholder="0.00" className={inputClass} />
          </div>
          <div>
            <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Quantity</label>
            <input type="number" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} placeholder="0" className={inputClass} />
          </div>

          {/* Image Upload */}
          <div className="sm:col-span-2">
            <label className={`block text-xs font-medium mb-1.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Product Image</label>
            <label className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-dashed cursor-pointer transition ${
              darkMode ? 'border-gray-600 hover:border-green-500 text-gray-400' : 'border-gray-300 hover:border-[#029c78] text-gray-500'
            }`}>
              <FaCloudUploadAlt size={16} />
              <span className="text-sm">{file ? file.name : 'Click to upload image'}</span>
              <input type="file" name="file" onChange={handleFileChange} className="hidden" accept="image/*" />
            </label>
          </div>
        </div>

        {imagePreview && (
          <div className="relative mt-4 inline-block">
            <img src={imagePreview} alt="Preview" className="h-32 w-32 object-cover rounded-xl" />
            <button type="button" onClick={() => { setFile(null); setImagePreview(''); }}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs"><FaTimes /></button>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <button type="submit" disabled={loading} className={`px-8 py-3 rounded-xl text-sm font-semibold bg-[#029c78] text-white hover:bg-[#028a6b] transition ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>
            {loading ? 'Saving...' : editIndex !== null ? 'Update Item' : 'Add Item'}
          </button>
          {editIndex !== null && (
            <button type="button" onClick={resetForm} className={`px-6 py-3 rounded-xl text-sm font-semibold transition ${
              darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}>Cancel</button>
          )}
        </div>
      </form>

      {/* Inventory List */}
      <h2 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recently Added</h2>
      {items.length === 0 ? (
        <div className={`${cardClass} text-center py-12`}>
          <p className="text-3xl mb-2">📦</p>
          <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Items you add will appear here</p>
        </div>
      ) : (
        <div className={`${cardClass} overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
                <tr>
                  <th className={thClass}>Name</th>
                  <th className={thClass}>Category</th>
                  <th className={thClass}>Qty</th>
                  <th className={thClass}>Sell ₹</th>
                  <th className={thClass}>Buy ₹</th>
                  <th className={thClass}>Unit</th>
                  <th className={thClass}></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {items.map((item, index) => (
                  <tr key={item._id} className={`transition ${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}>
                    <td className={`${tdClass} font-medium`}>{item.name}</td>
                    <td className={tdClass}><span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.category} / {item.subcategory}</span></td>
                    <td className={tdClass}>{item.quantity}</td>
                    <td className={`${tdClass} text-[#029c78] font-semibold`}>₹{item.price}</td>
                    <td className={tdClass}>₹{item.purchasedprice}</td>
                    <td className={tdClass}>{item.unit}</td>
                    <td className={tdClass}>
                      <div className="flex gap-1">
                        <button onClick={() => startEdit(index)} className={`p-2 rounded-lg transition ${darkMode ? 'text-yellow-400 hover:bg-gray-700' : 'text-yellow-600 hover:bg-yellow-50'}`}><FaEdit size={13} /></button>
                        <button onClick={() => deleteItem(item._id)} className={`p-2 rounded-lg transition ${darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-500 hover:bg-red-50'}`}><FaTrash size={13} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryApp;
