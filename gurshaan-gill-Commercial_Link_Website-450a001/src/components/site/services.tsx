"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { AssemblyDiagram } from "@/components/site/assembly-diagram";
import { allServices, serviceGroups, type ZoneId } from "@/content/site";
import { cn } from "@/lib/utils";
const numberOf = (id: ZoneId) => String(allServices.findIndex((s) => s.id === id) + 1).padStart(2, "0");

export function Services() {
  const [active, setActive] = useState<ZoneId | null>(null);

  return (
    <section id="services" aria-labelledby="services-heading" className="bg-paper">
      <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="spec-label text-muted-foreground">Services</p>
            <h2
              id="services-heading"
              className="mt-4 font-display text-[clamp(2.2rem,4.6vw,4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.015em] font-expanded"
            >
              One contractor for the{" "}
              <span className="relative whitespace-nowrap">
                whole wall
                <span aria-hidden className="absolute inset-x-0 -bottom-1 h-2 bg-brand" />
              </span>
              .
            </h2>
          </div>
          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground lg:col-span-5 lg:justify-self-end">
            Framing, insulation and drywall under one scope, from the first steel track to a
            paint-ready finish. Hover a service to see where it sits in the assembly, or open it for
            the full scope.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="surface-dark border border-white/10 bg-[#121211] p-5 sm:p-7 lg:sticky lg:top-24" id="assembly-diagram">
              <div className="mb-5 flex items-center justify-between">
                <p className="spec-label text-white/60">Assembly drawings</p>
                <p className="spec-label text-brand" aria-live="polite">
                  {active ? allServices.find((s) => s.id === active)?.name : "All stages"}
                </p>
              </div>
              <AssemblyDiagram active={active} />
            </div>
          </div>

          <div className="lg:col-span-7">
            {serviceGroups.map((group) => (
              <div key={group.code} className="mb-12 last:mb-0">
                <h3 className="flex items-center gap-3 border-b-2 border-ink pb-3">
                  <span className="grid size-7 place-items-center bg-ink font-mono text-xs font-medium text-brand">
                    {group.code}
                  </span>
                  <span className="spec-label text-ink">{group.title}</span>
                </h3>
                <ul>
                  {group.services.map((service) => {
                    const isActive = active === service.id;
                    return (
                      <li
                        key={service.id}
                        onMouseEnter={() => setActive(service.id)}
                        onMouseLeave={() => setActive(null)}
                        className={cn(
                          "group relative grid grid-cols-[3rem_1fr] gap-x-4 border-b border-border py-6 transition-colors sm:grid-cols-[4rem_1fr_1.15fr] sm:gap-x-6",
                          isActive && "bg-concrete/70",
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-brand transition-transform",
                            isActive && "scale-y-100",
                          )}
                        />
                        <span className="pl-3 font-mono text-sm text-muted-foreground">
                          {numberOf(service.id)}
                        </span>
                        <h4>
                          <Link
                            href={`/services/${service.slug}`}
                            onFocus={() => setActive(service.id)}
                            onBlur={() => setActive(null)}
                            className="inline-flex items-start gap-1.5 text-left font-display text-xl font-bold leading-tight tracking-tight after:absolute after:inset-0 hover:underline hover:decoration-brand hover:decoration-2 hover:underline-offset-4 sm:text-2xl"
                          >
                            {service.name}
                            <ArrowUpRight
                              aria-hidden
                              className="mt-0.5 size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                            />
                          </Link>
                        </h4>
                        <p className="col-start-2 mt-2 leading-relaxed text-muted-foreground sm:col-start-3 sm:mt-0">
                          {service.description}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
