import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DarkModeContext } from '../DarkModeContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SubcategoryForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [editingSubcategory, setEditingSubcategory] = useState(null);
  const { darkMode } = useContext(DarkModeContext);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://backend-sbms.vercel.app/api/v1/categoryy/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
      toast.error('Failed to fetch categories');
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get('https://backend-sbms.vercel.app/api/v1/categoryy/subcategories');
      setSubcategories(response.data);

    } catch (error) {
      console.error('Failed to fetch subcategories', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSubcategory) {
        await axios.put(`https://backend-sbms.vercel.app/api/v1/categoryy/subcategories/${editingSubcategory._id}`, { name, description, categoryId });
        setEditingSubcategory(null);
        toast.success('Subcategory updated successfully');
      } else {
        await axios.post('https://backend-sbms.vercel.app/api/v1/categoryy/subcategories', { name, description, categoryId });
        toast.success('Subcategory created successfully');
      }
      setName('');
      setDescription('');
      setCategoryId('');
      fetchSubcategories(); // Refresh the subcategory list after adding/updating
      console.log("Subcategory saved successfully");
    } catch (error) {
      console.error('Failed to save subcategory', error);
    }
  };

  const handleEdit = (subcategory) => {
    setName(subcategory.name);
    setDescription(subcategory.description);
    setCategoryId(subcategory.categoryId);
    setEditingSubcategory(subcategory);
  };

  const handleDelete = async (subcategoryId) => {
    try {
      await axios.delete(`https://backend-sbms.vercel.app/api/v1/categoryy/subcategories/${subcategoryId}`);
      fetchSubcategories(); // Refresh the subcategory list after deleting
      console.log("Subcategory deleted successfully");
      toast.success('Subcategory deleted successfully');
    } catch (error) {
      console.error('Failed to delete subcategory', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  return (
    <div className={`max-w-lg mx-auto p-6 rounded-lg shadow-md transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-green-500' : 'bg-white text-gray-900'}`}>
            <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">{editingSubcategory ? 'Edit Subcategory' : 'Create Subcategory'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Subcategory Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-800 border-gray-600 text-white focus:ring-green-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'}`}
          />
        </div>
        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-800 border-gray-600 text-white focus:ring-green-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'}`}
          />
        </div>
        <div>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-800 border-gray-600 text-white focus:ring-green-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500'}`}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className={`w-full p-3 rounded-md transition duration-200 ${darkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          {editingSubcategory ? 'Update Subcategory' : 'Create Subcategory'}
        </button>
      </form>
      <h3 className="text-xl font-semibold mt-6">Subcategories</h3>
      <ul className="mt-4 space-y-2">
        {subcategories.map((subcategory) => (
          <li key={subcategory._id} className={`p-3 rounded-md shadow-sm flex justify-between items-center ${darkMode ? 'bg-gray-800 text-green-500' : 'bg-gray-100 text-gray-900'}`}>
            <div>
              <h4 className="font-semibold">{subcategory.name}</h4>
              <p className="text-sm">{subcategory.description}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(subcategory)}
                className={`p-2 rounded-md transition duration-200 ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-green-600 text-white hover:bg-green-700'}`}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(subcategory._id)}
                className={`p-2 rounded-md transition duration-200 ${darkMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-600 text-white hover:bg-red-700'}`}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubcategoryForm;