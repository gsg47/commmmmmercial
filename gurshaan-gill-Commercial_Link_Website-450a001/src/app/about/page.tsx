import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { QuoteCta } from "@/components/projects/quote-cta";
import { PageHeader } from "@/components/site/page-header";
import { TrustStrip } from "@/components/site/trust-strip";
import { WhyUs } from "@/components/site/why-us";
import { company, pageLinks } from "@/content/site";

export const metadata: Metadata = {
  title: "Why Commercial Link | Commercial Link Contracting Ltd.",
  description: `Steel stud, insulation and drywall contractor based in Calgary since ${company.established}, working for builders, developers and general contractors across ${company.serviceArea}.`,
};

const next = [
  { ...pageLinks.process, note: "How a project runs, from drawings to paint-ready" },
  { ...pageLinks.projects, note: "Multifamily and mixed-use work in Alberta and BC" },
  { ...pageLinks.services, note: "Framing, insulation, board and finishing" },
];

export default function AboutPage() {
  return (
    <main id="main">
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Company" }, { label: pageLinks.about.label }]}
        eyebrow={`Established ${company.established} · ${company.base}`}
        title={
          <>
            Why Commercial Link<span className="text-brand">.</span>
          </>
        }
        intro={`A Calgary-based steel stud, insulation and drywall contractor working for builders, developers and general contractors across ${company.serviceArea}.`}
      />
      <TrustStrip />
      <WhyUs />

      <nav aria-label="Keep reading" className="surface-dark border-t border-white/10 bg-ink text-white">
        <ul className="mx-auto grid max-w-[88rem] md:grid-cols-3">
          {next.map((l, i) => (
            <li key={l.href} className={i > 0 ? "border-t border-white/10 md:border-l md:border-t-0" : ""}>
              <Link href={l.href} className="group flex h-full flex-col gap-2 px-5 py-8 hover:bg-white/5 sm:px-8">
                <span className="font-display text-2xl font-bold tracking-tight group-hover:text-brand">{l.label}</span>
                <span className="text-white/65">{l.note}</span>
                <ArrowRight className="mt-2 size-4 text-brand transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <QuoteCta heading="Let's talk about your project" />
    </main>
  );
}
