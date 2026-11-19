> ### 🏗️ UNDER CONSTRUCTION — IMMERSIVE VAN GOGH AUDIOVISUAL CANVAS (PRE-ALPHA)
> **Status:** Active Scaffolding & Impasto Swirl Prototyping • Zero-Float `Q16.16` • Zero Dependencies  

# 🌟 Immersive Van Gogh Canvas — Touch-to-Piano *Starry Night* & Living Impasto Studio

**An interactive, *Immersive Van Gogh* exhibition-inspired browser experience where every touch on the twilight sky ignites a glowing star 🌟, plays the next felt-piano note of *Vincent* (*"Starry, Starry Night"*), and holistically awakens swirling impasto currents, rolling Saint-Rémy hills, and flame-like cypress silhouettes.**

[![License: MIT](https://shields.io)](LICENSE)
[![Runtime: Zero-Bundler ESM](https://shields.io)](#-repository-scaffolding)
[![Math: Q16.16 Fixed-Point](https://shields.io)](#-holistic-scene-evolution--q1616-swirl-physics)

---

## 🎨 Custom Saint-Rémy *Starry Night* Impasto Palette

Every star halo, swirling wind ribbon, and horizon silhouette is mixed from a curated **6-pigment palette** modeled on Vincent van Gogh's 1889 Saint-Rémy brushwork:

| # | Pigment Name | Hex Code | Role in the Living Canvas |
| :- | :--- | :--- | :--- |
| **1** | **Ultramarine Night** | `#0b193d` | Deep nocturnal sky ground and upper zenith wash. |
| **2** | **Prussian Swirl** | `#1b3b73` | Broad counter-rotating atmospheric currents across mid-sky. |
| **3** | **Cerulean Mist** | `#3b76b8` | Luminous cobalt-blue impasto ribbons bending around stars. |
| **4** | **Cadmium Starlight** | `#f7d046` | Radiant star cores, crescent moon glow, and warm highlights. |
| **5** | **Naples Halo** | `#fff1a8` | Concentric broken-brushstroke halos spinning around each touched star. |
| **6** | **Cypress Umber** | `#121d24` | Foreground Saint-Rémy village rooftops, church spire, and flame cypress tree. |

---

## 🎹 Touch-as-Piano *Vincent* Melody Mechanic (`Ledger 2`)

Instead of passive background music, **you perform the melody at your own contemplative pace**:
* **One Touch = One Star + One Piano Note:** Tapping anywhere on the night sky spawns a luminous star at your fingertip and triggers the next note of an original felt-piano arrangement inspired by Don McLean's *Vincent* (*"Starry, starry night / Paint your palette blue and grey..."*).
* **Warm Felt-Hammer Synthesis:** Built with native WebAudio API (`triangle` fundamental + soft `sine` octave overtone + low-pass felt damping), requiring zero external MP3 or WAV files.
* **Gentle Lyric & Phrase Whispers:** Subtle phrase captions accompany your progression through the opening verse as the painting comes alive.

---

## 🌀 Holistic Scene Evolution & `Q16.16` Swirl Physics (`Ledger 1`)

All star coordinates, rotational vortex fields, and ribbon trajectories run deterministically in signed 32-bit **`Q16.16` fixed-point arithmetic** (`1.0 === 65536`), unlocking four holistic visual layers as you play through the verse:

1. **Stage I — First Stars (`Notes 1–7`):** Individual golden stars bloom where you touch, surrounded by rotating broken-dash impasto halos.
2. **Stage II — Celestial Wind Currents (`Notes 8–15`):** Swirling cerulean and Prussian blue brushstroke streams awaken across the sky, curving dynamically around the gravity wells of every star you placed.
3. **Stage III — Crescent Moon & Village Horizon (`Notes 16–22`):** A glowing cadmium crescent moon rises in the upper right while quiet Saint-Rémy hills and warm cottage windows emerge below.
4. **Stage IV — Towering Cypress & Full Surrealist Bloom (`Notes 23–28+`):** A dark, undulating cypress tree sweeps upward across the foreground—uniting earth and swirling sky into a living, breathing impressionist canvas.

---

## 📁 Repository Scaffolding

```text
Immersive-Van-Gogh-Canvas/
├── index.html                    # Full-bleed gallery viewport, verse phrase HUD & audio/reset controls
├── style.css                     # Exhibition-frame dark aesthetic & warm cadmium-gold typography
├── package.json                  # Zero-dependency ESM manifest (`npm test` -> `node --test`)
├── LICENSE                       # MIT License
├── README.md                     # Palette specification, piano-star mechanic & scaffolding
├── src/
│   ├── core.js                   # Zero-float Q16.16 fixed-point arithmetic & deterministic Mulberry32 PRNG
│   ├── gogh-palette.js           # 6-pigment Saint-Rémy palette & holistic 4-stage evolution thresholds
│   ├── gogh-kernel.js            # Q16.16 star nodes, vortex flow field & impasto dash trajectories (Ledger 1)
│   ├── gogh-audio.js             # Felt-piano WebAudio synthesizer & note-by-note "Vincent" sequencer (Ledger 2)
│   ├── gogh-renderer.js          # Layered 2D Canvas impasto brushstroke, halo & horizon renderer (Ledger 2)
│   └── gogh-app.js               # Touch/click piano-star dispatcher & 60 Hz swirl animation loop
└── test/
    └── gogh-kernel.test.mjs      # Built-in `node --test` suite verifying Q16.16 star & swirl determinism
```

---

## 🛠️ Build Roadmap (`v0.1` → `v1.0`)

* **`v0.1` (Star Touch & *Vincent* Felt-Piano Sequencer):** Touch/click star spawning paired with note-by-note WebAudio felt-piano playback (`Ledger 1` / `Ledger 2` split).
* **`v0.2` (`Q16.16` Impasto Vortex Currents):** Swirling cerulean and Prussian brushstroke ribbons that curve around player-placed stars.
* **`v0.3` (Holistic Horizon & Cypress Emergence):** Progressive appearance of the glowing crescent moon, Saint-Rémy village lights, and undulating foreground cypress tree.
* **`v1.0` (Full Gallery Exhibition Loop & Test Suite):** Seamless verse looping, custom palette highlights, and `node --test` deterministic verification.

---

## ⚠️ Governance, Provenance & License

* **Architecture:** Built on the zero-float `Q16.16` fixed-point substrate and strict `Ledger 1` / `Ledger 2` separation from [`Borealiscodes/ndh-game-dev-kit`](https://github.com).
* **Author & License:** Borealis Serenity Hedling (`NDH-RESEARCH-PILOT` • Dublin, Ireland) • MIT License • `Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>`
