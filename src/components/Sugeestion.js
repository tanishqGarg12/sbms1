import React, { useState, useEffect, useContext } from 'react';
import { DarkModeContext } from '../DarkModeContext';

const Sugeestion = () => {
  const API_KEY = "AIzaSyBi01m3R0_RehfUQ4pDHvirXXyMz2KrMhs"; // Make sure to secure your API key
  const obj = {
    q: "apple fruddit" // The user-purchased product
  };
  
  const [products, setProducts] = useState([]); // State to store the list of products

  const callGeminiAPI = async (retryCount = 0) => {
    try {
      console.log('Calling Gemini API...');
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Given that the user has purchased ${obj.q}, suggest 6 additional products that complement this purchase. Just start giving products, no heading. Provide a short description of each recommended product below its name.`
              }]
            }],
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 429 && retryCount < 5) {
          // Retry with exponential backoff
          const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff delay
          console.warn(`Rate limited. Retrying in ${delay / 1000} seconds...`);
          setTimeout(() => callGeminiAPI(retryCount + 1), delay);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Parse the JSON response
      console.log('API response:', data); // Log the response for debugging

      const responseText = data.candidates[0].content.parts[0].text; // Extract the text part of the response
      console.log('Response text:', responseText); // Log the response text for debugging

      // Assume responseText contains products separated by line breaks
      const parsedProducts = responseText.split("\n").filter(p => p.trim() !== "").map(item => {
        const parts = item.split(":"); // Split into product name and description
        return { name: parts[0].trim(), description: parts[1]?.trim() || '' };
      });

      setProducts(parsedProducts); // Store the products in the state
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setProducts([{ name: 'Error', description: 'Error fetching response from API' }]);
    }
  };

  useEffect(() => {
    callGeminiAPI(); // Call the API when the component mounts
  }, []); // Empty dependency array to run once when the component mounts
  
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <h1 className="text-2xl font-bold mb-4">Suggestions from our AI</h1>
      <div className={`p-4 rounded-md shadow-md ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <h2 className="text-xl mb-4"></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div key={index} className={`p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className={`text-gray-300 ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>{product.description}</p>
              </div>
            ))
          ) : (
            <p>Loading product suggestions...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sugeestion;