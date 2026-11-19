/**
 * test/gogh-kernel.test.mjs — Deterministic Q16.16 Star & Swirl Field Tests
 * Run: node --test test/gogh-kernel.test.mjs
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

import test from "node:test";
import assert from "node:assert/strict";

import { createGoghCanvasState, spawnStarAt, stepGoghSwirls } from "../src/gogh-kernel.js";

test("1. Initial Starry Night State & Deterministic Impasto Particles", () => {
  const s = createGoghCanvasState(0x18890619);
  assert.equal(s.stars.length, 0);
  assert.equal(s.particles.length, 120);
  assert.equal(s.stage.id, "FIRST_STARS");
});

test("2. Star Spawning & Holistic 4-Stage Evolution Progression", () => {
  let s = createGoghCanvasState();
  for (let i = 0; i < 24; i++) {
    s = spawnStarAt(s, 120 + i * 15, 110 + (i % 5) * 30, i);
  }
  assert.equal(s.stars.length, 24);
  assert.equal(s.notesPlayed, 24);
  assert.equal(s.stage.id, "CYPRESS_BLOOM");
});

test("3. Q16.16 Rotational Vortex Flow Step", () => {
  let s = createGoghCanvasState();
  s = spawnStarAt(s, 340, 220, 0);
  const next = stepGoghSwirls(s);
  assert.equal(next.tick, 1);
  assert.equal(next.particles.length, 120);
});
