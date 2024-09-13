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

    const { user } = useSelector((state) => state.auth);
    const token = user?.token;
    const id=user?.user?._id;
    console.log(token)
    console.log(user)
    console.log("user id is"+id)

    // Fetch inventory items based on search query
    useEffect(() => {
        if (searchQuery && token) {
            console.log("search query"+searchQuery)
            axios.get(`http://localhost:4000/api/v1/inventory/search?query=${searchQuery}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(response => {
                console.log(response);
                const items = response.data.results || [];
                console.log("ans  is "+items);
                setCartItems(items);
            })
            .catch(error => console.error('Error fetching inventory items:', error));
        } else {
            // Fetch all cart items when no search query is present
            if (token) {
                axios.get('http://localhost:4000/api/v1/cart', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                })
                .then(response => {
                    const items = response.data.items || [];
                    console.log("ans  is "+items);
                    setCartItems(items);
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
                'Authorization': `Bearer ${token}`, // assuming `token` is available in the current scope
            },
            body: JSON.stringify({ productId, quantity,id })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }
            return response.json();
        })
        .then(data => {
            toast.success('Item added to cart successfully!');
            // Optionally update the cartItems state if necessary
        })
        .catch(error => {
            toast.error('Failed to add item to cart.');
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

    const subtotal = services.reduce((acc, service) => acc + service.quantity * service.price, 0);
    const tax = subtotal * taxRate;
    const discount = subtotal * discountRate;
    const total = subtotal + tax - discount;

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

            {/* Cart Items */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Inventory Items</h2>
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
                                key={index} 
                                className="grid grid-cols-4 gap-4 p-2 border border-gray-300 rounded bg-gray-50 mb-4 cursor-pointer hover:bg-gray-200"
                                onClick={() => addToCart(item._id,2)} // Add onClick handler
                            >
                                <div>{item.name}</div>
                                <div>{item.quantity}</div>
                                <div>${item.price.toFixed(2)}</div>
                                <div>${(item.quantity * item.price).toFixed(2)}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Services */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Services</h2>
                {services.map((service, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                        <input
                            type="text"
                            className="p-2 border border-gray-300 rounded"
                            placeholder="Service Name"
                            value={service.name}
                            onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                        />
                        <input
                            type="number"
                            className="p-2 border border-gray-300 rounded"
                            placeholder="Quantity"
                            value={service.quantity}
                            onChange={(e) => handleServiceChange(index, 'quantity', e.target.value)}
                        />
                        <input
                            type="number"
                            className="p-2 border border-gray-300 rounded"
                            placeholder="Price"
                            value={service.price}
                            onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                        />
                    </div>
                ))}
                <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleAddService}>Add Service</button>
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
