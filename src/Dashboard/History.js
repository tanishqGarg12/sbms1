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
  const [stockMap, setStockMap] = useState({});
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const token = user?.token;
  const id = user?.user?._id;

  useEffect(() => {
    fetch('https://backend-sbms.onrender.com/api/v1/inventory/getallinventory')
      .then(r => r.json())
      .then(data => {
        const map = {};
        (data || []).forEach(p => { map[p._id] = p.quantity; });
        setStockMap(map);
      }).catch(() => {});
  }, []);

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

  const refreshCart = () => {
    if (token) {
      axios.get('https://backend-sbms.onrender.com/api/v1/cart', {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      }).then(r => setCartItems(r.data.items || [])).catch(() => {});
    }
  };

  const addToCart = (productId, quantity) => {
    fetch('https://backend-sbms.onrender.com/api/v1/cart/add', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ productId, quantity, id })
    }).then(r => { if (!r.ok) throw new Error(); toast.success('Added to cart!'); refreshCart(); })
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

  const handleQuantityChange = (productId, change, x, maxQty) => {
    setQuantities(prev => {
      const val = (prev[productId] || x) + change;
      if (val < 1 || (maxQty !== undefined && val > maxQty)) return prev;
      return { ...prev, [productId]: val };
    });
  };

  const subtotal = cartItems.reduce((acc, s) => acc + (quantities[s._id] || s.quantity) * s.price, 0);
  const tax = subtotal * taxRate;
  const discount = subtotal * discountRate;
  const total = Math.round((subtotal + tax - discount) * 100) / 100;

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    const w = doc.internal.pageSize.width;
    const h = doc.internal.pageSize.height;
    const brand = [2, 156, 120];
    const dark = [30, 30, 30];
    const gray = [120, 120, 120];
    const light = [245, 247, 250];
    const today = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

    // Header bar
    doc.setFillColor(...brand);
    doc.rect(0, 0, w, 4, 'F');

    // Company name & Invoice title
    doc.setFontSize(24); doc.setFont('helvetica', 'bold'); doc.setTextColor(...dark);
    doc.text('SBMS', 20, 28);
    doc.setFontSize(10); doc.setFont('helvetica', 'normal'); doc.setTextColor(...gray);
    doc.text('Smart Business Management System', 20, 35);

    doc.setFontSize(28); doc.setFont('helvetica', 'bold'); doc.setTextColor(...brand);
    doc.text('INVOICE', w - 20, 28, { align: 'right' });
    doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.setTextColor(...gray);
    doc.text(`Date: ${today}`, w - 20, 36, { align: 'right' });
    doc.text(`Invoice #: ${senderId.slice(0, 8).toUpperCase()}`, w - 20, 42, { align: 'right' });

    // Divider
    doc.setDrawColor(230, 230, 230); doc.setLineWidth(0.5);
    doc.line(20, 50, w - 20, 50);

    // From / To section
    const colW = (w - 40) / 2;
    doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.setTextColor(...brand);
    doc.text('BILLED FROM', 20, 62);
    doc.text('BILLED TO', 20 + colW + 10, 62);

    doc.setFontSize(11); doc.setFont('helvetica', 'bold'); doc.setTextColor(...dark);
    doc.text(senderName || 'Your Company', 20, 70);
    doc.text(recipientName || 'Client Name', 20 + colW + 10, 70);

    doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.setTextColor(...gray);
    doc.text(senderContact || 'Contact info', 20, 77);
    doc.text(recipientContact || 'Contact info', 20 + colW + 10, 77);

    // Items table
    doc.autoTable({
      head: [['#', 'Item', 'Qty', 'Unit Price', 'Amount']],
      body: cartItems.map((s, i) => {
        const qty = quantities[s._id] || s.quantity;
        return [i + 1, s.name, qty, `₹${s.price.toFixed(2)}`, `₹${(qty * s.price).toFixed(2)}`];
      }),
      startY: 90,
      margin: { left: 20, right: 20 },
      headStyles: { fillColor: brand, textColor: [255, 255, 255], fontSize: 9, fontStyle: 'bold', cellPadding: 5 },
      bodyStyles: { fontSize: 9, cellPadding: 5, textColor: dark },
      columnStyles: { 0: { halign: 'center', cellWidth: 12 }, 2: { halign: 'center' }, 3: { halign: 'right' }, 4: { halign: 'right', fontStyle: 'bold' } },
      alternateRowStyles: { fillColor: light },
      styles: { lineWidth: 0 },
    });

    // Summary section
    const finalY = doc.lastAutoTable.finalY + 10;
    const summaryX = w - 90;

    doc.setDrawColor(230, 230, 230); doc.setLineWidth(0.3);

    doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.setTextColor(...gray);
    doc.text('Subtotal', summaryX, finalY);
    doc.text(`₹${subtotal.toFixed(2)}`, w - 20, finalY, { align: 'right' });

    doc.text('Tax (7%)', summaryX, finalY + 8);
    doc.text(`₹${tax.toFixed(2)}`, w - 20, finalY + 8, { align: 'right' });

    doc.text('Discount (5%)', summaryX, finalY + 16);
    doc.setTextColor(2, 156, 120);
    doc.text(`-₹${discount.toFixed(2)}`, w - 20, finalY + 16, { align: 'right' });

    doc.line(summaryX, finalY + 21, w - 20, finalY + 21);

    doc.setFontSize(13); doc.setFont('helvetica', 'bold'); doc.setTextColor(...dark);
    doc.text('Total', summaryX, finalY + 30);
    doc.setTextColor(...brand);
    doc.text(`₹${total.toFixed(2)}`, w - 20, finalY + 30, { align: 'right' });

    // Footer
    doc.setFillColor(...light);
    doc.roundedRect(20, h - 40, w - 40, 22, 3, 3, 'F');
    doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.setTextColor(...gray);
    doc.text('Thank you for your business!', w / 2, h - 27, { align: 'center' });
    doc.setFontSize(7);
    doc.text('This is a computer-generated invoice from SBMS.', w / 2, h - 21, { align: 'center' });

    // Bottom bar
    doc.setFillColor(...brand);
    doc.rect(0, h - 4, w, 4, 'F');

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
      new window.Razorpay(options).open();
    } catch { toast.error('Payment failed. Please try again.'); }
  };

  const inputClass = `w-full px-4 py-3.5 rounded-2xl border text-sm focus:outline-none focus:ring-2 transition ${
    darkMode ? 'bg-gray-800/50 border-gray-700 text-white focus:ring-brand-500 placeholder-gray-500' : 'bg-gray-50 border-gray-200 text-gray-900 focus:ring-brand-500 placeholder-gray-400'
  }`;
  const card = `p-6 rounded-2xl ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-100 shadow-sm'}`;
  const thClass = `px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-widest ${darkMode ? 'text-gray-600' : 'text-gray-300'}`;
  const tdClass = `px-4 py-3.5 text-sm`;

  return (
    <div className={`max-w-5xl mx-auto ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
      <h1 className={`text-2xl font-black mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Create Invoice</h1>
      <ToastContainer />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className={card}>
          <h2 className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>Sender</h2>
          <div className="space-y-3">
            <input className={inputClass} value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder="Your Name / Company" />
            <input className={inputClass} value={senderContact} onChange={(e) => setSenderContact(e.target.value)} placeholder="Contact Info" />
            <p className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>ID: {senderId.slice(0, 8)}...</p>
          </div>
        </div>
        <div className={card}>
          <h2 className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>Recipient</h2>
          <div className="space-y-3">
            <input className={inputClass} value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Client Name" />
            <input className={inputClass} value={recipientContact} onChange={(e) => setRecipientContact(e.target.value)} placeholder="Client Contact" />
          </div>
        </div>
      </div>

      <div className={`${card} mb-6`}>
        <h2 className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>Search Inventory</h2>
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input className={`${inputClass} pl-10`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by item name..." />
        </div>
        {searchResults.length > 0 && (
          <div className={`mt-4 overflow-hidden rounded-2xl border ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
            <table className="w-full">
              <thead className={darkMode ? 'bg-gray-800/50' : 'bg-gray-50/50'}>
                <tr><th className={thClass}>Name</th><th className={thClass}>Qty</th><th className={thClass}>Price</th><th className={thClass}>Action</th></tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-gray-800' : 'divide-gray-50'}`}>
                {searchResults.map((item, i) => (
                  <tr key={i} className={`transition ${darkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50/50'}`}>
                    <td className={`${tdClass} font-semibold`}>{item.name}</td>
                    <td className={tdClass}>{item.quantity}</td>
                    <td className={tdClass}>₹{item.price.toFixed(2)}</td>
                    <td className={tdClass}>
                      <button onClick={() => addToCart(item._id, 1)} disabled={item.quantity === 0}
                        className={`px-4 py-1.5 rounded-xl text-xs font-bold transition ${item.quantity === 0 ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-brand-500 text-white hover:bg-brand-400'}`}>
                        {item.quantity === 0 ? 'Out of Stock' : '+ Add'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className={`${card} mb-6`}>
        <h2 className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>Cart ({cartItems.length})</h2>
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">🛒</p>
            <p className={`text-sm ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>No items in cart</p>
          </div>
        ) : (
          <div className={`overflow-hidden rounded-2xl border ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
            <table className="w-full">
              <thead className={darkMode ? 'bg-gray-800/50' : 'bg-gray-50/50'}>
                <tr><th className={thClass}>Item</th><th className={thClass}>Quantity</th><th className={thClass}>Price</th><th className={thClass}>Total</th><th className={thClass}></th></tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-gray-800' : 'divide-gray-50'}`}>
                {cartItems.map(item => (
                  <tr key={item._id} className={`transition ${darkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50/50'}`}>
                    <td className={`${tdClass} font-semibold`}>{item.name}</td>
                    <td className={tdClass}>
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleQuantityChange(item._id, -1, item.quantity, stockMap[item.productId || item._id])}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
                          <FaMinus size={8} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{quantities[item._id] || item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item._id, 1, item.quantity, stockMap[item.productId || item._id])}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
                          <FaPlus size={8} />
                        </button>
                      </div>
                    </td>
                    <td className={tdClass}>₹{item.price.toFixed(2)}</td>
                    <td className={`${tdClass} font-bold text-brand-500`}>₹{((quantities[item._id] || item.quantity) * item.price).toFixed(2)}</td>
                    <td className={tdClass}>
                      <button onClick={() => deleteItem(item._id)} className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition"><FaTrash size={11} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className={`${card} mb-6`}>
        <h2 className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between text-sm"><span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between text-sm"><span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>Tax (7%)</span><span>₹{tax.toFixed(2)}</span></div>
          <div className="flex justify-between text-sm"><span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>Discount (5%)</span><span className="text-green-500">-₹{discount.toFixed(2)}</span></div>
          <div className={`flex justify-between pt-4 mt-4 border-t text-lg font-black ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
            <span>Total</span><span className="text-brand-500">₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={handleCheckout} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold bg-brand-500 text-white hover:bg-brand-400 transition shadow-lg shadow-brand-500/20">
          <FaCreditCard size={14} /> Pay & Checkout
        </button>
        <button onClick={handleGeneratePDF} className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold transition ${
          darkMode ? 'bg-gray-900 border border-gray-800 text-gray-300 hover:bg-gray-800' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
        }`}>
          <FaFileDownload size={14} /> PDF
        </button>
      </div>
    </div>
  );
}

export default History;
