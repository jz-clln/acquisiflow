"use client";

import { Player, type PlayerRef } from "@remotion/player";
import { useEffect, useRef, useState, type ComponentType, type KeyboardEvent, type PointerEvent } from "react";
import { isLowPerf, isReducedMotion } from "@/lib/perf";

type Props<P> = {
  component: ComponentType<P>;
  inputProps?: P;
  width: number;
  height: number;
  frames: number;
  still: number;
  label: string;
  /** Pass this to turn the scene into a draggable before/after compare. It returns the divider position (0 to 1) for a frame. */
  posAt?: (frame: number) => number;
};

const clamp = (n: number) => Math.min(0.96, Math.max(0.04, n));

export function Scene<P extends Record<string, unknown>>({ component, inputProps, width, height, frames, still, label, posAt }: Props<P>) {
  const ref = useRef<PlayerRef>(null);
  const box = useRef<HTMLDivElement>(null);
  const zone = useRef<HTMLDivElement>(null);
  const manual = useRef(false);
  const [pos, setPos] = useState<number | null>(null);

  function take(p: number) {
    manual.current = true;
    ref.current?.pause();
    setPos(clamp(p));
  }

  useEffect(() => {
    const el = box.current, player = ref.current;
    if (!el || !player) return;

    let io: IntersectionObserver | undefined;

    // Settle on the finished frame and stop playback (reduced motion, low-end devices, or a runtime downgrade).
    const rest = () => {
      io?.disconnect();
      if (posAt) take(posAt(still));
      else { manual.current = true; player.pause(); player.seekTo(still); }
    };

    if (isReducedMotion() || isLowPerf()) {
      rest();
      return;
    }

    io = new IntersectionObserver(([e]) => {
      if (manual.current) return;
      if (e.isIntersecting) player.play();
      else player.pause();
    }, { threshold: 0.35 });
    io.observe(el);

    // Keep the invisible drag handle on top of the animated divider until the visitor grabs it.
    const onFrame = (e: { detail: { frame: number } }) => {
      if (manual.current || !posAt || !zone.current) return;
      zone.current.style.left = `${posAt(e.detail.frame) * 100}%`;
    };
    player.addEventListener("frameupdate", onFrame);
    window.addEventListener("perf:low", rest);

    return () => {
      io?.disconnect();
      player.removeEventListener("frameupdate", onFrame);
      window.removeEventListener("perf:low", rest);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [still, posAt]);

  function drag(e: PointerEvent<HTMLDivElement>) {
    if (!e.currentTarget.hasPointerCapture(e.pointerId) || !box.current) return;
    const r = box.current.getBoundingClientRect();
    take((e.clientX - r.left) / r.width);
  }

  function down(e: PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    drag(e);
  }

  function key(e: KeyboardEvent<HTMLDivElement>) {
    if (!posAt) return;
    const now = pos ?? posAt(ref.current?.getCurrentFrame() ?? still);
    const step = e.shiftKey ? 0.15 : 0.05;
    if (e.key === "ArrowLeft") take(now - step);
    else if (e.key === "ArrowRight") take(now + step);
    else if (e.key === "Home") take(0);
    else if (e.key === "End") take(1);
    else return;
    e.preventDefault();
  }

  const props = (posAt && pos !== null ? { ...(inputProps ?? {}), pos } : (inputProps ?? {})) as P;
  const shown = pos ?? (posAt ? posAt(still) : 0);

  return (
    <div ref={box} className="relative">
      <div role="img" aria-label={label}>
        <Player
          ref={ref}
          component={component}
          inputProps={props}
          durationInFrames={frames}
          fps={30}
          compositionWidth={width}
          compositionHeight={height}
          initialFrame={still}
          loop
          controls={false}
          clickToPlay={false}
          doubleClickToFullscreen={false}
          spaceKeyToPlayOrPause={false}
          acknowledgeRemotionLicense
          style={{ width: "100%", aspectRatio: `${width} / ${height}` }}
        />
      </div>

      {posAt && (
        <>
          <div
            ref={zone}
            role="slider"
            tabIndex={0}
            aria-label="Compare the spreadsheet with the jobs system"
            aria-orientation="horizontal"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(shown * 100)}
            onPointerDown={down}
            onPointerMove={drag}
            onKeyDown={key}
            className="absolute inset-y-0 w-16 -translate-x-1/2 cursor-ew-resize touch-none select-none -outline-offset-4"
            style={{ left: `${shown * 100}%` }}
          />
          {pos === null && (
            <span aria-hidden="true" className="hint pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-ink/80 px-3 py-1 text-xs text-paper">
              Drag the divider
            </span>
          )}
        </>
      )}
    </div>
  );
}