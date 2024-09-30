import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import { useSelector } from 'react-redux'; 
import 'jspdf-autotable';

function History() {
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
        doc.text('Invoice', 10, 10);
        doc.text(`Sender: ${senderName}`, 10, 20);
        doc.text(`Recipient: ${recipientName}`, 10, 30);
        doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 10, 40);
        doc.text(`Tax: $${tax.toFixed(2)}`, 10, 50);
        doc.text(`Discount: $${discount.toFixed(2)}`, 10, 60);
        doc.text(`Total: $${total.toFixed(2)}`, 10, 70);

        const tableData = services.map(service => [service.name, service.quantity, service.price, (service.quantity * service.price).toFixed(2)]);
        doc.autoTable({
            head: [['Service Name', 'Quantity', 'Price', 'Amount']],
            body: tableData,
            startY: 80,
        });

        doc.save('invoice.pdf');
    };

    const subtotal = cartItems.reduce((acc, service) => acc + service.quantity * service.price, 0);
    console.log("the total is",subtotal)
    const tax = subtotal * taxRate;
    const discount = subtotal * discountRate;
    const total = subtotal + tax - discount;


    const handleCheckout = async () => {
        // const { subtotal } = calculateInvoiceTotals(); // Get the subtotal
        const amount = subtotal; // Use the subtotal for the payment amount

        try {
            // Create an order on the server
            const response = await axios.post('http://localhost:4000/api/v1/checkout', {
                amount,
                currency: 'INR',
            });

            const { order } = response.data;

            // Initialize Razorpay payment
            const options = {
                key: 'YOUR_RAZORPAY_KEY_ID',
                amount: order.amount, // Amount in paise
                currency: order.currency,
                name: 'Your Company Name',
                description: 'Invoice Payment',
                order_id: order.id,
                handler: async function (response) {
                    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
                    toast.success('Payment successful!');

                    // Send payment details to your server for verification
                    await axios.post('http://localhost:4000/api/v1/paymentverification', {
                        order_id: razorpay_order_id,
                        payment_id: razorpay_payment_id,
                        signature: razorpay_signature,
                    });

                    // Save invoice or perform any further action after payment confirmation
                },
                prefill: {
                    name: 'Customer Name', // Replace with customer details if needed
                    email: 'customer@example.com',
                    contact: '9999999999',
                },
                notes: {
                    address: 'Customer Address', // Add any additional notes
                },
                theme: {
                    color: '#F37254', // Customize your theme color
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            toast.error('Payment failed: ' + error.message);
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Invoice</h1>

            <ToastContainer />

            {/* Sender Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 border border-gray-300 rounded bg-gray-50">
                    <h2 className="text-xl font-semibold mb-4">Sender Information</h2>
                    <input
                        type="text"
                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Your Name or Company Name"
                    />
                    <input
                        type="text"
                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                        value={senderContact}
                        onChange={(e) => setSenderContact(e.target.value)}
                        placeholder="Your Contact Information"
                    />
                    <p><strong>Sender ID:</strong> {senderId}</p>
                </div>

                {/* Recipient Information */}
                <div className="p-4 border border-gray-300 rounded bg-gray-50">
                    <h2 className="text-xl font-semibold mb-4">Recipient Information</h2>
                    <input
                        type="text"
                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="Client Name"
                    />
                    <input
                        type="text"
                        className="w-full p-2 mb-2 border border-gray-300 rounded"
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
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by item name..."
                />
            </div>
            <div>
            </div>

            {/* Cart Items */}
            {searchResults.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Search Results</h2>
                    <div>
                        <div className="grid grid-cols-4 gap-4 font-semibold bg-gray-100 p-2 rounded-md mb-4">
                            <div>Name</div>
                            <div>Quantity</div>
                            <div>Price</div>
                            <div>Total</div>
                        </div>

                        {searchResults.map((item, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-4 gap-4 p-2 border border-gray-300 rounded bg-gray-50 mb-4 cursor-pointer hover:bg-gray-200"
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
                        <div className="grid grid-cols-4 gap-4 font-semibold bg-gray-100 p-2 rounded-md mb-4">
                            <div>Name</div>
                            <div>Quantity</div>
                            <div>Price</div>
                            <div>Total</div>
                        </div>
                        {cartItems.map((item, index) => (
    <div
        key={item.id} // Use a unique id for the key
        className="grid grid-cols-4 gap-4 p-2 border border-gray-300 rounded bg-gray-50 mb-4"
    >
        <div>{item.name}</div>
        <div className="flex items-center">
        <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(item._id, -1)}
                    className="bg-red-500 text-white px-3 py-1 rounded-l hover:bg-red-600"
                  >
                    -
                  </button>
                  {/* <span className="mx-2">{item.quantity}</span> */}
                  <span className="px-4 py-1 bg-gray-200 border border-gray-300">{quantities[item._id] || item.quantity }</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, 1,item.quantity)}
                    className="bg-green-500 text-white px-3 py-1 rounded-r hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
        </div>
        <div>${item.price.toFixed(2)}</div>
        <div>${((quantities[item._id] || item.quantity) * item.price).toFixed(2)}</div> {/* Total price */}
          <button
              onClick={() => deleteItem(item._id)} // Call deleteItem with the item ID
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
            <div className="p-4 border border-gray-300 rounded bg-gray-50 mb-6">
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
