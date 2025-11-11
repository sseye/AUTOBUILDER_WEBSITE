"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { contactSchema, type ContactFormValues } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

type VariantField = {
  name: keyof ContactFormValues;
  label: string;
  placeholder?: string;
  helper?: string;
  type?: "text" | "textarea";
};

type VariantConfig = {
  label: string;
  description: string;
  fields: VariantField[];
};

const formVariants: Record<ContactFormValues["formType"], VariantConfig> = {
  dashboards: {
    label: "Dashboards",
    description: "Data sources, KPIs, and governance for exec-ready dashboards.",
    fields: [
      { name: "company", label: "Company / Team", placeholder: "Acme Ops" },
      { name: "stack", label: "Current Stack", placeholder: "Warehouse, BI, metrics layer", type: "textarea" },
      { name: "dataSources", label: "Primary Data Sources", placeholder: "Snowflake, HubSpot, custom APIs", type: "textarea" },
      { name: "kpiTargets", label: "Critical KPIs", placeholder: "Revenue, NRR, supply metrics", type: "textarea" },
      { name: "timeline", label: "Target Timeline", placeholder: "2-4 weeks" },
    ],
  },
  mobile: {
    label: "Mobile Native Applications",
    description: "Tell us about platforms, auth, and offline requirements.",
    fields: [
      { name: "company", label: "Company / Team", placeholder: "Acme Field Ops" },
      { name: "platforms", label: "Platforms", placeholder: "iOS, Android, web" },
      { name: "integrations", label: "Key Integrations", placeholder: "Auth0, Stripe, Firebase", type: "textarea" },
      { name: "requirements", label: "Critical Requirements", placeholder: "Offline sync, PWA fallback", type: "textarea" },
      { name: "timeline", label: "Target Timeline", placeholder: "MVP in 6 weeks" },
    ],
  },
  automation: {
    label: "Automation - n8n",
    description: "Share systems, triggers, and human-in-the-loop steps.",
    fields: [
      { name: "company", label: "Company / Team", placeholder: "Acme RevOps" },
      { name: "stack", label: "Existing Systems", placeholder: "HubSpot, Notion, Slack", type: "textarea" },
      { name: "integrations", label: "Must-Have Integrations", placeholder: "Salesforce, Zendesk", type: "textarea" },
      { name: "painPoints", label: "Manual Steps / Pain Points", placeholder: "Lead handoffs, ticket routing", type: "textarea" },
      { name: "budget", label: "Budget Range", placeholder: "Monthly or project budget" },
    ],
  },
  other: {
    label: "Other",
    description: "Something else? Let us know the quick version.",
    fields: [
      { name: "company", label: "Company / Team", placeholder: "Acme" },
      { name: "requirements", label: "What needs to ship?", placeholder: "Summarize the system or workflow", type: "textarea" },
      { name: "timeline", label: "Timeline", placeholder: "Kickoff + go-live" },
      { name: "budget", label: "Budget / Constraints", placeholder: "Optional" },
    ],
  },
};

export default function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      formType: "dashboards",
      name: "",
      email: "",
      company: "",
      timeline: "",
      budget: "",
      stack: "",
      dataSources: "",
      kpiTargets: "",
      platforms: "",
      integrations: "",
      painPoints: "",
      requirements: "",
      message: "",
    },
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const currentType = form.watch("formType");
  const activeVariant = useMemo(() => formVariants[currentType], [currentType]);

  const onSubmit = async (values: ContactFormValues) => {
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.message ?? "Something went wrong");
      }
      toast({
        title: "Request sent",
        description: "We'll reply within 24 hours.",
      });
      form.reset({ ...form.getValues(), message: "" });
    } catch (error) {
      toast({
        title: "Unable to send",
        description: error instanceof Error ? error.message : "Try again shortly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="formType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What are we building?</FormLabel>
              <FormControl>
                <select
                  className="h-11 w-full rounded-xl border border-white/10 bg-black/80 px-4 text-sm text-white outline-none focus-visible:ring-1 focus-visible:ring-white/60"
                  {...field}
                  style={{ backgroundColor: "#050505", color: "#fff" }}
                >
                  {Object.entries(formVariants).map(([key, variant]) => (
                    <option key={key} value={key}>
                      {variant.label}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormDescription>{activeVariant.description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@company.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          {activeVariant.fields.map((fieldMeta) => (
            <FormField
              key={fieldMeta.name as string}
              control={form.control}
              name={fieldMeta.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{fieldMeta.label}</FormLabel>
                  <FormControl>
                    {fieldMeta.type === "textarea" ? (
                      <Textarea placeholder={fieldMeta.placeholder} {...field} />
                    ) : (
                      <Input placeholder={fieldMeta.placeholder} {...field} />
                    )}
                  </FormControl>
                  {fieldMeta.helper && <FormDescription>{fieldMeta.helper}</FormDescription>}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Anything else we should know?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending
            </>
          ) : (
            "Send it"
          )}
        </Button>
      </form>
    </Form>
  );
}
