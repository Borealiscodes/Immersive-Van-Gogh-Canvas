/**
 * src/gogh-palette.js — Custom 6-Pigment Saint-Rémy Palette & Holistic Evolution Stages
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

export const VAN_GOGH_PALETTE = {
  ultramarineNight: "#0b193d",
  prussianSwirl: "#1b3b73",
  ceruleanMist: "#3b76b8",
  cadmiumStarlight: "#f7d046",
  naplesHalo: "#fff1a8",
  cypressUmber: "#121d24",
};

export const SWIRL_BRUSH_COLORS = [
  "#1b3b73", // Prussian Swirl
  "#264f94", // Deep Cobalt Dash
  "#3b76b8", // Cerulean Mist
  "#5a9bd4", // Luminous Sky Stroke
  "#f7d046", // Cadmium Highlight Thread
];

export const EVOLUTION_STAGES = [
  {
    minNotes: 0,
    id: "FIRST_STARS",
    label: "Stage I: First Stars in the Twilight Sky",
    caption: "Touch anywhere on the canvas to ignite a star and play the opening notes of Vincent.",
  },
  {
    minNotes: 8,
    id: "CELESTIAL_SWIRLS",
    label: "Stage II: Celestial Impasto Currents",
    caption: "Swirling cobalt and cerulean brushstrokes awaken around the gravity of your stars.",
  },
  {
    minNotes: 16,
    id: "VILLAGE_AND_MOON",
    label: "Stage III: Crescent Moon & Saint-Rémy Horizon",
    caption: "A glowing cadmium crescent moon rises over quiet village rooftops and rolling hills.",
  },
  {
    minNotes: 23,
    id: "CYPRESS_BLOOM",
    label: "Stage IV: Flame Cypress & Full Living Canvas",
    caption: "The towering foreground cypress reaches skyward, uniting earth and swirling starlight.",
  },
];

export function getEvolutionStage(notesPlayed) {
  let active = EVOLUTION_STAGES[0];
  for (const st of EVOLUTION_STAGES) {
    if (notesPlayed >= st.minNotes) active = st;
  }
  return active;
}
