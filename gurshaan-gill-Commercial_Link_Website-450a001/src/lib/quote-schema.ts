import { z } from "zod";

import { projectTypes, provinces, serviceGroups } from "@/content/site";

const serviceNames = serviceGroups.flatMap((g) => g.services.map((s) => s.name)) as [string, ...string[]];

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(120),
  company: z.string().trim().max(160).optional().default(""),
  email: z.email("Enter a valid email address.").trim().max(200),
  phone: z
    .string()
    .trim()
    .max(40)
    .refine((v) => v === "" || /^[+()\-.\s\d]{7,}$/.test(v), "Enter a valid phone number, or leave it blank.")
    .optional()
    .default(""),
  province: z.enum(provinces, { error: "Choose where the project is." }),
  city: z.string().trim().max(120).optional().default(""),
  projectType: z.enum(projectTypes, { error: "Choose a project type." }),
  services: z.array(z.enum(serviceNames)).max(serviceNames.length).default([]),
  details: z
    .string()
    .trim()
    .min(20, "Tell us a little more about the project (at least 20 characters).")
    .max(4000),
  /** Honeypot: real visitors never see or fill this field. */
  website: z.string().max(0).optional().default(""),
});

export type QuoteInput = z.input<typeof quoteSchema>;
export type QuoteRequest = z.output<typeof quoteSchema>;
export type QuoteFieldErrors = Partial<Record<keyof QuoteRequest, string>>;

export function fieldErrors(error: z.ZodError): QuoteFieldErrors {
  const out: QuoteFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof QuoteRequest | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
