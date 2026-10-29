import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProjectCard, ProjectFacts, ProjectMedia, StatusBadge } from "@/components/projects/project-ui";
import { archiveProjects, currentProjects, projectLocation } from "@/content/projects";

export function Projects() {
  const [feature, ...rest] = currentProjects;
  const pair = rest.slice(0, 2);
  const trio = rest.slice(2, 5);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="surface-dark bg-ink text-white">
      <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="spec-label text-white/60">Featured work</p>
            <h2
              id="projects-heading"
              className="mt-4 font-display text-[clamp(2.2rem,4.6vw,4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.015em] font-expanded"
            >
              Multifamily and mixed-use, <span className="text-brand">framed to finished.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-5 lg:col-span-4 lg:items-end">
            <p className="max-w-md text-white/70 lg:text-right">
              Recent and ongoing projects in Alberta and British Columbia.
            </p>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 border-b-2 border-brand pb-1 font-semibold hover:text-brand"
            >
              View all projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>

        {feature && (
          <article className="group relative mt-14 grid lg:mt-20 lg:grid-cols-12">
            <ProjectMedia
              project={feature}
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="aspect-[16/9] lg:col-span-8 lg:aspect-auto lg:min-h-[28rem]"
            />
            <div className="flex flex-col justify-between gap-8 border-t-2 border-brand bg-graphite p-6 sm:p-8 lg:col-span-4 lg:border-l-2 lg:border-t-0">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/60">{projectLocation(feature)}</p>
                  <StatusBadge project={feature} />
                </div>
                <h3 className="mt-3 font-display text-3xl font-extrabold uppercase leading-none tracking-tight font-expanded sm:text-4xl">
                  <Link href={`/projects/${feature.slug}`} className="after:absolute after:inset-0 group-hover:text-brand">
                    {feature.name}
                  </Link>
                </h3>
                <ProjectFacts project={feature} />
              </div>
              <span aria-hidden className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
                View project <ArrowRight className="size-4" />
              </span>
            </div>
          </article>
        )}

        <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-12">
          {pair.map((p, i) => (
            <div key={p.slug} className={i === 0 ? "md:col-span-7" : "md:col-span-5"}>
              <ProjectCard project={p} sizes="(min-width: 768px) 55vw, 100vw" mediaClass="aspect-[4/3]" />
            </div>
          ))}
          {trio.map((p) => (
            <div key={p.slug} className="md:col-span-4">
              <ProjectCard project={p} sizes="(min-width: 768px) 33vw, 100vw" mediaClass="aspect-[4/3]" />
            </div>
          ))}
        </div>

        <div className="mt-20 border-t border-white/15 pt-10 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <h3 className="font-display text-2xl font-bold tracking-tight">Earlier work in British Columbia</h3>
            <p className="mt-3 max-w-sm text-white/65">
              Multifamily projects from the company&apos;s years in the Lower Mainland.
            </p>
            <Link href="/projects#archive" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
              Browse the project archive <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <ul className="mt-8 divide-y divide-white/10 border-y border-white/10 lg:col-span-8 lg:mt-0">
            {archiveProjects.map((p) => (
              <li key={p.slug} className="group relative grid grid-cols-[3.5rem_1fr] gap-x-4 gap-y-1 py-4 sm:grid-cols-[4rem_1.1fr_1.4fr]">
                <span className="font-mono text-sm text-brand">{p.year ?? "—"}</span>
                <div>
                  <Link href={`/projects/${p.slug}`} className="font-semibold after:absolute after:inset-0 group-hover:text-brand">
                    {p.name}
                  </Link>
                  <p className="text-sm text-white/60">
                    {projectLocation(p)} · {p.developer}
                  </p>
                </div>
                <p className="col-start-2 text-sm text-white/75 sm:col-start-3">
                  {p.scale}
                  {p.building ? `, ${p.building.toLowerCase()}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
