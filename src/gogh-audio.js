/**
 * src/gogh-audio.js — Touch-as-Piano Felt-Hammer WebAudio Synthesizer (Ledger 2)
 *
 * Signed-off-by: Borealis Serenity Hedling <chguard-sentinel@vaked.dev>
 */

export const VINCENT_MELODY_SEQUENCE = [
  // "Star-ry, star-ry night..."
  { freq: 392.00, bass: 196.00, phrase: "♪ Star-ry, star-ry night..." },
  { freq: 369.99, bass: 196.00, phrase: "♪ Star-ry, star-ry night..." },
  { freq: 329.63, bass: 164.81, phrase: "♪ Star-ry, star-ry night..." },
  { freq: 293.66, bass: 146.83, phrase: "♪ Star-ry, star-ry night..." },
  { freq: 246.94, bass: 123.47, phrase: "♪ Star-ry, star-ry night..." },

  // "Paint your pal-ette blue and grey..."
  { freq: 246.94, bass: 164.81, phrase: "♪ Paint your pal-ette blue and grey..." },
  { freq: 293.66, bass: 164.81, phrase: "♪ Paint your pal-ette blue and grey..." },
  { freq: 329.63, bass: 164.81, phrase: "♪ Paint your pal-ette blue and grey..." },
  { freq: 369.99, bass: 185.00, phrase: "♪ Paint your pal-ette blue and grey..." },
  { freq: 392.00, bass: 196.00, phrase: "♪ Paint your pal-ette blue and grey..." },
  { freq: 329.63, bass: 164.81, phrase: "♪ Paint your pal-ette blue and grey..." },
  { freq: 293.66, bass: 146.83, phrase: "♪ Paint your pal-ette blue and grey..." },

  // "Look out on a sum-mer's day..."
  { freq: 293.66, bass: 130.81, phrase: "♪ Look out on a sum-mer's day..." },
  { freq: 329.63, bass: 130.81, phrase: "♪ Look out on a sum-mer's day..." },
  { freq: 369.99, bass: 146.83, phrase: "♪ Look out on a sum-mer's day..." },
  { freq: 392.00, bass: 196.00, phrase: "♪ Look out on a sum-mer's day..." },
  { freq: 440.00, bass: 220.00, phrase: "♪ Look out on a sum-mer's day..." },
  { freq: 392.00, bass: 196.00, phrase: "♪ Look out on a sum-mer's day..." },
  { freq: 369.99, bass: 185.00, phrase: "♪ Look out on a sum-mer's day..." },

  // "With eyes that know the dark-ness in my soul..."
  { freq: 329.63, bass: 164.81, phrase: "♪ With eyes that know the dark-ness in my soul..." },
  { freq: 369.99, bass: 164.81, phrase: "♪ With eyes that know the dark-ness in my soul..." },
  { freq: 392.00, bass: 196.00, phrase: "♪ With eyes that know the dark-ness in my soul..." },
  { freq: 440.00, bass: 220.00, phrase: "♪ With eyes that know the dark-ness in my soul..." },
  { freq: 493.88, bass: 246.94, phrase: "♪ With eyes that know the dark-ness in my soul..." },
  { freq: 440.00, bass: 220.00, phrase: "♪ With eyes that know the dark-ness in my soul..." },
  { freq: 392.00, bass: 196.00, phrase: "♪ With eyes that know the dark-ness in my soul..." },
  { freq: 369.99, bass: 146.83, phrase: "♪ With eyes that know the dark-ness in my soul..." },
  { freq: 392.00, bass: 196.00, phrase: "♪ With eyes that know the dark-ness in my soul..." },
];

export function createGoghPianoAudio() {
  let muted = false;
  let ctx = null;
  let stepIndex = 0;

  const ensureCtx = () => {
    if (!ctx && typeof window !== "undefined") {
      const Ctor = window.AudioContext || window.webkitAudioContext;
      if (Ctor) ctx = new Ctor();
    }
    if (ctx && ctx.state === "suspended") {
      ctx.resume();
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
      if (!muted) ensureCtx();
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
        playFeltPianoVoice(entry.freq, 0.09, 1.9);
        playFeltPianoVoice(entry.bass, 0.04, 2.4);
      }

      return {
        noteIndex: currentIdx,
        phrase: entry.phrase,
      };
    },
  };
}
