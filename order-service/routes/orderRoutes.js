const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    createOrder,
    getOrders,
    getOrder,
    processPayment,
    cancelOrder,
    updateOrderStatus
} = require('../controllers/orderController');

// All routes require authentication
router.use(authMiddleware);

// Create a new order
router.post('/', createOrder);

// Get all orders for the authenticated user
router.get('/', getOrders);

// Get a specific order
router.get('/:id', getOrder);

// Process payment for an order
router.post('/:id/payment', processPayment);

// Cancel an order
router.put('/:id/cancel', cancelOrder);

// Update order status (for admin/seller use)
router.put('/:id/status', updateOrderStatus);

module.exports = router;
