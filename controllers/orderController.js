const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shippingDetails, cartItems, paymentMethod, totalAmount } = req.body;

    const newOrder = new Order({
      userId, // 🔥 Save the user's ID separately
      user: {
        name: shippingDetails.name,
        email: shippingDetails.email,
        phone: shippingDetails.phone,
        address: shippingDetails.address,
      },
      cartItems,
      paymentMethod,
      totalAmount,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to place order',
      error: error.message,
    });
  }
};

// GET /api/orders/my-orders
exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
    });
  }
};