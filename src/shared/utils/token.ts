import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_SECRET = process.env.JWT_SECRET || 'sercrasdsddassadasdasdasdet';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secresercrasdsddassadasdasdasdett';

export const generateToken = (userId: string) => {
    return jwt.sign({ userId }, ACCESS_SECRET, {
        expiresIn: "15m",
    });
};

export const generateRefreshToken = (userId: string) => {
    return jwt.sign({ userId }, REFRESH_SECRET, {
        expiresIn: "7d",
    });
};

export const refreshAccessToken = async (refreshToken: string) => {
    const payload = jwt.verify(refreshToken, REFRESH_SECRET) as {
        userId: string;
    };

    return generateToken(payload.userId);
};
