> ### ✅ RELEASE v1.0.0 — INTERACTIVE PROOF OF CONCEPT VERIFIED (`3/3` PASSING)
> **Status:** `v1.0.0` Live Proof of Concept • Zero-Float `Q16.16` • Zero-Flicker Steady Sky • Crisp WebAudio Piano  
> 
> **Release Highlights (Nov 2026):** Complete zero-dependency browser proof of concept (`node --test`: **3/3 passing** on ARM64 hardware). Every touch on the ultramarine night sky ignites a glowing star 🌟, advances a crisp WebAudio felt-piano arrangement of *Vincent* (*"Starry, Starry Night"*), and holistically awakens swirling impasto currents, a cadmium crescent moon, Saint-Rémy village rooftops, and a swaying foreground cypress.

# 🌟 Immersive Van Gogh Canvas — *Starry Night* & *Vincent* Interactive Proof of Concept

**A lightweight, zero-dependency interactive art proof of concept inspired by *Immersive Van Gogh* digital exhibitions, Vincent van Gogh's June 1889 masterpiece *The Starry Night* (held in the permanent collection of The Museum of Modern Art, MoMA, in New York City), and Don McLean's 1971 tribute song *"Vincent"* (*"Starry, Starry Night"*).**

[![License: MIT](https://shields.io)](LICENSE)
[![Status: Proof of Concept](https://shields.io)](#-project-scope--proof-of-concept-status)
[![Math: Q16.16 Fixed-Point](https://shields.io)](#-holistic-scene-evolution--q1616-swirl-physics)
[![Tests: 3/3 Passing](https://shields.io)](#-quickstart--verification)

---

## 🖼️ Historical Context: Saint-Rémy-de-Provence (June 1889) & MoMA

Vincent van Gogh painted ***The Starry Night*** (*De sterrennacht*) in **June 1889** while staying at the Saint-Paul-de-Mausole asylum in **Saint-Rémy-de-Provence**, southern France. Looking out from his east-facing window just before sunrise, Van Gogh blended direct observation of Venus (the bright "morning star") and the pre-dawn hills of the Alpilles with an imagined village spire and a dramatic, flame-like foreground cypress tree—uniting turbulent celestial eddies with quiet earthbound architecture through thick, rhythmic *impasto* brushwork.

Since **1941**, *The Starry Night* has been housed in the permanent collection of **The Museum of Modern Art (MoMA)** in New York City, where its swirling ultramarine sky and luminous cadmium-yellow halos continue to inspire modern digital projection installations and interactive audiovisual art.

---

## 🎯 Project Scope & Proof-of-Concept Status

This repository is intentionally built as a **simple, self-contained interactive proof of concept** (`v1.0.0`):
* **Zero External Assets or Bundlers:** Uses pure vanilla ES modules (`HTML5 Canvas` + `WebAudio API`) with zero `.mp3` files, zero `npm` dependencies, and zero frameworks.
* **Photosensitivity-Safe Steady Rendering:** Uses an opaque twilight sky gradient and smooth ease-in star blooms (`-webkit-tap-highlight-color: transparent`) so tapping keys never flashes or strobes the screen.
* **Touch-as-Piano Interaction:** Rather than playing a passive audio track, each tap acts like pressing a piano key—advancing the melody one note at a time while painting the sky in real time.

---

## 🎨 Custom Saint-Rémy *Starry Night* Impasto Palette

Every star halo, swirling wind ribbon, and horizon silhouette is mixed from a curated **6-pigment palette** modeled on Van Gogh's June 1889 brushwork:

| # | Pigment Name | Hex Code | Role in the Living Canvas |
| :- | :--- | :--- | :--- |
| **1** | **Ultramarine Night** | `#0b193d` | Deep nocturnal sky ground and upper zenith gradient. |
| **2** | **Prussian Swirl** | `#1b3b73` | Broad counter-rotating atmospheric currents across mid-sky. |
| **3** | **Cerulean Mist** | `#3b76b8` | Luminous cobalt-blue impasto ribbons bending around stars. |
| **4** | **Cadmium Starlight** | `#f7d046` | Radiant star cores, crescent moon glow, and warm cottage windows. |
| **5** | **Naples Halo** | `#fff1a8` | Concentric broken-brushstroke halos spinning gently around each star. |
| **6** | **Cypress Umber** | `#121d24` | Foreground Saint-Rémy village rooftops, church spire, and swaying cypress tree. |

---

## 🌀 Holistic Scene Evolution & `Q16.16` Swirl Physics (`Ledger 1` / `Ledger 2`)

All star coordinates, rotational vortex fields, and brush particle trajectories run deterministically in signed 32-bit **`Q16.16` fixed-point arithmetic** (`1.0 === 65536`, `Ledger 1`), while the WebAudio piano synthesizer and Canvas brushwork operate strictly as read-only presentation layers (`Ledger 2`):

1. **Stage I — First Stars (`Notes 1–7`):** Glowing cadmium stars bloom softly where you touch, surrounded by slowly rotating dashed Naples-yellow halos.
2. **Stage II — Celestial Impasto Currents (`Notes 8–15`):** Swirling Prussian and cerulean brushstroke streams awaken across the sky, curling around the rotational gravity wells of every star you placed.
3. **Stage III — Crescent Moon & Saint-Rémy Horizon (`Notes 16–22`):** A glowing crescent moon rises in the upper right while the Alpilles hills, church spire, and warm village windows emerge along the horizon.
4. **Stage IV — Towering Cypress & Full Living Canvas (`Notes 23–28+`):** A dark, undulating foreground cypress sweeps skyward—uniting earth and swirling starlight into a complete living painting.

---

## 📁 Repository Structure

```text
Immersive-Van-Gogh-Canvas/
├── index.html                    # Gallery-framed viewport, verse lyric HUD & piano/reset controls
├── style.css                     # Dark exhibition styling, tap-flash prevention & gold typography
├── package.json                  # Zero-dependency ESM manifest (`npm test` -> `node --test`)
├── LICENSE                       # MIT License
├── README.md                     # Historical context (Saint-Rémy & MoMA), palette & PoC guide
├── src/
│   ├── core.js                   # Zero-float Q16.16 fixed-point arithmetic & Mulberry32 PRNG
│   ├── gogh-palette.js           # 6-pigment Saint-Rémy palette & holistic 4-stage evolution thresholds
│   ├── gogh-kernel.js            # Q16.16 star nodes, vortex flow field & impasto dash trajectories (Ledger 1)
│   ├── gogh-audio.js             # Crisp WebAudio piano synthesizer & note-by-note "Vincent" sequencer (Ledger 2)
│   ├── gogh-renderer.js          # Zero-flicker 2D Canvas impasto brushstroke, halo & horizon renderer (Ledger 2)
│   └── gogh-app.js               # Touch/click/spacebar piano-star dispatcher & 60 Hz animation loop
└── test/
    └── gogh-kernel.test.mjs      # Built-in `node --test` suite verifying Q16.16 star & swirl determinism
```

---

## 🚀 Quickstart & Verification

```bash
# 1. Run deterministic Q16.16 star & swirl verification tests
node --test test/gogh-kernel.test.mjs

# 2. Launch locally in browser (Python or zero-dependency Node static server)
python3 -m http.server 8080
```

Open **`http://localhost:8080`** and tap across the ultramarine sky (or press `Spacebar`) to ignite stars and perform the opening verse of *Vincent* note by note.

---

## ⚠️ Governance, Provenance & License

* **Architecture:** Built on the zero-float `Q16.16` substrate and strict `Ledger 1` / `Ledger 2` separation from [`Borealiscodes/ndh-game-dev-kit`](https://github.com).
* **Author & License:** Borealis Serenity Hedling (`NDH-RESEARCH-PILOT` • Dublin, Ireland) • MIT License • `Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>`
