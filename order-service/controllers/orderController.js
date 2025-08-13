const Order = require('../models/Order');
const { PaymentService, ProductService } = require('../services/externalServices');

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { items, shippingAddress } = req.body;
        
        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'Order must contain at least one item' });
        }
        
        // Validate and fetch product details
        let totalAmount = 0;
        const orderItems = [];
        
        for (const item of items) {
            try {
                const product = await ProductService.getProduct(item.productId);
                
                if (product.stock < item.quantity) {
                    return res.status(400).json({ 
                        message: `Insufficient stock for product: ${product.name}` 
                    });
                }
                
                const itemPrice = product.price * item.quantity;
                totalAmount += itemPrice;
                
                orderItems.push({
                    product: item.productId,
                    productDetails: {
                        name: product.name,
                        price: product.price,
                        seller: product.seller
                    },
                    quantity: item.quantity,
                    price: itemPrice
                });
            } catch (error) {
                return res.status(400).json({ 
                    message: `Product not found or unavailable: ${item.productId}` 
                });
            }
        }
        
        // Create order
        const order = new Order({
            customer: req.user.id,
            items: orderItems,
            totalAmount,
            shippingAddress
        });
        
        await order.save();
        
        res.status(201).json({
            message: 'Order created successfully',
            order: order
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

// Get all orders for a user
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

// Get a specific order
const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        // Check if user owns this order
        if (order.customer.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }
        
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error: error.message });
    }
};

// Process payment for an order
const processPayment = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        if (order.customer.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }
        
        if (order.paymentStatus === 'paid') {
            return res.status(400).json({ message: 'Order already paid' });
        }
        
        // Process payment
        const paymentResult = await PaymentService.processPayment({
            amount: order.totalAmount,
            currency: 'USD',
            orderId: order._id
        });
        
        if (paymentResult.success) {
            order.paymentStatus = 'paid';
            order.paymentId = paymentResult.paymentId;
            order.status = 'confirmed';
            
            // Update product stock (you might want to implement this in ProductService)
            // for (const item of order.items) {
            //     await ProductService.updateProductStock(item.product, -item.quantity);
            // }
            
            await order.save();
            
            res.json({
                message: 'Payment processed successfully',
                order: order,
                paymentDetails: paymentResult
            });
        } else {
            order.paymentStatus = 'failed';
            await order.save();
            
            res.status(400).json({
                message: 'Payment failed',
                error: paymentResult.message
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error processing payment', error: error.message });
    }
};

// Cancel an order
const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        if (order.customer.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }
        
        if (order.status === 'delivered' || order.status === 'cancelled') {
            return res.status(400).json({ message: 'Cannot cancel this order' });
        }
        
        // Refund if payment was made
        if (order.paymentStatus === 'paid') {
            const refundResult = await PaymentService.refundPayment(order.paymentId, order.totalAmount);
            
            if (refundResult.success) {
                order.paymentStatus = 'refunded';
            }
        }
        
        order.status = 'cancelled';
        await order.save();
        
        res.json({
            message: 'Order cancelled successfully',
            order: order
        });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling order', error: error.message });
    }
};

// Update order status (for admin/seller use)
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        
        order.status = status;
        await order.save();
        
        res.json({
            message: 'Order status updated successfully',
            order: order
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
};

module.exports = {
    createOrder,
    getOrders,
    getOrder,
    processPayment,
    cancelOrder,
    updateOrderStatus
};
