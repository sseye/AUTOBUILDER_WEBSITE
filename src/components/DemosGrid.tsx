"use client";

import { BarChart3, Workflow, Smartphone, Globe } from "lucide-react";

import DemoCard from "@/components/DemoCard";

const demos = [
  {
    title: "Command Dashboards",
    subtitle: "Dashboards",
    description: "Exec-grade boards with drill downs, anomaly pings, and AI summaries.",
    icon: BarChart3,
    metrics: [
      { label: "Data refresh", value: "15 sec" },
      { label: "KPI templates", value: "12" },
    ],
  },
  {
    title: "Automation Stack",
    subtitle: "Automations",
    description: "Agents that orchestrate CRM, ERP, and messaging with guardrails.",
    icon: Workflow,
    metrics: [
      { label: "Hours saved", value: "120+/mo" },
      { label: "Systems linked", value: "7" },
    ],
  },
  {
    title: "Mobile Ops Apps",
    subtitle: "Mobile",
    description: "Native-feel PWA with offline sync and biometric auth out of the box.",
    icon: Smartphone,
    metrics: [
      { label: "Platforms", value: "iOS + Android" },
      { label: "Offline-ready", value: "Yes" },
    ],
  },
  {
    title: "Client Portals",
    subtitle: "Web",
    description: "Secure portals with SSO, doc vaults, and tiered access in days.",
    icon: Globe,
    metrics: [
      { label: "Deploy time", value: "<21 days" },
      { label: "User roles", value: "Unlimited" },
    ],
  },
];

export function DemosGrid() {
  return (
    <section id="demos" className="grid gap-6 py-16 md:grid-cols-2">
      {demos.map((demo) => (
        <DemoCard key={demo.title} {...demo} />
      ))}
    </section>
  );
}
