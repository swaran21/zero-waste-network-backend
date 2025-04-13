const express = require('express');
const router = express.Router();
const { placeOrder,getOrdersByUser   } = require('../controllers/orderController');
const { verifyToken } = require("../middleware/authMiddleware");

// POST /api/orders/place-order
router.post('/place-order',verifyToken, placeOrder);

router.get('/my-orders', verifyToken, getOrdersByUser);

module.exports = router;
