import { company } from "@/content/site";

const facts = [
  { label: "Established", value: String(company.established) },
  { label: "Based in", value: "Calgary, AB" },
  { label: "Working across", value: "Alberta & BC" },
  { label: "Drywall finish", value: "Levels 1–5" },
  { label: "Project types", value: "Residential, multifamily & commercial" },
];

export function TrustStrip() {
  return (
    <section aria-label="Company facts" className="surface-dark border-y border-white/10 bg-graphite text-white">
      <dl className="mx-auto grid max-w-[88rem] grid-cols-2 gap-px bg-white/10 sm:grid-cols-3 lg:grid-cols-5 min-[88rem]:border-x min-[88rem]:border-white/10">
        {facts.map((fact, i) => (
          <div
            key={fact.label}
            className={`flex flex-col gap-1.5 bg-graphite px-5 py-6 sm:px-8 ${i === facts.length - 1 ? "col-span-2 sm:col-span-2 lg:col-span-1" : ""}`}
          >
            <dt className="spec-label text-white/60">{fact.label}</dt>
            <dd className="font-display text-lg font-bold leading-tight tracking-tight sm:text-xl">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
