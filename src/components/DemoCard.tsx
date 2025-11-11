"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DemoCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  metrics: Array<{ label: string; value: string }>;
}

export default function DemoCard({ title, subtitle, description, icon: Icon, metrics }: DemoCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <Card className="relative overflow-hidden bg-gradient-to-b from-white/5 to-transparent">
        <CardHeader>
          <Badge variant="outline">{subtitle}</Badge>
          <div className="mt-4 flex items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <Icon className="h-5 w-5 text-accent" />
          </div>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="text-xs uppercase tracking-[0.3em] text-accent">{metric.label}</dt>
                <dd className="text-lg text-white">{metric.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 inline-flex items-center text-xs uppercase tracking-[0.3em] text-accent">
            View walkthrough <ArrowUpRight className="ml-2 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
