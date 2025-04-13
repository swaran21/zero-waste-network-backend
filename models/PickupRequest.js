// models/PickupRequest.js

const mongoose = require("mongoose");

const pickupRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Make sure this matches your user model name
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    wasteType: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PickupRequest", pickupRequestSchema);
