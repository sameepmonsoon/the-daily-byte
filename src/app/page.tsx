import Home from "@/components/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Daily Byte",
  description: "",
};

export default function HomePage() {
  return (
    <main>
      <Home />
    </main>
  );
}
