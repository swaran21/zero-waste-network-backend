const express = require("express");
const router = express.Router();
const PickupRequest = require("../models/PickupRequest");
const Bill = require("../models/Bill"); // ✅ Import Bill model
const { verifyToken } = require("../middleware/authMiddleware");

// POST /api/pickup
router.post("/", verifyToken, async (req, res) => {
  try {
    const { wasteType, quantity, address, phone, pickupDate, pickupTime, wasteDesc } = req.body;

    if (!wasteType || !quantity || !address || !phone || !pickupDate || !pickupTime) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    // Save the pickup request (optional: if you still want to keep this)
    const newRequest = new PickupRequest({
      userId: req.user.id,
      phone,
      wasteType,
      quantity,
      address,
      pickupDate,
      pickupTime,
      wasteDesc,
    });

    await newRequest.save();

    // ✅ Create a bill record
    const newBill = new Bill({
      user: req.user.id,
      wasteType,
      quantity,
      phone,
      address,
      pickupDate,
      pickupTime,
      wasteDesc,
      price: 100, // 🔧 You can update this with your own price logic
    });

    await newBill.save();

    res.status(201).json({
      message: "Pickup request and bill created successfully!",
      bill: newBill,
    });
  } catch (error) {
    console.error("Pickup submission error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
