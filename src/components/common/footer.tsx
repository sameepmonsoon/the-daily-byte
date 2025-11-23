"use client";

import Link from "next/link";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-border border-t-[0.5px] bg-white backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Main Footer Content */}
        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-primary text-xl font-bold">
              <Link className="hrink-0" href="/">
                <Image src="/logo.png" alt="Logo" width={150} height={22} />
              </Link>
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed dark:text-white/70">
              Your personal blogging platform. Write, edit, and share your
              thoughts with the world.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors dark:text-white/70 dark:hover:text-white"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors dark:text-white/70 dark:hover:text-white"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors dark:text-white/70 dark:hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h4 className="text-primary font-semibold dark:text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blogs/categories/6"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors dark:text-white/70 dark:hover:text-white"
                >
                  Food & Recipes{" "}
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs/categories/1"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors dark:text-white/70 dark:hover:text-white"
                >
                  Technology
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors dark:text-white/70 dark:hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors dark:text-white/70 dark:hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="text-primary font-semibold dark:text-white">
              Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors dark:text-white/70 dark:hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors dark:text-white/70 dark:hover:text-white"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors dark:text-white/70 dark:hover:text-white"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-primary font-semibold dark:text-white">
              Stay Updated
            </h4>
            <p className="text-muted-foreground text-sm dark:text-white/70">
              Subscribe to our newsletter for updates.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="border-border placeholder-muted-foreground flex-1 rounded-sm border bg-gray-100 px-3 py-2 text-sm focus:ring-1 focus:ring-blue-900! focus:outline-none"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              >
                <Mail className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-border flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row dark:border-gray-700">
          <p className="text-muted-foreground text-sm dark:text-white/70">{`© ${currentYear} The Daily Byte All rights reserved.`}</p>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/status"
              className="text-muted-foreground hover:text-primary transition-colors dark:text-white/70 dark:hover:text-white"
            >
              Status
            </Link>
            <Link
              href="mailto:hello@thedailybyte.com"
              className="text-muted-foreground hover:text-primary transition-colors dark:text-white/70 dark:hover:text-white"
            >
              hello@thedailybyte.com
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
