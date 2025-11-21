import { z } from "zod";

export const newPasswordSchema = z
  .object({
    password: z
      .string("Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
        {
          message:
            "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character (@$!%*?&#)",
        },
      ),
    confirmPassword: z
      .string("Confirm password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
        {
          message:
            "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character (@$!%*?&#)",
        },
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const oldPasswordSchema = z.object({
  oldPassword: z.string("Old password is required").min(6, {
    message: "Old password must be at least 6 characters",
  }),
});

export const resetEmailSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address",
  }),
});

export type ResetEmailSchemaType = z.infer<typeof resetEmailSchema>;

export const changePasswordProfileSchema = z.intersection(
  oldPasswordSchema,
  newPasswordSchema,
);

export type ChangePasswordProfileSchemaType = z.infer<
  typeof changePasswordProfileSchema
>;

export type NewPasswordSchemaType = z.infer<typeof newPasswordSchema>;
