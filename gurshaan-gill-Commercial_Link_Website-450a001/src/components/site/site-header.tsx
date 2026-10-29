"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu } from "lucide-react";

import { Logo } from "@/components/site/logo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { isMenuItemActive, menu, type MenuItem } from "@/content/navigation";
import { pageLinks } from "@/content/site";
import { cn } from "@/lib/utils";

const homeSectionIds = menu.flatMap((m) => m.homeSections);

function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids, enabled]);

  return enabled ? active : null;
}

const topLevelClass = (active: boolean) =>
  cn(
    "relative h-10 rounded-none bg-transparent px-3 text-sm font-medium text-white/75 transition-colors",
    "hover:bg-transparent hover:text-white focus:bg-transparent focus-visible:text-white data-popup-open:bg-transparent data-popup-open:text-white data-popup-open:hover:bg-transparent",
    "after:absolute after:inset-x-3 after:-bottom-[0.85rem] after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand after:transition-transform",
    active && "text-white after:scale-x-100",
  );

function PanelLink({ href, label, note, current }: { href: string; label: string; note?: string; current: boolean }) {
  return (
    <NavigationMenuLink
      render={<Link href={href} />}
      aria-current={current ? "page" : undefined}
      className={cn(
        "group/link -mx-2 flex flex-col items-start gap-0.5 rounded-none px-2 py-2 text-white/85",
        "hover:bg-white/5 hover:text-white focus:bg-white/5 focus:text-white",
        current && "text-brand",
      )}
    >
      <span className="text-[0.95rem] font-medium leading-snug group-hover/link:text-brand">{label}</span>
      {note && <span className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-white/45">{note}</span>}
    </NavigationMenuLink>
  );
}

function DesktopPanel({ item, pathname }: { item: MenuItem; pathname: string }) {
  const sections = item.sections ?? [];
  const wide = sections.length > 2;

  return (
    <div
      className={cn(
        "grid gap-8 p-7",
        item.overview
          ? wide
            ? "w-[min(58rem,92vw)] grid-cols-[14rem_repeat(3,1fr)]"
            : "w-[min(48rem,92vw)] grid-cols-[14rem_1fr_1fr]"
          : "w-[24rem] grid-cols-1",
      )}
    >
      {item.overview && (
        <NavigationMenuLink
          render={<Link href={item.href} />}
          className="group/ov flex flex-col justify-between gap-6 rounded-none border-l-2 border-brand bg-white/[0.04] p-5 text-white hover:bg-white/[0.08] focus:bg-white/[0.08]"
        >
          <span>
            <span className="block font-display text-xl font-bold tracking-tight">{item.overview.label}</span>
            <span className="mt-2 block text-sm leading-relaxed text-white/65">{item.overview.blurb}</span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
            View overview{" "}
            <ArrowRight className="size-3.5 transition-transform group-hover/ov:translate-x-0.5" aria-hidden />
          </span>
        </NavigationMenuLink>
      )}
      {sections.map((section) => (
        <div key={section.title}>
          <p className="spec-label border-b border-white/10 pb-2.5 text-white/50">{section.title}</p>
          <ul className="mt-2">
            {section.links.map((l) => (
              <li key={l.href}>
                <PanelLink {...l} current={pathname === l.href} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  /* Pathname is not available during prerender of the shared layout; wait until
     mount so active-link classes match the server HTML. */
  const [navPath, setNavPath] = useState<string | null>(null);
  useEffect(() => {
    setNavPath(pathname);
  }, [pathname]);

  const homeSection = useActiveSection(homeSectionIds, navPath === "/");
  const [open, setOpen] = useState(false);

  return (
    <header className="surface-dark sticky top-0 z-40 border-b border-white/10 bg-ink/95 text-white backdrop-blur-sm supports-[backdrop-filter]:bg-ink/90">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-brand focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <NavigationMenu aria-label="Primary" className="hidden lg:flex" align="center">
          <NavigationMenuList className="gap-1">
            {menu.map((item) => {
              const active = isMenuItemActive(item, navPath, homeSection);
              return (
                <NavigationMenuItem key={item.label}>
                  {item.sections ? (
                    <>
                      <NavigationMenuTrigger className={topLevelClass(active)}>{item.label}</NavigationMenuTrigger>
                      <NavigationMenuContent className="p-0">
                        <DesktopPanel item={item} pathname={navPath ?? ""} />
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink
                      render={<Link href={item.href} />}
                      aria-current={navPath === item.href ? "page" : undefined}
                      className={cn(topLevelClass(active), "inline-flex items-center rounded-none")}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Link
            href={pageLinks.contact.href}
            className="hidden h-10 items-center bg-brand px-4 text-sm font-semibold text-ink transition-colors hover:bg-brand-hover sm:inline-flex"
          >
            Request a Quote
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              type="button"
              className="inline-flex size-10 items-center justify-center text-white hover:bg-white/10 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" aria-hidden />
            </SheetTrigger>
            {open ? (
            <SheetContent
              side="right"
              className="surface-dark w-[88vw] max-w-sm gap-0 border-l border-white/10 bg-ink p-0 text-white [&_[data-slot=sheet-close]]:text-white [&_[data-slot=sheet-close]:hover]:bg-white/10"
            >
              <div className="border-b border-white/10 px-6 py-5">
                <SheetTitle className="spec-label text-brand">Menu</SheetTitle>
              </div>
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-2 py-3">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 px-4 py-3 font-display text-2xl font-semibold tracking-tight hover:bg-white/5"
                >
                  <span className="font-mono text-xs text-brand">00</span>
                  Home
                </Link>
                <Accordion className="w-full">
                  {menu.map((item, i) =>
                    item.sections ? (
                      <AccordionItem key={item.label} value={item.label} className="border-b-0">
                        <AccordionTrigger className="items-center rounded-none px-4 py-3 font-display text-2xl font-semibold tracking-tight hover:bg-white/5 hover:no-underline **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-white/60">
                          <span className="flex items-baseline gap-4">
                            <span className="font-mono text-xs font-normal text-brand">0{i + 1}</span>
                            {item.label}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-3 pl-12 pr-4 [&_a]:no-underline">
                          {item.overview && (
                            <Link
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className="mb-2 flex items-center gap-1.5 py-2 text-base font-semibold text-brand"
                            >
                              {item.overview.label} <ArrowRight className="size-4" aria-hidden />
                            </Link>
                          )}
                          {item.sections.map((section) => (
                            <div key={section.title} className="mb-3 last:mb-0">
                              {item.sections!.length > 1 && (
                                <p className="spec-label py-1.5 text-white/45">{section.title}</p>
                              )}
                              <ul>
                                {section.links.map((l) => (
                                  <li key={l.href}>
                                    <Link
                                      href={l.href}
                                      onClick={() => setOpen(false)}
                                      aria-current={navPath === l.href ? "page" : undefined}
                                      className={cn(
                                        "block py-2 text-base text-white/80 hover:text-white",
                                        navPath === l.href && "text-brand",
                                      )}
                                    >
                                      {l.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ) : (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline gap-4 px-4 py-3 font-display text-2xl font-semibold tracking-tight hover:bg-white/5"
                      >
                        <span className="font-mono text-xs text-brand">0{i + 1}</span>
                        {item.label}
                      </Link>
                    ),
                  )}
                </Accordion>
              </nav>
              <div className="border-t border-white/10 p-6">
                <Link
                  href={pageLinks.contact.href}
                  onClick={() => setOpen(false)}
                  className="flex h-12 w-full items-center justify-center bg-brand text-base font-semibold text-ink hover:bg-brand-hover"
                >
                  Request a Quote
                </Link>
              </div>
            </SheetContent>
            ) : null}
          </Sheet>
        </div>
      </div>
    </header>
  );
}
