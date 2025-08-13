const axios = require('axios');

const BASE_URL = 'http://localhost:3003';
const USER_SERVICE_URL = 'http://localhost:3001';
const PRODUCT_SERVICE_URL = 'http://localhost:3002';

let authToken = '';
let testProductId = '';

// Test functions
async function loginUser() {
    try {
        const response = await axios.post(`${USER_SERVICE_URL}/login`, {
            email: 'test@example.com',
            password: 'password123'
        });
        authToken = response.data.token;
        console.log('✅ User login successful');
        return authToken;
    } catch (error) {
        console.log('❌ User login failed:', error.response?.data || error.message);
        throw error;
    }
}

async function createTestProduct() {
    try {
        const response = await axios.post(`${PRODUCT_SERVICE_URL}/products`, {
            name: 'Test Product for Orders',
            description: 'A test product for order testing',
            price: 25.99,
            category: 'Test',
            stock: 100,
            seller: '507f1f77bcf86cd799439011' // Mock seller ID
        }, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        testProductId = response.data.product._id;
        console.log('✅ Test product created:', testProductId);
        return testProductId;
    } catch (error) {
        console.log('❌ Product creation failed:', error.response?.data || error.message);
        throw error;
    }
}

async function testHealthCheck() {
    try {
        const response = await axios.get(`${BASE_URL}/health`);
        console.log('✅ Health check passed:', response.data);
    } catch (error) {
        console.log('❌ Health check failed:', error.response?.data || error.message);
    }
}

async function testCreateOrder() {
    try {
        const response = await axios.post(`${BASE_URL}/orders`, {
            items: [
                {
                    productId: testProductId,
                    quantity: 2
                }
            ],
            shippingAddress: {
                street: '123 Test St',
                city: 'Test City',
                state: 'TS',
                zipCode: '12345',
                country: 'USA'
            }
        }, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        console.log('✅ Order created successfully:', response.data);
        return response.data.order._id;
    } catch (error) {
        console.log('❌ Order creation failed:', error.response?.data || error.message);
        throw error;
    }
}

async function testGetOrders() {
    try {
        const response = await axios.get(`${BASE_URL}/orders`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        console.log('✅ Orders fetched:', response.data.length, 'orders found');
        return response.data;
    } catch (error) {
        console.log('❌ Get orders failed:', error.response?.data || error.message);
    }
}

async function testProcessPayment(orderId) {
    try {
        const response = await axios.post(`${BASE_URL}/orders/${orderId}/payment`, {}, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        console.log('✅ Payment processed:', response.data);
        return response.data;
    } catch (error) {
        console.log('❌ Payment processing failed:', error.response?.data || error.message);
    }
}

async function testGetOrder(orderId) {
    try {
        const response = await axios.get(`${BASE_URL}/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        console.log('✅ Order details fetched:', response.data);
        return response.data;
    } catch (error) {
        console.log('❌ Get order failed:', error.response?.data || error.message);
    }
}

// Run all tests
async function runTests() {
    console.log('🚀 Starting Order Service Tests...\n');
    
    try {
        await testHealthCheck();
        await loginUser();
        
        // We'll skip product creation for now since it requires coordination
        // with product service. Use an existing product ID or create manually
        testProductId = '507f1f77bcf86cd799439012'; // Mock product ID
        
        console.log('\n📝 Testing Order Operations...');
        const orderId = await testCreateOrder();
        await testGetOrders();
        await testGetOrder(orderId);
        await testProcessPayment(orderId);
        
        console.log('\n✅ All tests completed!');
    } catch (error) {
        console.log('\n❌ Test suite failed:', error.message);
    }
}

runTests();
