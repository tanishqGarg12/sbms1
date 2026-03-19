import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DarkModeContext } from '../DarkModeContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const SubcategoryForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const { darkMode } = useContext(DarkModeContext);

  const fetchCategories = async () => {
    try { setCategories((await axios.get('https://backend-sbms.onrender.com/api/v1/categoryy/categories')).data); }
    catch { toast.error('Failed to fetch categories'); }
  };
  const fetchSubcategories = async () => {
    try { setSubcategories((await axios.get('https://backend-sbms.onrender.com/api/v1/categoryy/subcategories')).data); }
    catch { /* silent */ }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSubcategory) {
        await axios.put(`https://backend-sbms.onrender.com/api/v1/categoryy/subcategories/${editingSubcategory._id}`, { name, description, categoryId });
        setEditingSubcategory(null); toast.success('Updated!');
      } else {
        await axios.post('https://backend-sbms.onrender.com/api/v1/categoryy/subcategories', { name, description, categoryId });
        toast.success('Created!');
      }
      setName(''); setDescription(''); setCategoryId(''); fetchSubcategories();
    } catch { toast.error('Failed to save'); }
  };

  const handleEdit = (s) => { setName(s.name); setDescription(s.description); setCategoryId(s.categoryId); setEditingSubcategory(s); };
  const handleDelete = async (id) => {
    try { await axios.delete(`https://backend-sbms.onrender.com/api/v1/categoryy/subcategories/${id}`); fetchSubcategories(); toast.success('Deleted!'); }
    catch { toast.error('Failed to delete'); }
  };

  useEffect(() => { fetchCategories(); fetchSubcategories(); }, []);

  const inputClass = `w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
    darkMode ? 'bg-gray-800 border-gray-700 text-white focus:ring-green-500 placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900 focus:ring-[#029c78] placeholder-gray-400'
  }`;

  return (
    <div className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
      <ToastContainer />
      <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {editingSubcategory ? 'Edit Subcategory' : 'Create Subcategory'}
      </h1>

      <form onSubmit={handleSubmit} className={`p-6 rounded-xl mb-8 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
        <div className="space-y-3">
          <input type="text" placeholder="Subcategory Name" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className={`${inputClass} resize-none`} />
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required className={inputClass}>
            <option value="">Select Category</option>
            {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        <div className="flex gap-2 mt-4">
          <button type="submit" className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#029c78] text-white hover:bg-[#028a6b] transition">
            {editingSubcategory ? 'Update' : 'Create'}
          </button>
          {editingSubcategory && (
            <button type="button" onClick={() => { setEditingSubcategory(null); setName(''); setDescription(''); setCategoryId(''); }}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>Cancel</button>
          )}
        </div>
      </form>

      <h2 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Subcategories</h2>
      <div className="space-y-2">
        {subcategories.map(s => (
          <div key={s._id} className={`flex items-center justify-between p-4 rounded-xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`}>
            <div>
              <h4 className="font-semibold text-sm">{s.name}</h4>
              <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{s.description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(s)} className={`p-2 rounded-lg transition ${darkMode ? 'text-yellow-400 hover:bg-gray-700' : 'text-yellow-600 hover:bg-yellow-50'}`}><FaEdit size={14} /></button>
              <button onClick={() => handleDelete(s._id)} className={`p-2 rounded-lg transition ${darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-500 hover:bg-red-50'}`}><FaTrash size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryForm;
