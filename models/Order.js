const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  user: {
    name: String,
    email: String,
    phone: String,
    address: String,
  },
  cartItems: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      imageUrl: String,
    },
  ],
  paymentMethod: {
    type: String,
    default: 'Cash on Delivery',
  },
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);
