"use client";

import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CalendarDays, Hammer, LifeBuoy, PencilRuler, Rocket, Search, Users, Wrench, type LucideIcon } from "lucide-react";
import { SiGmail, SiGooglesheets, SiMessenger, SiNotion, SiViber } from "@icons-pack/react-simple-icons";
import type { ReactElement } from "react";

const font = "var(--font-instrument), system-ui, sans-serif";
const sheet = [["1842", "Reyes Aircon", "Ben", "done?"], ["1843", "M. Santos", "", ""], ["1844", "Dela Cruz Bldg", "Ana", "sched"], ["1845", "Reyes aircon", "ben", "2nd visit?"], ["1846", "Lim Hardware", "", "new"]];
const system = [["1842", "Reyes Aircon", "Ben", "Completed"], ["1843", "M. Santos", "Unassigned", "New"], ["1844", "Dela Cruz Bldg", "Ana", "Scheduled"], ["1845", "Reyes Aircon", "Ben", "Scheduled"], ["1846", "Lim Hardware", "Unassigned", "New"]];
const cols = [130, 340, 230, 260];
const TOP = 80, ROW = 80;

const pill = (s: string) =>
  s === "Completed" ? { border: "1.5px solid transparent", background: "var(--brand-soft)", color: "var(--brand)" }
  : s === "New" ? { border: "1.5px solid var(--brand)", color: "var(--brand)" }
  : { border: "1.5px solid var(--border-strong)", color: "var(--foreground)" };

export const JOBS_FRAMES = 240;

export type JobsProps = { pos?: number };

/** Divider position (0 to 1) at a given frame of the automatic sweep. */
export const jobsPos = (f: number) => interpolate(f, [0, 40, 110, 190, 240], [1, 1, 0.3, 0.3, 1], { easing: Easing.inOut(Easing.cubic) });

export function JobsScene({ pos }: JobsProps) {
  const f = useCurrentFrame();
  const x = pos ?? jobsPos(f);
  const assigned = f >= 131;
  const rowsNow = system.map((r) => (assigned && r[0] === "1843" ? [r[0], r[1], "Ben", "Scheduled"] : r));
  const cell = (i: number): React.CSSProperties => ({ width: cols[i], padding: "0 22px", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" });
  return (
    <AbsoluteFill style={{ background: "var(--surface)", fontFamily: font, fontSize: 26, color: "var(--foreground)" }}>
      <div style={{ position: "absolute", inset: 0, fontFamily: "Arial, Helvetica, sans-serif" }}>
        <div style={{ height: TOP, display: "flex", alignItems: "center", padding: "0 26px", background: "var(--surface-soft)", color: "var(--muted)", borderBottom: "1px solid var(--border)" }}>Spreadsheet</div>
        {sheet.map((r, i) => (
          <div key={i} style={{ display: "flex", height: ROW, alignItems: "center", borderBottom: "1px solid var(--border)" }}>
            {r.map((c, j) => <div key={j} style={{ ...cell(j), borderRight: "1px solid var(--border)", height: "100%", lineHeight: `${ROW}px` }}>{c}</div>)}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", inset: 0, background: "var(--surface)", clipPath: `inset(0 0 0 ${x * 100}%)` }}>
        <div style={{ height: TOP, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 26px", background: "var(--surface-soft)", borderBottom: "1px solid var(--border)" }}>
          <b>Jobs system</b><span style={{ color: "var(--brand)", fontSize: 22 }}>{assigned ? "1 needs a technician" : "2 need a technician"}</span>
        </div>
        {rowsNow.map((r, i) => (
          <div key={i} style={{ display: "flex", height: ROW, alignItems: "center", borderBottom: "1px solid var(--border)" }}>
            {r.map((c, j) => (
              <div key={j} style={{ ...cell(j), overflow: j === 3 ? "visible" : "hidden", color: j === 2 && c === "Unassigned" ? "var(--foreground)" : j === 2 ? "var(--secondary)" : undefined, fontWeight: j === 2 && c === "Unassigned" ? 700 : 400 }}>
                {j === 3 ? <span style={{ ...pill(c), display: "inline-block", boxSizing: "border-box", borderRadius: 999, padding: "0 20px", lineHeight: "38px", fontSize: 21 }}>{c}</span> : c}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", top: 0, bottom: 0, left: `${x * 100}%`, width: 4, marginLeft: -2, background: "var(--brand)" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 60, height: 60, marginTop: -30, marginLeft: -30, borderRadius: 999, background: "var(--brand)", color: "var(--on-brand)", display: "grid", placeItems: "center", fontSize: 22, boxShadow: "0 8px 24px rgba(0,0,0,.25)" }}>‹ ›</div>
      </div>
      {pos === undefined && (
        <Cursor
          clicks={[36, 130]}
          holds={[[36, 110]]}
          stops={[[6, 900, 430], [34, 944, 244], [40, 944, 240], [110, 272, 240], [116, 272, 240], [128, 560, 204], [140, 560, 204], [176, 700, 330], [186, 900, 440]]}
        />
      )}
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
          return (
            <g opacity={out} stroke="var(--brand)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none">
              <path d={`M ${c2} ${yb + 6} C ${c2} ${yb + 96} ${c1} ${yb + 96} ${c1} ${yb + 18}`} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - loop} />
              <path d={`M ${c1 - 8} ${yb + 28} L ${c1} ${yb + 16} L ${c1 + 8} ${yb + 28}`} opacity={loop >= 1 ? 1 : 0} />
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