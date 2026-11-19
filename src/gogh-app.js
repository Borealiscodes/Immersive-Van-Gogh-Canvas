import { ARENA_W, ARENA_H, createGoghCanvasState, spawnStarAt, stepGoghSwirls } from "./gogh-kernel.js";
import { createGoghPianoAudio } from "./gogh-audio.js";
import { renderGoghCanvas } from "./gogh-renderer.js";

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

  const syncHud = (customPhrase = null) => {
    if (stageEl) stageEl.textContent = state.stage.label;
    if (countEl) countEl.textContent = `Stars & Notes: ${state.notesPlayed}`;
    if (phraseEl) phraseEl.textContent = customPhrase || state.stage.caption;
  };

  syncHud();

  const handleCanvasInteract = (clientX, clientY) => {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * ARENA_W;
    const y = ((clientY - rect.top) / rect.height) * ARENA_H;

    const noteOut = piano.triggerNextNote();
    state = spawnStarAt(state, x, y, noteOut.noteIndex);
    syncHud(noteOut.phrase);
  };

  canvas?.addEventListener("pointerdown", (ev) => {
    ev.preventDefault();
    handleCanvasInteract(ev.clientX, ev.clientY);
  });

  muteBtn?.addEventListener("click", () => {
    const muted = piano.toggleMute();
    muteBtn.textContent = muted ? "Piano: Muted" : "Piano: Vincent (On)";
  });

  document.getElementById("btn-reset")?.addEventListener("click", () => {
    state = createGoghCanvasState();
    piano.resetMelody();
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
