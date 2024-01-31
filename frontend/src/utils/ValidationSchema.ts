import { z } from "zod";

export const LoginValidationSchema = z.object({
  email: z.string().min(1, "Email is required").email().trim(),
  password: z.string().min(8).max(128).trim(),
});

export const RegisterValidationSchema = z
  .object({
    email: z.string().min(1).email().trim(),
    name: z.string().min(3).max(255).trim(),
    password: z.string().min(8).max(128).trim(),
    confirmPassword: z.string().min(8).max(128).trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["password", "confirmPassword"],
    message: "Password do not match!",
  });
