import app from './app'
import { config } from './config'
import { prisma } from './config/db';
import dotenv from "dotenv";
dotenv.config();

const PORT = config.port

async function testDB() {
  try {
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    const result: any = await prisma.$queryRaw`SELECT NOW()`;
    console.log("Connected ✅", result[0]);
  } catch (err) {
    console.error("Connection failed ❌", err);
  }
}
app.listen(PORT, '0.0.0.0', () => {
  testDB();
  console.log(`Server running on port ${PORT}`)
})
