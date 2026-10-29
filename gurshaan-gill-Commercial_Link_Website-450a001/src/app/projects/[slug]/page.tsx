import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Breadcrumbs } from "@/components/projects/breadcrumbs";
import { PhotoPlaceholder, StatusBadge } from "@/components/projects/project-ui";
import { QuoteCta } from "@/components/projects/quote-cta";
import { getProject, projectLocation, projects, type Project } from "@/content/projects";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name}, ${projectLocation(project)} | Commercial Link Contracting Ltd.`,
    description: project.summary,
  };
}

function factRows(p: Project) {
  return [
    { k: "Location", v: projectLocation(p) },
    p.address ? { k: "Address", v: p.address } : null,
    p.group === "archive" && p.developer ? { k: "Developer", v: p.developer } : null,
    { k: "Project type", v: p.type },
    { k: "Scale", v: p.scale },
    p.building ? { k: "Building", v: p.building } : null,
    p.area ? { k: "Area", v: p.area } : null,
    { k: "Status", v: p.year ? `${p.status}, ${p.year}` : p.status },
  ].filter((r): r is { k: string; v: string } => r !== null);
}

const scopeNotes: Record<Project["scope"][number], string> = {
  "Steel stud": "Steel stud framing for walls, partitions and bulkheads",
  Drywall: "Gypsum board installation, taping and finishing",
  Insulation: "Thermal and sound insulation to the project specs",
};

/** Every slug is prerendered from generateStaticParams; unknown slugs need a real 404 status. */
export const instant = false;

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  if (!getProject(slug)) notFound();

  return (
    <main id="main" className="surface-dark bg-ink text-white">
      <ProjectDetail slug={slug} />
      <QuoteCta />
    </main>
  );
}

function ProjectDetail({ slug }: { slug: string }) {
  const project = getProject(slug)!;

  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return (
    <>
      <header className="mx-auto max-w-[88rem] px-5 pt-10 sm:px-8 lg:pt-14">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: project.group === "archive" ? "/projects#archive" : "/projects", label: project.group === "archive" ? "Project archive" : "Projects" },
            { label: project.name },
          ]}
        />
        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/60">{projectLocation(project)}</p>
          <StatusBadge project={project} />
        </div>
        <h1 className="mt-4 max-w-5xl font-display text-[clamp(2.6rem,7vw,6rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em] font-expanded">
          {project.name}
        </h1>
        <p className="mt-5 text-lg text-white/70">
          {project.type} · {project.scale}
        </p>
      </header>

      <figure className="mx-auto mt-12 max-w-[88rem] px-5 sm:px-8">
        <div
          className={cn(
            "relative overflow-hidden bg-charcoal",
            project.lowResImage ? "aspect-[3/2] max-w-3xl" : "aspect-[16/9] lg:aspect-[21/9]",
          )}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.alt}
              fill
              preload
              placeholder="blur"
              sizes={project.lowResImage ? "(min-width: 768px) 768px, 100vw" : "(min-width: 1408px) 1344px, 100vw"}
              className="object-cover"
            />
          ) : (
            <PhotoPlaceholder label="project photo to come" className="absolute inset-0 m-3" />
          )}
        </div>
      </figure>

      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-7">
          <h2 className="spec-label text-white/60">Overview</h2>
          <p className="mt-5 text-xl leading-relaxed text-white/90 sm:text-2xl sm:leading-relaxed">{project.summary}</p>

          <h2 className="spec-label mt-14 text-white/60">Our scope on this project</h2>
          <ul
            className={cn(
              "mt-5 grid gap-px bg-white/10",
              project.scope.length <= 1 && "sm:grid-cols-1",
              project.scope.length === 2 && "sm:grid-cols-2",
              project.scope.length >= 3 && "sm:grid-cols-3",
            )}
          >
            {project.scope.map((s) => (
              <li key={s} className="bg-ink p-5 sm:first:pl-0">
                <span aria-hidden className="block h-1 w-8 bg-brand" />
                <p className="mt-4 font-display text-xl font-bold tracking-tight">{s}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/65">{scopeNotes[s]}</p>
              </li>
            ))}
          </ul>
          <Link href="/#services" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
            See all services <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <aside aria-labelledby="facts-heading" className="lg:col-span-5">
          <div className="border-t-2 border-brand bg-graphite p-6 sm:p-8">
            <h2 id="facts-heading" className="spec-label text-white/60">Project facts</h2>
            <dl className="mt-5 divide-y divide-white/10">
              {factRows(project).map((r) => (
                <div key={r.k} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3">
                  <dt className="pt-0.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-white/50">{r.k}</dt>
                  <dd className="text-white/90">{r.v}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[7.5rem_1fr] gap-4 py-3">
                <dt className="pt-0.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-white/50">Scope</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {project.scope.map((s) => (
                    <span key={s} className="bg-white/10 px-2 py-0.5 text-sm">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>

      <nav aria-label="More projects" className="border-t border-white/10">
        <div className="mx-auto grid max-w-[88rem] sm:grid-cols-2">
          <Link href={`/projects/${prev.slug}`} className="group flex flex-col gap-2 px-5 py-8 hover:bg-white/5 sm:px-8">
            <span className="spec-label inline-flex items-center gap-2 text-white/55">
              <ArrowLeft className="size-3.5" aria-hidden /> Previous project
            </span>
            <span className="font-display text-2xl font-bold tracking-tight group-hover:text-brand">{prev.name}</span>
          </Link>
          <Link href={`/projects/${next.slug}`} className="group flex flex-col items-end gap-2 border-t border-white/10 px-5 py-8 text-right hover:bg-white/5 sm:border-l sm:border-t-0 sm:px-8">
            <span className="spec-label inline-flex items-center gap-2 text-white/55">
              Next project <ArrowRight className="size-3.5" aria-hidden />
            </span>
            <span className="font-display text-2xl font-bold tracking-tight group-hover:text-brand">{next.name}</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
