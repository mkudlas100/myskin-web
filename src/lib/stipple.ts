// Ilustrace „z teček pigmentu“ – generuje se při buildu, výstup je statické SVG.
// Hustota teček napodobuje pudrovou techniku: řidší začátek, hustší konec.
// Tečka = nulová úsečka s kulatým zakončením (krátký zápis „M x y h0“).

export type StippleShape = 'brow' | 'lips' | 'liner';

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

type Band = { top: number; bottom: number; d: (v: number) => number };
type ShapeDef = {
  w: number; h: number; count: number; seed: number; maxThick: number;
  x: (t: number) => number;
  bands: (t: number) => Band[];
  along: (t: number) => number; // hustota podél tvaru
  sizes: number[]; // průměry teček
  outline?: string;
};

const shapes: Record<StippleShape, ShapeDef> = {
  brow: {
    w: 600, h: 170, count: 3000, seed: 7, maxThick: 58, sizes: [1.9, 2.6, 3.4],
    x: (t) => 26 + 556 * t,
    bands: (t) => {
      const peak = 0.63;
      let yc: number, th: number;
      if (t <= peak) {
        yc = 122 - 66 * Math.sin((t / peak) * Math.PI / 2);
        th = 58 - 16 * (t / peak);
      } else {
        const u = (t - peak) / (1 - peak);
        yc = 56 + 40 * Math.pow(u, 1.4);
        th = 42 * Math.pow(1 - u, 1.2) + 1.2;
      }
      if (t < 0.08) th *= Math.sqrt(1 - Math.pow(1 - t / 0.08, 2));
      // horní hrana měkká, dolní ostřejší
      return [{ top: yc - th * 0.55, bottom: yc + th * 0.45, d: (v) => 0.35 + 0.65 * smooth(0, 0.45, v) }];
    },
    along: (t) => 0.06 + 0.94 * smooth(0.0, 0.55, t),
  },
  lips: {
    w: 300, h: 130, count: 1900, seed: 11, maxThick: 40, sizes: [1.5, 2.1, 2.8],
    x: (t) => 36 + 228 * t,
    bands: (t) => {
      const s = 2 * t - 1;
      const a = Math.abs(s);
      const mouth = 60 + 5 * Math.exp(-Math.pow(s / 0.35, 2)) - 2 * s * s;
      const upper = Math.pow(1 - s * s, 0.6) * (25 + 11 * Math.exp(-Math.pow((a - 0.27) / 0.17, 2))) - 9 * Math.exp(-Math.pow(s / 0.09, 2));
      const lower = 40 * Math.pow(1 - s * s, 0.65);
      const edge = (v: number) => 0.3 + 0.7 * Math.max(smooth(0.4, 0, v), smooth(0.6, 1, v));
      return [
        { top: mouth - upper, bottom: mouth - 1.6, d: edge },
        { top: mouth + 1.6, bottom: mouth + lower, d: edge },
      ];
    },
    along: (t) => 0.45 + 0.55 * smooth(0, 0.18, t) * smooth(1, 0.82, t),
  },
  liner: {
    w: 300, h: 120, count: 1100, seed: 5, maxThick: 12, sizes: [1.3, 1.8, 2.3],
    x: (t) => (t <= 0.8 ? 24 + 206 * (t / 0.8) : 230 + 52 * ((t - 0.8) / 0.2)),
    bands: (t) => {
      let yc: number, th: number;
      if (t <= 0.8) {
        const u = t / 0.8;
        yc = 86 - 44 * Math.sin(Math.PI * u);
        th = 1.4 + 9 * Math.pow(u, 1.5);
      } else {
        const u = (t - 0.8) / 0.2;
        yc = 86 - 36 * u;
        th = 10.4 * (1 - u) + 0.8;
      }
      return [{ top: yc - th * 0.8, bottom: yc + th * 0.2, d: () => 1 }];
    },
    along: (t) => 0.6 + 0.4 * smooth(0, 0.6, t),
    outline: 'M24 86Q127 118 230 86',
  },
};

export function stipple(name: StippleShape, amount = 1) {
  const def = { ...shapes[name], count: Math.round(shapes[name].count * amount) };
  const rand = rng(def.seed);
  const opac = [0.55, 0.78, 1];
  const groups = def.sizes.flatMap((size) => opac.map((o) => ({ size, o, d: '' })));
  let n = 0;
  let tries = 0;
  while (n < def.count && tries < def.count * 60) {
    tries++;
    const t = rand();
    const bands = def.bands(t);
    const band = bands[Math.floor(rand() * bands.length)];
    const thick = band.bottom - band.top;
    if (thick <= 0.3) continue;
    // hustota na plochu: tenká místa dostanou méně teček
    if (rand() > thick / def.maxThick) continue;
    const v = rand();
    if (rand() > def.along(t) * band.d(v)) continue;
    const x = def.x(t) + (rand() - 0.5) * 2.4;
    const y = band.top + v * thick + (rand() - 0.5) * 2.4;
    const g = groups[Math.floor(rand() * groups.length)];
    g.d += `M${Math.round(x)} ${Math.round(y)}h0`;
    n++;
  }
  return { w: def.w, h: def.h, groups: groups.filter((g) => g.d), outline: def.outline };
}
