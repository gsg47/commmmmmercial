import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ImageOff } from "lucide-react";

import { projectLocation, type Project } from "@/content/projects";
import { cn } from "@/lib/utils";

export function PhotoPlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 border border-dashed border-white/30 p-4 text-center text-white/60",
        className,
      )}
    >
      <ImageOff className="size-6" aria-hidden />
      <span className="spec-label">Placeholder · {label}</span>
    </div>
  );
}

export function ProjectMedia({
  project,
  sizes,
  className,
  preload,
}: {
  project: Project;
  sizes: string;
  className?: string;
  preload?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-charcoal", className)}>
      {project.image ? (
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes={sizes}
          placeholder="blur"
          preload={preload}
          className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
        />
      ) : (
        <PhotoPlaceholder label="project photo to come" className="absolute inset-0 m-3" />
      )}
    </div>
  );
}

export function StatusBadge({ project }: { project: Project }) {
  const ongoing = project.status === "Ongoing";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em]",
        ongoing ? "text-brand" : "text-white/70",
      )}
    >
      <span aria-hidden className={cn("size-1.5", ongoing ? "bg-brand" : "bg-white/60")} />
      {project.status}
      {project.year ? ` · ${project.year}` : ""}
    </span>
  );
}

export function projectFactRows(project: Project, { detailed = false } = {}) {
  const rows: { k: string; v: string }[] = [{ k: "Scale", v: project.scale }];
  if (detailed && project.building) rows.push({ k: "Building", v: project.building });
  if (detailed && project.area) rows.push({ k: "Area", v: project.area });
  rows.push({ k: "Scope", v: project.scope.join(", ") });
  if (project.group === "archive" && project.developer) rows.push({ k: "Developer", v: project.developer });
  return rows;
}

export function ProjectFacts({ project }: { project: Project }) {
  return (
    <dl className="mt-4 grid gap-2 text-sm">
      {projectFactRows(project).map((r) => (
        <div key={r.k} className="grid grid-cols-[6.5rem_1fr] gap-3">
          <dt className="pt-0.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-white/50">{r.k}</dt>
          <dd className="text-white/85">{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Whole card is clickable via the title link's stretched hit area. */
export function ProjectCard({
  project,
  sizes,
  mediaClass,
  headingLevel: H = "h3",
}: {
  project: Project;
  sizes: string;
  mediaClass: string;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <article className="group relative flex flex-col">
      <ProjectMedia project={project} sizes={sizes} className={mediaClass} />
      <div className="border-t-2 border-brand pt-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/60">{projectLocation(project)}</p>
          <StatusBadge project={project} />
        </div>
        <H className="mt-2 font-display text-2xl font-bold tracking-tight">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-start gap-2 after:absolute after:inset-0 group-hover:text-brand"
          >
            {project.name}
            <ArrowUpRight className="mt-1 size-5 shrink-0 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden />
          </Link>
        </H>
        <ProjectFacts project={project} />
      </div>
    </article>
  );
}
