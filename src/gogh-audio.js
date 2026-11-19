/**
 * src/gogh-audio.js — Touch-as-Piano Felt-Hammer WebAudio Synthesizer (Ledger 2)
 * Advances note-by-note through a contemplative G-major piano arrangement
 * inspired by Don McLean's "Vincent" ("Starry, starry night...") on each touch.
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

// Opening verse melodic contour in G Major (Hz + accompanying lyric phrase)
export const VINCENT_MELODY_SEQUENCE = [
  // "Star-ry, star-ry night..."
  { freq: 392.00, bass: 196.00, phrase: "♪ Star-ry, star-ry night..." },       // G4
  { freq: 369.99, bass: 196.00, phrase: "♪ Star-ry, star-ry night..." },       // F#4
  { freq: 329.63, bass: 164.81, phrase: "♪ Star-ry, star-ry night..." },       // E4
  { freq: 293.66, bass: 146.83, phrase: "♪ Star-ry, star-ry night..." },       // D4
  { freq: 246.94, bass: 123.47, phrase: "♪ Star-ry, star-ry night..." },       // B3

  // "Paint your pal-ette blue and grey..."
  { freq: 246.94, bass: 164.81, phrase: "♪ Paint your pal-ette blue and grey..." }, // B3
  { freq: 293.66, bass: 164.81, phrase: "♪ Paint your pal-ette blue and grey..." }, // D4
  { freq: 329.63, bass: 164.81, phrase: "♪ Paint your pal-ette blue and grey..." }, // E4
  { freq: 369.99, bass: 185.00, phrase: "♪ Paint your pal-ette blue and grey..." }, // F#4
  { freq: 392.00, bass: 196.00, phrase: "♪ Paint your pal-ette blue and grey..." }, // G4
  { freq: 329.63, bass: 164.81, phrase: "♪ Paint your pal-ette blue and grey..." }, // E4
  { freq: 293.66, bass: 146.83, phrase: "♪ Paint your pal-ette blue and grey..." }, // D4

  // "Look out on a sum-mer's day..."
  { freq: 293.66, bass: 130.81, phrase: "♪ Look out on a sum-mer's day..." },   // D4
  { freq: 329.63, bass: 130.81, phrase: "♪ Look out on a sum-mer's day..." },   // E4
  { freq: 369.99, bass: 146.83, phrase: "♪ Look out on a sum-mer's day..." },   // F#4
  { freq: 392.00, bass: 196.00, phrase: "♪ Look out on a sum-mer's day..." },   // G4
  { freq: 440.00, bass: 220.00, phrase: "♪ Look out on a sum-mer's day..." },   // A4
  { freq: 392.00, bass: 196.00, phrase: "♪ Look out on a sum-mer's day..." },   // G4
  { freq: 369.99, bass: 185.00, phrase: "♪ Look out on a sum-mer's day..." },   // F#4

  // "With eyes that know the dark-ness in my soul..."
  { freq: 329.63, bass: 164.81, phrase: "♪ With eyes that know the dark-ness in my soul..." }, // E4
  { freq: 369.99, bass: 164.81, phrase: "♪ With eyes that know the dark-ness in my soul..." }, // F#4
  { freq: 392.00, bass: 196.00, phrase: "♪ With eyes that know the dark-ness in my soul..." }, // G4
  { freq: 440.00, bass: 220.00, phrase: "♪ With eyes that know the dark-ness in my soul..." }, // A4
  { freq: 493.88, bass: 246.94, phrase: "♪ With eyes that know the dark-ness in my soul..." }, // B4
  { freq: 440.00, bass: 220.00, phrase: "♪ With eyes that know the dark-ness in my soul..." }, // A4
  { freq: 392.00, bass: 196.00, phrase: "♪ With eyes that know the dark-ness in my soul..." }, // G4
  { freq: 369.99, bass: 146.83, phrase: "♪ With eyes that know the dark-ness in my soul..." }, // F#4
  { freq: 392.00, bass: 196.00, phrase: "♪ With eyes that know the dark-ness in my soul..." }, // G4
];

export function createGoghPianoAudio() {
  let muted = false; // Touching the canvas acts directly like pressing a piano key
  let ctx = null;
  let stepIndex = 0;

  const ensureCtx = () => {
    if (!ctx && typeof window !== "undefined") {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (Ctor) ctx = new Ctor();
    }
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    return ctx;
  };

  const playFeltPianoVoice = (freqHz, gainPeak, durationSec) => {
    const ac = ensureCtx();
    if (!ac) return;

    const now = ac.currentTime;
    const osc = ac.createOscillator();
    const overtone = ac.createOscillator();
    const filter = ac.createBiquadFilter();
    const gain = ac.createGain();

    // Warm felt-hammer piano timbre
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freqHz, now);

    overtone.type = "sine";
    overtone.frequency.setValueAtTime(freqHz * 2.0, now);

    const overGain = ac.createGain();
    overGain.gain.setValueAtTime(0.18, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1100, now);
    filter.frequency.exponentialRampToValueAtTime(340, now + durationSec);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(gainPeak, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    osc.connect(filter);
    overtone.connect(overGain);
    overGain.connect(filter);
    filter.connect(gain);
    gain.connect(ac.destination);

    osc.start(now);
    overtone.start(now);
    osc.stop(now + durationSec + 0.05);
    overtone.stop(now + durationSec + 0.05);
  };

  return {
    isMuted: () => muted,
    toggleMute: () => {
      muted = !muted;
      return muted;
    },
    resetMelody: () => {
      stepIndex = 0;
    },
    triggerNextNote: () => {
      const entry = VINCENT_MELODY_SEQUENCE[stepIndex % VINCENT_MELODY_SEQUENCE.length];
      const currentIdx = stepIndex;
      stepIndex++;

      if (!muted) {
        playFeltPianoVoice(entry.freq, 0.075, 1.9);
        playFeltPianoVoice(entry.bass, 0.032, 2.4);
      }

      return {
        noteIndex: currentIdx,
        phrase: entry.phrase,
      };
    },
  };
}
