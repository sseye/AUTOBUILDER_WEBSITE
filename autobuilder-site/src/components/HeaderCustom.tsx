"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const NAV_ITEMS = [
  { href: "#demos", label: "Demos" },
  { href: "#systems", label: "Future" },
  { href: "#contact", label: "Start" },
];

export default function HeaderCustom() {
  const year = useMemo(() => new Date().getFullYear(), []);

  const navLinks = NAV_ITEMS.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      className="text-xs uppercase tracking-[0.2em] text-accent transition hover:text-white"
    >
      {item.label}
    </Link>
  ));

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-sm font-semibold tracking-[0.6em] text-white">
          AUTOBUILDER
        </Link>
        <nav className="hidden items-center gap-6 md:flex">{navLinks}</nav>
        <div className="flex items-center gap-3">
          <Button size="sm" variant="accent" asChild>
            <Link href="#contact">Start</Link>
          </Button>
          <Sheet>
            <SheetTrigger className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white md:hidden">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent className="bg-black/95">
              <div className="flex flex-col gap-6 pt-8 text-sm">
                {NAV_ITEMS.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <Link href={item.href} className="uppercase tracking-[0.3em] text-white">
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
                <span className="text-xs text-accent">&copy; {year} AUTOBUILDER</span>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
