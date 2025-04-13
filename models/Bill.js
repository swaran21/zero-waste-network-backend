const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  wasteType: String,
  quantity: String,
  phone: String,
  pickupDate: String,
  pickupTime: String,
  address: String,
  wasteDesc: String,
  price: Number,
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);
