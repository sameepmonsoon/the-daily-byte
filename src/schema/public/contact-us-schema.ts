import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .transform((str) => str.trim()) // trim white spaces
    .pipe(
      // use  pipe, you can first remove the white spaces and then perform additional validations
      z
        .string()
        .min(2, "Name is required")
        .max(72, "Name must be less than 100 characters")
        .regex(
          /^[A-Za-z\s]+$/,
          "First name can only contain letters and spaces",
        ),
    ),
  email: z
    .email("Please enter a valid email address")
    .min(1, "Email is required"),

  subject: z
    .string()
    .max(200, "Subject must be less than 200 characters")
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message should be at least 10 characters long")
    .max(1000, "Message must be less than 1000 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
