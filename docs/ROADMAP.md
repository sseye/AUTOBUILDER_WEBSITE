# AUTOBUILDER Website - Roadmap

## Phase 1 - Foundation (Complete)
- [x] Initialize Next.js app (App Router, `src` dir, Tailwind, pnpm).
- [x] Install baseline tooling: Framer Motion, lucide-react, shadcn/ui primitives, React Hook Form + Zod, next-themes, Resend, Geist font.
- [x] Configure Tailwind (custom font stack, accent palette, `tailwindcss-animate`) and base global styles.
- [x] Set up shadcn config + UI primitives (button, card, input, textarea, label, form, badge, separator, sheet, dialog, toast) along with `components.json`.
- [x] Establish lib helpers (`src/lib/utils.ts`, validations, mail helper) and API route skeleton.

## Phase 2 - Experience Layer (Complete)
- [x] Compose sections per brief: Header, Hero, Value Strip, Flow text, Demos, Future Systems, Contact, Footer.
- [x] Build reusable content components (`HeroCustom`, `CopyFlow`, `DemoCard`, `ContactForm`) with micro-interactions and CTA wiring.
- [x] Wire contact form with React Hook Form + Zod + `/api/contact`, provide Resend hook with graceful fallback.
- [x] Add Toaster feedback, accent tokens, and lucide iconography to reinforce the hyper-modern aesthetic.

## Phase 3 - Next Steps
1. **Content & Assets**
   - Swap placeholder demo copy with actual captures/videos.
   - Add OG imagery + metadata updates; generate `app/robots.txt` & `app/sitemap.xml`.
2. **Email Delivery**
   - Provide `RESEND_API_KEY` + `CONTACT_TO` in `.env.local` and test transactional email.
   - Alternatively hook `/api/contact` to Vercel Forms or CRM of choice.
3. **Analytics & QA**
   - Enable Vercel Analytics and Ship TypeScript unit tests for helpers if scope expands.
   - Run Lighthouse + WebPageTest once assets are in place.
4. **Deployment**
   - Initialize git repo, push to GitHub, and `vercel link` for preview deployments.
   - Configure domain + environment variables before production.
