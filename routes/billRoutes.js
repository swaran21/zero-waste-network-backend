const express = require('express');
const { createBill, getUserBills, getBillById } = require('../controllers/billController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, createBill);          // Create a bill
router.get('/', verifyToken, getUserBills);         // All bills of user
router.get('/:id', verifyToken, getBillById);       // Specific bill

module.exports = router;
