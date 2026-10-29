"use client";

import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { projectTypes, provinces, serviceGroups } from "@/content/site";
import { fieldErrors, quoteSchema, type QuoteFieldErrors, type QuoteInput } from "@/lib/quote-schema";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const serviceNames = serviceGroups.flatMap((g) => g.services.map((s) => s.name));

const initial: QuoteInput = {
  name: "",
  company: "",
  email: "",
  phone: "",
  province: undefined as unknown as QuoteInput["province"],
  city: "",
  projectType: undefined as unknown as QuoteInput["projectType"],
  services: [],
  details: "",
  website: "",
};

const fieldClass =
  "h-12 rounded-none border-0 border-b-2 border-ink/25 bg-white px-3 text-base shadow-none focus-visible:border-ink focus-visible:ring-0 aria-invalid:border-destructive aria-invalid:ring-0";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-medium text-destructive">
      {message}
    </p>
  );
}

export function QuoteForm() {
  const [values, setValues] = useState<QuoteInput>(initial);
  const [errors, setErrors] = useState<QuoteFieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function update<K extends keyof QuoteInput>(key: K, value: QuoteInput[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key as keyof QuoteFieldErrors]) {
      setErrors((e) => ({ ...e, [key]: undefined }));
    }
  }

  function toggleService(name: string) {
    const current = values.services ?? [];
    update("services", current.includes(name) ? current.filter((s) => s !== name) : [...current, name]);
  }

  function focusFirstError(errs: QuoteFieldErrors) {
    const first = Object.keys(errs)[0];
    if (!first) return;
    const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`);
    el?.focus();
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);

    const parsed = quoteSchema.safeParse(values);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      focusFirstError(errs);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: QuoteFieldErrors };
      if (!res.ok || !data.ok) {
        if (data.fields) {
          setErrors(data.fields);
          focusFirstError(data.fields);
        }
        setFormError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setValues(initial);
    } catch {
      setFormError("We couldn't reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex min-h-[28rem] flex-col items-start justify-center bg-white p-8 sm:p-10">
        <CheckCircle2 className="size-10 text-ink" aria-hidden />
        <h3 className="mt-5 font-display text-3xl font-extrabold uppercase tracking-tight font-expanded">
          Request received
        </h3>
        <p className="mt-3 max-w-md text-lg leading-relaxed text-muted-foreground">
          Thanks. Your project details have been recorded for the Commercial Link team to review.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 inline-flex h-11 items-center border-2 border-ink px-5 font-semibold hover:bg-ink hover:text-white"
        >
          Send another request
        </button>
      </div>
    );
  }

  const describedBy = (key: keyof QuoteFieldErrors) => (errors[key] ? `${key}-error` : undefined);

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-describedby="quote-form-note"
      className="bg-white p-6 sm:p-10"
    >
      <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" className="spec-label text-ink">
            Your name <span aria-hidden className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            data-field="name"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            className={cn(fieldClass, "mt-2")}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>
        <div>
          <Label htmlFor="company" className="spec-label text-ink">
            Company
          </Label>
          <Input
            id="company"
            data-field="company"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            className={cn(fieldClass, "mt-2")}
          />
        </div>
        <div>
          <Label htmlFor="email" className="spec-label text-ink">
            Email <span aria-hidden className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            data-field="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            className={cn(fieldClass, "mt-2")}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
        <div>
          <Label htmlFor="phone" className="spec-label text-ink">
            Phone
          </Label>
          <Input
            id="phone"
            data-field="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone")}
            className={cn(fieldClass, "mt-2")}
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>

        <div>
          <Label id="province-label" htmlFor="province" className="spec-label text-ink">
            Province <span aria-hidden className="text-destructive">*</span>
          </Label>
          <Select
            value={values.province ?? null}
            onValueChange={(v) => update("province", (v ?? undefined) as QuoteInput["province"])}
          >
            <SelectTrigger
              id="province"
              data-field="province"
              aria-labelledby="province-label"
              aria-invalid={!!errors.province}
              aria-describedby={describedBy("province")}
              className={cn(fieldClass, "mt-2 w-full justify-between")}
            >
              <SelectValue placeholder="Choose one" />
            </SelectTrigger>
            <SelectContent>
              {provinces.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError id="province-error" message={errors.province} />
        </div>
        <div>
          <Label htmlFor="city" className="spec-label text-ink">
            City or town
          </Label>
          <Input
            id="city"
            data-field="city"
            autoComplete="address-level2"
            value={values.city}
            onChange={(e) => update("city", e.target.value)}
            className={cn(fieldClass, "mt-2")}
          />
        </div>

        <div className="sm:col-span-2">
          <Label id="projectType-label" htmlFor="projectType" className="spec-label text-ink">
            Project type <span aria-hidden className="text-destructive">*</span>
          </Label>
          <Select
            value={values.projectType ?? null}
            onValueChange={(v) => update("projectType", (v ?? undefined) as QuoteInput["projectType"])}
          >
            <SelectTrigger
              id="projectType"
              data-field="projectType"
              aria-labelledby="projectType-label"
              aria-invalid={!!errors.projectType}
              aria-describedby={describedBy("projectType")}
              className={cn(fieldClass, "mt-2 w-full justify-between")}
            >
              <SelectValue placeholder="Choose one" />
            </SelectTrigger>
            <SelectContent>
              {projectTypes.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError id="projectType-error" message={errors.projectType} />
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="spec-label text-ink">Scope (select all that apply)</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {serviceNames.map((name) => {
              const checked = values.services?.includes(name) ?? false;
              return (
                <label
                  key={name}
                  className={cn(
                    "inline-flex cursor-pointer items-center border px-3 py-2 text-sm font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink",
                    checked ? "border-ink bg-ink text-white" : "border-ink/25 bg-white hover:border-ink",
                  )}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => toggleService(name)}
                  />
                  {checked && <span aria-hidden className="mr-2 size-2 bg-brand" />}
                  {name}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="sm:col-span-2">
          <Label htmlFor="details" className="spec-label text-ink">
            Project details <span aria-hidden className="text-destructive">*</span>
          </Label>
          <Textarea
            id="details"
            data-field="details"
            rows={5}
            required
            placeholder="Building type, unit count or square footage, schedule, and where we can find the drawings."
            value={values.details}
            onChange={(e) => update("details", e.target.value)}
            aria-invalid={!!errors.details}
            aria-describedby={describedBy("details")}
            className={cn(fieldClass, "mt-2 h-auto min-h-32 py-3")}
          />
          <FieldError id="details-error" message={errors.details} />
        </div>

        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </div>
      </div>

      {formError && (
        <p role="alert" className="mt-6 border-l-4 border-destructive bg-destructive/5 px-4 py-3 text-sm font-medium text-destructive">
          {formError}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="quote-form-note" className="text-sm text-muted-foreground">
          <span aria-hidden className="text-destructive">*</span> Required. Fields marked with an asterisk must be filled in.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex h-13 items-center justify-center gap-2 bg-brand px-7 text-base font-semibold text-ink transition-colors hover:bg-brand-hover disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              Request a Quote
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
