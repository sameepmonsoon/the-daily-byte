"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import RHFInput from "@/components/rhf/rhf-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CONTACT_FORM_FIELDS } from "@/constants/public/contact-constants";
import { cn } from "@/lib/utils";
import {
  ContactFormData,
  contactFormSchema,
} from "@/schema/public/contact-us-schema";
import SubmitFormButton from "../common/buttons/submit-button";

function ContactForm() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      console.error("Error updating account:", error);
    } finally {
    }
  };
  return (
    <Form {...form}>
      <form
        className="space-y-6 p-10 py-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {CONTACT_FORM_FIELDS.map((field) => (
          <RHFInput
            key={field.id}
            name={field.id}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type || "text"}
            inputFieldClassName={cn(
              "rounded-2.5 h-15 pl-5",
              field.type === "textarea" && "h-30 py-[31px]",
            )}
            labelClassName="mb-3.5"
            required={field.required}
          />
        ))}
        <SubmitFormButton
          className="mt-5"
          btnText={"Submit"}
          isSubmitting={form.formState.isSubmitting}
          submittingText="Creating account..."
          showArrow
        />
      </form>
    </Form>
  );
}

export default ContactForm;
