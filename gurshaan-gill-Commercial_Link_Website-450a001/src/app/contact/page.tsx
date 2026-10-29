import type { Metadata } from "next";

import { PageHeader } from "@/components/site/page-header";
import { QuoteSection } from "@/components/site/quote-section";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact & Quotes | Commercial Link Contracting Ltd.",
  description: `Request a quote for steel stud, insulation and drywall work in ${company.serviceArea}. Send the drawings, project location and schedule.`,
};

export default function ContactPage() {
  return (
    <main id="main">
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Contact" }]}
        eyebrow={`${company.base} · Serving ${company.serviceArea}`}
        title={
          <>
            Contact<span className="text-brand">.</span>
          </>
        }
        intro="Request a quote, or tell us about an upcoming project. We price from the drawings."
      />
      <QuoteSection />
    </main>
  );
}
