import { archiveProjects, currentProjects, projectLocation } from "@/content/projects";
import { pageLinks, serviceGroups } from "@/content/site";

export type MenuLink = { href: string; label: string; note?: string };
export type MenuSection = { title: string; links: MenuLink[] };

export type MenuItem = {
  label: string;
  href: string;
  overview?: { label: string; blurb: string };
  sections?: MenuSection[];
  homeSections: string[];
};

export const menu: MenuItem[] = [
  {
    label: "Services",
    href: pageLinks.services.href,
    overview: {
      label: "All services",
      blurb: "Framing, insulation and drywall under one scope, from first track to paint-ready.",
    },
    sections: serviceGroups.map((g) => ({
      title: g.title,
      links: g.services.map((s) => ({ href: `/services/${s.slug}`, label: s.name })),
    })),
    homeSections: ["services"],
  },
  {
    label: "Projects",
    href: pageLinks.projects.href,
    overview: {
      label: "All projects",
      blurb: "Apartments, condominiums, townhomes and mixed-use buildings in Alberta and BC.",
    },
    sections: [
      {
        title: "Current & recent",
        links: currentProjects.map((p) => ({
          href: `/projects/${p.slug}`,
          label: p.name,
          note: projectLocation(p),
        })),
      },
      {
        title: "Archive",
        links: archiveProjects.map((p) => ({
          href: `/projects/${p.slug}`,
          label: p.name,
          note: projectLocation(p),
        })),
      },
    ],
    homeSections: ["projects"],
  },
  {
    label: "Company",
    href: pageLinks.about.href,
    sections: [
      {
        title: "Company",
        links: [
          { href: pageLinks.about.href, label: pageLinks.about.label, note: "One contractor, one standard, since 2007" },
          { href: pageLinks.process.href, label: pageLinks.process.label, note: "From drawings to paint-ready" },
        ],
      },
    ],
    homeSections: ["why-us", "process"],
  },
  {
    label: "Contact",
    href: pageLinks.contact.href,
    homeSections: ["quote"],
  },
];

export const isMenuItemActive = (item: MenuItem, pathname: string | null, homeSection: string | null) => {
  if (!pathname) return false;
  if (pathname === "/") return homeSection !== null && item.homeSections.includes(homeSection);
  if (pathname === item.href || pathname.startsWith(`${item.href}/`)) return true;
  return item.sections?.some((s) => s.links.some((l) => pathname === l.href || pathname.startsWith(`${l.href}/`))) ?? false;
};
