import { toQ16, fromQ16, createSeededRng } from "./core.js";
import { SWIRL_BRUSH_COLORS, getEvolutionStage } from "./gogh-palette.js";

export const ARENA_W = 680;
export const ARENA_H = 480;

export function createGoghCanvasState(seed = 0x18890619) {
  const rng = createSeededRng(seed);
  const particles = Array.from({ length: 120 }, (_, i) => {
    const x = rng() % ARENA_W;
    const y = rng() % (ARENA_H - 60);
    return {
      id: i,
      xQ16: toQ16(x),
      yQ16: toQ16(y),
      prevXQ16: toQ16(x),
      prevYQ16: toQ16(y),
      color: SWIRL_BRUSH_COLORS[i % SWIRL_BRUSH_COLORS.length],
      width: 2.5 + (rng() % 3),
      life: 60 + (rng() % 90),
    };
  });

  return {
    tick: 0,
    notesPlayed: 0,
    stars: [],
    particles,
    stage: getEvolutionStage(0),
    rng,
  };
}

export function spawnStarAt(state, x, y, noteIndex = 0) {
  const clampedX = Math.max(24, Math.min(ARENA_W - 24, x));
  const clampedY = Math.max(24, Math.min(ARENA_H - 72, y));
  const nextNotes = state.notesPlayed + 1;

  const newStar = {
    id: nextNotes,
    xQ16: toQ16(clampedX),
    yQ16: toQ16(clampedY),
    coreRadius: 5.5 + (noteIndex % 3) * 1.2,
    haloRings: 2 + (noteIndex % 2),
    spinDirection: (nextNotes & 1) === 0 ? 1 : -1,
    birthTick: state.tick,
  };

  return {
    ...state,
    notesPlayed: nextNotes,
    stars: [...state.stars, newStar],
    stage: getEvolutionStage(nextNotes),
  };
}

export function stepGoghSwirls(state) {
  const tick = state.tick + 1;
  const swirlStrength = Math.min(1.0, 0.35 + state.notesPlayed * 0.035);

  const nextParticles = state.particles.map((p) => {
    let x = fromQ16(p.xQ16);
    let y = fromQ16(p.yQ16);
    const prevXQ16 = p.xQ16;
    const prevYQ16 = p.yQ16;

    let vx = (1.1 + Math.sin(y * 0.018 + tick * 0.012) * 0.8) * swirlStrength;
    let vy = Math.cos(x * 0.014 + tick * 0.01) * 0.7 * swirlStrength;

    for (const star of state.stars) {
      const sx = fromQ16(star.xQ16);
      const sy = fromQ16(star.yQ16);
      const dx = x - sx;
      const dy = y - sy;
      const distSq = dx * dx + dy * dy;

      if (distSq > 36 && distSq < 16900) {
        const dist = Math.sqrt(distSq);
        const pull = ((130 - dist) / 130) * 1.5 * star.spinDirection;
        vx += (-dy / dist) * pull;
        vy += (dx / dist) * pull;
      }
    }

    x += vx;
    y += vy;
    let life = p.life - 1;

    if (life <= 0 || x < 0 || x > ARENA_W || y < 0 || y > ARENA_H - 45) {
      x = state.rng() % ARENA_W;
      y = state.rng() % (ARENA_H - 55);
      const resetX = toQ16(x);
      const resetY = toQ16(y);
      return {
        ...p,
        xQ16: resetX,
        yQ16: resetY,
        prevXQ16: resetX,
        prevYQ16: resetY,
        life: 65 + (state.rng() % 85),
      };
    }

    return {
      ...p,
      xQ16: toQ16(x),
      yQ16: toQ16(y),
      prevXQ16,
      prevYQ16,
      life,
    };
  });

  return {
    ...state,
    tick,
    particles: nextParticles,
  };
}
