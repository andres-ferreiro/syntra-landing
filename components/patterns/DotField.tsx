"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

// Ported from react-bits' DotField (registry: @react-bits/DotField-JS-CSS)
// rather than pulled in via shadcn — this project doesn't use shadcn's
// project structure, and the effect needed retinting for the site's light
// palette anyway (the original ships a dark #1d1d1d→#000000 default). The
// cursor-following radial glow from the original is dropped — dots bulging
// on hover is the whole effect here, no separate glow shape.
interface Dot {
  ax: number;
  ay: number;
  sx: number;
  sy: number;
}

const TWO_PI = Math.PI * 2;

export function DotField({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 160,
  bulgeStrength = 40,
  sparkle = false,
  gradientFrom = "rgba(15, 122, 131, 0.35)",
  gradientTo = "rgba(34, 195, 209, 0.22)",
  className = "",
}: {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  bulgeStrength?: number;
  sparkle?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });
  const rafRef = useRef<number | undefined>(undefined);
  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });
  const engagement = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let resizeTimer: ReturnType<typeof setTimeout>;

    function buildDots(w: number, h: number) {
      const step = dotRadius + dotSpacing;
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      const dots: Dot[] = new Array(rows * cols);
      let idx = 0;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ax = padX + col * step + step / 2;
          const ay = padY + row * step + step / 2;
          dots[idx++] = { ax, ay, sx: ax, sy: ay };
        }
      }
      dotsRef.current = dots;
    }

    function drawStatic(w: number, h: number) {
      ctx!.clearRect(0, 0, w, h);
      const grad = ctx!.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, gradientFrom);
      grad.addColorStop(1, gradientTo);
      ctx!.fillStyle = grad;
      ctx!.beginPath();
      for (const d of dotsRef.current) {
        ctx!.moveTo(d.ax + dotRadius / 2, d.ay);
        ctx!.arc(d.ax, d.ay, dotRadius / 2, 0, TWO_PI);
      }
      ctx!.fill();
    }

    function doResize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h, offsetX: rect.left + window.scrollX, offsetY: rect.top + window.scrollY };
      buildDots(w, h);
      if (reduceMotion) drawStatic(w, h);
    }

    function resize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(doResize, 100);
    }

    doResize();
    window.addEventListener("resize", resize);

    // Static, non-interactive grid for reduced-motion users — no rAF loop,
    // no mouse tracking, no cursor bulge.
    if (reduceMotion) {
      return () => {
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", resize);
      };
    }

    function onMouseMove(e: MouseEvent) {
      const s = sizeRef.current;
      mouseRef.current.x = e.pageX - s.offsetX;
      mouseRef.current.y = e.pageY - s.offsetY;
    }

    function updateMouseSpeed() {
      const m = mouseRef.current;
      const dx = m.prevX - m.x;
      const dy = m.prevY - m.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      m.speed += (dist - m.speed) * 0.5;
      if (m.speed < 0.001) m.speed = 0;
      m.prevX = m.x;
      m.prevY = m.y;
    }

    const speedInterval = setInterval(updateMouseSpeed, 20);

    function tick() {
      const dots = dotsRef.current;
      const m = mouseRef.current;
      const { w, h } = sizeRef.current;
      const len = dots.length;

      const targetEngagement = Math.min(m.speed / 5, 1);
      engagement.current += (targetEngagement - engagement.current) * 0.06;
      if (engagement.current < 0.001) engagement.current = 0;
      const eng = engagement.current;

      ctx!.clearRect(0, 0, w, h);
      const grad = ctx!.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, gradientFrom);
      grad.addColorStop(1, gradientTo);
      ctx!.fillStyle = grad;

      const crSq = cursorRadius * cursorRadius;
      const rad = dotRadius / 2;

      ctx!.beginPath();
      for (let i = 0; i < len; i++) {
        const d = dots[i];
        const dx = m.x - d.ax;
        const dy = m.y - d.ay;
        const distSq = dx * dx + dy * dy;

        if (distSq < crSq && eng > 0.01) {
          const dist = Math.sqrt(distSq);
          const t = 1 - dist / cursorRadius;
          const push = t * t * bulgeStrength * eng;
          const angle = Math.atan2(dy, dx);
          d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
          d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
        } else {
          d.sx += (d.ax - d.sx) * 0.1;
          d.sy += (d.ay - d.sy) * 0.1;
        }

        const drawX = d.sx;
        const drawY = d.sy;

        if (sparkle) {
          const hash = ((i * 2654435761) ^ 0) >>> 0;
          const r = hash % 100 < 3 ? rad * 1.8 : rad;
          ctx!.moveTo(drawX + r, drawY);
          ctx!.arc(drawX, drawY, r, 0, TWO_PI);
        } else {
          ctx!.moveTo(drawX + rad, drawY);
          ctx!.arc(drawX, drawY, rad, 0, TWO_PI);
        }
      }
      ctx!.fill();

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearInterval(speedInterval);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [reduceMotion, dotRadius, dotSpacing, cursorRadius, bulgeStrength, sparkle, gradientFrom, gradientTo]);

  return (
    <div className={`relative h-full w-full ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
