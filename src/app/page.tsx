import HeroCustom from "@/components/HeroCustom";
import ContactForm from "@/components/ContactForm";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import DemoOne from "@/components/ui/demo";
import { AnimatedHero } from "@/components/ui/animated-hero";
import DemoCarousel from "@/components/DemoCarousel";

const demoShowcases = [
  {
    title: "Dashboards",
    description: "Exec-grade boards with drill downs, anomaly pings, and AI summaries.",
    images: [
      "/images/dashboards/dashboard-1-new.webp?v=2",
      "/images/dashboards/dashboard-2-new.webp?v=2",
      "/images/dashboards/dashboard-3-new.webp?v=2",
    ],
  },
  {
    title: "Mobile Native Applications",
    description: "Secure mobile stacks with offline sync and biometric auth.",
    images: [
      "/images/mobile/mobile-1.webp?v=2",
      "/images/mobile/mobile-2.webp?v=2",
      "/images/mobile/mobile-3.webp?v=2",
    ],
  },
  {
    title: "Automation - n8n",
    description: "Agents orchestrating CRM, ERP, and communications with guardrails.",
    images: [
      "/images/automation/automation-1.webp?v=2",
      "/images/automation/automation-2.webp?v=2",
      "/images/automation/automation-3.webp?v=2",
    ],
  },
];

export default function Page() {
  return (
    <>
      <section className="w-full bg-black">
        <DemoOne />
      </section>

      <AnimatedHero />

      <HeroCustom />

      <main className="mx-auto max-w-6xl px-4">
        <section className="pb-24 pt-36 text-center">
          <p className="text-5xl font-semibold uppercase tracking-[0.8em] text-accent">SHOWCASE ↓</p>
        </section>

        {demoShowcases.map((demo) => (
          <DemoCarousel key={demo.title} {...demo} />
        ))}

        <section id="contact" className="grid gap-10 py-20 md:grid-cols-2">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-accent">Contact</p>
            <h2 className="text-3xl font-medium text-white">Tell us what you need.</h2>
            <p className="text-sm text-accent">
              Send the one-paragraph version. We’ll confirm scope, share timelines, and schedule a working session within the week.
            </p>
            <Separator className="bg-white/10" />
            <div className="space-y-2 text-sm text-accent">
              <p>Email: hello@autobuilder.dev</p>
              <p>LinkedIn / WhatsApp / Vercel deploys</p>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/60 p-6">
            <ContactForm />
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 py-10 text-center text-xs uppercase tracking-[0.3em] text-accent">
        &copy; {new Date().getFullYear()} AUTOBUILDER
      </footer>
      <Toaster />
    </>
  );
}
