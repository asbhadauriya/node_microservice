
const http = require('http');

const data = JSON.stringify({
    email: `test-integration-${Date.now()}@example.com`,
    password: 'password123',
    phoneNumber: `555${Date.now() % 10000000}`
});

const options = {
    hostname: 'localhost',
    port: 5000, // Default port from config/index.ts (env.PORT) or 5000
    path: '/api/auth/register', // Adjust path based on routes
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    let responseData = '';

    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        responseData += chunk;
    });
    res.on('end', () => {
        console.log('BODY: ' + responseData);
        if (res.statusCode === 201 || res.statusCode === 200) {
            console.log("VERIFICATION SUCCESSFUL");
        } else {
            console.log("VERIFICATION FAILED");
            process.exit(1);
        }
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
    process.exit(1);
});

// Write data to request body
req.write(data);
req.end();
