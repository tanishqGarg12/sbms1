import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import { useSelector } from 'react-redux'; 
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../DarkModeContext';
function History() {
    const { darkMode } = useContext(DarkModeContext);
    const [senderId, setSenderId] = useState(uuidv4());
    const [senderName, setSenderName] = useState('');
    const [senderContact, setSenderContact] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [recipientContact, setRecipientContact] = useState('');
    const [services, setServices] = useState([]);
    const [taxRate, setTaxRate] = useState(0.07);
    const [discountRate, setDiscountRate] = useState(0.05);
    const [cartItems, setCartItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate=useNavigate();

    const { user } = useSelector((state) => state.auth);
    const token = user?.token;
    const id=user?.user?._id;
    console.log(token)
    console.log(user)
    console.log("user id is"+id)

    // Fetch inventory items based on search query
    useEffect(() => {
        if (searchQuery) {
            // Fetch search results if there is a search query
            if (token) {
                axios.get(`http://localhost:4000/api/v1/inventory/search?query=${searchQuery}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                })
                .then(response => {
                    const items = response.data.results || [];
                    setSearchResults(items); // Store search results separately
                })
                .catch(error => console.error('Error fetching inventory items:', error));
            }
        } else {
            // If the search query is empty, reset search results and fetch all cart items
            setSearchResults([]); // Clear search results
            if (token) {
                axios.get('http://localhost:4000/api/v1/cart', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                })
                .then(response => {
                    const items = response.data.items || [];
                    setCartItems(items); // Store cart items separately
                })
                .catch(error => console.error('Error fetching cart items:', error));
            }
        }
    }, [searchQuery, token]);
    

    // Add item to the cart
    const addToCart = (productId, quantity) => {
        fetch('http://localhost:4000/api/v1/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ productId, quantity, id })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }
            return response.json();
        })
        .then(() => {
            toast.success('Item added to cart successfully!');
        })
        .catch(error => {
            toast.error('Item already added.');
            console.error('Error adding item to cart:', error);
        });
    };

    

    const handleServiceChange = (index, field, value) => {
        const updatedServices = [...services];
        updatedServices[index][field] = value;
        setServices(updatedServices);
    };

    const handleAddService = () => {
        setServices([...services, { name: '', quantity: 0, price: 0 }]);
    };

    const handleSaveInvoice = () => {
        const newInvoice = {
            senderId,
            senderName,
            senderContact,
            recipientName,
            recipientContact,
            services,
            taxRate,
            discountRate
        };

        axios.post('http://localhost:4000/api/v1/invoices', newInvoice, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(response => {
            toast.success('Invoice saved successfully!');
            setSenderId(uuidv4());
            setSenderName('');
            setSenderContact('');
            setRecipientName('');
            setRecipientContact('');
            setServices([]);
            setTaxRate(0.07);
            setDiscountRate(0.05);
        })
        .catch(error => {
            toast.error('Failed to save invoice.');
        });
    };
    const deleteItem = async (id) => {
        try {
            // Assuming you have a way to retrieve the token, e.g., from local storage or context
            // const token = localStorage.getItem('token'); // Adjust this line based on how you're managing tokens
    
            const response = await fetch(`http://localhost:4000/api/v1/cart/remove`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                    'Authorization': `Bearer ${token}`, // Pass the token in the headers
                },
                body: JSON.stringify({ id }), // Pass the ID in the body
            });
            console.log("===========================ssss")

            console.log("toek from the produt is"+token)
            console.log("===========================")
            console.log("id of product is"+id);
            console.log(id)
    
            const result = await response.json();
            console.log(result);
           
            if (response.ok) {
                const newItems = cartItems.filter(item => item._id !== id);
                setCartItems(newItems);
                toast.success('Item deleted successfully!');
            } else {
                console.log(result.message);
                toast.error(result.message || 'Failed to delete item.');
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred while deleting the item.');
        }
    };
    
// Manage quantity for each product locally in the frontend
const [quantities, setQuantities] = useState({});

const handleQuantityChange = (productId, change,x) => {
  setQuantities((prevQuantities) => ({
    ...prevQuantities,
    [productId]: Math.max(0, (prevQuantities[productId] || x) + change),
  }));
  console.log(quantities)
};
    


const handleGeneratePDF = () => {
    const doc = new jsPDF();
    
    // Add a logo (if you have a base64 image URL for it)
    // const logoUrl = 'https://cdn5.vectorstock.com/i/1000x1000/79/59/billing-stamp-on-white-vector-24357959.jpg'; // Add your base64-encoded logo URL here
    // if (logoUrl) {
    //     doc.addImage(logoUrl, 'PNG', 14, 10, 30, 15);
    // }
    
    // Title styling with a background bar
    doc.setFillColor(52, 58, 64); // Dark color for title bar
    doc.rect(0, 30, 210, 15, 'F'); // Full-width background for title
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.text('Invoice', 105, 40, { align: 'center' });

    // Add sender and recipient details with labels
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.text(`Sender:`, 14, 55);
    doc.setTextColor(0, 0, 0);
    doc.text(senderName, 35, 55);
    
    doc.setTextColor(60, 60, 60);
    doc.text(`Recipient:`, 14, 65);
    doc.setTextColor(0, 0, 0);
    doc.text(recipientName, 35, 65);

    // Invoice summary section with a bordered box for subtotal, tax, discount, and total
    doc.setFillColor(240, 240, 240);
    doc.roundedRect(14, 75, 180, 20, 3, 3, 'F');
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 20, 85);
    doc.text(`Tax: $${tax.toFixed(2)}`, 70, 85);
    doc.text(`Discount: $${discount.toFixed(2)}`, 120, 85);
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 128); // Darker color for total
    doc.text(`Total: $${total.toFixed(2)}`, 160, 85);
    doc.setFont('helvetica', 'normal');

    // Prepare table data with styled header and rows
    const tableData = cartItems.map(service => [
        service.name,
        service.quantity,
        `$${service.price.toFixed(2)}`,
        `$${(service.quantity * service.price).toFixed(2)}`
    ]);

    doc.autoTable({
        head: [['Service Name', 'Quantity', 'Price', 'Amount']],
        body: tableData,
        startY: 100,
        headStyles: {
            fillColor: [52, 58, 64],
            textColor: [255, 255, 255],
            fontSize: 12,
            halign: 'center'
        },
        bodyStyles: { textColor: [0, 0, 0], fontSize: 11 },
        styles: { cellPadding: 5, halign: 'center', lineColor: [200, 200, 200], lineWidth: 0.5 },
        alternateRowStyles: { fillColor: [245, 245, 245] }
    });

    // Footer with thank you message and page number
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Page ${i} of ${pageCount}`, 200, 290, { align: 'right' });
        
        // Thank you message only on the last page
        if (i === pageCount) {
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text('Thank you for your business!', 14, 280);
            doc.setTextColor(60, 60, 60);
            doc.text('Please make the payment by the due date.', 14, 285);
        }
    }

    // Save the generated PDF
    doc.save('invoice.pdf');
};




const subtotal = cartItems.reduce((acc, service) => acc + service.quantity * service.price, 0);
const tax = subtotal * taxRate; // Assuming taxRate is already defined
const discount = subtotal * discountRate; // Assuming discountRate is already defined
const total = parseInt( subtotal + tax - discount);
const handleCheckout = async () => {
    const amount = total*100; // Use the subtotal for the payment amount
    console.log("outside try"+amount)
    try {
        // Create an order on the server
        const response = await fetch('http://localhost:4000/api/v1/pay/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },  
            body: JSON.stringify({
                amount,
                currency: 'INR',
            }),
        });
        console.log(response)
        
        const data = await response.json();
        console.log(data)
        const { order } = data;
        console.log("inside try2")

        // Initialize Razorpay payment
        const options = {
            key: 'rzp_test_XaigqT7nptLPme', // Replace with your Razorpay API key
            amount: order.amount, // Amount in paise
            currency: order.currency,
            name: 'sbms', // Your company or website name
            description: 'Invoice Payment', // A brief description
            order_id: order.id, // The Razorpay order ID created on the server
            handler: async function (response) {
                console.log("Razorpay Response: ", response);

                const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

                if (razorpay_payment_id && razorpay_order_id && razorpay_signature) {
                    toast.success('Payment successful!');

                    // Send payment details to your server for verification using fetch
                    try {
                        console.log("Verifying payment...");

                        const verificationResponse = await fetch(
                            'http://localhost:4000/api/v1/pay/paymentverification',
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    razorpay_order_id,
                                    razorpay_payment_id,
                                    razorpay_signature,
                                    id, // Ensure 'id' is properly defined or passed
                                    amount
                                }),
                            }
                        );

                        const verificationData = await verificationResponse.json();
                        console.log('Payment verification response:', verificationData);

                        if (verificationData.success) {
                            // Verification passed, now call the checkout logic
                            console.log("Verification successful, proceeding to next step");

                            // Call your next steps (e.g., generating PDF, navigating, clearing cart)
                            handleGeneratePDF();
                            navigate("pay-success");
                            console.log("Payment verification complete");

                            // Clear cart from backend
                            await fetch('http://localhost:4000/api/v1/cart/clear', {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                    // Include any authentication token if necessary
                                    'Authorization': `Bearer ${token}`,
                                }
                            });

                            // After clearing the cart on the backend, clear it from the frontend state
                            setCartItems([]);
                            console.log("Cart items cleared:", cartItems);
                        } else {
                            toast.error('Payment verification failed!');
                        }
                    } catch (error) {
                        console.error('Error verifying payment:', error);
                        toast.error('Payment verification failed!');
                    }
                } else {
                    console.error('Payment failed or incomplete response.');
                    toast.error('Payment failed or incomplete response.');
                }
            },
            prefill: {
                name: 'Customer Name', // Prefilled customer name
                email: 'customer@example.com', // Prefilled customer email
                contact: '9999999999', // Prefilled customer contact number
            },
            notes: {
                address: 'Customer Address', // Any additional notes you want to send
            },
            theme: {
                color: '#F37254', // Customize your Razorpay payment popup's color
            },
        };

        console.log("Opening Razorpay payment popup...");
        setCartItems([]); // Clear cart items before opening the Razorpay window
        console.log("Cart items cleared:", cartItems); // Ensure cart items are cleared
        const razorpay = new window.Razorpay(options);
        razorpay.open();    
    } catch (error) {
        console.log("inside error")
        console.error('Payment Error:', error);
        toast.error('Payment failed. Please try again.');
    }
};



return (
    <div className={`p-6 max-w-6xl mx-auto shadow-md rounded-lg transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <h1 className="text-3xl font-bold mb-6 text-center">Invoice</h1>

      <ToastContainer />

      {/* Sender Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className={`p-4 border rounded ${darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-50'}`}>
          <h2 className="text-xl font-semibold mb-4">Sender Information</h2>
          <input
            type="text"
            className={`w-full p-2 mb-2 border rounded ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Your Name or Company Name"
          />
          <input
            type="text"
            className={`w-full p-2 mb-2 border rounded ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            value={senderContact}
            onChange={(e) => setSenderContact(e.target.value)}
            placeholder="Your Contact Information"
          />
          <p><strong>Sender ID:</strong> {senderId}</p>
        </div>

        {/* Recipient Information */}
        <div className={`p-4 border rounded ${darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-50'}`}>
          <h2 className="text-xl font-semibold mb-4">Recipient Information</h2>
          <input
            type="text"
            className={`w-full p-2 mb-2 border rounded ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Client Name"
          />
          <input
            type="text"
            className={`w-full p-2 mb-2 border rounded ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
            value={recipientContact}
            onChange={(e) => setRecipientContact(e.target.value)}
            placeholder="Client Contact Information"
          />
        </div>
      </div>

      {/* Cart Items Search */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Search Inventory Items</h2>
        <input
          type="text"
          className={`w-full p-2 mb-4 border rounded ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by item name..."
        />
      </div>

      {/* Cart Items */}
      {searchResults.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          <div>
            <div className={`grid grid-cols-4 gap-4 font-semibold p-2 rounded-md mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div>Name</div>
              <div>Quantity</div>
              <div>Price</div>
              <div>Total</div>
            </div>

            {searchResults.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-4 gap-4 p-2 border rounded mb-4 cursor-pointer ${darkMode ? 'border-gray-600 bg-gray-800 hover:bg-gray-700' : 'border-gray-300 bg-gray-50 hover:bg-gray-200'}`}
                onClick={() => addToCart(item._id, 1)}
              >
                <div>{item.name}</div>
                <div>{item.quantity}</div>
                <div>${item.price.toFixed(2)}</div>
                <div>${(item.quantity * item.price).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cart Items Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
        {cartItems.length === 0 ? (
          <p>No items found</p>
        ) : (
          <div>
            <div className={`grid grid-cols-4 gap-4 font-semibold p-2 rounded-md mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <div>Name</div>
              <div>Quantity</div>
              <div>Price</div>
              <div>Total</div>
            </div>
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className={`grid grid-cols-4 gap-4 p-2 border rounded mb-4 ${darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-50'}`}
              >
                <div>{item.name}</div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(item._id, -1, item.quantity)}
                    className="bg-red-500 text-white px-3 py-1 rounded-l hover:bg-red-600"
                  >
                    -
                  </button>
                  <span className={`px-4 py-1 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-900'}`}>
                    {quantities[item._id] || item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item._id, 1, item.quantity)}
                    className="bg-green-500 text-white px-3 py-1 rounded-r hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
                <div>${item.price.toFixed(2)}</div>
                <div>${((quantities[item._id] || item.quantity) * item.price).toFixed(2)}</div>
                <button
                  onClick={() => deleteItem(item._id)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Invoice Summary */}
      <div className={`p-4 border rounded mb-6 ${darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-50'}`}>
        <h2 className="text-xl font-semibold mb-4">Invoice Summary</h2>
        <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
        <p><strong>Tax:</strong> ${tax.toFixed(2)}</p>
        <p><strong>Discount:</strong> ${discount.toFixed(2)}</p>
        <p><strong>Total:</strong> ${total.toFixed(2)}</p>
      </div>

      {/* Save and Generate PDF Buttons */}
      <div className="flex justify-between">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={handleSaveInvoice}
        >
          Save Invoice
        </button>
        <button
          className="px-20 py-2 bg-yellow-500 text-white rounded"
          onClick={handleCheckout}
        >
          BUY
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={handleGeneratePDF}
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
}

export default History;
