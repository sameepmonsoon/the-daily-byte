import { ContactFormData } from "@/schema/public/contact-us-schema";

const contactInfo = [
  {
    icon: "/icons/location.svg",
    title: "Address",
    details: ["236 5th SE Avenue, New", "York NY10000, United", "States"],
  },
  {
    icon: "/icons/telephone.svg",
    title: "Phone",
    details: ["Mobile: +(64) 546-6789", "Hotline: +(64) 456-6789"],
  },
  {
    icon: "/icons/clock.svg",
    title: "Working Time",
    details: [
      "Monday-Friday: 9:00 -",
      "22:00",
      "Saturday-Sunday: 9:00 -",
      "21:00",
    ],
  },
];

const CONTACT_FORM_FIELDS: {
  id: keyof ContactFormData;
  label: string;
  placeholder: string;
  type?: string;
  required: boolean;
  maxLength?: number;
}[] = [
  {
    id: "name",
    label: "Your name",
    placeholder: "Abc",
    type: "text",
    required: true,
    maxLength: 72,
  },
  {
    id: "email",
    label: "Email Address",
    placeholder: "Abc@def.com",
    type: "email",
    required: true,
  },
  {
    id: "subject",
    label: "Subject",
    placeholder: "This is optional.",
    type: "text",
    required: false,
  },
  {
    id: "message",
    label: "Message",
    placeholder: "Hi! i’d like to ask about",
    type: "textarea",
    required: true,
  },
];

export { CONTACT_FORM_FIELDS, contactInfo };
