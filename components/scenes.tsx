"use client";

import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Boxes, Briefcase, CalendarDays, CircleCheck, CircleX, ClipboardList, Code, Hammer, LifeBuoy, PencilRuler, Rocket, Search, User, UserCheck, Users, Wallet, Wrench, type LucideIcon } from "lucide-react";
import { SiGmail, SiGooglesheets, SiMessenger, SiNotion, SiViber } from "@icons-pack/react-simple-icons";
import type { ComponentType, ReactElement } from "react";

const font = "var(--font-instrument), system-ui, sans-serif";
/* ------------------------------------------------------------------ */
/* Hero: messages arrive in chat apps and become scheduled jobs        */
/* ------------------------------------------------------------------ */

export const HERO_FRAMES = 300;

export type HeroProps = { compact?: boolean };

type MsgIcon = ComponentType<{ size?: number; color?: string }>;

const heroJobs: { icon: MsgIcon; app: string; text: string; name: string; sub: string; tech: string; time: string }[] = [
  { icon: SiMessenger, app: "Messenger", text: "Pa-check po ng aircon bukas, Reyes Bldg.", name: "Reyes Aircon", sub: "Aircon check", tech: "Ben", time: "10:00" },
  { icon: SiViber, app: "Viber", text: "Urgent: tumutulo ang tubo sa Lim Hardware!", name: "Lim Hardware", sub: "Pipe repair", tech: "Ana", time: "11:30" },
  { icon: SiGmail, app: "Email", text: "Quote for 3 units, Dela Cruz Bldg please.", name: "Dela Cruz", sub: "Quote, 3 units", tech: "Ben", time: "1:30" }
];
const hm = (j: number) => 16 + j * 64;
const hSched = (j: number) => hm(j) + 60;
const hDone = [190, 214, 238];
const heroCols = ["New", "Scheduled", "Done"];

