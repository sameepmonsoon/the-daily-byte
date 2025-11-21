"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "@/components/form/contact.form";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: ["support@example.com", "info@example.com"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+123 456 7890", "+987 654 3210"],
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Main Street", "City, Country"],
  },
];

export default function Contact() {
  return (
    <main className="text-primary min-h-screen bg-gray-50 py-20 md:py-52 dark:bg-gray-900 dark:text-white">
      {/* HERO */}
      <section className="mx-auto px-6 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Contact <span className="">Our Team</span>
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          Have a question, feedback, or partnership idea? We’d love to connect.
          Fill out the form and our team will reach out soon.
        </p>
      </section>

      {/* Main Content */}
      <section className="container mx-auto mt-20 max-w-7xl gap-10 px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[460px_1fr] lg:gap-16">
          {/* Contact Information */}
          <div className="space-y-10">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-5 rounded-xl bg-white/50 p-5 shadow-md transition hover:shadow-lg dark:bg-white/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">{info.title}</h3>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p
                          key={idx}
                          className="text-base leading-relaxed text-gray-700 dark:text-white/70"
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="rounded-xl bg-white/80 p-8 shadow-md backdrop-blur-md dark:bg-white/5">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
