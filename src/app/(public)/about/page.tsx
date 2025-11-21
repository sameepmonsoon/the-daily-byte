import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function About() {
  return (
    <>
      <main className="text-primary min-h-screen bg-gray-50 py-20 md:py-52 dark:bg-gray-900 dark:text-white">
        {/* Hero Section */}
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <h1 className="mb-6 text-5xl font-bold text-pretty md:text-6xl">
            About The Daily Byte
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl leading-relaxed dark:text-white/70">
            We believe everyone has a story to tell. The Daily Bypte is built to
            make blogging accessible, enjoyable, and empowering.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed dark:text-white/70">
                We're committed to creating a platform where writers can focus
                on their craft without technical distractions. The Daily Bypte
                provides intuitive tools, reliable hosting, and a supportive
                community.
              </p>
              <p className="text-muted-foreground leading-relaxed dark:text-white/70">
                Since our founding, we've helped thousands of creators share
                their voice with the world. From hobbyists to professionals, The
                Daily Bypte is your platform.
              </p>
            </div>
            <div className="from-primary/10 via-accent/10 to-primary/5 flex h-80 items-center justify-center rounded-xl bg-linear-to-br p-8">
              <div className="text-center">
                <div className="mb-2 text-5xl font-bold">10K+</div>
                <p className="text-muted-foreground dark:text-white/70">
                  Active Bloggers
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Values</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Simplicity",
                description:
                  "We keep things simple so you can focus on writing, not wrestling with tools.",
              },
              {
                title: "Reliability",
                description:
                  "Your content deserves uptime. We guarantee 99.9% availability and daily backups.",
              },
              {
                title: "Community",
                description:
                  "Connect with other writers, get feedback, and grow together in our vibrant community.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="border-border hover:border-primary/50 rounded-lg border bg-white p-6 transition-colors dark:border-gray-700 dark:bg-white/5"
              >
                <h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed dark:text-white/70">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Led by Creators
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                name: "Sarah Chen",
                role: "Co-founder & CEO",
                bio: "Product visionary with 10+ years of experience.",
              },
              {
                name: "Marcus Webb",
                role: "Co-founder & CTO",
                bio: "Tech leader passionate about creator tools.",
              },
              {
                name: "Amara Okonkwo",
                role: "Head of Community",
                bio: "Building connections between writers worldwide.",
              },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="from-primary/30 to-accent/30 mx-auto mb-4 h-32 w-32 rounded-full bg-gradient-to-br" />
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-primary mb-2 text-sm">{member.role}</p>
                <p className="text-muted-foreground text-sm dark:text-white/70">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <div className="from-primary/10 via-accent/10 to-primary/10 border-primary/20 rounded-xl border bg-gradient-to-r p-12">
            <h2 className="mb-4 text-3xl font-bold">Ready to Start Writing?</h2>
            <p className="text-muted-foreground mx-auto mb-8 max-w-xl dark:text-white/70">
              Join thousands of creators sharing their stories on The Daily
              Bypte.
            </p>
            <Button size="lg" asChild>
              <Link href="/register">Create Your Blog Today</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
