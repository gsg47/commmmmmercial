import Image from "next/image";

import { processSteps, stock } from "@/content/site";

/** Bars are staggered like a schedule to show each stage leading into the next. */
const bars = [
  { start: 0, span: 4 },
  { start: 2, span: 4 },
  { start: 5, span: 4 },
  { start: 7, span: 5 },
];

export function Process() {
  return (
    <section id="process" aria-labelledby="process-heading" className="surface-dark bg-graphite text-white">
      <div className="mx-auto max-w-[88rem] px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="spec-label text-white/60">How we work</p>
            <h2
              id="process-heading"
              className="mt-4 font-display text-[clamp(2.2rem,4.6vw,4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.015em] font-expanded"
            >
              From drawings <span className="text-brand">to paint-ready.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
              We price from the drawings. Send them with the project location and schedule, and
              we&apos;ll take it from there.
            </p>
          </div>
          <figure className="lg:col-span-6">
            <div className="relative aspect-[16/9] overflow-hidden bg-charcoal">
              <Image
                src={stock.taped.image}
                alt={stock.taped.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </figure>
        </div>

        <ol className="mt-16 border-t border-white/15 lg:mt-20">
          {processSteps.map((step, i) => (
            <li
              key={step.title}
              className="grid gap-4 border-b border-white/15 py-7 lg:grid-cols-12 lg:items-center lg:gap-8"
            >
              <div className="flex items-baseline gap-4 lg:col-span-4">
                <span className="font-mono text-sm text-brand">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{step.title}</h3>
                  <p className="mt-1.5 max-w-sm leading-relaxed text-white/70">{step.body}</p>
                </div>
              </div>
              <div aria-hidden className="relative hidden h-10 lg:col-span-8 lg:grid lg:grid-cols-12">
                {Array.from({ length: 12 }, (_, c) => (
                  <span key={c} className="border-l border-white/10" />
                ))}
                <span
                  className="absolute inset-y-2 bg-brand"
                  style={{
                    left: `${(bars[i].start / 12) * 100}%`,
                    width: `${(bars[i].span / 12) * 100}%`,
                  }}
                />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
