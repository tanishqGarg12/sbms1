// src/components/SubcategoryForm.js

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DarkModeContext } from '../DarkModeContext';

const SubcategoryForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const { darkMode } = useContext(DarkModeContext);

  const fetchCategories = async () => {
    const response = await axios.get('http://localhost:4000/api/v1/categoryy/categories');
    setCategories(response.data);
  };

  const fetchSubcategories = async () => {
    const response = await axios.get('http://localhost:4000/api/v1/categoryy/subcategories');
    setSubcategories(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/v1/categoryy/subcategories', { name, description, categoryId });
      setName('');
      setDescription('');
      setCategoryId('');
      fetchSubcategories(); // Refresh the subcategory list after adding
      console.log("successfully created");
    } catch (error) {
      console.error('Failed to create subcategory', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  return (
    <div className={`max-w-lg mx-auto p-6 rounded-lg shadow-md transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-green-500' : 'bg-white text-gray-900'}`}>
      <h2 className="text-2xl font-semibold mb-4">Create Subcategory</h2>
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
          Create Subcategory
        </button>
      </form>
      <h3 className="text-xl font-semibold mt-6">Subcategories</h3>
      <ul className="mt-4 space-y-2">
        {subcategories.map((subcategory) => (
          <li key={subcategory._id} className={`p-3 rounded-md shadow-sm ${darkMode ? 'bg-gray-800 text-green-500' : 'bg-gray-100 text-gray-900'}`}>
            {subcategory.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubcategoryForm;