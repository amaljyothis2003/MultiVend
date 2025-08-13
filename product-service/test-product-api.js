const http = require('http');

const postData = JSON.stringify({
    name: 'Test Product',
    description: 'This is a test product',
    price: 99.99,
    category: 'electronics',
    stock: 10,
    imageUrl: 'https://example.com/image.jpg'
});

const options = {
    hostname: 'localhost',
    port: 3002,
    path: '/products',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'Authorization': 'Bearer test_token_here'
    }
};

console.log('🧪 Testing Product Service...\n');

// Test 1: Get all products (no auth required)
console.log('1. Testing get all products...');
const getOptions = {
    hostname: 'localhost',
    port: 3002,
    path: '/products',
    method: 'GET'
};

const getReq = http.request(getOptions, (res) => {
    console.log(`Status: ${res.statusCode}`);
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        try {
            console.log('Response:', JSON.parse(data));
            console.log('✅ Get products test passed!\n');
        } catch (e) {
            console.log('Response:', data);
        }
        
        // Test 2: Try to create product (will fail without proper JWT)
        console.log('2. Testing create product without auth...');
        const createReq = http.request(options, (res) => {
            console.log(`Status: ${res.statusCode}`);
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    console.log('Response:', JSON.parse(data));
                } catch (e) {
                    console.log('Response:', data);
                }
                if (res.statusCode === 400 || res.statusCode === 401) {
                    console.log('✅ Auth middleware working correctly!');
                } else {
                    console.log('❌ Auth middleware not working');
                }
            });
        });

        createReq.on('error', (e) => {
            console.error('Error:', e.message);
        });

        createReq.write(postData);
        createReq.end();
    });
});

getReq.on('error', (e) => {
    console.error('Error:', e.message);
});

getReq.end();
