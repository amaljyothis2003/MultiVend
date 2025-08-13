const axios = require('axios');

// Payment Service Stub - simulates payment processing
class PaymentService {
    static async processPayment(paymentData) {
        try {
            // Simulate payment processing delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Simulate different payment outcomes
            const random = Math.random();
            
            if (random > 0.9) {
                // 10% chance of payment failure
                return {
                    success: false,
                    paymentId: null,
                    message: 'Payment failed - insufficient funds'
                };
            }
            
            // 90% chance of success
            const paymentId = 'pay_' + Math.random().toString(36).substr(2, 9);
            
            return {
                success: true,
                paymentId: paymentId,
                message: 'Payment processed successfully',
                amount: paymentData.amount,
                transactionDate: new Date()
            };
        } catch (error) {
            return {
                success: false,
                paymentId: null,
                message: 'Payment service unavailable'
            };
        }
    }
    
    static async refundPayment(paymentId, amount) {
        try {
            // Simulate refund processing
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const refundId = 'ref_' + Math.random().toString(36).substr(2, 9);
            
            return {
                success: true,
                refundId: refundId,
                message: 'Refund processed successfully',
                amount: amount,
                refundDate: new Date()
            };
        } catch (error) {
            return {
                success: false,
                message: 'Refund failed'
            };
        }
    }
}

// Product Service API calls
class ProductService {
    static async getProduct(productId) {
        try {
            const response = await axios.get(`${process.env.PRODUCT_SERVICE_URL}/products/${productId}`);
            return response.data;
        } catch (error) {
            throw new Error('Product not found or service unavailable');
        }
    }
    
    static async updateProductStock(productId, quantity) {
        try {
            const response = await axios.put(`${process.env.PRODUCT_SERVICE_URL}/products/${productId}/stock`, {
                quantity: quantity
            });
            return response.data;
        } catch (error) {
            throw new Error('Failed to update product stock');
        }
    }
}

module.exports = { PaymentService, ProductService };
