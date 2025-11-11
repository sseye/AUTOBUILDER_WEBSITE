"use client";

import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";

export default function HeroCustom() {
  return (
    <section className="relative flex w-full justify-center bg-black py-24 text-center">
      <div className="flex w-full flex-col items-center gap-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex w-full max-w-4xl flex-col items-center gap-4 rounded-3xl border border-white/15 bg-black/40 px-6 py-10"
        >
          <Badge variant="outline">Custom business systems. Fast.</Badge>
          <h1 className="text-balance text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
            Custom Systems - Direct ROI
          </h1>
          <p className="max-w-2xl text-base text-accent md:text-lg">
            Apps, Dashboards, and Automations That Launch in Weeks, Not Quarters.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
