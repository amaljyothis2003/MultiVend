const http = require('http');

const postData = JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    password: 'testpass123',
    role: 'buyer'
});

const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/users/register',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

const req = http.request(options, (res) => {
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
    });
});

req.on('error', (e) => {
    console.error('Error:', e.message);
});

req.write(postData);
req.end();
