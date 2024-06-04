import { NextAuthConfig, type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialProvider from "next-auth/providers/credentials";
import { refreshAccessToken } from "@/auth";
import { API } from "@/lib/fetch";
import { LoginSchema } from "./schemas/login-schema";

type ExtendedUser = DefaultSession["user"] & {
  role?: "Admin" | "User";
  uid?: string;
  id?: string;
  active?: boolean;
  accessToken: string;
  refreshToken: string;
  sessionId: string;
  tokenExpiry: string;
};

declare module "next-auth/jwt" {
  interface JWT {
    user: ExtendedUser;
  }
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }

  interface User {
    role?: "Admin" | "User";
    uid?: string;
    id?: string;
    active?: boolean;
    accessToken: string;
    refreshToken: string;
    sessionId: string;
    tokenExpiry: string;
  }
}

export const authOptions = {
  trustHost: true,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  secret: "sdfdsfsdf",
  debug: process.env.NEXT_AUTH_DEBUG === "Y",
  callbacks: {
    async session({ token, session }) {
      return { ...session, user: token.user };
    },
    async jwt({ token, user, account, profile, session, trigger }) {
      if (user) {
        return {
          ...token,
          user,
        };
      }
      if (new Date() < new Date(token?.user?.tokenExpiry)) {
        return token;
      }
      return refreshAccessToken(token);
    },
  },
  providers: [
    CredentialProvider({
      async authorize(credentials) {
        
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const { data, error } = await API.Post("/auth/local", {
            username: email,
            password,
            info: { type: "Coordinator" },
          });
          
          if (error) return null;
          return {
            ...data.user,
            accessToken: data.token,
            refreshToken: data.refresh_token,
            sessionId: data.session_id,
            tokenExpiry: data.token_expiry,
          };
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
