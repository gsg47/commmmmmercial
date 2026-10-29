import type { Metadata } from "next";

import { QuoteCta } from "@/components/projects/quote-cta";
import { PageHeader } from "@/components/site/page-header";
import { Services } from "@/components/site/services";
import { allServices, company } from "@/content/site";

export const metadata: Metadata = {
  title: "Services | Commercial Link Contracting Ltd.",
  description:
    "Steel stud framing, T-bar ceilings, boarding, mud and tape, texture, and spray foam, batt and blown-in insulation across Alberta and British Columbia.",
};

export default function ServicesPage() {
  return (
    <main id="main">
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Services" }]}
        title={
          <>
            Services<span className="text-brand">.</span>
          </>
        }
        intro={`${allServices.length} services across framing, insulation and drywall, delivered by one contractor for residential, multifamily and commercial projects in ${company.serviceArea}.`}
      />
      <Services />
      <QuoteCta heading="Need the whole interior scope?" />
    </main>
  );
}
