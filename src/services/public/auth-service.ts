import { supabase } from "@/lib/supabaseClient";
import { SignUpFormPayload } from "@/schema/private/auth/register.schema";

export const AuthService = {
  // Login
  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password.trim(),
    });

    if (error) {
      console.error("Login Error:", error);
      throw new Error(error.message || "Login failed");
    }

    return {
      user: data.user,
      session: data.session,
    };
  },

  // Signup (email + password)
  signup: async (payload: SignUpFormPayload) => {
    const { data, error } = await supabase.auth.signUp({
      email: payload.email.trim(),
      password: payload.password.trim(),
      options: {
        data: {
          firstName: payload.firstName,
          lastName: payload.lastName,
          role: "user",
        },
      },
    });

    if (error) {
      return {
        data: null,
        error: { message: error?.message ?? "Failed to register !" },
      };
    }

    return {
      data,
      error: null,
    };
  },

  // Get logged-in user
  getCurrentUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Get User Error:", error);
      return null;
    }
    return data.user;
  },

  // Logout
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout Error:", error);
      throw new Error(error.message || "Logout failed");
    }
  },
};
