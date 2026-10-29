import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { QuoteCta } from "@/components/projects/quote-cta";
import { AssemblyDiagram } from "@/components/site/assembly-diagram";
import { PageHeader } from "@/components/site/page-header";
import { projectLocation, projects, type ScopeItem } from "@/content/projects";
import { allServices, getService, serviceGroupOf, type ZoneId } from "@/content/site";

export function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: `${service.name} | Commercial Link Contracting Ltd.`,
    description: service.description,
  };
}

const projectScopeFor: Partial<Record<ZoneId, ScopeItem>> = {
  studs: "Steel stud",
  board: "Drywall",
  tape: "Drywall",
  texture: "Drywall",
  spray: "Insulation",
  batt: "Insulation",
  attic: "Insulation",
};

export const instant = false;

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const group = serviceGroupOf(service.id);
  const index = allServices.findIndex((s) => s.id === service.id);
  const number = String(index + 1).padStart(2, "0");
  const prev = allServices[(index - 1 + allServices.length) % allServices.length];
  const next = allServices[(index + 1) % allServices.length];
  const siblings = group.services.filter((s) => s.id !== service.id);
  const trade = projectScopeFor[service.id];
  const related = trade ? projects.filter((p) => p.scope.includes(trade)) : [];

  return (
    <main id="main" className="surface-dark bg-ink text-white">
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { label: service.name }]}
        eyebrow={`${group.code} · ${group.title} · Service ${number}`}
        title={service.name}
        intro={service.description}
      />

      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-7">
          <h2 className="spec-label text-white/60">What&apos;s included</h2>
          <ul className="mt-5 grid gap-px bg-white/10 sm:grid-cols-2">
            {service.includes.map((item) => (
              <li key={item} className="flex gap-4 bg-ink py-5 pr-5 sm:odd:pr-6 sm:even:pl-6">
                <span aria-hidden className="mt-2.5 h-1 w-6 shrink-0 bg-brand" />
                <span className="text-lg leading-snug text-white/90">{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="spec-label mt-14 text-white/60">Where it fits</h2>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-white/85">{service.stage}</p>

          {siblings.length > 0 && (
            <>
              <h2 className="spec-label mt-14 text-white/60">Also in {group.title.toLowerCase()}</h2>
              <ul className="mt-5 border-t border-white/10">
                {siblings.map((s) => (
                  <li key={s.id} className="border-b border-white/10">
                    <Link href={`/services/${s.slug}`} className="group flex items-center justify-between gap-4 py-4">
                      <span className="font-display text-xl font-bold tracking-tight group-hover:text-brand">{s.name}</span>
                      <ArrowRight className="size-4 text-white/50 group-hover:text-brand" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <aside aria-label="Assembly drawing" className="lg:col-span-5">
          <div className="border border-white/10 bg-[#121211] p-5 sm:p-7 lg:sticky lg:top-24">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="spec-label text-white/60">Assembly drawings</p>
              <p className="spec-label text-right text-brand">{service.name}</p>
            </div>
            <AssemblyDiagram active={service.id} />
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="border-t border-white/10 bg-graphite">
          <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-8">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-white pb-4">
              <h2 id="related-heading" className="font-display text-2xl font-bold uppercase tracking-tight font-expanded">
                Projects with {trade?.toLowerCase()} in our scope
              </h2>
              <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
                All projects <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug} className="border-b border-white/10">
                  <Link href={`/projects/${p.slug}`} className="group flex items-center justify-between gap-4 py-4 pr-6">
                    <span>
                      <span className="block font-semibold group-hover:text-brand">{p.name}</span>
                      <span className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-white/50">
                        {projectLocation(p)} · {p.status}
                      </span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-white/40 group-hover:text-brand" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <nav aria-label="More services" className="border-t border-white/10">
        <div className="mx-auto grid max-w-[88rem] sm:grid-cols-2">
          <Link href={`/services/${prev.slug}`} className="group flex flex-col gap-2 px-5 py-8 hover:bg-white/5 sm:px-8">
            <span className="spec-label inline-flex items-center gap-2 text-white/55">
              <ArrowLeft className="size-3.5" aria-hidden /> Previous service
            </span>
            <span className="font-display text-2xl font-bold tracking-tight group-hover:text-brand">{prev.name}</span>
          </Link>
          <Link
            href={`/services/${next.slug}`}
            className="group flex flex-col items-end gap-2 border-t border-white/10 px-5 py-8 text-right hover:bg-white/5 sm:border-l sm:border-t-0 sm:px-8"
          >
            <span className="spec-label inline-flex items-center gap-2 text-white/55">
              Next service <ArrowRight className="size-3.5" aria-hidden />
            </span>
            <span className="font-display text-2xl font-bold tracking-tight group-hover:text-brand">{next.name}</span>
          </Link>
        </div>
      </nav>

      <QuoteCta heading={`Pricing ${service.name.toLowerCase()}?`} />
    </main>
  );
}
