import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function QuoteCta({ heading = "Planning a similar build?" }: { heading?: string }) {
  return (
    <section aria-labelledby="cta-heading" className="bg-brand text-ink">
      <div className="mx-auto flex max-w-[88rem] flex-col gap-6 px-5 py-14 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 id="cta-heading" className="font-display text-3xl font-extrabold uppercase leading-none tracking-tight font-expanded sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-3 max-w-xl text-lg text-ink/80">
            Send the drawings, location and schedule, and we&apos;ll come back with a price.
          </p>
        </div>
        <Link
          href="/contact"
          className="group inline-flex h-13 shrink-0 items-center justify-center gap-2 bg-ink px-7 text-base font-semibold text-white transition-colors hover:bg-charcoal"
        >
          Request a Quote
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
