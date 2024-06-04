import * as z from "zod";

export const VerfiyOtpSchema = z.object({
    otp: z.string().min(4, {
        message: "OTP must be 4 characters!",
    }),
    session_id:z.string().optional(),
});

