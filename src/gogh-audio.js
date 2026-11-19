export const VINCENT_MELODY_SEQUENCE = [
  { freq: 392.00, bass: 196.00, phrase: "♪ Star-ry, star-ry night..." },
  { freq: 369.99, bass: 196.00, phrase: "♪ Star-ry, star-ry night..." },
  { freq: 329.63, bass: 164.81, phrase: "♪ Star-ry, star-ry night..." },
  { freq: 293.66, bass: 146.83, phrase: "♪ Star-ry, star-ry night..." },
  { freq: 246.94, bass: 123.47, phrase: "♪ Star-ry, star-ry night..." },

  { freq: 246.94, bass: 164.81, phrase: "♪ Paint your pal-ette blue and grey..." },
  { freq: 293.66, bass: 164.81, phrase: "♪ Paint your pal-ette blue and grey..." },
  { freq: 329.63, bass: 164.81, phrase: "♪ Paint your pal-ette blue and grey..." },
  { freq: 369.99, bass: 185.00, phrase: "♪ Paint your pal-ette blue and grey..." },
  { freq: 392.00, bass: 196.00, phrase: "♪ Paint your pal-ette blue and grey..." },
  { freq: 329.63, bass: 164.81, phrase: "♪ Paint your pal-ette blue and grey..." },
  { freq: 293.66, bass: 146.83, phrase: "♪ Paint your pal-ette blue and grey..." },

  { freq: 293.66, bass: 130.81, phrase: "♪ Look out on a sum-mer's day..." },
  { freq: 329.63, bass: 130.81, phrase: "♪ Look out on a sum-mer's day..." },
  { freq: 369.99, bass: 146.83, phrase: "♪ Look out on a sum-mer's day..." },
  { freq: 392.00, bass: 196.00, phrase: "♪ Look out on a sum-mer's day..." },
  { freq: 440.00, bass: 220.00, phrase: "♪ Look out on a sum-mer's day..." },
  { freq: 392.00, bass: 196.00, phrase: "♪ Look out on a sum-mer's day..." },
  { freq: 369.99, bass: 185.00, phrase: "♪ Look out on a sum-mer's day..." },

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

  const playCrispPianoKey = (freqHz, gainPeak, durationSec) => {
    const ac = ensureCtx();
    if (!ac) return;

    const now = ac.currentTime;
    const fundamental = ac.createOscillator();
    const secondHarm = ac.createOscillator();
    const thirdHarm = ac.createOscillator();

    const g2 = ac.createGain();
    const g3 = ac.createGain();
    const filter = ac.createBiquadFilter();
    const env = ac.createGain();

    fundamental.type = "triangle";
    fundamental.frequency.setValueAtTime(freqHz, now);

    secondHarm.type = "sine";
    secondHarm.frequency.setValueAtTime(freqHz * 2.0, now);
    g2.gain.setValueAtTime(0.32, now);
    g2.gain.exponentialRampToValueAtTime(0.04, now + durationSec * 0.6);

    thirdHarm.type = "sine";
    thirdHarm.frequency.setValueAtTime(freqHz * 3.0, now);
    g3.gain.setValueAtTime(0.14, now);
    g3.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    // Bright hammer strike decaying smoothly into warm string resonance
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2800, now);
    filter.frequency.exponentialRampToValueAtTime(750, now + 0.35);

    // Snappy 4ms acoustic piano attack
    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(gainPeak, now + 0.004);
    env.gain.exponentialRampToValueAtTime(gainPeak * 0.45, now + 0.25);
    env.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    fundamental.connect(filter);
    secondHarm.connect(g2);
    g2.connect(filter);
    thirdHarm.connect(g3);
    g3.connect(filter);

    filter.connect(env);
    env.connect(ac.destination);

    fundamental.start(now);
    secondHarm.start(now);
    thirdHarm.start(now);

    const stopAt = now + durationSec + 0.05;
    fundamental.stop(stopAt);
    secondHarm.stop(stopAt);
    thirdHarm.stop(stopAt);
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
        playCrispPianoKey(entry.freq, 0.14, 1.45);
        playCrispPianoKey(entry.bass, 0.055, 1.85);
      }

      return {
        noteIndex: currentIdx,
        phrase: entry.phrase,
      };
    },
  };
}
