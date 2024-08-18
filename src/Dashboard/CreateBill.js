import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import { ToastContainer, toast } from 'react-toastify'; // For toast notifications
import 'react-toastify/dist/ReactToastify.css';

function CreateBill() {
    const [senderId, setSenderId] = useState(uuidv4());
    const [senderName, setSenderName] = useState('');
    const [senderContact, setSenderContact] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [recipientContact, setRecipientContact] = useState('');
    const [services, setServices] = useState([]);
    const [taxRate, setTaxRate] = useState(0.07);
    const [discountRate, setDiscountRate] = useState(0.05);
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/invoices')
            .then(response => setInvoices(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleServiceChange = (index, field, value) => {
        const updatedServices = [...services];
        updatedServices[index][field] = value;
        setServices(updatedServices);
    };

    const handleAddService = () => {
        setServices([...services, { name: '', hours: 0, rate: 0 }]);
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

        axios.post('http://localhost:5000/api/invoices', newInvoice)
            .then(response => {
                setInvoices([...invoices, response.data]);
                toast.success('Invoice saved successfully!'); // Toast notification
                // Clear form fields
                setSenderId(uuidv4()); // Generate a new unique ID for the next invoice
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
                console.error(error);
            });
    };

    const subtotal = services.reduce((acc, service) => acc + service.hours * service.rate, 0);
    const tax = subtotal * taxRate;
    const discount = subtotal * discountRate;
    const total = subtotal + tax - discount;

    return (
        <div className="invoice">
            <h1>Invoice</h1>

            <ToastContainer />

            {/* Sender Information */}
            <div className="sender-info">
                <h2>Sender Information</h2>
                <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Your Name or Company Name"
                />
                <input
                    type="text"
                    value={senderContact}
                    onChange={(e) => setSenderContact(e.target.value)}
                    placeholder="Your Contact Information"
                />
                <p><strong>Sender ID:</strong> {senderId}</p>
            </div>

            {/* Recipient Information */}
            <div className="recipient-info">
                <h2>Recipient Information</h2>
                <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Client Name"
                />
                <input
                    type="text"
                    value={recipientContact}
                    onChange={(e) => setRecipientContact(e.target.value)}
                    placeholder="Client Contact Information"
                />
            </div>

            {/* Service List */}
            <div className="service-list">
                <h2>Services</h2>
                {services.map((service, index) => (
                    <div key={index} className="service-item">
                        <input
                            type="text"
                            value={service.name}
                            onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                            placeholder="Service Name"
                        />
                        <input
                            type="number"
                            value={service.hours}
                            onChange={(e) => handleServiceChange(index, 'hours', parseFloat(e.target.value))}
                            placeholder="Hours"
                        />
                        <input
                            type="number"
                            value={service.rate}
                            onChange={(e) => handleServiceChange(index, 'rate', parseFloat(e.target.value))}
                            placeholder="Rate"
                        />
                    </div>
                ))}
                <button onClick={handleAddService}>Add Service</button>
            </div>

            {/* Tax and Discount Rate */}
            <div className="rates">
                <div>
                    <label>Tax Rate: </label>
                    <input
                        type="number"
                        value={taxRate}
                        onChange={(e) => setTaxRate(parseFloat(e.target.value))}
                        step="0.01"
                    />
                </div>
                <div>
                    <label>Discount Rate: </label>
                    <input
                        type="number"
                        value={discountRate}
                        onChange={(e) => setDiscountRate(parseFloat(e.target.value))}
                        step="0.01"
                    />
                </div>
            </div>

            {/* Invoice Summary */}
            <div className="invoice-details">
                <h2>Invoice Summary</h2>
                <p><strong>Sender:</strong> {senderName} <br /> {senderContact}</p>
                <p><strong>Recipient:</strong> {recipientName} <br /> {recipientContact}</p>
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>Tax: ${tax.toFixed(2)}</p>
                <p>Discount: ${discount.toFixed(2)}</p>
                <p>Total: ${total.toFixed(2)}</p>
                <button onClick={handleSaveInvoice}>Save Invoice</button>
            </div>

            {/* Display Saved Invoices */}
            <div className="saved-invoices">
                <h2>Saved Invoices</h2>
                {invoices.map((invoice, index) => (
                    <div key={index}>
                        <p><strong>Invoice {index + 1}</strong></p>
                        <p>Sender: {invoice.senderName}</p>
                        <p>Recipient: {invoice.recipientName}</p>
                        <p>Total: ${subtotal.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CreateBill;