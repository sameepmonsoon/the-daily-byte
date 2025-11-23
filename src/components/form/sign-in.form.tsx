"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import RHFInput from "@/components/rhf/rhf-input";
import RHFPasswordField from "@/components/rhf/rhf-password";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { NavLinksEnum } from "@/enums";
import {
  SignInFormDataType,
  signInSchema,
} from "@/schema/private/auth/login.schema";
import SubmitFormButton from "../common/buttons/submit-button";
import GoogleButton from "../common/buttons/google-button";

export default function SignInForm() {
  const router = useRouter();
  const form = useForm<SignInFormDataType>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  async function loginUser(data: SignInFormDataType) {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/",
    });
    if (response?.error === null) {
      toast.success("Login Success");
      router.replace(callbackUrl);
    } else {
      toast.error(response?.error ?? "Invalid Email or Password!");
    }
  }

  return (
    <Form {...form}>
      <div className="flex min-h-screen items-center justify-center p-4 py-40 dark:text-white">
        <div className="w-full max-w-md sm:max-w-xl">
          <Card className="rounded-xl border bg-white/80 py-10 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-white/5">
            <CardHeader className="space-y-2 pb-8 text-center">
              <CardTitle className="text-primary bg-clip-text text-3xl font-bold dark:text-white">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-base text-gray-600 dark:text-white/70">
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 px-10">
              <form className="space-y-5" onSubmit={handleSubmit(loginUser)}>
                <div className="relative">
                  <RHFInput
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    icon={Mail}
                    inputFieldClassName="w-full pl-10  h-12 bg-gray-50/50 border-gray-200 focus:border-teal-400 focus:ring-teal-400/20 transition-colors"
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div className="relative">
                  <RHFPasswordField
                    label="Password"
                    name="password"
                    showLabel
                    placeholder="Enter your password"
                    icon={Lock}
                    inputFieldClassName="w-full pl-10  h-12 bg-gray-50/50 border-gray-200 focus:border-teal-400 focus:ring-teal-400/20 transition-colors"
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div className="flex items-center justify-between text-sm hover:underline">
                  <Link
                    href={NavLinksEnum.ForgotPassword}
                    className="text-primary/70 hover:text-primary font-medium underline transition-colors dark:text-white/70 dark:hover:text-white"
                  >
                    Forgot password?
                  </Link>
                </div>

                <SubmitFormButton
                  className="mt-5"
                  btnText={"Sign In"}
                  isSubmitting={isSubmitting}
                  submittingText="Signing in..."
                  showArrow
                />
              </form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full dark:bg-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 font-medium text-gray-500 dark:bg-gray-800">
                    Or continue with
                  </span>
                </div>
              </div>
              <GoogleButton label="Continue with Google" />
            </CardContent>

            <CardFooter className="justify-center pt-6">
              <p className="text-sm text-gray-600 dark:text-white/70">
                {`Don't have an account?`}
                <Link
                  href={NavLinksEnum.Register}
                  className="text-primary pl-2 font-semibold underline transition-colors dark:text-white/90 dark:hover:text-white"
                >
                  Register
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Form>
  );
}
