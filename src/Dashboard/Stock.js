import React, { useEffect, useState } from "react";

const Stock = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch inventory data from API when the component mounts
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("https://backend-sbms.onrender.com/api/v1/inventory/getallinventoryc");
        if (!response.ok) {
          throw new Error("Failed to fetch inventory data");
        }
        const result = await response.json();
        setData(result); // Set the fetched data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Category-wise Stock Details</h1>
      {data.map((category, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">
            {category._id.category} / {category._id.subcategory} (Total: {category.totalQuantity})
          </h2>
          <table className="w-full text-left border border-collapse border-gray-400">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Added Time</th>
                <th className="border px-4 py-2">Updated Time</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Purchased Price</th>
                <th className="border px-4 py-2">Selling Price</th>
                {/* <th className="border px-4 py-2">Status</th> */}
                {/* <th className="border px-4 py-2">Selling Price</th> */}
              </tr>
            </thead>
            <tbody>
              {category.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{new Date(item.addedTime).toLocaleString()}</td>
                  <td className="border px-4 py-2">{new Date(item.updatedTime).toLocaleString()}</td>
                  <td className="border px-4 py-2">{item.quantity}</td>
                  <td className="border px-4 py-2">{item.purchasedPrice}</td>
                  <td className="border px-4 py-2">{item.sellingPrice}</td>
                  {/* <td className="border px-4 py-2 text-red-600 font-bold">SOLD</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Stock;
