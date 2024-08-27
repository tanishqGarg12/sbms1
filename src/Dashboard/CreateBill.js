import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function CreateBill() {
    const [senderId, setSenderId] = useState(uuidv4());
    const [senderName, setSenderName] = useState('');
    const [senderContact, setSenderContact] = useState('');
    const [senderEmail, setSenderEmail] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [recipientContact, setRecipientContact] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');
    const [services, setServices] = useState([]);
    const [taxRate, setTaxRate] = useState(0.07);
    const [discountRate, setDiscountRate] = useState(0.05);
    const [invoices, setInvoices] = useState([]);
    const [showSummary, setShowSummary] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:4000/api/v1/invoice')
            .then(response => setInvoices(response.data))
            .catch(error => console.error('Failed to fetch invoices:', error));
    }, []);

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
            senderEmail,
            recipientName,
            recipientContact,
            recipientEmail,
            services,
            taxRate,
            discountRate,
        };

        axios.post('http://localhost:4000/api/v1/invoice', newInvoice)
            .then(response => {
                setInvoices([...invoices, response.data]);
                toast.success('Invoice saved successfully!');
                setShowSummary(true);  // Show the summary after saving the invoice
            })
            .catch(error => {
                console.error('Failed to save invoice:', error);
                toast.error('Failed to save invoice.');
            });
    };

    const handleGeneratePDF = () => {
        const doc = new jsPDF();
        doc.text(`Sender: ${senderName}`, 10, 20);
        doc.text(`Sender Email: ${senderEmail}`, 10, 30);
        doc.text(`Recipient: ${recipientName}`, 10, 40);
        doc.text(`Recipient Email: ${recipientEmail}`, 10, 50);
        doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 10, 60);
        doc.text(`Tax: $${tax.toFixed(2)}`, 10, 70);
        doc.text(`Discount: $${discount.toFixed(2)}`, 10, 80);
        doc.text(`Total: $${total.toFixed(2)}`, 10, 90);

        const tableData = services.map(service => [
            service.name,
            service.quantity,
            service.price.toFixed(2),
            (service.quantity * service.price).toFixed(2)
        ]);

        doc.autoTable({
            head: [['Service Name', 'Quantity', 'Price', 'Amount']],
            body: tableData,
            startY: 100,
        });

        doc.save('invoice.pdf');
    };

    const handleSummary = () => {
        setShowSummary(!showSummary);
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
                    <input
                        type="email"
                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="Your Email Address"
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
                    <input
                        type="email"
                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        placeholder="Recipient Email Address"
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
                <div className="flex flex-wrap -mx-4">
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

            <div className="mb-6 text-right">
                <div className="text-lg font-semibold">Subtotal: ${subtotal.toFixed(2)}</div>
                <div className="text-lg font-semibold">Tax: ${tax.toFixed(2)}</div>
                <div className="text-lg font-semibold">Discount: -${discount.toFixed(2)}</div>
                <div className="text-2xl font-bold">Total: ${total.toFixed(2)}</div>
            </div>

            {showSummary && (
                <div className="mb-6 p-4 bg-gray-100 rounded border border-gray-300">
                    <h2 className="text-xl font-semibold mb-4">Summary</h2>
                    <p><strong>Sender:</strong> {senderName}</p>
                    <p><strong>Recipient:</strong> {recipientName}</p>
                    <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
                    <p><strong>Tax:</strong> ${tax.toFixed(2)}</p>
                    <p><strong>Discount:</strong> -${discount.toFixed(2)}</p>
                    <p><strong>Total:</strong> ${total.toFixed(2)}</p>
                </div>
            )}

            <div className="flex justify-between">
                <button
                    className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={handleSaveInvoice}
                >
                    Save Invoice
                </button>
                <button
                    className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    onClick={handleGeneratePDF}
                >
                    Generate PDF
                </button>
                <button
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleSummary}
                >
                    {showSummary ? 'Close Summary' : 'Show Summary'}
                </button>
            </div>
        </div>
    );
}

export default CreateBill;
