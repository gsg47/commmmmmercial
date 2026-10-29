import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { CurrentYear } from "@/components/site/current-year";
import { allServices, company, pageLinks } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="surface-dark border-t border-white/10 bg-graphite text-white">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-16 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo variant="stacked" />
          <p className="mt-5 max-w-xs text-white/70">
            Steel stud framing, insulation and drywall for residential, multifamily and commercial
            projects across {company.serviceArea}. Established {company.established}, based in Calgary.
          </p>
          <Link
            href={pageLinks.contact.href}
            className="mt-6 inline-flex h-11 items-center bg-brand px-5 text-sm font-semibold text-ink hover:bg-brand-hover"
          >
            Request a Quote
          </Link>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <p className="spec-label text-white/50">Company</p>
          <ul className="mt-4 space-y-2.5">
            {Object.values(pageLinks).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/80 hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="spec-label text-white/50">Services</p>
          <ul className="mt-4 space-y-2.5">
            {allServices.map((s) => (
              <li key={s.id}>
                <Link href={`/services/${s.slug}`} className="text-white/80 hover:text-brand">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="spec-label text-white/50">Contact</p>
          <dl className="mt-4 space-y-2.5 text-white/80">
            <div>
              <dt className="sr-only">Phone</dt>
              <dd className="font-mono text-xs uppercase tracking-[0.12em] text-white/60">Phone · placeholder</dd>
            </div>
            <div>
              <dt className="sr-only">Email</dt>
              <dd className="font-mono text-xs uppercase tracking-[0.12em] text-white/60">Email · placeholder</dd>
            </div>
            <div>
              <dt className="sr-only">Location</dt>
              <dd>{company.base}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[88rem] px-5 py-6 text-xs text-white/55 sm:px-8">
          <p>
            © <CurrentYear /> {company.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
