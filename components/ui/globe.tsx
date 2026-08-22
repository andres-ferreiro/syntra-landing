"use client";

import { useEffect, useRef } from "react";
import createGlobe, { type COBEOptions } from "cobe";
import { useMotionValue, useSpring, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

// Vendored from Magic UI's Globe (https://magicui.design/docs/components/globe),
// following the same precedent as components/ui/animated-beam.tsx. Config is
// upstream's verbatim except `markerColor` (brand teal) and `markers`.
//
// IMPORTANT: this requires cobe 0.6.x — see package.json's pin. cobe 2.x
// silently renders the marker dots but NOT the continent dot-map, so the
// globe appears as a handful of floating dots with no sphere. It fails the
// same way under every config, including cobe's own dark preset, so it looks
// like a color-tuning problem and is not one. Do not upgrade cobe without
// checking the globe still draws.
const MOVEMENT_DAMPING = 1400;

// cobe's shipped types omit `onRender`, though the runtime requires it.
type GlobeOptions = COBEOptions & { onRender: (state: Record<string, unknown>) => void };

export const GLOBE_CONFIG: GlobeOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [0.059, 0.478, 0.514], // --color-accent-strong
  glowColor: [1, 1, 1],
  markers: [
    { location: [19.4326, -99.1332], size: 0.13 }, // Mexico City
    { location: [40.7128, -74.006], size: 0.12 }, // New York
    { location: [25.7617, -80.1918], size: 0.1 }, // Miami
    { location: [-23.5505, -46.6333], size: 0.12 }, // São Paulo
    { location: [4.711, -74.0721], size: 0.09 }, // Bogotá
    { location: [40.4168, -3.7038], size: 0.1 }, // Madrid
    { location: [51.5072, -0.1276], size: 0.09 }, // London
    { location: [-34.6037, -58.3816], size: 0.09 }, // Buenos Aires
    { location: [34.0522, -118.2437], size: 0.11 }, // Los Angeles
    { location: [20.6597, -103.3496], size: 0.08 }, // Guadalajara
    { location: [41.8781, -87.6298], size: 0.09 }, // Chicago
    { location: [29.7604, -95.3698], size: 0.09 }, // Houston
    { location: [43.6532, -79.3832], size: 0.08 }, // Toronto
    { location: [19.0414, -98.2063], size: 0.07 }, // Puebla
    { location: [25.6866, -100.3161], size: 0.08 }, // Monterrey
    { location: [-12.0464, -77.0428], size: 0.09 }, // Lima
    { location: [-33.4489, -70.6693], size: 0.09 }, // Santiago
    { location: [10.4806, -66.9036], size: 0.07 }, // Caracas
    { location: [41.3874, 2.1686], size: 0.08 }, // Barcelona
    { location: [38.7223, -9.1393], size: 0.07 }, // Lisbon
    { location: [48.8566, 2.3522], size: 0.08 }, // Paris
    { location: [41.9028, 12.4964], size: 0.07 }, // Rome
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: GlobeOptions;
}) {
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state: Record<string, unknown>) => {
        if (!pointerInteracting.current && !reduceMotion) phiRef.current += 0.005;
        state.phi = phiRef.current + rs.get();
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;
      },
    } as GlobeOptions);

    const timeout = setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 0);

    return () => {
      globe.destroy();
      clearTimeout(timeout);
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config, reduceMotion]);

  return (
    <div
      // No max-width here (upstream has one): callers size the globe by
      // sizing this element's parent, which keeps `cn()` — a plain string
      // join in this project, with no tailwind-merge — from emitting two
      // conflicting max-w classes.
      className={cn("absolute inset-0 mx-auto aspect-square w-full", className)}
    >
      <canvas
        className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
    </div>
  );
}
