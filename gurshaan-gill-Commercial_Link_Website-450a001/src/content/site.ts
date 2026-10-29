import type { StaticImageData } from "next/image";

import heroStuds from "@/assets/stock/hero-steel-studs.jpg";
import tapedBoard from "@/assets/stock/taped-board.jpg";
import boardingCrew from "@/assets/stock/boarding-crew.jpg";
import logoMark from "@/assets/brand/logo-mark-reverse.png";
import logoStacked from "@/assets/brand/logo-reverse.png";
import logoWordmark from "@/assets/brand/logo-wordmark-reverse.png";

/**
 * Single source of truth for homepage copy and business facts.
 * Facts come from the client's project document and the existing site draft.
 * Anything not yet supplied by the client is `null` and renders as a marked
 * placeholder, never as invented data.
 */
export const company = {
  name: "Commercial Link Contracting Ltd.",
  shortName: "Commercial Link",
  established: 2007,
  base: "Calgary, Alberta",
  serviceArea: "Alberta and British Columbia",
  /** Reversed (dark-background) cuts of the client's logo; regenerate with scripts/reverse-logo.cjs. */
  logo: { mark: logoMark, wordmark: logoWordmark, stacked: logoStacked },
  phone: null as string | null,
  email: null as string | null,
  address: null as string | null,
} as const;

export const pageLinks = {
  services: { href: "/services", label: "Services" },
  projects: { href: "/projects", label: "Projects" },
  about: { href: "/about", label: "Why Commercial Link" },
  process: { href: "/process", label: "How we work" },
  contact: { href: "/contact", label: "Contact" },
} as const;

/** Homepage section anchors; the header uses `pageLinks` and dropdowns instead. */
export const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#projects", label: "Projects" },
  { href: "/#why-us", label: "Why Commercial Link" },
  { href: "/#process", label: "Process" },
  { href: "/#quote", label: "Contact" },
] as const;

export type StockImage = {
  image: StaticImageData;
  alt: string;
};

export const stock = {
  hero: {
    image: heroStuds,
    alt: "Interior under construction: steel stud partitions, a steel-framed ceiling over spray foam insulation, and sheets of gypsum board stacked against a wall.",
  },
  taped: {
    image: tapedBoard,
    alt: "A large room with gypsum board walls and ceiling, joints and screw heads covered in joint compound ahead of sanding.",
  },
  crew: {
    image: boardingCrew,
    alt: "Black and white photo of two drywall installers fitting a gypsum board sheet against a wall, with steel track on the floor.",
  },
} satisfies Record<string, StockImage>;

export type ZoneId =
  | "studs"
  | "tbar"
  | "board"
  | "tape"
  | "texture"
  | "spray"
  | "batt"
  | "attic";

export type Service = {
  id: ZoneId;
  slug: string;
  name: string;
  description: string;
  includes: string[];
  stage: string;
};

