"use client";

import { useMemo } from "react";

const rotatingTitles = [
  "Custom Business Applications",
  "AI Native",
  "Dashboards",
  "Automation",
  "Agents",
  "Funnels",
  "Websites",
  "Mobile Native Applications",
];

export function AnimatedHero() {
  const text = useMemo(() => {
    const joined = rotatingTitles.join(" ");
    return `\u00a0${joined} `;
  }, []);

  return (
    <section className="mt-24 flex min-h-screen w-full items-center justify-center bg-black text-white">
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {[0, 1].map((index) => (
            <span key={index} className="marquee-segment text-5xl font-semibold uppercase tracking-tight sm:text-6xl md:text-7xl">
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
