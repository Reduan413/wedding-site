"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from "react";

// Fonts (--font-alex-brush, --font-cormorant) and color variables
// (--color-*) are now provided globally by layout.tsx + globals.css,
// so this component just references them instead of loading its own.
const COLORS = {
  paper: "var(--color-paper)",
  paperDeep: "var(--color-paper-deep)",
  ink: "var(--color-ink)",
  inkSoft: "var(--color-ink-soft)",
  wine: "var(--color-wine)",
  wineDeep: "var(--color-wine-deep)",
  gold1: "var(--color-gold-1)",
  gold2: "var(--color-gold-2)",
  gold3: "var(--color-gold-3)",
  blush: "var(--color-blush)",
} as const;

// Canvas drawing (gradients, fillStyle) needs resolved hex values, not
// CSS var() strings, so keep a parallel raw palette for paintFoil().
const RAW_COLORS = {
  gold1: "#F3CE7C",
  gold2: "#D19A3A",
  gold3: "#8A5E1B",
} as const;

const CONFETTI_COLORS = [COLORS.wine, COLORS.gold2, "#5B8C6A", "#5C7CB0", "#9B6FB0"];

type ConfettiKind = "heart" | "dash" | "dot";

interface ConfettiPiece {
  id: number;
  angle: number;
  distance: number;
  kind: ConfettiKind;
  size: number;
  rotate: number;
  color: string;
  delay: number;
  duration: number;
  fall: number;
}

interface Point {
  x: number;
  y: number;
}

interface ConfettiOrigin {
  x: number;
  y: number;
}

interface Dims {
  w: number;
  h: number;
}

function buildConfetti(count = 60): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = Math.random() * Math.PI * 2;
    // wide spread so the burst reaches the edges of the whole section
    const distance = 160 + Math.random() * 520;
    const kind: ConfettiKind =
      Math.random() < 0.3 ? "heart" : Math.random() < 0.65 ? "dash" : "dot";
    return {
      id: i,
      angle,
      distance,
      kind,
      size: kind === "dash" ? 10 + Math.random() * 12 : 5 + Math.random() * 6,
      rotate: Math.random() * 360,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: Math.random() * 280,
      duration: 1800 + Math.random() * 1200,
      // slight downward drift added on top of the radial burst
      fall: 40 + Math.random() * 80,
    };
  });
}

function Confetti({
  pieces,
  origin,
}: {
  pieces: ConfettiPiece[];
  origin: ConfettiOrigin | null;
}) {
  if (!origin) return null;
  return (
    <div className="pointer-events-none fixed inset-0 overflow-visible" style={{ zIndex: 50 }}>
      {pieces.map((p) => {
        const dx = Math.cos(p.angle) * p.distance;
        const dy = Math.sin(p.angle) * p.distance + p.fall;
        const style: React.CSSProperties & Record<string, string | number> = {
          left: origin.x,
          top: origin.y,
          "--dx": `${dx}px`,
          "--dy": `${dy}px`,
          animation: `confetti-burst ${p.duration}ms cubic-bezier(.15,.6,.25,1) ${p.delay}ms forwards`,
          position: "absolute",
        };
        if (p.kind === "heart") {
          return (
            <span key={p.id} style={{ ...style, fontSize: p.size + 4, color: p.color }}>
              ♥
            </span>
          );
        }
        if (p.kind === "dash") {
          return (
            <span
              key={p.id}
              style={{
                ...style,
                width: p.size,
                height: 2.5,
                background: p.color,
                borderRadius: 2,
                transform: `translate(-50%,-50%) rotate(${p.rotate}deg)`,
              }}
            />
          );
        }
        return (
          <span
            key={p.id}
            style={{
              ...style,
              width: p.size,
              height: p.size,
              background: p.color,
              borderRadius: "9999px",
            }}
          />
        );
      })}
    </div>
  );
}

export interface ScratchToRevealProps {
  coupleNames?: string;
  eventDate?: string;
  eventDay?: string;
  eventTime?: string;
  venue?: string;
}