export type ServiceGroup = {
  code: string;
  title: string;
  services: Service[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    code: "A",
    title: "Framing & ceilings",
    services: [
      {
        id: "studs",
        slug: "steel-stud-framing",
        name: "Steel Stud Framing",
        description:
          "Light- and heavy-gauge steel stud framing for residential and commercial work, including interior walls, partitions, bulkheads, and structural framing.",
        includes: [
          "Interior walls and partitions",
          "Bulkheads",
          "Structural framing",
          "Light- and heavy-gauge steel",
          "Residential and commercial projects",
        ],
        stage:
          "Stage 01 of the wall. The steel track and studs set the layout that insulation, board and finishing follow.",
      },
      {
        id: "tbar",
        slug: "t-bar-ceilings",
        name: "T-Bar Ceiling Installation",
        description:
          "Suspended ceiling grid and acoustic tiles, with accurate layout, levelling, and coordination with mechanical and electrical services.",
        includes: [
          "Suspended ceiling grid",
          "Acoustic ceiling tiles",
          "Accurate layout and levelling",
          "Coordination with mechanical and electrical services",
        ],
        stage:
          "Ceiling option B: a suspended grid hung from the structure on wire hangers, with main tees, cross tees and lay-in tiles.",
      },
    ],
  },
  {
    code: "B",
    title: "Board & finishing",
    services: [
      {
        id: "board",
        slug: "boarding",
        name: "Boarding",
        description:
          "Gypsum board for walls, ceilings, and bulkheads, built to drawings and specs with proper gluing and screw fastening, ready for finishing.",
        includes: [
          "Walls, ceilings and bulkheads",
          "Built to drawings and specs",
          "Glued and screw-fastened",
          "Ready for taping and finishing",
        ],
        stage: "Stage 03 of the wall. Gypsum board is fastened to the studs once the cavity insulation is in.",
      },
      {
        id: "tape",
        slug: "mud-and-tape",
        name: "Mud & Tape",
        description:
          "Joint taping, corner bead, joint compound, and sanding for smooth, paint-ready surfaces.",
        includes: [
          "Joint taping",
          "Corner bead",
          "Joint compound",
          "Sanding",
          "Finish from Level 1 to Level 5, as the spec calls for",
        ],
        stage: "Stage 04 of the wall, and the prep coat on drywall ceilings before texture.",
      },
      {
        id: "texture",
        slug: "texture",
        name: "Texture",
        description:
          "Ceiling texturing, including knockdown, for a consistent finish.",
        includes: ["Ceiling texturing", "Knockdown finish", "A consistent finish across the ceiling"],
        stage: "Applied to the drywall ceiling after mud and tape (ceiling option A).",
      },
    ],
  },
  {
    code: "C",
    title: "Insulation",
    services: [
      {
        id: "spray",
        slug: "spray-foam-insulation",
        name: "Spray Foam Insulation",
        description:
          "Improves energy efficiency, reduces air leakage, and provides effective thermal insulation.",
        includes: ["Improved energy efficiency", "Reduced air leakage", "Effective thermal insulation"],
        stage:
          "Stage 02 of the wall: cavity insulation. Spray foam is the alternative to batts in the stud bays, not an added layer.",
      },
      {
        id: "batt",
        slug: "batt-insulation",
        name: "Batt Insulation",
        description:
          "Walls, ceilings, and partitions, to project specs, for energy efficiency and sound control.",
        includes: [
          "Walls, ceilings and partitions",
          "Installed to project specs",
          "Energy efficiency",
          "Sound control",
        ],
        stage:
          "Stage 02 of the wall: cavity insulation. Batts fill the stud bays as the alternative to spray foam.",
      },
      {
        id: "attic",
        slug: "blown-in-attic-insulation",
        name: "Blown-In Attic Insulation",
        description:
          "Reduces heat loss and keeps homes comfortable year-round.",
        includes: ["Attic insulation for homes", "Reduced heat loss", "Year-round comfort"],
        stage: "Ceiling option A: loose-fill insulation blown into the attic above the drywall ceiling.",
      },
    ],
  },
];

export const differentiators = [
  {
    title: "The whole interior scope, one contract",
    body: "Steel stud, insulation, board, tape and texture from one contractor. Fewer handoffs between trades, and one team accountable for the wall from track to finish.",
  },
  {
    title: "Built to the drawings and specs",
    body: "Work is completed to the project drawings, specifications and schedule, with finishing from Level 1 to Level 5 as the spec calls for.",
  },
  {
    title: "Multiple crews, every site supervised",
    body: "Several crews let us run more than one project at a time, and each site is supervised against the drawings and project specifications.",
  },
  {
    title: "Multifamily experience in two provinces",
    body: "Apartments, condominiums, townhomes and mixed-use buildings for developers in Alberta and British Columbia since 2007.",
  },
  {
    title: "1-year workmanship warranty",
    body: "We stand behind the work we deliver with a one-year warranty on workmanship.",
  },
] as const;

export const processSteps = [
  {
    title: "Send the drawings",
    body: "Share the drawings or tender package, the project location and your schedule.",
  },
  {
    title: "Review and price",
    body: "We review the drawings and specifications and come back with a price for the scope.",
  },
  {
    title: "Plan and coordinate",
    body: "Crews are scheduled around your timeline and coordinated with the site team and other trades.",
  },
  {
    title: "Frame, insulate, board, finish",
    body: "Supervised crews complete each stage to the drawings and the specified finish level.",
  },
] as const;

/** Leave empty until testimonials are verified with a name and company. */
export const testimonials: { quote: string; name: string; company: string }[] = [];

export const projectTypes = [
  "Multifamily / apartments",
  "Townhomes",
  "Mixed-use / commercial",
  "Single-family / residential",
  "Other",
] as const;

export const provinces = ["Alberta", "British Columbia", "Other"] as const;

export const allServices = serviceGroups.flatMap((g) => g.services);
export const getService = (slug: string) => allServices.find((s) => s.slug === slug);
export const serviceGroupOf = (id: ZoneId) => serviceGroups.find((g) => g.services.some((s) => s.id === id))!;
