
import crypto from "crypto";
import type { LoginDTO, RegisterDTO } from "./auth.types";
import { authRepository } from "./auth.repository";
import { ApiError } from "../../shared/error/ApiError";
import { generateToken, refreshAccessToken } from "../../shared/utils/token";
import { comparePassword, hashPassword } from "../../shared/utils/hash";

export const authService = {
  async register(data: RegisterDTO) {
    // Check if user already exists
    const exists = await authRepository.findByEmail(data.email);
    if (exists) throw new ApiError(409, "User already exists");

    // Create new user
    const user = await authRepository.create({
      id: crypto.randomUUID(),
      email: data.email,
      password: await hashPassword(data.password),
      phoneNumber: data.phoneNumber,
    });

    console.log("✅ User created:", user);

    return {
      success: true,
      message: "User created successfully",
      accessToken: generateToken(user.id),
    };
  },

  async login(data: LoginDTO) {
    const user = await authRepository.findByEmail(data.emailOrPhone);
    if (!user) throw new ApiError(401, "Invalid credentials");

    const valid = await comparePassword(data.password, user.password);
    if (!valid) throw new ApiError(401, "Invalid credentials");

    return generateToken(user.id);
  },

  async refreshToken(token: string) {
    try {
      return await refreshAccessToken(token);
    } catch (err) {
      throw new ApiError(401, "Invalid refresh token");
    }
  }
};
