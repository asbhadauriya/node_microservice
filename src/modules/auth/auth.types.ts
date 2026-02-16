// export interface RegisterDTO {
//   email: string;
//   password: string;
// }

// export interface LoginDTO {
//   email: string;
//   password: string;
// }


import { z } from "zod";

/* REGISTER */
export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  phoneNumber: z.string().optional()
});

export type RegisterDTO = z.infer<typeof RegisterSchema>;

/* LOGIN */
export const LoginSchema = z.object({
  emailOrPhone: z.string().email(),
  password: z.string().min(6),
});

export type LoginDTO = z.infer<typeof LoginSchema>;