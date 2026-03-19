import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DarkModeContext } from '../DarkModeContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const CategoryForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const { darkMode } = useContext(DarkModeContext);

  const fetchCategories = async () => {
    try { setCategories((await axios.get('https://backend-sbms.onrender.com/api/v1/categoryy/categories')).data); }
    catch { toast.error('Failed to fetch categories'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await axios.put(`https://backend-sbms.onrender.com/api/v1/categoryy/categories/${editingCategory._id}`, { name, description });
        setEditingCategory(null); toast.success('Updated!');
      } else {
        await axios.post('https://backend-sbms.onrender.com/api/v1/categoryy/categories', { name, description });
        toast.success('Created!');
      }
      setName(''); setDescription(''); fetchCategories();
    } catch { toast.error('Failed to save'); }
  };

  const handleEdit = (c) => { setName(c.name); setDescription(c.description); setEditingCategory(c); };
  const handleDelete = async (id) => {
    try { await axios.delete(`https://backend-sbms.onrender.com/api/v1/categoryy/categories/${id}`); fetchCategories(); toast.success('Deleted!'); }
    catch { toast.error('Failed to delete'); }
  };

  useEffect(() => { fetchCategories(); }, []);

  const inputClass = `w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
    darkMode ? 'bg-gray-800 border-gray-700 text-white focus:ring-green-500 placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900 focus:ring-[#029c78] placeholder-gray-400'
  }`;

  return (
    <div className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
      <ToastContainer />
      <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {editingCategory ? 'Edit Category' : 'Create Category'}
      </h1>

      <form onSubmit={handleSubmit} className={`p-6 rounded-xl mb-8 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
        <div className="space-y-3">
          <input type="text" placeholder="Category Name" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className={`${inputClass} resize-none`} />
        </div>
        <div className="flex gap-2 mt-4">
          <button type="submit" className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#029c78] text-white hover:bg-[#028a6b] transition">
            {editingCategory ? 'Update' : 'Create'}
          </button>
          {editingCategory && (
            <button type="button" onClick={() => { setEditingCategory(null); setName(''); setDescription(''); }}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>Cancel</button>
          )}
        </div>
      </form>

      <h2 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Categories</h2>
      <div className="space-y-2">
        {categories.map(c => (
          <div key={c._id} className={`flex items-center justify-between p-4 rounded-xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
            <div>
              <h4 className="font-semibold text-sm">{c.name}</h4>
              <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{c.description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(c)} className={`p-2 rounded-lg transition ${darkMode ? 'text-yellow-400 hover:bg-gray-700' : 'text-yellow-600 hover:bg-yellow-50'}`}><FaEdit size={14} /></button>
              <button onClick={() => handleDelete(c._id)} className={`p-2 rounded-lg transition ${darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-500 hover:bg-red-50'}`}><FaTrash size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryForm;
