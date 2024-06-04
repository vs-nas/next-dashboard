"use server";
import { auth, signIn, signOut } from "@/auth";
import { API } from "@/lib/fetch";
import { AuthError } from "next-auth";
import * as storageService from "../helper/storage";


export const Login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!!res) {
      return { error: null, data: "Login success" };
    } else {
      return { error: "Something went wrong", data: null };
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Creds", data: null };
        default:
          return { error: "Something went wrong", data: null };
      }
    } else {
      return { error: "Something went wrong", data: null };
    }
  }
};


export async function logOut() {
  const session = await auth()
  console.log(session?.user?.sessionId)
  if (session?.user?.sessionId) {
    const { error } = await API.Post("/auth/logout", { session_id: session?.user?.sessionId });
    if(!error){
      await storageService.clearAll();
      await signOut();
    }
  }
}

// export async function forgotPassword(
//   data: z.infer<typeof ForgotPasswordSchema>
// ) {
//   try {
//     const validatedFields = ForgotPasswordSchema.safeParse(data);
//     if (!validatedFields.success)
//       return { data: null, error: "Invalid Fields!" };
//     const { email } = validatedFields.data;

//     const {
//       data: respData,
//       error,
//     }: { error: any; data: ForgotPasswordResponse } = (await API.POST(
//       "/auth/password/forgot",
//       { email }
//     )) as { error: any; data: ForgotPasswordResponse };
//     if (error) {
//       return { data: respData.data, error };
//     } else {
//       return { data: respData.data, error: false };
//     }
//   } catch (error: any) {
//     throw new Error(error.message || "Something went wrong");
//   }
// }

// export async function changeEmail(data: z.infer<typeof ForgotPasswordSchema>) {
//   try {
//     const validatedFields = ForgotPasswordSchema.safeParse(data);
//     if (!validatedFields.success)
//       return { data: null, error: "Invalid Fields!" };
//     const { email } = validatedFields.data;

//     const {
//       data: respData,
//       error,
//     }: { error: any; data: ForgotPasswordResponse } = (await API.POST(
//       "/user/changeEmail",
//       { email }
//     )) as { error: any; data: ForgotPasswordResponse };
//     if (error) {
//       return { data: respData.data, error };
//     } else {
//       return { data: respData.data, error: false };
//     }
//   } catch (error: any) {
//     throw new Error(error.message || "Something went wrong");
//   }
// }

// export async function setPassword(data: z.infer<typeof SetPasswordSchema>) {
//   try {
//     const validatedFields = SetPasswordSchema.safeParse(data);
//     if (!validatedFields.success)
//       return { data: null, error: "Invalid Fields!" };
//     const { password, session_id } = validatedFields.data;

//     const {
//       data: respData,
//       error,
//     }: { error: any; data: ForgotPasswordResponse } = (await API.POST(
//       "/auth/password/reset",
//       { password, session_id }
//     )) as { error: any; data: ForgotPasswordResponse };
//     if (error) {
//       return { data: respData, error };
//     } else {
//       return { data: respData, error: false };
//     }
//   } catch (error: any) {
//     throw new Error(error.message || "Something went wrong");
//   }
// }

// export async function changePassword(data: z.infer<typeof SetPasswordSchema>) {
//   try {
//     const validatedFields = SetPasswordSchema.safeParse(data);
//     if (!validatedFields.success)
//       return { data: null, error: "Invalid Fields!" };
//     const { password } = validatedFields.data;

//     const {
//       data: respData,
//       error,
//     }: { error: any; data: ForgotPasswordResponse } = (await API.PUT(
//       "/user/change_password",
//       { password }
//     )) as { error: any; data: ForgotPasswordResponse };
//     // console.log(respData)
//     if (error) {
//       return { data: respData, error };
//     } else {
//       return { data: respData, error: false };
//     }
//   } catch (error: any) {
//     throw new Error(error.message || "Something went wrong");
//   }
// }

// export async function verfiyOtp(data: z.infer<typeof VerfiyOtpSchema>) {
//   try {
//     const validatedFields = VerfiyOtpSchema.safeParse(data);
//     if (!validatedFields.success)
//       return { data: null, error: "Invalid Fields!" };
//     const { otp, session_id } = validatedFields.data;

//     const {
//       data: respData,
//       error,
//     }: { error: boolean; data: VerifyOtpResponse } = (await API.POST(
//       "/auth/otp/verify",
//       { otp, session_id }
//     )) as { error: any; data: VerifyOtpResponse };
//     if (error) {
//       return { data: respData, error };
//     } else {
//       return { data: respData, error: false };
//     }
//   } catch (error: any) {
//     throw new Error(error.message || "Something went wrong");
//   }
// }

// export async function resendOtp(session_id: string) {
//   try {
//     const resp: { error: any; data: ResendOTPResponse } = (await API.POST(
//       "/auth/otp/send",
//       { session_id }
//     )) as { error: any; data: ResendOTPResponse };
//     return { data: resp.data, error: resp.error };
//   } catch (error: any) {
//     throw new Error(error.message || "Something went wrong");
//   }
// }
