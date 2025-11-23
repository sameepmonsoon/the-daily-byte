"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import GoogleButton from "@/components/common/buttons/google-button";
import SubmitFormButton from "@/components/common/buttons/submit-button";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { REGISTRATION_FORM_FIELDS } from "@/constants/public/auth-constants";
import { NavLinksEnum } from "@/enums";
import { getPasswordStrength } from "@/lib/formatters";

import {
  SignUpFormDataType,
  SignUpFormPayload,
  signUpSchema,
} from "@/schema/private/auth/register.schema";
import { AuthService } from "@/services/public/auth-service";
import { supabase } from "@/lib/supabaseClient";
import { signIn } from "next-auth/react";

export default function RegistrationForm() {
  const form = useForm<SignUpFormDataType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  const password = form.watch("password");
  const passwordStrength = getPasswordStrength(password || "");
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-blue-500",
  ];
  const router = useRouter();
  const handleRegistration = async (data: SignUpFormDataType) => {
    const payload: SignUpFormPayload = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    };
    const { data: signUpData, error } = await AuthService.signup(payload);
    if (error) throw toast.error(error?.message);

    toast.success("Signup successful! Please check your email to confirm.");
    router.push("/sign-in");
  };
  return (
    <Form {...form}>
      <div className="flex min-h-screen items-center justify-center p-4 py-40 dark:text-white">
        <div className="w-full max-w-md sm:max-w-xl">
          <Card className="rounded-xl border bg-white/80 py-10 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-white/5">
            <CardHeader className="space-y-2 pb-8 text-center">
              <CardTitle className="text-primary bg-clip-text text-3xl font-bold dark:text-white">
                Create Account
              </CardTitle>
              <CardDescription className="text-base text-gray-600 dark:text-white/70">
                Join us and start your journey today
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 px-10">
              <form
                onSubmit={handleSubmit(handleRegistration)}
                className="space-y-5"
              >
                {REGISTRATION_FORM_FIELDS.map((field) => {
                  switch (field.component) {
                    case "password":
                      return (
                        <div key={field.id} className="space-y-2">
                          <RHFPasswordField
                            name={field.id}
                            label={field.label}
                            placeholder={field.placeholder}
                            inputFieldClassName="w-full pl-10 h-12 bg-gray-50/50 border-gray-200 focus:border-primary-400 focus:ring-primary-400/20 transition-colors"
                            icon={field.icon}
                            disabled={isSubmitting}
                            required={field.required}
                          />

                          {/* ✅ Show strength checker only for main password field */}
                          {field.id === "password" && password && (
                            <div className="space-y-2">
                              <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((level) => (
                                  <div
                                    key={level}
                                    className={`h-2 flex-1 rounded-full transition-colors ${
                                      level <= passwordStrength
                                        ? strengthColors[passwordStrength - 1]
                                        : "bg-gray-200"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-xs text-gray-600">
                                Password strength:{" "}
                                <span className="font-medium">
                                  {strengthLabels[passwordStrength - 1] ||
                                    "Very Weak"}
                                </span>
                              </p>
                            </div>
                          )}
                        </div>
                      );

                    default:
                      return (
                        <RHFInput
                          key={field.id}
                          name={field.id}
                          label={field.label}
                          placeholder={field.placeholder}
                          type={field.type}
                          icon={field.icon}
                          disabled={isSubmitting}
                          maxLength={field?.maxLength}
                          inputFieldClassName="w-full pl-10 h-12 bg-gray-50/50 border-gray-200 focus:border-primary-400 focus:ring-primary-400/20 transition-colors"
                          required={field.required}
                        />
                      );
                  }
                })}
                {/* Terms Checkbox */}
                <div className="flex flex-col items-start justify-center gap-2">
                  <div className="flex items-center justify-start space-x-2">
                    <Controller
                      name="terms"
                      control={form.control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Checkbox
                          id="terms"
                          checked={field.value}
                          disabled={isSubmitting}
                          onCheckedChange={field.onChange}
                          className="cursor-pointer data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
                        />
                      )}
                    />

                    <Label
                      htmlFor="terms"
                      className="ml-2 block text-sm leading-relaxed whitespace-normal text-gray-600 sm:ml-0 sm:inline dark:text-white/70"
                    >
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-primary hover:text-primary-700 font-medium break-words underline dark:text-white"
                        target="_blank"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-primary hover:text-primary-700 font-medium break-words underline dark:text-white"
                        target="_blank"
                      >
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  {form.formState.errors.terms && (
                    <span className="text-destructive pl-2 text-sm">
                      {form.formState.errors.terms?.message}
                    </span>
                  )}
                </div>
                {/* Submit */}{" "}
                <SubmitFormButton
                  className="mt-5"
                  btnText={"Create Account"}
                  isSubmitting={isSubmitting}
                  submittingText="Creating account..."
                  showArrow
                />
              </form>

              {/* Divider */}
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

              {/* Google Sign Up */}
              <GoogleButton label="Sign up with Google" />
            </CardContent>

            <CardFooter className="justify-center pt-6">
              <p className="text-sm text-gray-600 dark:text-white/70">
                Already have an account?
                <Link
                  href={NavLinksEnum.Signin}
                  className="text-primary pl-2 font-semibold underline transition-colors dark:text-white/90 dark:hover:text-white"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Form>
  );
}
