const Bill = require('../models/Bill');

// Create a new bill
exports.createBill = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const billingAmount = Math.floor(Math.random() * 200 + 50); // Estimation

    const bill = new Bill({
      ...req.body,
      user: userId,
      billingAmount,
    });

    const savedBill = await bill.save();
    res.status(201).json(savedBill);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create bill', error });
  }
};

// Get all bills for user
exports.getUserBills = async (req, res) => {
  try {
    const userId = req.user.id;
    const bills = await Bill.find({ user: userId }).sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bills', error });
  }
};

// Get specific bill by ID
exports.getBillById = async (req, res) => {
  try {
    const bill = await Bill.findOne({ _id: req.params.id, user: req.user.id });
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bill', error });
  }
};
