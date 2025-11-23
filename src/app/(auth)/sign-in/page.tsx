import SignInForm from "@/components/form/sign-in.form";
import React from "react";

export default function SigninPage() {
  return (
    <main className="text-primary min-h-screen bg-gray-50 py-20 md:py-32 dark:bg-gray-900 dark:text-white">
      <SignInForm />
    </main>
  );
}
