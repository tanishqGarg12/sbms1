import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import { useSelector } from 'react-redux';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../DarkModeContext';
import { FaSearch, FaTrash, FaFileDownload, FaCreditCard, FaMinus, FaPlus } from 'react-icons/fa';

function History() {
  const { darkMode } = useContext(DarkModeContext);
  const [senderId, setSenderId] = useState(uuidv4());
  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientContact, setRecipientContact] = useState('');
  const [services, setServices] = useState([]); // eslint-disable-line no-unused-vars
  const [taxRate] = useState(0.07);
  const [discountRate] = useState(0.05);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const token = user?.token;
  const id = user?.user?._id;

  useEffect(() => {
    if (searchQuery) {
      if (token) {
        axios.get(`https://backend-sbms.onrender.com/api/v1/inventory/search?query=${searchQuery}`, {
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }).then(r => setSearchResults(r.data.results || [])).catch(() => {});
      }
    } else {
      setSearchResults([]);
      if (token) {
        axios.get('https://backend-sbms.onrender.com/api/v1/cart', {
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }).then(r => setCartItems(r.data.items || [])).catch(() => {});
      }
    }
  }, [searchQuery, token]);

  const addToCart = (productId, quantity) => {
    fetch('https://backend-sbms.onrender.com/api/v1/cart/add', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ productId, quantity, id })
    }).then(r => { if (!r.ok) throw new Error(); toast.success('Added to cart!'); })
      .catch(() => toast.error('Item already added.'));
  };

  // eslint-disable-next-line no-unused-vars
  const handleServiceChange = (index, field, value) => { const u = [...services]; u[index][field] = value; setServices(u); };
  // eslint-disable-next-line no-unused-vars
  const handleAddService = () => setServices([...services, { name: '', quantity: 0, price: 0 }]);
  // eslint-disable-next-line no-unused-vars
  const handleSaveInvoice = () => {
    axios.post('https://backend-sbms.onrender.com/api/v1/invoices', {
      senderId, senderName, senderContact, recipientName, recipientContact, services, taxRate, discountRate
    }, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } })
      .then(() => { toast.success('Invoice saved!'); setSenderId(uuidv4()); setSenderName(''); setSenderContact(''); setRecipientName(''); setRecipientContact(''); setServices([]); })
      .catch(() => toast.error('Failed to save invoice.'));
  };

  const deleteItem = async (itemId) => {
    try {
      const res = await fetch('https://backend-sbms.onrender.com/api/v1/cart/remove', {
        method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ id: itemId }),
      });
      if (res.ok) { setCartItems(cartItems.filter(i => i._id !== itemId)); toast.success('Removed!'); }
      else toast.error('Failed to remove.');
    } catch { toast.error('Error removing item.'); }
  };

  const handleQuantityChange = (productId, change, x) => {
    setQuantities(prev => ({ ...prev, [productId]: Math.max(0, (prev[productId] || x) + change) }));
  };

  const subtotal = cartItems.reduce((acc, s) => acc + (quantities[s._id] || s.quantity) * s.price, 0);
  const tax = subtotal * taxRate;
  const discount = subtotal * discountRate;
  const total = parseInt(subtotal + tax - discount);

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(2, 156, 120);
    doc.rect(0, 20, 210, 18, 'F');
    doc.setFontSize(22); doc.setTextColor(255, 255, 255);
    doc.text('Invoice', 105, 33, { align: 'center' });
    doc.setFontSize(11); doc.setTextColor(80, 80, 80);
    doc.text(`From: ${senderName}`, 14, 50);
    doc.text(`To: ${recipientName}`, 14, 58);
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(14, 65, 180, 18, 3, 3, 'F');
    doc.setFontSize(10); doc.setTextColor(0, 0, 0);
    doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 20, 76);
    doc.text(`Tax: ₹${tax.toFixed(2)}`, 70, 76);
    doc.text(`Discount: ₹${discount.toFixed(2)}`, 115, 76);
    doc.setFont('helvetica', 'bold'); doc.text(`Total: ₹${total.toFixed(2)}`, 160, 76);
    doc.setFont('helvetica', 'normal');
    doc.autoTable({
      head: [['Item', 'Qty', 'Price', 'Amount']],
      body: cartItems.map(s => [s.name, quantities[s._id] || s.quantity, `₹${s.price.toFixed(2)}`, `₹${((quantities[s._id] || s.quantity) * s.price).toFixed(2)}`]),
      startY: 90,
      headStyles: { fillColor: [2, 156, 120], textColor: [255, 255, 255], fontSize: 10 },
      bodyStyles: { fontSize: 10 },
      styles: { cellPadding: 4, halign: 'center' },
      alternateRowStyles: { fillColor: [248, 248, 248] }
    });
    doc.setFontSize(9); doc.setTextColor(120, 120, 120);
    doc.text('Thank you for your business!', 14, doc.internal.pageSize.height - 15);
    doc.save('invoice.pdf');
  };

  const handleCheckout = async () => {
    const amount = total * 100;
    try {
      const res = await fetch('https://backend-sbms.onrender.com/api/v1/pay/checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency: 'INR' }),
      });
      const { order } = await res.json();
      const options = {
        key: 'rzp_test_XaigqT7nptLPme', amount: order.amount, currency: order.currency,
        name: 'SBMS', description: 'Invoice Payment', order_id: order.id,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          if (razorpay_payment_id && razorpay_order_id && razorpay_signature) {
            toast.success('Payment successful!');
            const vRes = await fetch('https://backend-sbms.onrender.com/api/v1/pay/paymentverification', {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ razorpay_order_id, razorpay_payment_id, razorpay_signature, id, amount }),
            });
            const vData = await vRes.json();
            if (vData.success) {
              handleGeneratePDF(); navigate("pay-success");
              await fetch('https://backend-sbms.onrender.com/api/v1/cart/clear', {
                method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
              });
              setCartItems([]);
            } else toast.error('Verification failed!');
          }
        },
        prefill: { name: senderName || 'Customer', email: 'customer@example.com', contact: '9999999999' },
        theme: { color: '#029c78' },
      };
      setCartItems([]);
      new window.Razorpay(options).open();
    } catch { toast.error('Payment failed. Please try again.'); }
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition ${
    darkMode ? 'bg-gray-800 border-gray-700 text-white focus:ring-green-500 placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900 focus:ring-[#029c78] placeholder-gray-400'
  }`;
  const cardClass = `p-6 rounded-xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-sm'}`;
  const thClass = `px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`;
  const tdClass = `px-4 py-3 text-sm`;

  return (
    <div className={`max-w-5xl mx-auto ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
      <h1 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Create Invoice</h1>
      <ToastContainer />

      {/* Sender & Recipient */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className={cardClass}>
          <h2 className="text-sm font-bold uppercase tracking-wide mb-4 opacity-60">Sender</h2>
          <div className="space-y-3">
            <input className={inputClass} value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder="Your Name / Company" />
            <input className={inputClass} value={senderContact} onChange={(e) => setSenderContact(e.target.value)} placeholder="Contact Info" />
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>ID: {senderId.slice(0, 8)}...</p>
          </div>
        </div>
        <div className={cardClass}>
          <h2 className="text-sm font-bold uppercase tracking-wide mb-4 opacity-60">Recipient</h2>
          <div className="space-y-3">
            <input className={inputClass} value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Client Name" />
            <input className={inputClass} value={recipientContact} onChange={(e) => setRecipientContact(e.target.value)} placeholder="Client Contact" />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className={`${cardClass} mb-6`}>
        <h2 className="text-sm font-bold uppercase tracking-wide mb-4 opacity-60">Search Inventory</h2>
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input className={`${inputClass} pl-10`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by item name..." />
        </div>

        {searchResults.length > 0 && (
          <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full">
              <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr><th className={thClass}>Name</th><th className={thClass}>Qty</th><th className={thClass}>Price</th><th className={thClass}>Action</th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {searchResults.map((item, i) => (
                  <tr key={i} className={`transition cursor-pointer ${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}>
                    <td className={`${tdClass} font-medium`}>{item.name}</td>
                    <td className={tdClass}>{item.quantity}</td>
                    <td className={tdClass}>₹{item.price.toFixed(2)}</td>
                    <td className={tdClass}>
                      <button onClick={() => addToCart(item._id, 1)} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#029c78] text-white hover:bg-[#028a6b] transition">+ Add</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Cart */}
      <div className={`${cardClass} mb-6`}>
        <h2 className="text-sm font-bold uppercase tracking-wide mb-4 opacity-60">Cart Items ({cartItems.length})</h2>
        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-3xl mb-2">🛒</p>
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>No items in cart</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
            <table className="w-full">
              <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr><th className={thClass}>Item</th><th className={thClass}>Quantity</th><th className={thClass}>Price</th><th className={thClass}>Total</th><th className={thClass}></th></tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {cartItems.map(item => (
                  <tr key={item._id} className={`transition ${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}>
                    <td className={`${tdClass} font-medium`}>{item.name}</td>
                    <td className={tdClass}>
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleQuantityChange(item._id, -1, item.quantity)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
                          <FaMinus size={9} />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{quantities[item._id] || item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item._id, 1, item.quantity)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
                          <FaPlus size={9} />
                        </button>
                      </div>
                    </td>
                    <td className={tdClass}>₹{item.price.toFixed(2)}</td>
                    <td className={`${tdClass} font-semibold text-[#029c78]`}>₹{((quantities[item._id] || item.quantity) * item.price).toFixed(2)}</td>
                    <td className={tdClass}>
                      <button onClick={() => deleteItem(item._id)} className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition"><FaTrash size={12} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className={`${cardClass} mb-6`}>
        <h2 className="text-sm font-bold uppercase tracking-wide mb-4 opacity-60">Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-sm"><span className="opacity-60">Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-sm"><span className="opacity-60">Tax (7%)</span><span>₹{tax.toFixed(2)}</span></div>
          <div className="flex justify-between text-sm"><span className="opacity-60">Discount (5%)</span><span className="text-green-500">-₹{discount.toFixed(2)}</span></div>
          <div className={`flex justify-between pt-3 mt-3 border-t text-lg font-bold ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <span>Total</span><span className="text-[#029c78]">₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={handleCheckout} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-[#029c78] text-white hover:bg-[#028a6b] transition">
          <FaCreditCard size={14} /> Pay & Checkout
        </button>
        <button onClick={handleGeneratePDF} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition ${
          darkMode ? 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
        }`}>
          <FaFileDownload size={14} /> PDF
        </button>
      </div>
    </div>
  );
}

export default History;
