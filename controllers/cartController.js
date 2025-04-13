const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { item } = req.body;

    if (!userId || !item) {
      return res.status(400).json({ message: 'User ID and item are required' });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [item] });
    } else {
      const existingItem = cart.items.find(i => i.productId === item.productId);
      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        cart.items.push(item);
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.productId !== productId);
    await cart.save();

    res.status(200).json({ message: 'Item removed', cart });
  } catch (error) {
    console.error("Error in deleteFromCart:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    return res.status(200).json({ items: cart.items }); // ✅ FIXED HERE
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: 'Cart cleared', cart });
  } catch (error) {
    console.error("Error in clearCart:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;
    const { action } = req.body;  // action should be either 'increment' or 'decrement'

    // Check for valid action
    if (!['increment', 'decrement'].includes(action)) {
      return res.status(400).json({ message: 'Invalid action. Use "increment" or "decrement".' });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Update the quantity based on the action
    const item = cart.items[itemIndex];
    if (action === 'increment') {
      item.quantity += 1;
    } else if (action === 'decrement' && item.quantity > 1) {
      item.quantity -= 1;
    }

    // Save the updated cart
    await cart.save();

    // Return the updated cart data
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error in updateCart:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


