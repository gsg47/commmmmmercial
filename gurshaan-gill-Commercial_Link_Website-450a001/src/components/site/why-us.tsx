import Image from "next/image";
import { Layers, Ruler, Users, Building2, ShieldCheck } from "lucide-react";

import { differentiators, stock } from "@/content/site";

const icons = [Layers, Ruler, Users, Building2, ShieldCheck];

export function WhyUs() {
  return (
    <section id="why-us" aria-labelledby="why-heading" className="bg-concrete">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <figure className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
            <Image
              src={stock.crew.image}
              alt={stock.crew.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover object-[50%_40%]"
            />
          </div>
        </figure>

        <div className="lg:col-span-7 lg:pt-4">
          <p className="spec-label text-muted-foreground">Why Commercial Link</p>
          <h2
            id="why-heading"
            className="mt-4 max-w-2xl font-display text-[clamp(2.2rem,4.6vw,4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.015em] font-expanded"
          >
            Fewer handoffs. <span className="bg-ink px-2 text-brand [box-decoration-break:clone]">One standard.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            We work with builders, developers and general contractors so our work is coordinated
            and completed to the project drawings, specifications and schedule.
          </p>

          <ol className="mt-12 grid gap-px bg-border sm:grid-cols-2">
            {differentiators.map((d, i) => {
              const Icon = icons[i] ?? Layers;
              return (
                <li
                  key={d.title}
                  className={`bg-concrete py-7 sm:px-6 ${i % 2 === 0 ? "sm:pl-0" : ""} ${i === differentiators.length - 1 && differentiators.length % 2 === 1 ? "sm:col-span-2" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center bg-ink text-brand">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold leading-snug tracking-tight">{d.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{d.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
