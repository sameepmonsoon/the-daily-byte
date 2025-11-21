import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    accessToken: string;
    accessExpireTime: number;
    lastName: string;
    firstName: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      accessToken: string;
      accessExpireTime: number;
      lastName: string;
      firstName: string;
    } & DefaultSession["user"];
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      email: string;
      accessToken: string;
      accessExpireTime: number;
      lastName: string;
      firstName: string;
    };
    error?: string;
  }
}
