exports.createPayment = async (req, res) => {
  const { bookingId, amount, status } = req.body;

  // ❌ trusting client
  res.json({
    paymentId: Date.now(),
    bookingId,
    amount,
    status: status || "PAID"
  });
};
