/**
 * A real-time port of the `flow-field` template from the `animations` generative-art
 * engine (Perlin-style value-noise angle field driving particle trails). The offline
 * Python version renders a bounded HDR clip and fades multiplicatively toward black
 * by design; this version runs forever in a browser tab, so trails fade toward the
 * live theme background color instead — everything else (multi-octave smoothstep
 * noise, particle respawn, age-indexed palette) is a direct port.
 */

export function createSeededRng(seed: number) {
  let a = seed >>> 0;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface OctaveGrid {
  gW: number;
  gH: number;
  scale: number;
  values: Float32Array;
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

export function buildFlowField(
  width: number,
  height: number,
  seed: number,
  noiseScale = 160,
  octaves = 3,
) {
  const rng = createSeededRng(seed);
  const grids: OctaveGrid[] = [];
  let scale = noiseScale;
  for (let o = 0; o < octaves; o++) {
    const gW = Math.max(2, Math.floor(width / scale) + 2);
    const gH = Math.max(2, Math.floor(height / scale) + 2);
    const values = new Float32Array(gW * gH);
    for (let i = 0; i < values.length; i++) values[i] = rng() * Math.PI * 2;
    grids.push({ gW, gH, scale, values });
    scale /= 2;
  }

  return function sampleAngle(x: number, y: number): number {
    let sum = 0;
    let totalAmp = 0;
    let amp = 1;
    for (const grid of grids) {
      const gx = x / grid.scale;
      const gy = y / grid.scale;
      const x0 = Math.min(Math.floor(gx), grid.gW - 2);
      const y0 = Math.min(Math.floor(gy), grid.gH - 2);
      const sx = smoothstep(gx - x0);
      const sy = smoothstep(gy - y0);
      const row0 = y0 * grid.gW;
      const row1 = (y0 + 1) * grid.gW;
      const v00 = grid.values[row0 + x0];
      const v01 = grid.values[row0 + x0 + 1];
      const v10 = grid.values[row1 + x0];
      const v11 = grid.values[row1 + x0 + 1];
      const v =
        v00 * (1 - sx) * (1 - sy) +
        v01 * sx * (1 - sy) +
        v10 * (1 - sx) * sy +
        v11 * sx * sy;
      sum += v * amp;
      totalAmp += amp;
      amp *= 0.5;
    }
    return sum / totalAmp;
  };
}

export type RGB = [number, number, number];
export type PaletteStop = [number, RGB];

export function buildPaletteLut(stops: PaletteStop[]): Uint8ClampedArray {
  const lut = new Uint8ClampedArray(256 * 3);
  for (let i = 0; i < 256; i++) {
    const t = i / 255;
    let lo = stops[0];
    let hi = stops[stops.length - 1];
    for (let s = 0; s < stops.length - 1; s++) {
      if (t >= stops[s][0] && t <= stops[s + 1][0]) {
        lo = stops[s];
        hi = stops[s + 1];
        break;
      }
    }
    const span = hi[0] - lo[0] || 1;
    const localT = (t - lo[0]) / span;
    for (let c = 0; c < 3; c++) {
      lut[i * 3 + c] = lo[1][c] + (hi[1][c] - lo[1][c]) * localT;
    }
  }
  return lut;
}

export const FLOW_PALETTES: Record<"mono" | "aurora", PaletteStop[]> = {
  aurora: [
    [0.0, [124, 58, 237]],
    [0.5, [255, 46, 146]],
    [1.0, [215, 255, 61]],
  ],
  mono: [
    [0.0, [200, 198, 194]],
    [0.65, [120, 118, 116]],
    [1.0, [255, 75, 18]],
  ],
};
