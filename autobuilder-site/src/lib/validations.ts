import { z } from "zod";

export const contactSchema = z.object({
  formType: z.enum(["dashboards", "mobile", "automation", "other"]),
  name: z.string().min(2, "Tell us your name."),
  email: z.string().email("Use a valid email."),
  company: z.string().max(200, "Keep it concise.").optional(),
  timeline: z.string().max(200, "Shorten timeline details.").optional(),
  budget: z.string().max(200, "Shorten budget notes.").optional(),
  stack: z.string().max(500, "Shorten stack details.").optional(),
  dataSources: z.string().max(500, "Shorten data sources.").optional(),
  kpiTargets: z.string().max(500, "Shorten KPI notes.").optional(),
  platforms: z.string().max(500, "Shorten platform list.").optional(),
  integrations: z.string().max(500, "Shorten integration list.").optional(),
  painPoints: z.string().max(800, "Shorten pain points.").optional(),
  requirements: z.string().max(800, "Shorten requirements.").optional(),
  message: z.string().max(1000, "Keep it under 1,000 characters.").optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
