# AUTOBUILDER One-Pager - Context

## Product Goals
- Generate qualified leads by showcasing 3-4 interactive demos.
- Keep copy concise, design minimal, and load time fast.
- Build on a system that is easy to extend with future components and marketing experiments.

## Visual & Interaction Direction
- Hyper-modern look: black/white base with a single grey accent (`accent` color token).
- Tight rhythm, white space, subtle micro-interactions powered by Framer Motion.
- Components sourced from shadcn/ui (New York style) to maintain consistency.

## Tech Stack
- Framework: Next.js (App Router) with TypeScript and the `src` directory structure.
- Styling: Tailwind CSS + `tailwindcss-animate`, custom accent palette, Geist font via `geist/font`.
- UI Kit: shadcn/ui primitives (button, card, form, badge, separator, sheet, dialog, toast).
- Icons: lucide-react.
- Forms: React Hook Form + Zod + `@hookform/resolvers`.
- Theming: `next-themes` ready (dark class-based theming).
- Animations: Framer Motion.
- Email/Leads: Resend helper in `src/lib/mail.ts`.
- Package manager: pnpm.

## Content Architecture
1. **Header** - sticky navigation (`components/HeaderCustom.tsx`).
2. **Hero** - `HeroCustom` component with CTA buttons.
3. **Value Strip** - quick credibility row under the hero.
4. **Flow Text** - `CopyFlow` component describing process steps.
5. **Demos** - grid of reusable `DemoCard` instances.
6. **Future Systems** - vision block (id `systems`).
7. **Contact** - CTA and validated form wired to `/api/contact`.
8. **Footer** - minimal links + dynamic year.

## Infrastructure & Deployment
- Ready for Vercel (default scripts in `package.json`).
- Resend + environment variables handled via `lib/mail.ts`.
- Future automation hooks (Resend, Vercel Forms, analytics) can plug into existing structure.

## Files to Know
- `src/app/page.tsx` - page composition + section map.
- `src/components/*` - custom sections and UI primitives.
- `src/app/api/contact/route.ts` - lead submission handler.
- `src/lib/validations.ts` & `src/lib/mail.ts` - Zod schema + Resend helper.
- `components.json` - shadcn configuration for adding more primitives.
