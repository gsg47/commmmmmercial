import type { ReactNode } from "react";

import type { ZoneId } from "@/content/site";
import { cn } from "@/lib/utils";

/*
 * Two drawings on one sheet:
 *   A1 — wall elevation cutaway, read left to right through the build sequence.
 *   A2 — ceiling sections: Option A (attic, residential) or Option B (suspended, commercial).
 * Coordinates are in a 640 × 720 drawing space; studs sit at 48-unit (16" o.c.) spacing.
 */

type Rect = { x: number; y: number; w: number; h: number };
type Shape = Rect | { points: string };

const LINE = "rgba(255,255,255,0.78)";
const LINE_SOFT = "rgba(255,255,255,0.4)";
const LINE_FAINT = "rgba(255,255,255,0.16)";
const ACCENT = "var(--brand-yellow)";

/* Wall geometry */
const TRACK_TOP = 84;
const TRACK_BOTTOM = 368;
const STUD_TOP = TRACK_TOP + 8;
const STUD_BOTTOM = TRACK_BOTTOM - 8;
const STUD_H = STUD_BOTTOM - STUD_TOP;
const studs = [24, 72, 120, 168, 216, 264, 312, 360, 408, 456, 504, 552, 600];
const JOINT = 456;

const stages = [
  { n: "01", label: "Framing", x0: 0, x1: 120 },
  { n: "02", label: "Cavity insulation", x0: 120, x1: 312 },
  { n: "03", label: "Boarding", x0: 312, x1: 408 },
  { n: "04", label: "Mud & tape", x0: 408, x1: 520 },
  { n: "05", label: "Finish", x0: 520, x1: 640 },
];

/* Ceiling geometry */
const CEIL_Y = 612;
const DECK_Y = 504;
const TEE_Y = 590;

const zones: Record<ZoneId, Shape[]> = {
  studs: [{ x: 1.25, y: TRACK_TOP, w: 118.75, h: TRACK_BOTTOM - TRACK_TOP }],
  batt: [{ x: 120, y: TRACK_TOP, w: 96, h: TRACK_BOTTOM - TRACK_TOP }],
  spray: [{ x: 216, y: TRACK_TOP, w: 96, h: TRACK_BOTTOM - TRACK_TOP }],
  board: [{ x: 312, y: TRACK_TOP, w: 96, h: TRACK_BOTTOM - TRACK_TOP }],
  tape: [
    { x: 408, y: TRACK_TOP, w: 112, h: TRACK_BOTTOM - TRACK_TOP },
    { x: 6, y: CEIL_Y, w: 150, h: 18 },
  ],
  texture: [{ x: 152, y: CEIL_Y, w: 150, h: 18 }],
  /* Loose fill sits on the bottom chord and is cut off by the roof slope. */
  attic: [{ points: `6,${CEIL_Y - 10} 178,549 302,549 302,${CEIL_Y - 10}` }],
  tbar: [
    { x: 334, y: DECK_Y + 14, w: 300, h: 92 },
    { x: 492, y: 622, w: 140, h: 72 },
  ],
};

function Zone({ id, active, children }: { id: ZoneId; active: ZoneId | null; children: ReactNode }) {
  return (
    <g
      data-zone={id}
      className={cn("transition-opacity duration-300", active && active !== id ? "opacity-25" : "opacity-100")}
    >
      {children}
    </g>
  );
}

function Tag({ x, y, children, anchor = "start", accent = false, size = 11 }: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  accent?: boolean;
  size?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      letterSpacing="1.1"
      fill={accent ? ACCENT : "rgba(255,255,255,0.72)"}
      className="font-mono uppercase"
    >
      {children}
    </text>
  );
}

function Leader({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g stroke={ACCENT} strokeWidth="1">
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <circle cx={x1} cy={y1} r="2.2" fill={ACCENT} stroke="none" />
    </g>
  );
}

/** C-stud in elevation: web face with pre-punched service knockouts. */
function Stud({ x, ghost = false }: { x: number; ghost?: boolean }) {
  return (
    <g opacity={ghost ? 0.35 : 1}>
      <rect x={x - 5} y={STUD_TOP} width="10" height={STUD_H} fill="#2a2a28" stroke={LINE} strokeWidth="1.2" />
      <line x1={x - 2} y1={STUD_TOP} x2={x - 2} y2={STUD_BOTTOM} stroke={LINE_FAINT} />
      {[150, 228, 306].map((y) => (
        <rect key={y} x={x - 2.5} y={y} width="5" height="18" rx="2.5" fill="#0f0f0e" stroke={LINE_SOFT} strokeWidth="0.8" />
      ))}
    </g>
  );
}

