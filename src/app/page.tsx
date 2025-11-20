import Hero from "@/components/home/hero-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Daily Byte",
  description: "",
};

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
