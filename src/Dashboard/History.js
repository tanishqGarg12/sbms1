import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
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
    const [invoices, setInvoices] = useState([]);

    // useEffect(() => {
    //     axios.get('http://localhost:5000/api/invoices')
    //         .then(response => setInvoices(response.data))
    //         .catch(error => console.error(error));
    // }, []);

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

        console.log('Saving invoice:', newInvoice);

        // axios.post('http://localhost:5000/api/invoices', newInvoice)
        //     .then(response => {
        //         console.log('Invoice saved successfully:', response.data);
        //         setInvoices([...invoices, response.data]);
        //         toast.success('Invoice saved successfully!');
        //         // Clear form fields
        //         setSenderId(uuidv4());
        //         setSenderName('');
        //         setSenderContact('');
        //         setRecipientName('');
        //         setRecipientContact('');
        //         setServices([]);
        //         setTaxRate(0.07);
        //         setDiscountRate(0.05);
        //     })
        //     .catch(error => {
        //         console.error('Failed to save invoice:', error);
        //         toast.error('Failed to save invoice.');
        //     });
    };

    const handleGeneratePDF = () => {
        const doc = new jsPDF();
        doc.text('Invoice', 10, 10);
        doc.text(`Sender: ${senderName}, 10, 20`);
        doc.text(`Recipient: ${recipientName}, 10, 30`);
        doc.text(`Subtotal: $${subtotal.toFixed(2)}, 10, 40`);
        doc.text(`Tax: $${tax.toFixed(2)}, 10, 50`);
        doc.text(`Discount: $${discount.toFixed(2)}, 10, 60`);
        doc.text(`Total: $${total.toFixed(2)}, 10, 70`);

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Sender Information */}
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

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Services</h2>
                <div className="overflow-x-auto">
                    <div className="flex">
                        <div className="w-1/4 font-semibold text-gray-700 p-2 border border-gray-300">Service Name</div>
                        <div className="w-1/4 font-semibold text-gray-700 p-2 border border-gray-300">Quantity</div>
                        <div className="w-1/4 font-semibold text-gray-700 p-2 border border-gray-300">Price</div>
                        <div className="w-1/4 font-semibold text-gray-700 p-2 border border-gray-300">Amount</div>
                    </div>
                    {services.map((service, index) => (
                        <div key={index} className="flex mb-2">
                            <input
                                type="text"
                                className="w-1/4 p-2 border border-gray-300 rounded"
                                value={service.name}
                                onChange={(e) => handleServiceChange(index, 'name', e.target.value)}
                                placeholder="Service Name"
                            />
                            <input
                                type="number"
                                className="w-1/4 p-2 border border-gray-300 rounded"
                                value={service.quantity}
                                onChange={(e) => handleServiceChange(index, 'quantity', parseFloat(e.target.value))}
                                placeholder="Quantity"
                            />
                            <input
                                type="number"
                                className="w-1/4 p-2 border border-gray-300 rounded"
                                value={service.price}
                                onChange={(e) => handleServiceChange(index, 'price', parseFloat(e.target.value))}
                                placeholder="Price"
                            />
                            <div className="w-1/4 p-2 border border-gray-300 rounded">
                                ${(service.quantity * service.price).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleAddService}
                >
                    Add Service
                </button>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Rates</h2>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/2 p-4 border border-gray-300 rounded bg-gray-50">
                        <label className="block mb-2 font-semibold">Tax Rate</label>
                        <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={taxRate}
                            onChange={(e) => setTaxRate(parseFloat(e.target.value))}
                            step="0.01"
                        />
                    </div>
                    <div className="w-full md:w-1/2 p-4 border border-gray-300 rounded bg-gray-50">
                        <label className="block mb-2 font-semibold">Discount Rate</label>
                        <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={discountRate}
                            onChange={(e) => setDiscountRate(parseFloat(e.target.value))}
                            step="0.01"
                        />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Invoice Summary</h2>
                <p><strong>Sender:</strong> {senderName} <br /> {senderContact}</p>
                <p><strong>Recipient:</strong> {recipientName} <br /> {recipientContact}</p>
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>Tax: ${tax.toFixed(2)}</p>
                <p>Discount: ${discount.toFixed(2)}</p>
                <p>Total: ${total.toFixed(2)}</p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <button
                    className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={handleSaveInvoice}
                >
                    Save Invoice
                </button>
                <button
                    className="p-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                    onClick={handleGeneratePDF}
                >
                    Generate PDF
                </button>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Saved Invoices</h2>
                {invoices.map((invoice, index) => (
                    <div key={index} className="mb-4 p-4 border border-gray-300 rounded bg-gray-50">
                        <p><strong>Invoice {index + 1}</strong></p>
                        <p>Sender: {invoice.senderName}</p>
                        <p>Recipient: {invoice.recipientName}</p>
                        <p>Total: ${invoice.services.reduce((acc, service) => acc + service.quantity * service.price, 0).toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default History;