export function ScratchToReveal({
  coupleNames = "Emma & Julian",
  eventDate = "June 30, 2026",
  eventDay = "Tuesday",
  eventTime = "10:00 AM",
  venue = "The Wildflower Garden",
}: ScratchToRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isScratching = useRef(false);
  const lastPoint = useRef<Point | null>(null);
  const rafPending = useRef(false);

  const [dims, setDims] = useState<Dims>({ w: 360, h: 230 });
  const [revealed, setRevealed] = useState(false);
  const [fading, setFading] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [confettiOrigin, setConfettiOrigin] = useState<ConfettiOrigin | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Responsive sizing
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = Math.round(entries[0].contentRect.width);
      setDims({ w, h: Math.round(w * 0.62) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const paintFoil = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.clearRect(0, 0, w, h);

    // base metallic gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, RAW_COLORS.gold1);
    grad.addColorStop(0.45, RAW_COLORS.gold2);
    grad.addColorStop(0.55, "#E4B45C");
    grad.addColorStop(1, RAW_COLORS.gold3);
    ctx.fillStyle = grad;
    roundRect(ctx, 0, 0, w, h, 18);
    ctx.fill();

    // diagonal shine
    ctx.save();
    roundRect(ctx, 0, 0, w, h, 18);
    ctx.clip();
    const shine = ctx.createLinearGradient(0, 0, w, h);
    shine.addColorStop(0, "rgba(255,255,255,0.28)");
    shine.addColorStop(0.15, "rgba(255,255,255,0.05)");
    shine.addColorStop(0.3, "rgba(255,255,255,0)");
    ctx.fillStyle = shine;
    ctx.fillRect(0, 0, w, h);

    // subtle foil noise texture
    for (let i = 0; i < 260; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = Math.random() * 1.1;
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.12})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // border hairline
    ctx.strokeStyle = "rgba(138,94,27,0.6)";
    ctx.lineWidth = 1;
    roundRect(ctx, 0.5, 0.5, w - 1, h - 1, 18);
    ctx.stroke();

    // label
    ctx.fillStyle = "rgba(255,247,232,0.92)";
    ctx.font = `${Math.max(13, w * 0.045)}px "Cormorant Garamond", serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.letterSpacing = "1px";
    ctx.fillText("✦ SCRATCH TO REVEAL ✦", w / 2, h / 2);
  }, []);

  function roundRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // (Re)draw foil whenever size changes or we reset
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dims.w === 0) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dims.w * dpr;
    canvas.height = dims.h * dpr;
    canvas.style.width = `${dims.w}px`;
    canvas.style.height = `${dims.h}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    paintFoil(ctx, dims.w, dims.h);
  }, [dims, paintFoil, revealed]);

  type PointerLikeEvent =
    | ReactMouseEvent<HTMLCanvasElement>
    | ReactTouchEvent<HTMLCanvasElement>;

  const getPoint = (e: PointerLikeEvent): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const isTouch = "touches" in e;
    const clientX = isTouch ? e.touches[0].clientX : (e as ReactMouseEvent).clientX;
    const clientY = isTouch ? e.touches[0].clientY : (e as ReactMouseEvent).clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const scratchAt = (ctx: CanvasRenderingContext2D, from: Point, to: Point) => {
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = Math.max(24, dims.w * 0.09);
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(to.x, to.y, ctx.lineWidth / 2, 0, Math.PI * 2);
    ctx.fill();
  };

  const checkRevealProgress = useCallback(() => {
    if (rafPending.current) return;
    rafPending.current = true;
    requestAnimationFrame(() => {
      rafPending.current = false;
      const canvas = canvasRef.current;
      if (!canvas || revealed) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const step = 6; // sample every Nth pixel for perf
      let transparent = 0;
      let total = 0;
      const w = canvas.width;
      const h = canvas.height;
      const data = ctx.getImageData(0, 0, w, h).data;
      for (let y = 0; y < h; y += step * dpr) {
        for (let x = 0; x < w; x += step * dpr) {
          const idx = (Math.floor(y) * w + Math.floor(x)) * 4;
          total++;
          if (data[idx + 3] < 80) transparent++;
        }
      }
      if (total > 0 && transparent / total > 0.52) {
        setFading(true);
        setTimeout(() => {
          const rect = cardRef.current?.getBoundingClientRect();
          setConfettiOrigin(
            rect
              ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
              : { x: window.innerWidth / 2, y: window.innerHeight / 2 }
          );
          setRevealed(true);
          setConfetti(buildConfetti());
        }, 420);
      }
    });
  }, [revealed]);

  const handleDown = (e: PointerLikeEvent) => {
    if (revealed) return;
    isScratching.current = true;
    const p = getPoint(e);
    lastPoint.current = p;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    scratchAt(ctx, p, p);
    checkRevealProgress();
  };

  const handleMove = (e: PointerLikeEvent) => {
    if (!isScratching.current || revealed) return;
    const p = getPoint(e);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !lastPoint.current) return;
    scratchAt(ctx, lastPoint.current, p);
    lastPoint.current = p;
    checkRevealProgress();
  };

  const handleUp = () => {
    isScratching.current = false;
  };

  const handleReset = () => {
    setRevealed(false);
    setFading(false);
    setConfetti([]);
    setConfettiOrigin(null);
    // repaint happens via effect on `revealed` change
  };

  return (
    <div
      className="flex  w-full items-center justify-center px-6 py-16"
      style={{
        background: `radial-gradient(ellipse at 50% 0%, ${COLORS.paperDeep} 0%, ${COLORS.paper} 60%)`,
        fontFamily: "var(--font-cormorant), serif",
      }}
    >
      <style>{`
        @keyframes confetti-burst {
          0% { transform: translate(-50%,-50%) scale(0.4); opacity: 0; }
          15% { opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1) rotate(180deg); opacity: 0; }
        }
        @keyframes drift-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes card-pop {
          0% { opacity: 0; transform: scale(0.94) translateY(6px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      <div className="w-full max-w-sm">
        <div className="mb-8 text-center" style={{ animation: "drift-in 0.6s ease both" }}>
          <p
            style={{
              fontFamily: "var(--font-alex-brush), cursive",
              fontSize: "clamp(2.4rem, 8vw, 3.2rem)",
              color: COLORS.wine,
              lineHeight: 1,
            }}
          >
            Scratch to Reveal
          </p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span style={{ height: 1, width: 64, background: `color-mix(in srgb, ${COLORS.wine} 33%, transparent)` }} />
            <span style={{ color: COLORS.blush, fontSize: 12 }}>♥</span>
            <span style={{ height: 1, width: 64, background: `color-mix(in srgb, ${COLORS.wine} 33%, transparent)` }} />
          </div>
        </div>

        <div ref={containerRef} className="relative mx-auto" style={{ height: dims.h }}>
          {/* Revealed invitation, sitting underneath the foil */}
          <div
            ref={cardRef}
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl px-6 text-center"
            style={{
              background: COLORS.paper,
              border: `1px solid color-mix(in srgb, ${COLORS.wine} 13%, transparent)`,
              boxShadow: "0 18px 40px -18px rgba(122,42,64,0.35)",
              animation: revealed ? "card-pop 0.5s cubic-bezier(.2,.8,.3,1) both" : "none",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-alex-brush), cursive",
                fontSize: 22,
                color: COLORS.wine,
              }}
            >
              You're Invited!
            </p>
            <p
              style={{
                fontFamily: "var(--font-alex-brush), cursive",
                fontSize: 17,
                color: COLORS.inkSoft,
                marginTop: -2,
              }}
            >
              {coupleNames}
            </p>
            <p
              style={{
                fontWeight: 600,
                fontSize: 21,
                color: COLORS.ink,
                marginTop: 6,
                letterSpacing: "0.02em",
              }}
            >
              {eventDate}
            </p>
            <p style={{ color: COLORS.wine, fontSize: 14.5, marginTop: 1 }}>{eventDay}</p>
            <p style={{ color: COLORS.inkSoft, fontSize: 13.5, marginTop: 2 }}>
              {eventTime} · {venue}
            </p>
          </div>

          {/* Scratch-off foil canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 touch-none rounded-2xl"
            style={{
              cursor: revealed ? "default" : "pointer",
              opacity: fading ? 0 : 1,
              transition: fading ? "opacity 0.42s ease" : "none",
              boxShadow: revealed ? "none" : "0 14px 30px -14px rgba(138,94,27,0.55)",
            }}
            onMouseDown={handleDown}
            onMouseMove={handleMove}
            onMouseUp={handleUp}
            onMouseLeave={handleUp}
            onTouchStart={handleDown}
            onTouchMove={handleMove}
            onTouchEnd={handleUp}
          />
        </div>

        <div className="mt-8 flex justify-center">
          {revealed ? (
            <button
              onClick={handleReset}
              className="rounded-full px-6 py-2 text-sm tracking-wide"
              style={{
                border: `1px solid color-mix(in srgb, ${COLORS.wine} 33%, transparent)`,
                color: COLORS.wine,
                fontFamily: "var(--font-cormorant), serif",
                background: "transparent",
              }}
            >
              Scratch again
            </button>
          ) : (
            <p style={{ color: COLORS.inkSoft, fontSize: 13, letterSpacing: "0.03em" }}>
              swipe your finger or mouse across the gold
            </p>
          )}
        </div>
      </div>

      {revealed && <Confetti pieces={confetti} origin={confettiOrigin} />}
    </div>
  );
}

export default ScratchToReveal;
