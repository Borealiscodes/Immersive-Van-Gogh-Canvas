import { fromQ16 } from "./core.js";
import { VAN_GOGH_PALETTE } from "./gogh-palette.js";

export function renderGoghCanvas(ctx, state) {
  const { width, height } = ctx.canvas;
  const notes = state.notesPlayed;

  const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
  skyGrad.addColorStop(0, "#08122e");
  skyGrad.addColorStop(0.55, VAN_GOGH_PALETTE.ultramarineNight);
  skyGrad.addColorStop(1, "#162d61");
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, width, height);

  ctx.lineCap = "round";
  for (const p of state.particles) {
    const x1 = fromQ16(p.prevXQ16);
    const y1 = fromQ16(p.prevYQ16);
    const x2 = fromQ16(p.xQ16);
    const y2 = fromQ16(p.yQ16);

    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.hypot(dx, dy);
    if (dist < 0.05 || dist > 28) continue;

    ctx.strokeStyle = p.color;
    ctx.lineWidth = p.width;
    ctx.beginPath();
    ctx.moveTo(x1 - dx * 4, y1 - dy * 4);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  if (notes >= 16) {
    const moonAlpha = Math.min(1, (notes - 15) * 0.16);
    const mx = width - 96;
    const my = 84;

    ctx.save();
    ctx.globalAlpha = moonAlpha;
    ctx.strokeStyle = VAN_GOGH_PALETTE.naplesHalo;
    ctx.lineWidth = 2.5;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.arc(mx, my, 46, state.tick * 0.006, state.tick * 0.006 + Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = VAN_GOGH_PALETTE.cadmiumStarlight;
    ctx.beginPath();
    ctx.arc(mx, my, 26, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#0b193d";
    ctx.beginPath();
    ctx.arc(mx - 10, my - 5, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  for (const star of state.stars) {
    const sx = fromQ16(star.xQ16);
    const sy = fromQ16(star.yQ16);
    const age = state.tick - star.birthTick;
    const bloom = Math.min(1, age / 45);

    ctx.fillStyle = "rgba(247, 208, 70, 0.08)";
    ctx.beginPath();
    ctx.arc(sx, sy, (24 + star.haloRings * 7) * bloom, 0, Math.PI * 2);
    ctx.fill();

    for (let ring = 1; ring <= star.haloRings; ring++) {
      const r = (11 + ring * 9) * bloom;
      const angle = state.tick * 0.008 * star.spinDirection * (ring % 2 === 0 ? -1 : 1);

      ctx.save();
      ctx.strokeStyle = ring === 1 ? VAN_GOGH_PALETTE.cadmiumStarlight : VAN_GOGH_PALETTE.naplesHalo;
      ctx.lineWidth = ring === 1 ? 2.4 : 1.7;
      ctx.setLineDash([7, 5]);
      ctx.beginPath();
      ctx.arc(sx, sy, r, angle, angle + Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    ctx.fillStyle = VAN_GOGH_PALETTE.cadmiumStarlight;
    ctx.beginPath();
    ctx.arc(sx, sy, star.coreRadius * bloom, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#fffbeb";
    ctx.beginPath();
    ctx.arc(sx, sy, star.coreRadius * 0.45 * bloom, 0, Math.PI * 2);
    ctx.fill();
  }

  if (notes >= 16) {
    const horizonAlpha = Math.min(1, (notes - 15) * 0.14);
    ctx.save();
    ctx.globalAlpha = horizonAlpha;

    ctx.fillStyle = "#16294a";
    ctx.beginPath();
    ctx.moveTo(0, height);
    for (let x = 0; x <= width; x += 20) {
      const y = height - 68 - Math.sin(x * 0.007) * 22 - Math.cos(x * 0.015) * 10;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = VAN_GOGH_PALETTE.cypressUmber;
    ctx.fillRect(0, height - 42, width, 42);

    ctx.beginPath();
    ctx.moveTo(width * 0.56, height - 42);
    ctx.lineTo(width * 0.575, height - 115);
    ctx.lineTo(width * 0.59, height - 42);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = VAN_GOGH_PALETTE.cadmiumStarlight;
    const windows = [190, 235, 310, 445, 510];
    for (const wx of windows) {
      ctx.fillRect(wx, height - 28, 6, 8);
    }
    ctx.restore();
  }

  if (notes >= 23) {
    const cypressAlpha = Math.min(1, (notes - 22) * 0.18);
    ctx.save();
    ctx.globalAlpha = cypressAlpha;
    ctx.fillStyle = VAN_GOGH_PALETTE.cypressUmber;

    const baseX = 112;
    const sway = Math.sin(state.tick * 0.015) * 5;

    ctx.beginPath();
    ctx.moveTo(baseX - 34, height);
    ctx.bezierCurveTo(baseX - 44, height * 0.65, baseX - 18 + sway, height * 0.35, baseX + sway * 1.4, 54);
    ctx.bezierCurveTo(baseX + 22 + sway, height * 0.36, baseX + 42, height * 0.68, baseX + 34, height);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
