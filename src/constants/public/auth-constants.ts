import { SignUpFormDataType } from "@/schema/private/auth/register.schema";
import { Lock, LucideIcon, Mail, User } from "lucide-react";

type FieldType = {
  id: keyof SignUpFormDataType;
  label: string;
  placeholder: string;
  type?: string;
  icon?: LucideIcon;
  component: "input" | "password" | "avatar";
  maxLength?: number;
  required: boolean;
};

export const REGISTRATION_FORM_FIELDS: FieldType[] = [
  {
    id: "firstName",
    label: "First Name",
    placeholder: "Enter your first name",
    type: "text",
    icon: User,
    component: "input",
    maxLength: 72,
    required: true,
  },
  {
    id: "lastName",
    label: "Last Name",
    placeholder: "Enter your last name",
    type: "text",
    icon: User,
    component: "input",
    maxLength: 72,
    required: true,
  },
  {
    id: "email",
    label: "Email Address",
    placeholder: "Enter your email address",
    type: "email",
    icon: Mail,
    component: "input",
    required: true,
  },
  {
    id: "password",
    label: "Password",
    placeholder: "Create a strong password",
    icon: Lock,
    component: "password",
    required: true,
  },
  {
    id: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm your password",
    icon: Lock,
    component: "password",
    required: true,
  },
];
