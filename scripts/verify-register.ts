
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/register'; // Adjust port if needed

async function testRegister() {
    try {
        const email = `test${Date.now()}@example.com`;
        const password = 'password123';
        const phoneNumber = `123456789${Date.now() % 10}`;

        console.log(`Registering user with email: ${email}`);

        const response = await axios.post(API_URL, {
            email,
            password,
            phoneNumber
        });

        console.log('Registration successful:', response.data);
    } catch (error: any) {
        if (error.response) {
            console.error('Registration failed:', error.response.data);
        } else {
            console.error('Registration failed:', error.message);
        }
    }
}

testRegister();