/** Canvas: wide 960 x 384, compact 380 x 404. */
export function HeroScene({ compact = false }: HeroProps) {
  const f = useCurrentFrame();
  const out = interpolate(f, [280, 298], [1, 0], C);
  const ease = { ...C, easing: Easing.inOut(Easing.cubic) };

  const P = 8;
  const W = compact ? 380 : 960;
  const hdr = compact ? 36 : 48;
  const colHdr = compact ? 24 : 28;
  const pitch = compact ? 74 : 96;
  const cardH = compact ? 68 : 88;
  const bPad = compact ? 10 : 12;
  const boardX = compact ? P : 344;
  const boardW = compact ? W - 2 * P : 608;
  const boardTop = compact ? 110 : P;
  const rowsH = 2 * pitch + cardH;
  const boardH = hdr + colHdr + rowsH + bPad;
  const H = boardTop + boardH + P;
  const ip = compact ? 8 : 12;
  const colGap = compact ? 4 : 10;
  const colW = (boardW - 2 * ip - 2 * colGap) / 3;
  const cardW = colW - (compact ? 6 : 12);
  const colX = (c: number) => boardX + ip + c * (colW + colGap);
  const cardLeft = (c: number) => colX(c) + (colW - cardW) / 2;
  const rowsTop = boardTop + hdr + colHdr;
  const rowY = (j: number) => rowsTop + j * pitch;
  const created = heroJobs.filter((_, j) => f >= hm(j) + 38).length;

  const panel: React.CSSProperties = { position: "absolute", boxSizing: "border-box", borderRadius: compact ? 20 : 24, border: "2px solid var(--border-strong)", background: "var(--surface)", overflow: "hidden", opacity: out };
  const head: React.CSSProperties = { position: "absolute", left: 0, right: 0, top: 0, height: hdr, boxSizing: "border-box", padding: compact ? "0 12px" : "0 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, borderBottom: "1px solid var(--border)", whiteSpace: "nowrap" };
  const headTitle: React.CSSProperties = { fontFamily: display, fontWeight: 700, fontSize: compact ? 15 : 19, letterSpacing: "-0.02em" };

  const beam = (j: number): number[][] => {
    const y = rowY(j) + cardH / 2;
    if (!compact) return [[280, y], [304, y], [336, y], [cardLeft(0), y]];
    const ex = cardLeft(0) + cardW / 2;
    const ey = rowY(j);
    return [[W / 2, P + 76], [W / 2, P + 90], [ex, ey - 30], [ex, ey]];
  };

  return (
    <AbsoluteFill style={{ fontFamily: font, color: "var(--foreground)" }}>
      {!compact && (
        <div style={{ ...panel, left: P, top: boardTop, width: 280, height: boardH }}>
          <div style={head}>
            <span style={headTitle}>Messages</span>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>Chats and email</span>
          </div>
        </div>
      )}

      <div style={{ ...panel, left: boardX, top: boardTop, width: boardW, height: boardH }}>
        <div style={head}>
          <span style={headTitle}>Jobs system</span>
          <span style={{ fontSize: compact ? 12 : 15, color: "var(--brand)" }}>{created === 1 ? "1 job today" : `${created} jobs today`}</span>
        </div>
      </div>

      {heroCols.map((name, c) => (
        <div key={name} style={{ opacity: out }}>
          <div style={{ position: "absolute", left: colX(c), top: boardTop + hdr, width: colW, height: boardH - hdr - 6, borderRadius: compact ? 12 : 16, background: "var(--surface-soft)" }} />
          <div style={{ position: "absolute", left: cardLeft(c), top: boardTop + hdr, height: colHdr, lineHeight: `${colHdr}px`, fontSize: compact ? 12 : 14, color: "var(--secondary)", whiteSpace: "nowrap" }}>{name}</div>
        </div>
      ))}

      {heroJobs.map((job, j) => {
        const m = hm(j);
        const Icon = job.icon;
        const arrive = interpolate(f, [m, m + 10], [0, 1], C);
        const replied = !compact && f >= hSched(j) + 10;
        const vis = compact ? interpolate(f, [m, m + 8, m + 46, m + 56], [0, 1, 1, 0], C) : arrive * interpolate(f, [m + 40, m + 54], [1, 0.7], C);
        const pos: React.CSSProperties = compact ? { left: P, top: P, width: W - 2 * P, height: 76 } : { left: 16, top: rowY(j), width: 264, height: cardH };
        return (
          <div key={job.app} style={{ position: "absolute", ...pos, boxSizing: "border-box", borderRadius: compact ? 16 : 18, border: "1.5px solid var(--border-strong)", background: "var(--surface)", padding: "8px 12px", display: "flex", alignItems: "center", gap: 10, overflow: "hidden", opacity: vis * out, transform: compact ? `translateY(${(1 - arrive) * -8}px)` : `translateX(${(1 - arrive) * -14}px)` }}>
            <span style={{ display: "grid", placeItems: "center", flexShrink: 0, width: 32, height: 32, borderRadius: 10, background: "var(--surface-soft)" }}><Icon size={20} color="default" /></span>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, lineHeight: "16px", color: replied ? "var(--brand)" : "var(--secondary)", whiteSpace: "nowrap" }}>
                {replied && <CircleCheck size={14} strokeWidth={2} style={{ flexShrink: 0 }} />}
                {replied ? `Confirmed for ${job.time}` : job.app}
              </div>
              <div style={{ marginTop: 2, fontSize: compact ? 14 : 15, lineHeight: compact ? "18px" : "19px", height: compact ? 36 : 38, overflow: "hidden" }}>{job.text}</div>
            </div>
          </div>
        );
      })}

      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }}>
        {heroJobs.map((_, j) => {
          const m = hm(j);
          const pts = beam(j);
          const p = interpolate(f, [m + 20, m + 40], [0, 1], ease);
          const u = 1 - p;
          const bz = (k: number) => u * u * u * pts[0][k] + 3 * u * u * p * pts[1][k] + 3 * u * p * p * pts[2][k] + p * p * p * pts[3][k];
          const d = `M ${pts[0][0]} ${pts[0][1]} C ${pts[1][0]} ${pts[1][1]} ${pts[2][0]} ${pts[2][1]} ${pts[3][0]} ${pts[3][1]}`;
          const pathOp = interpolate(f, [m + 20, m + 24, m + 50, m + 62], [0, 1, 1, 0], C) * out;
          const dotOp = interpolate(f, [m + 20, m + 24, m + 36, m + 42], [0, 1, 1, 0], C) * out;
          return (
            <g key={j} fill="none" stroke="var(--brand)" strokeWidth={3} strokeLinecap="round">
              <path d={d} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} opacity={pathOp} />
              <circle cx={bz(0)} cy={bz(1)} r={6} fill="var(--brand)" stroke="none" opacity={dotOp} />
            </g>
          );
        })}
      </svg>

      {heroJobs.map((job, j) => {
        const m = hm(j);
        const c = interpolate(f, [hSched(j), hSched(j) + 18, hDone[j], hDone[j] + 18], [0, 1, 1, 2], ease);
        const state = f < hSched(j) + 9 ? 0 : f < hDone[j] + 9 ? 1 : 2;
        const op = interpolate(f, [m + 38, m + 48], [0, 1], C);
        const chip = state === 0 ? "Unassigned" : state === 1 ? `${job.tech} \u00b7 ${job.time}` : `Done \u00b7 ${job.tech}`;
        const chipStyle: React.CSSProperties =
          state === 0 ? { border: "1.5px solid var(--brand)", color: "var(--brand)", fontWeight: 700 }
          : state === 1 ? { border: "1.5px solid var(--border-strong)", color: "var(--foreground)" }
          : { border: "1.5px solid transparent", background: "var(--brand)", color: "var(--on-brand)" };
        const ch = compact ? 18 : 22;
        return (
          <div key={job.name} style={{ position: "absolute", left: cardLeft(0) + c * (colW + colGap), top: rowY(j), width: cardW, height: cardH, boxSizing: "border-box", borderRadius: compact ? 14 : 18, border: `1.5px solid ${state === 0 ? "var(--brand)" : state === 1 ? "var(--border-strong)" : "transparent"}`, background: state === 2 ? "var(--brand-soft)" : "var(--surface)", padding: compact ? "6px 8px" : "8px 12px", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden", opacity: op * out, transform: `scale(${0.92 + 0.08 * op})` }}>
            <div style={{ fontFamily: display, fontWeight: 700, fontSize: compact ? 12 : 16, lineHeight: compact ? "16px" : "20px", letterSpacing: "-0.02em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{job.name}</div>
            <div style={{ fontSize: compact ? 11 : 14, lineHeight: compact ? "14px" : "18px", color: "var(--secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{job.sub}</div>
            <div style={{ marginTop: compact ? 2 : 4 }}>
              <span style={{ ...chipStyle, display: "inline-block", maxWidth: "100%", boxSizing: "border-box", height: ch, lineHeight: `${ch - 3}px`, padding: compact ? "0 7px" : "0 10px", borderRadius: 999, fontSize: compact ? 11 : 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", verticalAlign: "top" }}>{chip}</span>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

export const CONCEPT_FRAMES = 150;

export function ConceptScene({ rows }: { rows: { label: string; value: number }[] }) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const out = interpolate(f, [120, 148], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ justifyContent: "center", gap: 30, padding: "0 12px", fontFamily: font, color: "var(--foreground)" }}>
      {rows.map((r, i) => {
        const v = r.value * spring({ frame: f - i * 10, fps, config: { damping: 200 } }) * out;
        return (
          <div key={r.label}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: "var(--secondary)", marginBottom: 10 }}><span>{r.label}</span><span>{Math.round(v)}%</span></div>
            <div style={{ height: 14, borderRadius: 999, background: "var(--border)" }}><div style={{ width: `${v}%`, height: "100%", borderRadius: 999, background: "var(--brand)" }} /></div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}

/* ------------------------------------------------------------------ */
/* How we work: animated flowchart                                     */
/* ------------------------------------------------------------------ */

const C = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const display = "var(--font-display), var(--font-instrument), system-ui, sans-serif";

type Stop = [frame: number, x: number, y: number];

/** A simulated mouse pointer. It glides through `stops`, presses and ripples on `clicks`, and stays pressed during `holds`. */
function Cursor({ stops, clicks, holds = [], scale = 1.3, vis = 1 }: { stops: Stop[]; clicks: number[]; holds?: [number, number][]; scale?: number; vis?: number }) {
  const f = useCurrentFrame();
  const frames = stops.map((p) => p[0]);
  const ease = { ...C, easing: Easing.inOut(Easing.cubic) };
  const x = interpolate(f, frames, stops.map((p) => p[1]), ease);
  const y = interpolate(f, frames, stops.map((p) => p[2]), ease);
  const show = interpolate(f, [frames[0], frames[0] + 10], [0, 1], C) * vis;
  const down = clicks.some((c) => f >= c && f < c + 5) || holds.some(([a, b]) => f >= a && f <= b);
  const ring = clicks.map((c) => f - c).find((d) => d >= 0 && d < 18);
  return (
    <>
      {ring !== undefined && (
        <div style={{ position: "absolute", left: x, top: y, width: 44, height: 44, marginLeft: -22, marginTop: -22, borderRadius: 999, border: "3px solid var(--brand)", opacity: (1 - ring / 18) * 0.7 * show, transform: `scale(${0.35 + (ring / 18) * 0.9})`, pointerEvents: "none" }} />
      )}
      <svg width={26} height={26} viewBox="0 0 26 26" style={{ position: "absolute", left: x, top: y, opacity: show, overflow: "visible", pointerEvents: "none", transformOrigin: "3px 2px", transform: `translate(-3px, -2px) scale(${(down ? 0.86 : 1) * scale})` }}>
        <path d="M3 2 L3 21 L8 16.5 L11.2 24 L14.6 22.6 L11.4 15.3 L18 15.3 Z" fill="#fff" stroke="#0f1115" strokeWidth={1.7} strokeLinejoin="round" />
      </svg>
    </>
  );
}

export const PROCESS_FRAMES = 240;

const flow: readonly [LucideIcon, string, string][] = [
  [Search, "Understand", "Map how work runs today"],
  [PencilRuler, "Design", "Scope, roles, and screens"],
  [Hammer, "Build", "Short, tested iterations"],
  [Rocket, "Launch", "Deploy and train your team"],
  [LifeBuoy, "Support", "Optional monthly plan"]
];

export type ProcessProps = { vertical?: boolean };

export function ProcessScene({ vertical = false }: ProcessProps) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const out = interpolate(f, [218, 238], [1, 0], C);

  const W = vertical ? 520 : 1180;
  const H = vertical ? 720 : 360;
  const nw = vertical ? 480 : 196;
  const nh = vertical ? 104 : 170;
  const gap = vertical ? 40 : (W - 40 - nw * 5) / 4;
  const x0 = 20;
  const y0 = vertical ? 20 : 30;
  const at = (i: number) => (vertical ? { x: x0, y: y0 + i * (nh + gap) } : { x: x0 + i * (nw + gap), y: y0 });
  const start = (i: number) => 6 + i * 24;

  const newest = Math.max(0, flow.filter((_, i) => f >= start(i)).length - 1);
  const active = f < 140 ? newest : f < 215 ? Math.min(4, Math.floor((f - 140) / 15)) : 4;
  const loop = interpolate(f, [128, 156], [0, 1], C);

  return (
    <AbsoluteFill style={{ fontFamily: font, color: "var(--foreground)" }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }}>
        {flow.slice(0, 4).map((_, i) => {
          const a = at(i), b = at(i + 1);
          const p = interpolate(f, [start(i) + 14, start(i) + 32], [0, 1], C);
          const [x1, y1, x2, y2] = vertical ? [a.x + nw / 2, a.y + nh, b.x + nw / 2, b.y] : [a.x + nw, a.y + nh / 2, b.x, b.y + nh / 2];
          const head = vertical ? `M ${x2 - 9} ${y2 - 11} L ${x2} ${y2} L ${x2 + 9} ${y2 - 11}` : `M ${x2 - 11} ${y2 - 9} L ${x2} ${y2} L ${x2 - 11} ${y2 + 9}`;
          return (
            <g key={i} opacity={out} stroke="var(--border-strong)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none">
              <line x1={x1} y1={y1} x2={x2} y2={y2} strokeDasharray={gap} strokeDashoffset={gap * (1 - p)} />
              <path d={head} opacity={p >= 1 ? 1 : 0} />
            </g>
          );
        })}
        {!vertical && (() => {
          const a = at(1), b = at(2);
          const c1 = a.x + nw / 2, c2 = b.x + nw / 2, yb = y0 + nh;

          // Loop doodle: draws in, arrowhead fades in, then a dot keeps travelling along the curve.
          const P0 = { x: c2, y: yb + 6 }, P1 = { x: c2, y: yb + 96 }, P2 = { x: c1, y: yb + 96 }, P3 = { x: c1, y: yb + 18 };
          const bez = (t: number) => {
            const u = 1 - t;
            return {
              x: u * u * u * P0.x + 3 * u * u * t * P1.x + 3 * u * t * t * P2.x + t * t * t * P3.x,
              y: u * u * u * P0.y + 3 * u * u * t * P1.y + 3 * u * t * t * P2.y + t * t * t * P3.y
            };
          };
          const PASS = 30;
          const dt = f < 156 ? 0 : ((f - 156) % PASS) / PASS;
          const dot = bez(Easing.inOut(Easing.cubic)(dt));
          const dotOp = interpolate(f, [156, 162], [0, 1], C) * interpolate(dt, [0, 0.12, 0.88, 1], [0, 1, 1, 0], C);
          const headOp = interpolate(f, [148, 158], [0, 1], C);
          const glow = 0.5 + 0.5 * Math.sin(f / 5);

          return (
            <g opacity={out} stroke="var(--brand)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none">
              <path d={`M ${P0.x} ${P0.y} C ${P1.x} ${P1.y} ${P2.x} ${P2.y} ${P3.x} ${P3.y}`} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - loop} />
              <path d={`M ${c1 - 8} ${yb + 28} L ${c1} ${yb + 16} L ${c1 + 8} ${yb + 28}`} opacity={headOp} />
              <circle cx={dot.x} cy={dot.y} r={9 + 3 * glow} fill="var(--brand)" stroke="none" opacity={dotOp * 0.25} />
              <circle cx={dot.x} cy={dot.y} r={5} fill="var(--brand)" stroke="none" opacity={dotOp} />
              <text x={(c1 + c2) / 2} y={yb + 122} textAnchor="middle" fontSize={20} fill="var(--secondary)" stroke="none" fontFamily={font} opacity={interpolate(f, [150, 166], [0, 1], C)}>
                Each iteration is reviewed with you
              </text>
            </g>
          );
        })()}
      </svg>

      {flow.map(([Icon, label, sub], i) => {
        const { x, y } = at(i);
        const a = spring({ frame: f - start(i), fps, config: { damping: 200 } });
        const on = i === active;
        const num = <span style={{ fontFamily: display, fontWeight: 700, fontSize: vertical ? 40 : 22, opacity: 0.55, letterSpacing: "-0.02em" }}>{String(i + 1).padStart(2, "0")}</span>;
        const text = (
          <div style={{ flex: vertical ? 1 : undefined }}>
            <div style={{ fontFamily: display, fontWeight: 700, fontSize: vertical ? 32 : 26, letterSpacing: "-0.03em", lineHeight: 1.1 }}>{label}</div>
            <div style={{ fontSize: vertical ? 21 : 18, lineHeight: 1.3, marginTop: 6, opacity: 0.8 }}>{sub}</div>
          </div>
        );
        return (
          <div
            key={label}
            style={{
              position: "absolute", left: x, top: y, width: nw, height: nh, boxSizing: "border-box", borderRadius: 24,
              border: `2px solid ${on ? "var(--brand)" : "var(--border-strong)"}`,
              background: on ? "var(--brand)" : "var(--surface)",
              color: on ? "var(--on-brand)" : "var(--foreground)",
              opacity: a * out, transform: `scale(${0.92 + 0.08 * a})`,
              display: "flex", flexDirection: vertical ? "row" : "column",
              alignItems: vertical ? "center" : "flex-start", justifyContent: vertical ? "flex-start" : "center",
              gap: vertical ? 22 : 10, padding: vertical ? "0 28px" : "0 22px"
            }}
          >
            {vertical ? (
              <>{num}{text}<Icon size={36} strokeWidth={1.6} style={{ opacity: 0.9 }} /></>
            ) : (
              <>
                <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>{num}<Icon size={28} strokeWidth={1.6} style={{ opacity: 0.9 }} /></div>
                {text}
              </>
            )}
          </div>
        );
      })}

    </AbsoluteFill>
  );
}

/* ------------------------------------------------------------------ */
/* Signs you have outgrown your tools: five tools merge into one system */
/* ------------------------------------------------------------------ */

export const TOOLS_FRAMES = 240;

const tools: [string, ReactElement][] = [
  ["Spreadsheets", <SiGooglesheets key="s" size={24} color="default" />],
  ["Messenger", <SiMessenger key="m" size={24} color="default" />],
  ["Email", <SiGmail key="g" size={24} color="default" />],
  ["Notion pages", <SiNotion key="n" size={24} color="currentColor" />],
  ["Viber chats", <SiViber key="v" size={24} color="default" />]
];
const tangles: [number, number][] = [[0, 2], [1, 3], [2, 4], [0, 3], [1, 4]];
const CHIP_W = 236, CHIP_H = 54;
const chipY = (i: number) => 30 + i * 72;
const CARD_X = 450, CARD_W = 250, CARD_H = 264, CARD_Y = 222 - CARD_H / 2;

export function ToolsScene() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const out = interpolate(f, [222, 238], [1, 0], C);
  const chipX = interpolate(f, [70, 112], [20, 110], { ...C, easing: Easing.inOut(Easing.cubic) });
  const tangle = interpolate(f, [18, 38, 62, 82], [0, 1, 1, 0], C);
  const card = spring({ frame: f - 76, fps, config: { damping: 200 } });
  const rows: [string, LucideIcon][] = [["Jobs", Wrench], ["Customers", Users], ["Schedule", CalendarDays]];

  return (
    <AbsoluteFill style={{ fontFamily: font, color: "var(--foreground)" }}>
      <svg width={720} height={440} viewBox="0 0 720 440" style={{ position: "absolute", inset: 0 }}>
        <g opacity={tangle * out} fill="none" stroke="var(--muted)" strokeWidth={2.5} strokeDasharray="6 7" strokeLinecap="round">
          {tangles.map(([a, b], k) => {
            const bulge = 110 + 16 * Math.sin(f / 7 + k * 1.7);
            const x = 20 + CHIP_W;
            const ya = chipY(a) + CHIP_H / 2, yb = chipY(b) + CHIP_H / 2;
            return <path key={k} d={`M ${x} ${ya} C ${x + bulge} ${ya} ${x + bulge} ${yb} ${x} ${yb}`} />;
          })}
        </g>
        <g opacity={out} fill="none" stroke="var(--brand)" strokeWidth={3} strokeLinecap="round">
          {tools.map((_, i) => {
            const p = interpolate(f, [86 + i * 4, 114 + i * 4], [0, 1], C);
            const yc = chipY(i) + CHIP_H / 2;
            return <path key={i} d={`M ${110 + CHIP_W} ${yc} C 392 ${yc} 404 222 ${CARD_X} 222`} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />;
          })}
        </g>
      </svg>

      {tools.map(([t, icon], i) => {
        const a = spring({ frame: f - i * 6, fps, config: { damping: 200 } });
        return (
          <div key={t} style={{ position: "absolute", left: chipX, top: chipY(i), width: CHIP_W, height: CHIP_H, boxSizing: "border-box", borderRadius: 999, border: "2px solid var(--border-strong)", background: "var(--surface)", display: "flex", alignItems: "center", gap: 12, padding: "0 20px", fontSize: 22, whiteSpace: "nowrap", overflow: "hidden", opacity: a * out, transform: `translateX(${(1 - a) * -24}px)` }}>
            <span style={{ display: "grid", placeItems: "center", flexShrink: 0 }}>{icon}</span>{t}
          </div>
        );
      })}

      <div style={{ position: "absolute", left: CARD_X, top: CARD_Y, width: CARD_W, height: CARD_H, boxSizing: "border-box", borderRadius: 28, background: "var(--brand)", color: "var(--on-brand)", padding: "0 26px", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden", opacity: card * out, transform: `scale(${0.9 + 0.1 * card})` }}>
        <div style={{ fontFamily: display, fontWeight: 700, fontSize: 30, letterSpacing: "-0.03em", lineHeight: 1.1, whiteSpace: "nowrap" }}>One system</div>
        <div style={{ marginTop: 20, display: "grid", gap: 14, fontSize: 22 }}>
          {rows.map(([r, Icon], k) => (
            <div key={r} style={{ display: "flex", alignItems: "center", gap: 12, whiteSpace: "nowrap", opacity: interpolate(f, [118 + k * 8, 130 + k * 8], [0, 1], C) }}>
              <Icon size={24} strokeWidth={1.9} style={{ flexShrink: 0 }} />{r}
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", left: 20, bottom: 6, fontSize: 24, color: "var(--secondary)", opacity: out }}>
        <span style={{ position: "absolute", whiteSpace: "nowrap", opacity: interpolate(f, [0, 12, 68, 84], [0, 1, 1, 0], C) }}>Five tools, five versions of the truth.</span>
        <span style={{ position: "absolute", whiteSpace: "nowrap", opacity: interpolate(f, [92, 108], [0, 1], C) }}>One system, one version.</span>
      </div>
    </AbsoluteFill>
  );
}

/* ------------------------------------------------------------------ */
/* Booking: a customer books online and the job lands in the schedule  */
/* ------------------------------------------------------------------ */

export const BOOKING_FRAMES = 240;

export type BookingProps = { compact?: boolean };

const bookingFields: [string, string, number][] = [["Service", "Aircon repair", 10], ["Date", "Tue, Oct 14", 26], ["Time", "10:00 AM", 40]];
const bookingChips: [string, number][] = [["Booking confirmed", 104], ["Customer notified", 136], ["Invoice paid", 176]];

/** Canvas: wide 640 x 372, compact 360 x 636. */
export function BookingScene({ compact = false }: BookingProps) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const out = interpolate(f, [222, 238], [1, 0], C);
  const a = spring({ frame: f, fps, config: { damping: 200 } });
  const b = spring({ frame: f - 8, fps, config: { damping: 200 } });
  const block = spring({ frame: f - 90, fps, config: { damping: 200 } });
  const press = f >= 78 && f < 84;

  const pad = compact ? 16 : 18;
  const CW = compact ? 344 : 280;
  const H1 = compact ? 288 : 356;
  const H2 = compact ? 296 : 356;
  const x2 = compact ? 8 : 352;
  const y2 = compact ? 8 + H1 + 36 : 8;
  const W = compact ? 360 : 640;
  const H = compact ? y2 + H2 + 8 : 8 + H1 + 8;
  const slotH = compact ? 40 : 42;
  const hours = compact ? ["9:00", "10:00", "11:00"] : ["9:00", "10:00", "11:00", "12:00"];
  const bx = 8 + CW / 2;
  const by = 8 + H1 - 2 - pad - (compact ? 22 : 23);
  const pts: number[][] = compact
    ? [[bx, 8 + H1], [bx, 8 + H1 + 12], [bx, 8 + H1 + 24], [bx, y2]]
    : [[8 + CW, by], [320, by], [320, 153], [352, 153]];
  const d = `M ${pts[0][0]} ${pts[0][1]} C ${pts[1][0]} ${pts[1][1]} ${pts[2][0]} ${pts[2][1]} ${pts[3][0]} ${pts[3][1]}`;

  const p = interpolate(f, [80, 100], [0, 1], { ...C, easing: Easing.inOut(Easing.cubic) });
  const u = 1 - p;
  const bz = (k: number) => u * u * u * pts[0][k] + 3 * u * u * p * pts[1][k] + 3 * u * p * p * pts[2][k] + p * p * p * pts[3][k];
  const dotOp = interpolate(f, [80, 84, 98, 102], [0, 1, 1, 0], C);

  const card: React.CSSProperties = { position: "absolute", width: CW, boxSizing: "border-box", borderRadius: compact ? 22 : 26, border: "2px solid var(--border-strong)", background: "var(--surface)", padding: pad, display: "flex", flexDirection: "column", overflow: "hidden" };
  const eyebrow: React.CSSProperties = { fontSize: 14, lineHeight: "18px", color: "var(--secondary)", whiteSpace: "nowrap" };
  const title: React.CSSProperties = { fontFamily: display, fontWeight: 700, fontSize: compact ? 22 : 24, lineHeight: compact ? "26px" : "28px", letterSpacing: "-0.03em", marginTop: 2, whiteSpace: "nowrap" };

  return (
    <AbsoluteFill style={{ fontFamily: font, color: "var(--foreground)" }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }}>
        <g opacity={out} fill="none" stroke="var(--brand)" strokeWidth={3} strokeLinecap="round">
          <path d={d} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
          <circle cx={bz(0)} cy={bz(1)} r={6} fill="var(--brand)" stroke="none" opacity={dotOp} />
        </g>
      </svg>

      <div style={{ ...card, left: 8, top: 8, height: H1, opacity: a * out, transform: `scale(${0.95 + 0.05 * a})` }}>
        <div style={eyebrow}>Customer portal</div>
        <div style={title}>Book a service</div>
        <div style={{ marginTop: compact ? 12 : 14, display: "grid", gap: compact ? 8 : 10 }}>
          {bookingFields.map(([label, value, start]) => {
            const n = Math.max(0, Math.min(value.length, Math.floor((f - start) / 1.5)));
            const typing = f >= start && n < value.length;
            return (
              <div key={label} style={{ display: compact ? "flex" : "block", alignItems: "center", gap: 10 }}>
                <div style={{ fontSize: 14, lineHeight: "17px", color: "var(--secondary)", marginBottom: compact ? 0 : 4, width: compact ? 62 : undefined, flexShrink: 0 }}>{label}</div>
                <div style={{ height: compact ? 40 : 38, flex: 1, minWidth: 0, boxSizing: "border-box", borderRadius: 12, border: `1.5px solid ${typing ? "var(--brand)" : "var(--border-strong)"}`, padding: "0 12px", display: "flex", alignItems: "center", fontSize: 17, whiteSpace: "nowrap", overflow: "hidden" }}>{value.slice(0, n)}</div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: "auto", height: compact ? 44 : 46, flexShrink: 0, borderRadius: 999, background: "var(--brand)", color: "var(--on-brand)", display: "grid", placeItems: "center", fontSize: 18, fontWeight: 600, transform: `scale(${press ? 0.96 : 1})` }}>{f >= 84 ? "Booked" : "Book now"}</div>
      </div>

      <div style={{ ...card, left: x2, top: y2, height: H2, opacity: b * out, transform: `scale(${0.95 + 0.05 * b})` }}>
        <div style={eyebrow}>Team schedule</div>
        <div style={title}>Tue, Oct 14</div>
        <div style={{ position: "relative", marginTop: compact ? 12 : 14, height: slotH * hours.length, flexShrink: 0 }}>
          {hours.map((h, i) => (
            <div key={h} style={{ position: "absolute", left: 0, right: 0, top: i * slotH, height: slotH, boxSizing: "border-box", borderTop: "1px solid var(--border)", fontSize: 13, lineHeight: "16px", color: "var(--secondary)", paddingTop: 5, whiteSpace: "nowrap" }}>{h}</div>
          ))}
          <div style={{ position: "absolute", left: compact ? 48 : 52, right: 0, top: slotH + 3, height: slotH - 6, boxSizing: "border-box", borderRadius: 10, background: "var(--brand)", color: "var(--on-brand)", padding: "0 12px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, fontSize: compact ? 15 : 16, whiteSpace: "nowrap", overflow: "hidden", opacity: block, transform: `scale(${0.92 + 0.08 * block})`, transformOrigin: "left center" }}>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>Reyes Aircon</span><span style={{ opacity: 0.8, flexShrink: 0 }}>Ben</span>
          </div>
        </div>
        <div style={{ marginTop: "auto", display: "grid", gap: 6, flexShrink: 0 }}>
          {bookingChips.map(([t, s]) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, lineHeight: "20px", height: 20, whiteSpace: "nowrap", opacity: interpolate(f, [s, s + 10], [0, 1], C) }}>
              <CircleCheck size={18} strokeWidth={1.9} style={{ color: "var(--brand)", flexShrink: 0 }} />{t}
            </div>
          ))}
        </div>
      </div>

      <Cursor
        clicks={[78]}
        scale={compact ? 1.1 : 1.3}
        vis={interpolate(f, [96, 108], [1, 0], C) * out}
        stops={[[4, bx + (compact ? 80 : 90), by + (compact ? 40 : 36)], [62, bx, by], [80, bx, by], [108, bx + 40, by + 30]]}
      />
    </AbsoluteFill>
  );
}

/* ------------------------------------------------------------------ */
/* Dashboard: live numbers that update as the team works               */
/* ------------------------------------------------------------------ */

export const DASH_FRAMES = 240;

export type DashProps = { compact?: boolean };

const dashDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dashData = [60, 80, 50, 95, 110, 70, 40];

/** Canvas: wide 640 x 350, compact 360 x 292. */
export function DashboardScene({ compact = false }: DashProps) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const out = interpolate(f, [222, 238], [1, 0], C);
  const ease = (s: number, d = 30) => Easing.out(Easing.cubic)(interpolate(f, [s, s + d], [0, 1], C));
  const newJob = f >= 156;
  const pulse = interpolate(f, [156, 160, 172], [0, 1, 0], C);
  const extra = 14 * interpolate(f, [156, 172], [0, 1], C);

  const W = compact ? 360 : 640;
  const P = 8;
  const gap = compact ? 8 : 12;
  const tw = (W - 2 * P - 2 * gap) / 3;
  const th = compact ? 76 : 98;
  const top = P + th + gap;
  const cp = compact ? 12 : 14;
  const titleH = compact ? 18 : 22;
  const AR = compact ? 120 : 140;
  const labH = compact ? 16 : 20;
  const chartH = cp + titleH + 8 + AR + 6 + labH + cp;
  const base = top + cp + titleH + 8 + AR;
  const side = compact ? 16 : 20;
  const bw = compact ? 32 : 52;
  const step = (W - 2 * P - 2 * side - bw) / 6;
  const x0 = P + side;
  const hMax = AR - 20;

  const kpis: [string, string, LucideIcon][] = [
    ["Open jobs", String(Math.round(24 * ease(6)) + (newJob ? 1 : 0)), Wrench],
    ["Low stock", String(Math.round(3 * ease(14))), Boxes],
    ["Revenue", `₱${Math.round(184 * ease(22))}k`, Wallet]
  ];

  return (
    <AbsoluteFill style={{ fontFamily: font, color: "var(--foreground)", opacity: out }}>
      {kpis.map(([label, value, Icon], i) => {
        const s = spring({ frame: f - i * 6, fps, config: { damping: 200 } });
        const hot = i === 0 ? pulse : 0;
        return (
          <div key={label} style={{ position: "absolute", left: P + i * (tw + gap), top: P, width: tw, height: th, boxSizing: "border-box", borderRadius: compact ? 18 : 22, border: `2px solid ${hot > 0.05 ? "var(--brand)" : "var(--border-strong)"}`, background: "var(--surface)", padding: compact ? "10px 12px" : "14px 16px", overflow: "hidden", opacity: s, transform: `scale(${(0.95 + 0.05 * s) * (1 + 0.03 * hot)})` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4, fontSize: compact ? 12 : 15, lineHeight: compact ? "16px" : "18px", color: "var(--secondary)" }}>
              <span style={{ minWidth: 0, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{label}</span>
              <Icon size={compact ? 16 : 20} strokeWidth={1.7} style={{ flexShrink: 0 }} />
            </div>
            <div style={{ fontFamily: display, fontWeight: 700, fontSize: compact ? 24 : 38, lineHeight: compact ? "28px" : "42px", letterSpacing: "-0.03em", marginTop: compact ? 4 : 6, whiteSpace: "nowrap" }}>{value}</div>
          </div>
        );
      })}

      <div style={{ position: "absolute", left: P, top, width: W - 2 * P, height: chartH, boxSizing: "border-box", borderRadius: compact ? 20 : 24, border: "2px solid var(--border-strong)", background: "var(--surface)", opacity: interpolate(f, [18, 30], [0, 1], C) }} />
      <div style={{ position: "absolute", left: P + side, top: top + cp, height: titleH, lineHeight: `${titleH}px`, fontSize: compact ? 14 : 17, color: "var(--secondary)", whiteSpace: "nowrap", opacity: interpolate(f, [18, 30], [0, 1], C) }}>Jobs completed this week</div>
      <div style={{ position: "absolute", right: P + side, top: top + cp, height: titleH, display: "flex", alignItems: "center", gap: 6, fontSize: compact ? 12 : 15, color: "var(--secondary)", opacity: interpolate(f, [18, 30], [0, 1], C) }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--brand)", opacity: 0.55 + 0.45 * Math.sin(f / 6) }} />Live
      </div>
      <div style={{ position: "absolute", left: x0, top: base, width: W - 2 * P - 2 * side, height: 2, background: "var(--border)" }} />
      {dashData.map((v, i) => {
        const hot = i === 3;
        const h = ((v + (hot ? extra : 0)) / 110) * hMax * ease(30 + i * 6, 24);
        return (
          <div key={dashDays[i]}>
            <div style={{ position: "absolute", left: x0 + i * step, top: base - h, width: bw, height: h, borderRadius: "8px 8px 3px 3px", background: "var(--brand)", opacity: hot ? 1 : 0.35 }} />
            <div style={{ position: "absolute", left: x0 + i * step - 6, top: base + 6, width: bw + 12, height: labH, lineHeight: `${labH}px`, textAlign: "center", fontSize: compact ? 12 : 15, color: "var(--secondary)", whiteSpace: "nowrap", opacity: interpolate(f, [30 + i * 6, 42 + i * 6], [0, 1], C) }}>{dashDays[i]}</div>
          </div>
        );
      })}
      <div style={{ position: "absolute", left: x0 + 3 * step - 12, top: base - ((95 + extra) / 110) * hMax - 22, width: bw + 24, height: 18, lineHeight: "18px", textAlign: "center", fontSize: compact ? 13 : 16, color: "var(--brand)", fontWeight: 700, whiteSpace: "nowrap", opacity: interpolate(f, [158, 166, 196, 210], [0, 1, 1, 0], C) }}>+1 job</div>
    </AbsoluteFill>
  );
}

/* ------------------------------------------------------------------ */
/* Direct: the same request through an agency and through the founder  */
/* ------------------------------------------------------------------ */

export const DIRECT_FRAMES = 240;

export type DirectProps = { compact?: boolean };

const agency: readonly [LucideIcon, string][] = [[User, "You"], [Briefcase, "Account manager"], [ClipboardList, "Project manager"], [Code, "Developer"]];
const direct: readonly [LucideIcon, string][] = [[User, "You"], [UserCheck, "Founder"], [CircleCheck, "Built right"]];
const A_T = [14, 42, 70, 98];
const B_T = [122, 152, 182];
const agencyText = ["Show the problem", "Which problem?", "Ticket #482: bug", "Built: Wrong fix"];
const directText = ["Show the problem", "Fix the problem", "Done"];
const RED = "rgba(239,68,68,0.9)";

/** Canvas: wide 640 x 378, compact 360 x 340. */
export function DirectScene({ compact = false }: DirectProps) {
  const f = useCurrentFrame();
  const out = interpolate(f, [222, 238], [1, 0], C);
  const ease = { ...C, easing: Easing.inOut(Easing.cubic) };

  const m = compact
    ? { W: 360, nw: 76, nh: 70, tw: 170, th: 30, lab: 20, tfs: 13, lfs: 14, nfs: 12, nlh: 14, icon: 20, sec: 12, rfs: 13, ric: 16 }
    : { W: 640, nw: 128, nh: 80, tw: 200, th: 34, lab: 22, tfs: 15, lfs: 17, nfs: 15, nlh: 18, icon: 22, sec: 14, rfs: 17, ric: 18 };
  const P = 8;
  const gx = (m.W - 2 * P - 4 * m.nw) / 3;
  const nx = (i: number) => P + i * (m.nw + gx);
  const ncx = (i: number) => nx(i) + m.nw / 2;
  const nodesOff = m.lab + 4;
  const tokenOff = nodesOff + m.nh + 6;
  const resOff = tokenOff + m.th + 6;
  const secH = resOff + m.lab;
  const aTop = P;
  const bTop = P + secH + m.sec;
  const H = bTop + secH + P;

  const ax = interpolate(f, A_T, [0, 1, 2, 3].map(ncx), ease);
  const bx = interpolate(f, B_T, [0, 1, 2].map(ncx), ease);
  const aIdx = Math.max(0, A_T.filter((t) => f >= t).length - 1);
  const bIdx = Math.max(0, B_T.filter((t) => f >= t).length - 1);
  const tokenLeft = (cx: number) => Math.min(m.W - P - m.tw, Math.max(P, cx - m.tw / 2));

  const row = (items: readonly [LucideIcon, string][], top: number, times: number[], last: boolean) => (
    <>
      {items.map(([Icon, label], i) => {
        const lit = f >= times[i];
        const end = last && i === items.length - 1 && lit;
        return (
          <div key={label} style={{ position: "absolute", left: nx(i), top: top + nodesOff, width: m.nw, height: m.nh, boxSizing: "border-box", borderRadius: compact ? 18 : 22, border: `2px solid ${lit ? "var(--brand)" : "var(--border-strong)"}`, background: end ? "var(--brand)" : "var(--surface)", color: end ? "var(--on-brand)" : "var(--foreground)", padding: compact ? "0 4px" : "0 12px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: compact ? "center" : "flex-start", textAlign: compact ? "center" : "left", gap: compact ? 4 : 6, overflow: "hidden", opacity: out }}>
            <Icon size={m.icon} strokeWidth={1.7} style={{ flexShrink: 0 }} />
            <div style={{ fontFamily: display, fontWeight: 700, fontSize: m.nfs, lineHeight: `${m.nlh}px`, letterSpacing: "-0.02em" }}>{label}</div>
          </div>
        );
      })}
    </>
  );

  const token: React.CSSProperties = { position: "absolute", width: m.tw, height: m.th, boxSizing: "border-box", borderRadius: 999, background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 10px", fontSize: m.tfs, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" };
  const label: React.CSSProperties = { position: "absolute", left: P, height: m.lab, lineHeight: `${m.lab}px`, fontSize: m.lfs, color: "var(--secondary)", whiteSpace: "nowrap" };
  const result: React.CSSProperties = { position: "absolute", left: P, width: m.W - 2 * P, height: m.lab, display: "flex", alignItems: "center", gap: 8, fontSize: m.rfs, color: "var(--secondary)", whiteSpace: "nowrap", overflow: "hidden" };
  const clip: React.CSSProperties = { minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" };

  return (
    <AbsoluteFill style={{ fontFamily: font, color: "var(--foreground)" }}>
      <svg width={m.W} height={H} viewBox={`0 0 ${m.W} ${H}`} style={{ position: "absolute", inset: 0 }}>
        <g opacity={out} fill="none" strokeWidth={3} strokeLinecap="round">
          {[0, 1, 2].map((i) => <line key={`a${i}`} x1={nx(i) + m.nw} y1={aTop + nodesOff + m.nh / 2} x2={nx(i + 1)} y2={aTop + nodesOff + m.nh / 2} stroke={f >= A_T[i + 1] ? "var(--brand)" : "var(--border-strong)"} />)}
          {[0, 1].map((i) => <line key={`b${i}`} x1={nx(i) + m.nw} y1={bTop + nodesOff + m.nh / 2} x2={nx(i + 1)} y2={bTop + nodesOff + m.nh / 2} stroke={f >= B_T[i + 1] ? "var(--brand)" : "var(--border-strong)"} />)}
        </g>
      </svg>

      <div style={{ ...label, top: aTop, opacity: out }}>A typical agency</div>
      <div style={{ ...label, top: bTop, opacity: out * interpolate(f, [110, 122], [0, 1], C) }}>AcquisiFlow</div>
      {row(agency, aTop, A_T, false)}
      {row(direct, bTop, B_T, true)}

      <div style={{ ...token, left: tokenLeft(ax), top: aTop + tokenOff, border: `2px solid ${aIdx === 3 ? RED : "var(--brand)"}`, color: aIdx === 3 ? RED : "var(--foreground)", opacity: interpolate(f, [6, 14], [0, 1], C) * out }}>{agencyText[aIdx]}</div>
      <div style={{ ...token, left: tokenLeft(bx), top: bTop + tokenOff, border: "2px solid var(--brand)", color: "var(--foreground)", opacity: interpolate(f, [114, 122], [0, 1], C) * out }}>{directText[bIdx]}</div>

      <div style={{ ...result, top: aTop + resOff, opacity: interpolate(f, [108, 120], [0, 1], C) * out }}>
        <CircleX size={m.ric} strokeWidth={1.9} style={{ color: "#ef4444", flexShrink: 0 }} /><span style={clip}>Four hand-offs, and the request gets lost.</span>
      </div>
      <div style={{ ...result, top: bTop + resOff, opacity: interpolate(f, [190, 202], [0, 1], C) * out }}>
        <CircleCheck size={m.ric} strokeWidth={1.9} style={{ color: "var(--brand)", flexShrink: 0 }} /><span style={clip}>{compact ? "Two hops. Built exactly as asked." : "Two hops. The founder scopes it and it gets built as asked."}</span>
      </div>
    </AbsoluteFill>
  );
}