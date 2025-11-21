import { jwtDecode } from "jwt-decode";
import {
  getServerSession,
  type NextAuthOptions,
  Session,
  type User,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabaseClient";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error("Missing credentials");

        //  Login using supabase (email + password)
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email.trim(),
          password: credentials.password?.trim(),
        });

        if (error || !data.session)
          throw new Error(error?.message || "Invalid login");

        const accessToken = data.session.access_token;
        const decoded: any = jwtDecode(accessToken);

        //  Return only essential data
        return {
          id: data.user?.id,
          email: data.user?.email,
          firstName: data.user?.user_metadata?.firstName,
          lastName: data.user?.user_metadata?.lastName,
          accessToken,
          accessExpireTime: decoded.exp,
        } as any;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },

  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },

  callbacks: {
    //  Store only user & accessToken in JWT
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          email: user.email,
          accessToken: user.accessToken,
          accessExpireTime: user.accessExpireTime,
          firstName: user?.firstName,
          lastName: user?.lastName,
        };
      }

      //  Token expiration check
      const now = Math.floor(Date.now() / 1000);
      if (token.user?.accessExpireTime < now) {
        token.error = "TokenExpired";
      }

      return token;
    },

    //  Expose to client session.user
    async session({ session, token }) {
      session.user = token.user as User;
      session.error = token.error;
      return session;
    },
  },
};

// Helper for server components
export const getUserSession = (): Promise<Session | null> => {
  return getServerSession(options);
};
