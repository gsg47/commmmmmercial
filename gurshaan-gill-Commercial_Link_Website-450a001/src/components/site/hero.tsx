import Image from "next/image";
import { ArrowDownRight, ArrowRight } from "lucide-react";

import { company, stock } from "@/content/site";

const stages = ["Framed.", "Insulated.", "Boarded.", "Finished."];

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="surface-dark relative overflow-hidden bg-ink text-white"
    >
      <div className="mx-auto grid max-w-[88rem] lg:min-h-[calc(100dvh-4rem)] lg:max-h-[56rem] lg:grid-cols-12">
        <div className="relative flex flex-col justify-center px-5 pb-14 pt-14 sm:px-8 sm:pt-20 lg:col-span-7 lg:py-20 lg:pr-14">
          <p className="spec-label flex items-center gap-3 text-white/70">
            <span aria-hidden className="h-px w-8 bg-brand" />
            Steel stud · Insulation · Drywall
          </p>

          <h1
            id="hero-heading"
            className="mt-6 font-display text-[clamp(2.9rem,7.4vw,6.4rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em] font-expanded"
          >
            {stages.map((word, i) => (
              <span key={word} className={i === stages.length - 1 ? "block text-brand" : "block"}>
                {word}
              </span>
            ))}
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
            {company.name} frames, insulates, boards and finishes interiors for builders,
            developers and general contractors across {company.serviceArea}, with drywall
            finishing from Level&nbsp;1 to Level&nbsp;5.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#quote"
              className="group inline-flex h-13 items-center justify-center gap-2 bg-brand px-7 text-base font-semibold text-ink transition-colors hover:bg-brand-hover"
            >
              Request a Quote
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
            <a
              href="#projects"
              className="group inline-flex h-13 items-center justify-center gap-2 border border-white/30 px-7 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/5"
            >
              See our projects
              <ArrowDownRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>

        <figure className="relative min-h-[22rem] sm:min-h-[30rem] lg:col-span-5 lg:min-h-0">
          <span aria-hidden className="absolute inset-y-0 left-0 z-10 hidden w-1.5 bg-brand lg:block" />
          <Image
            src={stock.hero.image}
            alt={stock.hero.alt}
            fill
            preload
            placeholder="blur"
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover object-[50%_35%]"
          />
        </figure>
      </div>
    </section>
  );
}
