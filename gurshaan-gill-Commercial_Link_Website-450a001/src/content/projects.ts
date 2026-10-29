import type { StaticImageData } from "next/image";

import saddleCrossing from "@/assets/projects/saddle-crossing.jpg";
import veronaNorth from "@/assets/projects/verona-north.jpg";
import shyne from "@/assets/projects/shyne.jpg";
import rockRidge from "@/assets/projects/rock-ridge.jpg";
import ponoka from "@/assets/projects/ponoka.png";
import vive from "@/assets/projects/vive-residences.jpg";
import theHub from "@/assets/projects/archive/the-hub-sfu.jpg";
import salus from "@/assets/projects/archive/salus.jpg";
import agenda from "@/assets/projects/archive/agenda-urban-village.jpg";
import element from "@/assets/projects/archive/element.jpg";
import evoque from "@/assets/projects/archive/evoque.jpg";

/**
 * Project facts come only from the client's documents (projects.docx,
 * Vive Residences.docx, Project Archives.docx) and the existing site draft.
 * Leave a field null rather than filling it with an estimate.
 */

export type ScopeItem = "Steel stud" | "Drywall" | "Insulation";
export type ImageKind = "Site photo" | "Developer rendering" | "Completed building";

export type Project = {
  slug: string;
  name: string;
  city: string;
  province: "AB" | "BC";
  address: string | null;
  status: "Ongoing" | "Completed";
  year: number | null;
  group: "current" | "archive";
  type: string;
  scale: string;
  building: string | null;
  area: string | null;
  scope: ScopeItem[];
  developer: string | null;
  image: StaticImageData | null;
  imageKind: ImageKind | null;
  /** Source images under ~600px wide are shown smaller so they don't blur. */
  lowResImage?: boolean;
  alt: string;
  summary: string;
};

