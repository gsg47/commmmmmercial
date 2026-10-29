import { QuoteForm } from "@/components/site/quote-form";
import { company } from "@/content/site";

function ContactRow({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="grid grid-cols-[6rem_1fr] gap-3 border-b border-white/10 py-3">
      <dt className="spec-label pt-0.5 text-white/55">{label}</dt>
      <dd>
        {value ?? (
          <span className="inline-flex items-center gap-2 border border-dashed border-white/35 px-2 py-0.5 font-mono text-xs uppercase tracking-[0.12em] text-white/70">
            Placeholder · to be confirmed
          </span>
        )}
      </dd>
    </div>
  );
}

export function QuoteSection() {
  return (
    <section id="quote" aria-labelledby="quote-heading" className="surface-dark bg-ink text-white">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <div className="lg:col-span-5">
          <p className="spec-label text-white/60">Request a quote</p>
          <h2
            id="quote-heading"
            className="mt-4 font-display text-[clamp(2.4rem,5vw,4.4rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.015em] font-expanded"
          >
            Send us the <span className="text-brand">drawings.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/75">
            Tell us what you&apos;re building and where, and we&apos;ll review the scope and come back
            with a price.
          </p>

          <ul className="mt-8 space-y-2 text-white/80">
            {["Drawings or a tender package", "Project location", "Your schedule"].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span aria-hidden className="size-2 bg-brand" />
                {item}
              </li>
            ))}
          </ul>

          <dl className="mt-10 border-t border-white/10">
            <ContactRow label="Phone" value={company.phone} />
            <ContactRow label="Email" value={company.email} />
            <ContactRow label="Base" value={company.base} />
            <ContactRow label="Serving" value={company.serviceArea} />
          </dl>
        </div>

        <div className="surface-light text-ink lg:col-span-7">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
