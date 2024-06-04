import * as z from "zod";

export const SetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'The password must be at least 8 characters long!')
    .max(32, 'The password must be a maximum of 32 character!')
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.*[a-zA-Z]).{8,32}$/,
      'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character!'
    ),
  confirmPassword: z.string(),
  session_id:z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match!",
  path: ["confirmPassword"],
});

