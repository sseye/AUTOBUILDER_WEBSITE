"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: Sparkles,
    title: "Map the work",
    body: "We audit ops, tech, and data in a single working session. Deliverables: a flow map and a prioritized backlog.",
  },
  {
    icon: Zap,
    title: "Build the demos",
    body: "We ship 3-4 interactive demos in under two weeks so stakeholders can click through the real thing.",
  },
  {
    icon: CheckCircle2,
    title: "Deploy fast",
    body: "Once approved, we lock the scope, harden the stack, and hand it to your team or keep operating it.",
  },
];

export default function CopyFlow() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {steps.map((step, index) => (
        <motion.div
          key={step.title}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="rounded-3xl border border-white/10 bg-black/50 p-6"
        >
          <step.icon className="mb-4 h-6 w-6 text-accent" />
          <p className="text-sm font-semibold tracking-wide text-white">{step.title}</p>
          <p className="mt-2 text-sm text-accent">{step.body}</p>
        </motion.div>
      ))}
    </div>
  );
}
