"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

// A rotating particle-sphere — points scattered randomly (not evenly, like a
// Fibonacci lattice would) over a sphere surface and orthographically
// projected each frame, unlike this project's other globe (globe.tsx) which
// draws real continent data via cobe. Built for OrbitingCirclesGlobe's
// center piece: the upstream Shadcn Space demo centers a paywalled
// "ParticleSphereAnimation" whose source isn't public, so this is a
// from-scratch equivalent rather than a reuse of the site's map-globe, which
// reads as a different (branded/geographic) visual than the reference's
// abstract particle cloud.
//
// An even (Fibonacci) point spread reads as a mechanical dot-grid — visible
// diagonal banding once rotated — rather than an organic particle cloud, so
// points are placed with the Marsaglia method (uniform-random on a sphere)
// instead, each carrying its own random size/opacity jitter and a small
// chance of an accent color, so the result reads as scattered particles
// rather than a lattice.
interface SpherePoint {
  x: number;
  y: number;
  z: number;
  size: number;
  opacity: number;
  color: "muted" | "accent" | "mint" | "amber";
}

function randomSpherePoints(count: number): SpherePoint[] {
  const points: SpherePoint[] = [];
  for (let i = 0; i < count; i++) {
    const z = Math.random() * 2 - 1;
    const phi = Math.random() * Math.PI * 2;
    const radiusAtZ = Math.sqrt(1 - z * z);
    const roll = Math.random();
    points.push({
      x: radiusAtZ * Math.cos(phi),
      y: z,
      z: radiusAtZ * Math.sin(phi),
      size: 0.35 + Math.random() * 0.55,
      opacity: 0.25 + Math.random() * 0.35,
      color: roll < 0.08 ? "accent" : roll < 0.13 ? "mint" : roll < 0.17 ? "amber" : "muted",
    });
  }
  return points;
}

const POINT_COUNT = 3400;

export function ParticleSphere({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const points = randomSpherePoints(POINT_COUNT);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const style = getComputedStyle(document.documentElement);
    const palette = {
      muted: style.getPropertyValue("--color-ink-soft").trim(),
      accent: style.getPropertyValue("--color-accent").trim(),
      mint: style.getPropertyValue("--color-mint").trim(),
      amber: "#f59e0b",
    };
    let angle = 0;
    let raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) / 2;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      const projected = points.map((p) => ({
        x: p.x * cos - p.z * sin,
        y: p.y,
        z: p.x * sin + p.z * cos,
        size: p.size,
        opacity: p.opacity,
        color: p.color,
      }));
      // Back-to-front so nearer points draw over farther ones.
      projected.sort((a, b) => a.z - b.z);

      for (const p of projected) {
        if (p.z < -0.1) continue;
        const depth = (p.z + 1) / 2;
        const scale = (0.4 + depth * 0.6) * p.size;
        const px = cx + p.x * r;
        const py = cy - p.y * r;
        ctx.beginPath();
        ctx.arc(px, py, scale * dpr * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = palette[p.color];
        ctx.globalAlpha = p.opacity * (0.25 + depth * 0.6);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      if (!reduceMotion) angle += 0.0035;
      draw();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} className={className ?? "h-full w-full"} />;
}
