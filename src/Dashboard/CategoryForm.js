import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DarkModeContext } from '../DarkModeContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await axios.put(`https://backend-sbms.vercel.app/api/v1/categoryy/categories/${editingCategory._id}`, { name, description });
        setEditingCategory(null);
        toast.success('Category updated successfully');
      } else {
        await axios.post('https://backend-sbms.vercel.app/api/v1/categoryy/categories', { name, description });
        toast.success('Category created successfully');
      }
      setName('');
      setDescription('');
      fetchCategories(); // Refresh the category list after adding/updating
    } catch (error) {
      console.error('Failed to save category', error);
      toast.error('Failed to save category');
    }
  };

  const handleEdit = (category) => {
    setName(category.name);
    setDescription(category.description);
    setEditingCategory(category);
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`https://backend-sbms.vercel.app/api/v1/categoryy/categories/${categoryId}`);
      fetchCategories(); // Refresh the category list after deleting
      toast.success('Category deleted successfully');
    } catch (error) {
      console.error('Failed to delete category', error);
      toast.error('Failed to delete category');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className={`max-w-lg mx-auto p-6 rounded-lg shadow-md transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-green-500' : 'bg-white text-gray-900'}`}>
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">{editingCategory ? 'Edit Category' : 'Create Category'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Category Name"
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
        <button
          type="submit"
          className={`w-full p-3 rounded-md transition duration-200 ${darkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
        >
          {editingCategory ? 'Update Category' : 'Create Category'}
        </button>
      </form>
      <h3 className="text-xl font-semibold mt-6">Categories</h3>
      <ul className="mt-4 space-y-2">
        {categories.map((category) => (
          <li key={category._id} className={`p-3 rounded-md shadow-sm flex justify-between items-center ${darkMode ? 'bg-gray-800 text-green-500' : 'bg-gray-100 text-gray-900'}`}>
            <div>
              <h4 className="font-semibold">{category.name}</h4>
              <p className="text-sm">{category.description}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(category)}
                className={`p-2 rounded-md transition duration-200 ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-green-600 text-white hover:bg-green-700'}`}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(category._id)}
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

export default CategoryForm;