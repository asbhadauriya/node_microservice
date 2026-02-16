
import { authService } from '../src/modules/auth/auth.service';
import { prisma } from '../src/config/db';

async function main() {
    try {
        const email = `test-service-${Date.now()}@example.com`;
        const password = 'password123';
        const phoneNumber = `987654321${Date.now() % 10}`;

        console.log('Testing authService.register...');
        const token = await authService.register({ email, password, phoneNumber });
        console.log('Register successful! Token:', token);

        const user = await prisma.user.findUnique({ where: { email } });
        console.log('User found in DB:', user);

    } catch (err) {
        console.error('Test failed:', err);
    } finally {
        await prisma.$disconnect();
    }
}

main();
