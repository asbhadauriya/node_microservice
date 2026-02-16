import { prisma } from "../../config/db";

export const authRepository = {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  async create(user: {
    id: string;
    email: string;
    password: string;
    phoneNumber?: string;
  }) {
    // Prisma create expects specific types, ensure data matches format
    return prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber,
      },
    });
  },
};
