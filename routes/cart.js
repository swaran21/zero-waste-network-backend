const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const {
  addToCart,
  deleteFromCart,
  getCart,
  clearCart,
  updateCart
} = require('../controllers/cartController');

// Add item to cart
router.post('/add', verifyToken, addToCart);

// Delete item from cart
router.delete('/delete/:productId', verifyToken, deleteFromCart);

// Get cart for a user
router.get('/', verifyToken, getCart);

// Clear cart
router.delete('/clear', verifyToken, clearCart);


//update cart
router.put('/update/:productId',verifyToken,updateCart)

module.exports = router;
