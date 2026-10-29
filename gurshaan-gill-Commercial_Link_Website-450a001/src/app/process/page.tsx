import type { Metadata } from "next";

import { QuoteCta } from "@/components/projects/quote-cta";
import { PageHeader } from "@/components/site/page-header";
import { Process } from "@/components/site/process";
import { pageLinks } from "@/content/site";

export const metadata: Metadata = {
  title: "How We Work | Commercial Link Contracting Ltd.",
  description:
    "Send the drawings, location and schedule. Commercial Link reviews the scope, prices it, coordinates crews with your site team and completes each stage to the specified finish level.",
};

export default function ProcessPage() {
  return (
    <main id="main">
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { label: "Company" }, { label: pageLinks.process.label }]}
        title={
          <>
            How we work<span className="text-brand">.</span>
          </>
        }
        intro="Four steps from the tender package to a paint-ready interior, with supervised crews coordinated around your schedule and the other trades."
      />
      <Process />
      <QuoteCta heading="Ready to send the drawings?" />
    </main>
  );
}
