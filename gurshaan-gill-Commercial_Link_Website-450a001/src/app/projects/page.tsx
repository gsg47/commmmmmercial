import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/projects/breadcrumbs";
import { ProjectCard } from "@/components/projects/project-ui";
import { QuoteCta } from "@/components/projects/quote-cta";
import { archiveProjects, currentProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects | Commercial Link Contracting Ltd.",
  description:
    "Steel stud, drywall and insulation projects by Commercial Link Contracting: apartments, condominiums, townhomes and mixed-use buildings across Alberta and British Columbia.",
};

export default function ProjectsPage() {
  return (
    <main id="main" className="surface-dark bg-ink text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-[88rem] px-5 pb-14 pt-10 sm:px-8 lg:pb-20 lg:pt-14">
          <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Projects" }]} />
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.02em] font-expanded lg:col-span-7">
              Projects<span className="text-brand">.</span>
            </h1>
            <div className="lg:col-span-5">
              <p className="text-lg leading-relaxed text-white/75">
                Apartments, condominiums, townhomes and mixed-use buildings framed, insulated and
                boarded by Commercial Link in Alberta and British Columbia since 2007.
              </p>
              <nav aria-label="Project sections" className="mt-6 flex flex-wrap gap-2">
                <a href="#current" className="border border-white/25 px-4 py-2 text-sm font-semibold hover:border-brand hover:text-brand">
                  Current & recent · {currentProjects.length}
                </a>
                <a href="#archive" className="border border-white/25 px-4 py-2 text-sm font-semibold hover:border-brand hover:text-brand">
                  Archive · {archiveProjects.length}
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <section id="current" aria-labelledby="current-heading" className="scroll-mt-20">
        <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-8 lg:py-24">
          <div className="flex items-baseline justify-between gap-4 border-b-2 border-white pb-4">
            <h2 id="current-heading" className="font-display text-2xl font-bold uppercase tracking-tight font-expanded sm:text-3xl">
              Current & recent
            </h2>
            <span className="spec-label text-white/60">Alberta & British Columbia</span>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
            {currentProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 100vw" mediaClass="aspect-[4/3]" />
            ))}
          </div>
        </div>
      </section>

      <section id="archive" aria-labelledby="archive-heading" className="scroll-mt-20 bg-graphite">
        <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-8 lg:py-24">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-white pb-4">
            <h2 id="archive-heading" className="font-display text-2xl font-bold uppercase tracking-tight font-expanded sm:text-3xl">
              Project archive
            </h2>
            <span className="spec-label text-white/60">Lower Mainland, BC · 2009–2016</span>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {archiveProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} sizes="(min-width: 1280px) 18vw, (min-width: 640px) 45vw, 100vw" mediaClass="aspect-[3/2]" />
            ))}
          </div>
        </div>
      </section>

      <QuoteCta />
    </main>
  );
}
