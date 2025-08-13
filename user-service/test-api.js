const axios = require('axios');

const baseURL = 'http://localhost:3001/users';

async function testUserService() {
    try {
        console.log('🧪 Testing User Service API...\n');
        
        // Test 1: Register a new user
        console.log('1. Testing user registration...');
        const registerResponse = await axios.post(`${baseURL}/register`, {
            name: 'Test User',
            email: 'test@example.com',
            password: 'testpass123',
            role: 'buyer'
        });
        console.log('✅ Registration successful:', registerResponse.data);
        
        // Test 2: Login with the registered user
        console.log('\n2. Testing user login...');
        const loginResponse = await axios.post(`${baseURL}/login`, {
            email: 'test@example.com',
            password: 'testpass123'
        });
        console.log('✅ Login successful:', loginResponse.data);
        
        const token = loginResponse.data.token;
        
        // Test 3: Get user profile
        console.log('\n3. Testing get profile...');
        const profileResponse = await axios.get(`${baseURL}/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('✅ Profile retrieved:', profileResponse.data);
        
        console.log('\n🎉 All tests passed! User service is working correctly.');
        
    } catch (error) {
        console.log('❌ Test failed:');
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Data:', error.response.data);
        } else {
            console.log('Error:', error.message);
        }
    }
}

// Only run if axios is available
if (require.main === module) {
    testUserService();
}

module.exports = testUserService;
