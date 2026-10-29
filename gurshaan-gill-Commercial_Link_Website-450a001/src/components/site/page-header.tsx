import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/projects/breadcrumbs";

export function PageHeader({
  crumbs,
  eyebrow,
  title,
  intro,
  children,
}: {
  crumbs: { href?: string; label: string }[];
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="surface-dark border-b border-white/10 bg-ink text-white">
      <div className="mx-auto max-w-[88rem] px-5 pb-14 pt-10 sm:px-8 lg:pb-20 lg:pt-14">
        <Breadcrumbs items={crumbs} />
        <div className="mt-10">
          {eyebrow && <p className="spec-label mb-4 text-brand">{eyebrow}</p>}
          <h1 className="max-w-[18ch] font-display text-[clamp(2.4rem,6vw,5.25rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.02em] font-expanded">
            {title}
          </h1>
          {(intro || children) && (
            <div className="mt-8 max-w-xl lg:ml-auto">
              {intro && <p className="text-lg leading-relaxed text-white/75">{intro}</p>}
              {children}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
