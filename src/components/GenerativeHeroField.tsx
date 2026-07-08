import { useEffect, useRef } from "react";
import { useTheme } from "../hooks/useTheme";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { buildFlowField, buildPaletteLut, createSeededRng, FLOW_PALETTES } from "../lib/flowField";

const SEED = 155;
const STEP_SIZE = 1.15;
const TRAIL_ALPHA = 0.55;
const RESTART_PROB = 0.0025;
const BG_FADE = 0.05;
const PARTICLES_PER_10K_PX = 0.9;
const MAX_PARTICLES = 700;

interface Particle {
  x: number;
  y: number;
  age: number;
}

/**
 * The hero's backdrop is a live port of the flow-field template from the
 * `animations` generative-art engine (see src/lib/flowField.ts) — this is the
 * one section of the site that IS the demo of that project, not a description
 * of it. Scoped to the hero's own box (not fixed/page-wide) and paused via
 * IntersectionObserver the moment it scrolls out of view.
 */
export function GenerativeHeroField() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || reducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const lut = buildPaletteLut(FLOW_PALETTES[theme]);

    let width = 0;
    let height = 0;
    let sampleAngle = (_x: number, _y: number) => 0;
    let particles: Particle[] = [];
    let rng = createSeededRng(SEED + 1000);
    let frame = 0;
    let running = false;

    function resize() {
      const rect = container!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, width, height);

      sampleAngle = buildFlowField(width, height, SEED);
      rng = createSeededRng(SEED + 1000);
      const count = Math.min(MAX_PARTICLES, Math.round(((width * height) / 10000) * PARTICLES_PER_10K_PX));
      particles = Array.from({ length: count }, () => ({
        x: rng() * width,
        y: rng() * height,
        age: rng(),
      }));
    }

    function tick() {
      // Fade toward transparent (not a solid color) so whatever sits behind the
      // canvas — the aurora blob glow, the flat mono paper — stays visible; the
      // flow field is an overlay of dissolving trails, not an opaque backdrop.
      ctx!.globalCompositeOperation = "destination-out";
      ctx!.globalAlpha = BG_FADE;
      ctx!.fillStyle = "#000";
      ctx!.fillRect(0, 0, width, height);
      ctx!.globalCompositeOperation = "source-over";
      ctx!.globalAlpha = 1;

      for (const particle of particles) {
        const angle = sampleAngle(particle.x, particle.y);
        particle.x += Math.cos(angle) * STEP_SIZE;
        particle.y += Math.sin(angle) * STEP_SIZE;
        particle.age = (particle.age + 0.0025) % 1;

        const outOfBounds =
          particle.x < 0 || particle.x >= width || particle.y < 0 || particle.y >= height;
        if (outOfBounds || rng() < RESTART_PROB) {
          particle.x = rng() * width;
          particle.y = rng() * height;
          particle.age = rng();
          continue;
        }

        const colorIndex = Math.min(255, Math.max(0, Math.round(particle.age * 255)));
        const r = lut[colorIndex * 3];
        const g = lut[colorIndex * 3 + 1];
        const b = lut[colorIndex * 3 + 2];
        ctx!.beginPath();
        ctx!.fillStyle = `rgb(${r} ${g} ${b})`;
        ctx!.globalAlpha = TRAIL_ALPHA;
        ctx!.arc(particle.x, particle.y, 1.1, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      frame = requestAnimationFrame(tick);
    }

    function start() {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    }

    function stop() {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    }

    resize();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && document.visibilityState === "visible") start();
        else stop();
      },
      { threshold: 0.05 },
    );
    observer.observe(container);

    function handleVisibility() {
      if (document.visibilityState !== "visible") stop();
    }
    document.addEventListener("visibilitychange", handleVisibility);

    let resizeTimer = 0;
    function handleResize() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 200);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(resizeTimer);
    };
  }, [theme, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div ref={containerRef} aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} />
    </div>
  );
}
