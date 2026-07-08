import { useEffect, useRef } from "react";
import { useTheme } from "../hooks/useTheme";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

interface FieldPoint {
  bx: number;
  by: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const SPACING = 46;
const RADIUS = 130;
const PUSH = 2.4;
const SPRING = 0.02;
const DAMPING = 0.86;

/**
 * A grid of points covering the viewport that the cursor physically disturbs —
 * pushed away on approach, spring back to rest. Same mechanic in both themes;
 * only the resolved token colors and dot scale differ (read once per theme
 * change, not per frame — canvas fillStyle can't take a live CSS var()).
 */
export function CursorField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rootStyle = getComputedStyle(document.documentElement);
    const restColor = rootStyle.getPropertyValue("--fg-muted").trim();
    const activeColor = rootStyle.getPropertyValue("--accent").trim();
    const dotRadius = theme === "aurora" ? 1.6 : 1.1;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: -9999, y: -9999 };
    let points: FieldPoint[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;

    function buildGrid() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;
      points = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const bx = col * SPACING;
          const by = row * SPACING;
          points.push({ bx, by, x: bx, y: by, vx: 0, vy: 0 });
        }
      }
    }

    function tick() {
      ctx!.clearRect(0, 0, width, height);

      for (const point of points) {
        const dx = point.x - pointer.x;
        const dy = point.y - pointer.y;
        const dist = Math.hypot(dx, dy);

        if (dist < RADIUS) {
          const force = (1 - dist / RADIUS) * PUSH;
          const angle = Math.atan2(dy, dx);
          point.vx += Math.cos(angle) * force;
          point.vy += Math.sin(angle) * force;
        }

        point.vx += (point.bx - point.x) * SPRING;
        point.vy += (point.by - point.y) * SPRING;
        point.vx *= DAMPING;
        point.vy *= DAMPING;
        point.x += point.vx;
        point.y += point.vy;

        const displacement = Math.hypot(point.x - point.bx, point.y - point.by);
        const t = Math.min(displacement / 18, 1);

        ctx!.beginPath();
        ctx!.fillStyle = t > 0.04 ? activeColor : restColor;
        ctx!.globalAlpha = t > 0.04 ? 0.35 + t * 0.5 : 1;
        ctx!.arc(point.x, point.y, dotRadius + t * dotRadius * 1.8, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      frame = requestAnimationFrame(tick);
    }

    function handlePointerMove(event: PointerEvent) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    }

    function relax() {
      pointer.x = -9999;
      pointer.y = -9999;
    }

    function handleVisibility() {
      if (document.visibilityState === "visible") {
        if (!frame) frame = requestAnimationFrame(tick);
      } else if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }

    buildGrid();
    frame = requestAnimationFrame(tick);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", buildGrid);
    window.addEventListener("blur", relax);
    document.addEventListener("pointerleave", relax);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", buildGrid);
      window.removeEventListener("blur", relax);
      document.removeEventListener("pointerleave", relax);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [theme, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: -1 }}
    />
  );
}
