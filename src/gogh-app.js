/**
 * src/gogh-app.js — Touch-as-Piano Star Dispatcher & 60 Hz Swirl Loop
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

import { ARENA_W, ARENA_H, createGoghCanvasState, spawnStarAt, stepGoghSwirls } from "./gogh-kernel.js";
import { createGoghPianoAudio } from "./gogh-audio.js";
import { renderGoghCanvas } from "./gogh-renderer.js";
import { VAN_GOGH_PALETTE } from "./gogh-palette.js";

const FIXED_DT_MS = 1000 / 60;

function initGoghStudio() {
  const canvas = document.getElementById("gogh-canvas");
  const ctx = canvas ? canvas.getContext("2d") : null;
  const piano = createGoghPianoAudio();

  const stageEl = document.getElementById("hud-stage");
  const countEl = document.getElementById("hud-stars");
  const phraseEl = document.getElementById("hud-phrase");
  const muteBtn = document.getElementById("btn-audio");

  let state = createGoghCanvasState();

  const primeNightSky = () => {
    if (!ctx) return;
    ctx.fillStyle = VAN_GOGH_PALETTE.ultramarineNight;
    ctx.fillRect(0, 0, ARENA_W, ARENA_H);
  };

  const syncHud = (customPhrase = null) => {
    if (stageEl) stageEl.textContent = state.stage.label;
    if (countEl) countEl.textContent = `Stars & Notes: ${state.notesPlayed}`;
    if (phraseEl) {
      phraseEl.textContent = customPhrase || state.stage.caption;
    }
  };

  primeNightSky();
  syncHud();

  const handleCanvasTouch = (clientX, clientY) => {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * ARENA_W;
    const y = ((clientY - rect.top) / rect.height) * ARENA_H;

    const noteOut = piano.triggerNextNote();
    state = spawnStarAt(state, x, y, noteOut.noteIndex);
    syncHud(noteOut.phrase);
  };

  canvas?.addEventListener("pointerdown", (ev) => {
    handleCanvasTouch(ev.clientX, ev.clientY);
  });

  // Keyboard support: Spacebar or Enter plays next star/note at a gentle harmonic coordinate
  window.addEventListener("keydown", (ev) => {
    if (ev.key === " " || ev.key === "Enter") {
      ev.preventDefault();
      const autoX = 80 + ((state.notesPlayed * 97) % (ARENA_W - 160));
      const autoY = 65 + ((state.notesPlayed * 61) % (ARENA_H - 170));
      const noteOut = piano.triggerNextNote();
      state = spawnStarAt(state, autoX, autoY, noteOut.noteIndex);
      syncHud(noteOut.phrase);
    }
  });

  muteBtn?.addEventListener("click", () => {
    const muted = piano.toggleMute();
    muteBtn.textContent = muted ? "Piano: Muted" : "Piano: Vincent (On)";
  });

  document.getElementById("btn-reset")?.addEventListener("click", () => {
    state = createGoghCanvasState();
    piano.resetMelody();
    primeNightSky();
    syncHud();
  });

  let lastTime = performance.now();
  let accumulator = 0;

  function loop(now) {
    accumulator += Math.min(100, now - lastTime);
    lastTime = now;

    while (accumulator >= FIXED_DT_MS) {
      state = stepGoghSwirls(state);
      accumulator -= FIXED_DT_MS;
    }

    if (ctx) renderGoghCanvas(ctx, state);
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

window.addEventListener("DOMContentLoaded", initGoghStudio);