function BoardScrews({ xs }: { xs: number[] }) {
  return (
    <>
      {xs.map((x) =>
        Array.from({ length: 9 }, (_, j) => (
          <circle key={`${x}-${j}`} cx={x} cy={STUD_TOP + 18 + j * 31} r="1.8" fill="#0f0f0e" opacity="0.75" />
        )),
      )}
    </>
  );
}

export function AssemblyDiagram({ active }: { active: ZoneId | null }) {
  const roofRise = (x: number) => CEIL_Y - 12 - (x - 8) * 0.29;

  return (
    <svg viewBox="0 0 640 720" role="img" aria-labelledby="assembly-title assembly-desc" className="h-auto w-full">
      <title id="assembly-title">Interior assembly drawings: wall cutaway and ceiling options</title>
      <desc id="assembly-desc">
        Drawing A1 is a wall elevation cut away left to right through five stages: steel stud framing with
        pre-punched knockouts; cavity insulation shown as an either-or choice, with batt insulation in two bays
        and spray foam in the next two; gypsum boarding screwed to the studs; mud and tape at a tapered joint
        with tape, mudded screws and three feathered coats; and a smooth Level 4 to 5 paint-ready finish.
        Drawing A2 shows two ceiling options. Option A, residential: a roof truss with blown-in insulation in the
        attic over a drywall ceiling, which is taped and then finished with knockdown texture. Option B,
        commercial: a suspended T-bar ceiling hung from the structure on wire hangers, with main tees, cross tees
        and lay-in acoustic tiles, plus a small reflected ceiling plan of the grid.
      </desc>

      <defs>
        <pattern id="bp-grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="1" />
        </pattern>
        <pattern id="batt" width="14" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 6 Q3.5 0 7 6 T14 6" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.1" />
        </pattern>
        <pattern id="foam" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="4" fill="rgba(255,255,255,0.2)" />
          <circle cx="14" cy="12" r="5" fill="rgba(255,255,255,0.15)" />
          <circle cx="4" cy="15" r="2.4" fill="rgba(255,255,255,0.24)" />
        </pattern>
        <pattern id="loosefill" width="10" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="rgba(255,255,255,0.5)" />
          <circle cx="7" cy="5" r="1" fill="rgba(255,255,255,0.38)" />
          <circle cx="4" cy="7" r="0.8" fill="rgba(255,255,255,0.3)" />
        </pattern>
        <pattern id="concrete" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        </pattern>
        <pattern id="acoustic" width="6" height="4" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="2" r="0.7" fill="rgba(15,15,14,0.55)" />
        </pattern>
        <clipPath id="attic-clip">
          <polygon points={`8,${CEIL_Y - 12} 300,${roofRise(300)} 300,${CEIL_Y - 12}`} />
        </clipPath>
      </defs>

      <rect width="640" height="720" fill="url(#bp-grid)" />

      {/* ───────────── A1 · Wall elevation ───────────── */}
      <Tag x={0} y={14} accent>A1</Tag>
      <Tag x={26} y={14}>Wall assembly · elevation cutaway</Tag>
      <Tag x={640} y={14} anchor="end">N.T.S.</Tag>

      {/* Stage dimension string */}
      <g stroke={ACCENT} strokeWidth="1">
        <line x1="0" y1="52" x2="640" y2="52" />
        {[0, ...stages.map((s) => s.x1)].map((x) => (
          <line key={x} x1={x} y1="46" x2={x} y2="58" />
        ))}
      </g>
      {stages.map((s) => (
        <Tag key={s.n} x={(s.x0 + s.x1) / 2} y={42} anchor="middle" accent size={12}>
          {s.n}
        </Tag>
      ))}

      {/* 01 Framing */}
      <Zone id="studs" active={active}>
        {studs.filter((x) => x <= 120).map((x) => <Stud key={x} x={x} />)}
      </Zone>

      {/* 02 Cavity insulation: batt OR spray foam */}
      <Zone id="batt" active={active}>
        {[120, 168].map((x) => (
          <g key={x}>
            <rect x={x + 5} y={STUD_TOP + 2} width="38" height={STUD_H - 4} fill="rgba(255,255,255,0.08)" />
            <rect x={x + 5} y={STUD_TOP + 2} width="38" height={STUD_H - 4} fill="url(#batt)" />
          </g>
        ))}
        <Stud x={168} />
      </Zone>
      <Zone id="spray" active={active}>
        {[216, 264].map((x) => (
          <g key={x}>
            <rect x={x + 5} y={STUD_TOP} width="38" height={STUD_H} fill="rgba(255,255,255,0.1)" />
            <rect x={x + 5} y={STUD_TOP} width="38" height={STUD_H} fill="url(#foam)" />
          </g>
        ))}
        <Stud x={264} />
      </Zone>
      <Stud x={216} />
      <Stud x={312} />
      <g>
        <rect x="201" y="212" width="30" height="20" fill="#0f0f0e" stroke={ACCENT} />
        <Tag x={216} y={226} anchor="middle" accent size={11}>OR</Tag>
      </g>

      {/* 03 Boarding: first sheet runs from stud 312 to the joint at 456 */}
      <Zone id="board" active={active}>
        <rect x="312" y={TRACK_TOP} width="96" height={TRACK_BOTTOM - TRACK_TOP} fill="#cfcdc6" />
        <line x1="312" y1={TRACK_TOP} x2="312" y2={TRACK_BOTTOM} stroke="#0f0f0e" strokeOpacity="0.5" />
        <BoardScrews xs={[312 + 3, 360, 408 - 0.5]} />
      </Zone>

      {/* 04 Mud & tape: tapered joint, tape, mudded screws, three feathered coats */}
      <Zone id="tape" active={active}>
        <rect x="408" y={TRACK_TOP} width="112" height={TRACK_BOTTOM - TRACK_TOP} fill="#cfcdc6" />
        <rect x={JOINT - 34} y={TRACK_TOP} width="68" height={TRACK_BOTTOM - TRACK_TOP} fill="#e4e2dc" />
        <rect x={JOINT - 24} y={TRACK_TOP} width="48" height={TRACK_BOTTOM - TRACK_TOP} fill="#eeece7" />
        <rect x={JOINT - 14} y={TRACK_TOP} width="28" height={TRACK_BOTTOM - TRACK_TOP} fill="#f7f6f2" />
        <rect x={JOINT - 5} y={TRACK_TOP} width="10" height={TRACK_BOTTOM - TRACK_TOP} fill="#fff" stroke="#0f0f0e" strokeOpacity="0.25" strokeDasharray="3 3" />
        <line x1={JOINT} y1={TRACK_TOP} x2={JOINT} y2={TRACK_BOTTOM} stroke="#0f0f0e" strokeOpacity="0.18" />
        {[408, 504].map((x) =>
          Array.from({ length: 9 }, (_, j) => (
            <rect key={`${x}-${j}`} x={x - 5} y={STUD_TOP + 15 + j * 31} width="10" height="6" rx="3" fill="#f7f6f2" />
          )),
        )}
      </Zone>

      {/* 05 Finish: Level 4/5, paint-ready */}
      <g>
        <rect x="520" y={TRACK_TOP} width="120" height={TRACK_BOTTOM - TRACK_TOP} fill="#f7f6f2" />
        <text x="580" y="232" textAnchor="middle" fontSize="12" letterSpacing="1" fill="#0f0f0e" fillOpacity="0.55" className="font-mono uppercase">
          Level 4/5
        </text>
      </g>

      {/* Top and bottom track run the full wall width, over the board edges */}
      <rect x="0" y={TRACK_TOP} width="640" height="8" fill="#2a2a28" stroke={LINE} strokeWidth="1.2" />
      <rect x="0" y={TRACK_BOTTOM - 8} width="640" height="8" fill="#2a2a28" stroke={LINE} strokeWidth="1.2" />

      {/* Stage labels */}
      <g stroke={LINE_SOFT}>
        {stages.map((s) => (
          <line key={s.n} x1={(s.x0 + s.x1) / 2} y1={TRACK_BOTTOM + 4} x2={(s.x0 + s.x1) / 2} y2={TRACK_BOTTOM + 14} />
        ))}
      </g>
      <Tag x={60} y={398} anchor="middle">Steel stud</Tag>
      <Tag x={168} y={398} anchor="middle">Batt</Tag>
      <Tag x={264} y={398} anchor="middle">Spray foam</Tag>
      <Tag x={360} y={398} anchor="middle">Board</Tag>
      <Tag x={464} y={398} anchor="middle">Mud & tape</Tag>
      <Tag x={580} y={398} anchor="middle">Paint-ready</Tag>

      {/* ───────────── A2 · Ceiling options ───────────── */}
      <line x1="0" y1="440" x2="640" y2="440" stroke={LINE_FAINT} />
      <Tag x={0} y={462} accent>A2</Tag>
      <Tag x={26} y={462}>Ceiling options · section</Tag>
      <Tag x={640} y={462} anchor="end">N.T.S.</Tag>

      <Tag x={8} y={490} accent size={10}>Option A · attic / residential</Tag>
      <Tag x={336} y={490} accent size={10}>Option B · suspended / commercial</Tag>
      <line x1="320" y1="476" x2="320" y2="712" stroke={LINE_FAINT} strokeDasharray="4 4" />

      {/* Option A: truss, blown-in insulation, drywall ceiling */}
      <Zone id="attic" active={active}>
        <g clipPath="url(#attic-clip)">
          <path
            d={`M8 ${CEIL_Y - 12} L8 560 ${Array.from({ length: 15 }, (_, i) => `Q${8 + i * 20 + 10} ${i % 2 ? 550 : 556} ${8 + (i + 1) * 20} 554`).join(" ")} L300 ${CEIL_Y - 12} Z`}
            fill="rgba(255,255,255,0.1)"
          />
          <rect x="8" y="548" width="292" height={CEIL_Y - 12 - 548} fill="url(#loosefill)" />
        </g>
        <g stroke={ACCENT} strokeWidth="1">
          <line x1="292" y1="554" x2="292" y2={CEIL_Y - 12} />
          <line x1="288" y1="554" x2="296" y2="554" />
          <line x1="288" y1={CEIL_Y - 12} x2="296" y2={CEIL_Y - 12} />
        </g>
      </Zone>
      <g fill="none" stroke={LINE} strokeWidth="1.4">
        <line x1="8" y1={CEIL_Y - 12} x2="300" y2={CEIL_Y - 12} />
        <line x1="8" y1={CEIL_Y - 6} x2="300" y2={CEIL_Y - 6} />
        <line x1="8" y1={CEIL_Y - 12} x2="300" y2={roofRise(300)} />
        <line x1="8" y1={CEIL_Y - 4} x2="300" y2={roofRise(300) + 8} strokeOpacity="0.4" />
      </g>
      <g stroke={LINE_SOFT} strokeWidth="1.1">
        {[[80, 140], [140, 200], [200, 260]].map(([a, b]) => (
          <g key={a}>
            <line x1={a} y1={CEIL_Y - 12} x2={b} y2={roofRise(b)} />
            <line x1={b} y1={roofRise(b)} x2={b} y2={CEIL_Y - 12} />
          </g>
        ))}
      </g>

      {/* Drywall ceiling board */}
      <rect x="8" y={CEIL_Y - 6} width="292" height="8" fill="#cfcdc6" />
      <Zone id="tape" active={active}>
        <rect x="8" y={CEIL_Y + 2} width="146" height="8" fill="#cfcdc6" />
        <rect x="58" y={CEIL_Y + 2} width="46" height="8" fill="#eeece7" />
        <rect x="74" y={CEIL_Y + 2} width="14" height="8" fill="#fff" />
      </Zone>
      <Zone id="texture" active={active}>
        <rect x="154" y={CEIL_Y + 2} width="146" height="8" fill="#e9e7e1" />
        {Array.from({ length: 13 }, (_, i) => (
          <ellipse key={i} cx={160 + i * 11} cy={CEIL_Y + 10 + (i % 3)} rx={3.5 + (i % 3)} ry="2" fill="#f7f6f2" />
        ))}
      </Zone>
      <line x1="154" y1={CEIL_Y - 4} x2="154" y2={CEIL_Y + 16} stroke={ACCENT} strokeDasharray="2 2" />

      <Leader x1={150} y1={574} x2={150} y2={546} />
      <Tag x={30} y={540} size={10}>Blown-in insulation</Tag>
      <Tag x={8} y={652} size={10}>Mud & tape</Tag>
      <Tag x={300} y={652} anchor="end" size={10}>Knockdown texture</Tag>
      <Leader x1={81} y1={CEIL_Y + 8} x2={81} y2={640} />
      <Leader x1={227} y1={CEIL_Y + 12} x2={227} y2={640} />
      <Tag x={154} y={676} anchor="middle" size={9}>Drywall ceiling substrate (taped & textured)</Tag>

      {/* Option B: structure, hangers, main + cross tees, lay-in tiles */}
      <rect x="336" y={DECK_Y} width="296" height="16" fill="url(#concrete)" stroke={LINE} strokeWidth="1.2" />
      <Zone id="tbar" active={active}>
        {[372, 452, 532, 612].map((x) => (
          <g key={x} stroke={LINE_SOFT} strokeWidth="1">
            <line x1={x} y1={DECK_Y + 16} x2={x} y2={TEE_Y - 14} />
            <path d={`M${x} ${TEE_Y - 14} q4 3 0 6`} fill="none" />
          </g>
        ))}
        <rect x="336" y={TEE_Y - 8} width="296" height="8" fill="#2a2a28" stroke={LINE} strokeWidth="1.2" />
        <rect x="336" y={TEE_Y} width="296" height="3" fill={LINE} />
        {[396, 456, 516, 576].map((x) => (
          <g key={x}>
            <rect x={x - 1.5} y={TEE_Y - 2} width="3" height="10" fill={LINE} />
            <rect x={x - 7} y={TEE_Y + 8} width="14" height="2.5" fill={LINE} />
          </g>
        ))}
        {[336, 396, 456, 516, 576].map((x, i, arr) => {
          const end = arr[i + 1] ?? 632;
          return (
            <g key={x}>
              <rect x={x + 7} y={TEE_Y + 3} width={end - x - 14} height="7.5" fill="#d9d6ce" />
              <rect x={x + 7} y={TEE_Y + 3} width={end - x - 14} height="7.5" fill="url(#acoustic)" />
            </g>
          );
        })}

        {/* Reflected ceiling plan of the grid */}
        <g transform="translate(496 626)">
          <rect width="132" height="64" fill="rgba(217,214,206,0.12)" stroke={LINE} strokeWidth="1" />
          {[16, 32, 48].map((y) => (
            <line key={y} x1="0" y1={y} x2="132" y2={y} stroke={y === 32 ? LINE : LINE_SOFT} strokeWidth={y === 32 ? 1.6 : 1} />
          ))}
          {[33, 66, 99].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="64" stroke={LINE} strokeWidth="1.6" />
          ))}
        </g>
      </Zone>
      <Tag x={380} y={552} size={9}>Hanger wire</Tag>
      <Leader x1={372} y1={549} x2={378} y2={549} />
      <Leader x1={344} y1={TEE_Y - 4} x2={344} y2={624} />
      <Tag x={340} y={636} size={9}>Main tee</Tag>
      <Leader x1={396} y1={TEE_Y + 10} x2={396} y2={650} />
      <Tag x={392} y={662} size={9}>Cross tee</Tag>
      <Leader x1={426} y1={TEE_Y + 7} x2={426} y2={676} />
      <Tag x={422} y={688} size={9}>Lay-in tile</Tag>
      <Tag x={562} y={712} anchor="middle" size={9}>RCP · grid plan</Tag>

      {/* Active highlight */}
      {active &&
        zones[active].map((shape, i) =>
          "points" in shape ? (
            <polygon
              key={i}
              points={shape.points}
              fill="none"
              stroke={ACCENT}
              strokeWidth="2.5"
              strokeLinejoin="round"
              className="pointer-events-none"
            />
          ) : (
            <rect
              key={i}
              x={shape.x}
              y={shape.y}
              width={shape.w}
              height={shape.h}
              fill="none"
              stroke={ACCENT}
              strokeWidth="2.5"
              className="pointer-events-none"
            />
          ),
        )}
    </svg>
  );
}
