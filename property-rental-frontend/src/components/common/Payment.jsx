import React, { useState } from 'react';
import axios from 'axios';

function Payment() {
  const [amount, setAmount] = useState(1000);
  const [msg, setMsg] = useState('');

  const payNow = async () => {
    const res = await axios.post(
      'http://localhost:5000/api/payment/pay',
      {
        bookingId: "BOOK123",
        amount,
        status: "PAID"
      }
    );
    setMsg(JSON.stringify(res.data, null, 2));
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Payment</h2>

        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <button onClick={payNow}>Pay</button>

        <pre>{msg}</pre>
      </div>
    </div>
  );
}

export default Payment;
