import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Invalid email!",
      required_error: "Email is required!",
    })
    .min(1, { message: "Email is required!" })
    .email({
      message: "Invalid email!",
    }),
  password: z
    .string({
      required_error: "Password is required!",
    })
    .min(1, {
      message: "Password is required!",
    }),
});