export const projects: Project[] = [
  {
    slug: "saddle-crossing-phase-1",
    name: "Saddle Crossing, Phase 1",
    city: "Calgary",
    province: "AB",
    address: null,
    status: "Ongoing",
    year: null,
    group: "current",
    type: "Mixed-use condominium",
    scale: "120 condo suites + 2 retail buildings",
    building: "Two 6-storey residential buildings and two retail buildings",
    area: "Over 80,000 sq ft of retail space",
    scope: ["Steel stud", "Drywall", "Insulation"],
    developer: null,
    image: saddleCrossing,
    imageKind: "Developer rendering",
    alt: "Aerial rendering of Saddle Crossing: mid-rise residential buildings and two retail buildings along a main road.",
    summary:
      "Phase 1 of Saddle Crossing brings 120 condominium suites across two six-storey residential buildings, alongside two retail buildings with more than 80,000 sq ft of commercial space. Commercial Link is delivering the full steel stud, drywall and insulation scope.",
  },
  {
    slug: "shyne",
    name: "Shyne",
    city: "Surrey",
    province: "BC",
    address: null,
    status: "Completed",
    year: null,
    group: "current",
    type: "Mixed-use condominium",
    scale: "36 residential units + 5 retail units",
    building: null,
    area: "32,000 sq ft",
    scope: ["Steel stud", "Drywall", "Insulation"],
    developer: null,
    image: shyne,
    imageKind: "Developer rendering",
    alt: "Rendering of Shyne, a six-storey condominium building with ground-floor retail and landscaped frontage, at dusk.",
    summary:
      "A 32,000 sq ft condominium project in Surrey with 36 residential units over 5 retail units. Commercial Link completed the steel stud, drywall and insulation scope.",
  },
  {
    slug: "rock-ridge-apartments",
    name: "Rock Ridge Apartments",
    city: "Maple Ridge",
    province: "BC",
    address: null,
    status: "Completed",
    year: null,
    group: "current",
    type: "Apartment building",
    scale: "64 units",
    building: "One standalone 5-storey building",
    area: "42,112 sq ft",
    scope: ["Drywall", "Insulation"],
    developer: null,
    image: rockRidge,
    imageKind: "Developer rendering",
    alt: "Rendering of Rock Ridge Apartments, a five-storey white apartment building with dark trim and glass balconies.",
    summary:
      "A 64-unit, standalone five-storey apartment building in Maple Ridge totalling 42,112 sq ft. Commercial Link completed the drywall and insulation scope.",
  },
  {
    slug: "vive-residences",
    name: "Vive Residences",
    city: "Edmonton",
    province: "AB",
    address: null,
    status: "Completed",
    year: null,
    group: "current",
    type: "Mixed-use residential",
    scale: "51 residential suites + retail bays",
    building: "One standalone 4-storey building",
    area: null,
    scope: ["Steel stud", "Drywall", "Insulation"],
    developer: null,
    image: vive,
    imageKind: "Site photo",
    alt: "Site photo of Vive Residences during construction: a four-storey building with grey and beige siding, house wrap still visible on some walls, and a graded site in front.",
    summary:
      "A standalone four-storey mixed-use building with 51 residential suites over retail bays. Commercial Link completed the steel stud, drywall and insulation scope.",
  },
  {
    slug: "verona-north",
    name: "Verona North",
    city: "Calgary",
    province: "AB",
    address: null,
    status: "Ongoing",
    year: null,
    group: "current",
    type: "Townhomes",
    scale: "40 townhomes",
    building: null,
    area: "65,000 sq ft",
    scope: ["Drywall", "Insulation"],
    developer: null,
    image: veronaNorth,
    imageKind: "Developer rendering",
    lowResImage: true,
    alt: "Rendering of Verona North, a row of three-storey white and black townhomes with garages, at dusk.",
    summary:
      "A 40-unit townhome project in Calgary totalling about 65,000 sq ft. Commercial Link is delivering the drywall and insulation scope.",
  },
  {
    slug: "ponoka-apartments",
    name: "Ponoka Apartments",
    city: "Ponoka",
    province: "AB",
    address: null,
    status: "Completed",
    year: null,
    group: "current",
    type: "Apartment building",
    scale: "60 units",
    building: "One standalone 4-storey building",
    area: null,
    scope: ["Drywall", "Insulation"],
    developer: null,
    image: ponoka,
    imageKind: "Site photo",
    lowResImage: true,
    alt: "Site photo of the completed Ponoka Apartments, a four-storey building with vertical siding and balconies, seen from the parking lot.",
    summary:
      "A 60-unit, standalone four-storey apartment building in Ponoka, central Alberta. Commercial Link completed the drywall and insulation scope.",
  },
  {
    slug: "the-hub-sfu",
    name: "The HUB, SFU",
    city: "Burnaby",
    province: "BC",
    address: "9009 Cornerstone Mews, Burnaby, BC",
    status: "Completed",
    year: 2009,
    group: "archive",
    type: "Mixed-use strata",
    scale: "146 residential strata units + 22,000 sq ft commercial",
    building: "7-storey concrete mid-rise",
    area: null,
    scope: ["Steel stud", "Drywall", "Insulation"],
    developer: "Liberty Homes",
    image: theHub,
    imageKind: "Completed building",
    lowResImage: true,
    alt: "The HUB at SFU, a modern concrete mid-rise with stepped balconies and young trees along the street.",
    summary:
      "A seven-storey concrete mid-rise in Burnaby with 146 residential strata units and 22,000 sq ft of commercial space. Commercial Link delivered the steel stud, drywall and insulation scope for Liberty Homes in 2009.",
  },
  {
    slug: "salus",
    name: "Salus",
    city: "Surrey",
    province: "BC",
    address: "6628 120 St (Scott Road), Surrey, BC",
    status: "Completed",
    year: 2009,
    group: "archive",
    type: "Condominium",
    scale: "238 condominium units",
    building: "4-storey wood frame",
    area: null,
    scope: ["Drywall", "Insulation"],
    developer: "Adera Development",
    image: salus,
    imageKind: "Completed building",
    lowResImage: true,
    alt: "Salus at dusk, a four-storey wood frame building with lit windows and timber entry canopies.",
    summary:
      "A 238-unit, four-storey wood frame condominium development on Scott Road in Surrey. Commercial Link delivered the drywall and insulation scope for Adera Development.",
  },
  {
    slug: "agenda-urban-village",
    name: "Agenda Urban Village",
    city: "Surrey",
    province: "BC",
    address: "3321 102A Avenue, Surrey, BC",
    status: "Completed",
    year: 2009,
    group: "archive",
    type: "Condominium",
    scale: "135 units",
    building: "4-storey wood frame",
    area: null,
    scope: ["Drywall", "Insulation"],
    developer: "West Stone Group",
    image: agenda,
    imageKind: "Completed building",
    alt: "Agenda Urban Village, a four-storey wood frame building with balconies along a tree-lined street, with a tower behind it.",
    summary:
      "A 135-unit, four-storey wood frame building on 102A Avenue in Surrey. Commercial Link delivered the drywall and insulation scope for West Stone Group in 2009.",
  },
  {
    slug: "element",
    name: "Element",
    city: "Surrey",
    province: "BC",
    address: "13339 102A Avenue, Surrey, BC",
    status: "Completed",
    year: 2009,
    group: "archive",
    type: "Condominium",
    scale: "71 units",
    building: "4-storey wood frame",
    area: null,
    scope: ["Steel stud", "Drywall", "Insulation"],
    developer: "West Stone Group",
    image: element,
    imageKind: "Completed building",
    alt: "Element in winter, a four-storey wood frame building on a corner with its name and address on a low entrance sign.",
    summary:
      "A 71-unit, four-storey wood frame building at 13339 102A Avenue in Surrey. Commercial Link delivered the steel stud, drywall and insulation scope for West Stone Group in 2009.",
  },
  {
    slug: "evoque",
    name: "Evoque",
    city: "Surrey",
    province: "BC",
    address: "15177 60 Avenue, Surrey, BC",
    status: "Completed",
    year: 2016,
    group: "archive",
    type: "Townhomes",
    scale: "86 townhomes",
    building: null,
    area: null,
    scope: ["Drywall", "Insulation"],
    developer: "Maskeen Group",
    image: evoque,
    imageKind: "Completed building",
    lowResImage: true,
    alt: "Evoque, a row of townhomes with dark siding, stone entry columns and young trees.",
    summary:
      "An 86-unit townhome project on 60 Avenue in Surrey. Commercial Link delivered the drywall and insulation scope for Maskeen Group in 2016.",
  },
];

export const currentProjects = projects.filter((p) => p.group === "current");
export const archiveProjects = projects.filter((p) => p.group === "archive");

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function projectLocation(p: Project) {
  return `${p.city}, ${p.province}`;
}
