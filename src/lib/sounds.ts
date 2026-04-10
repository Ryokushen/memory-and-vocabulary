/**
 * Sound effects using Web Audio API synthesis.
 * No audio files needed — all sounds generated programmatically.
 */

let audioCtx: AudioContext | null = null;

function getContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  // Resume if suspended (browser autoplay policy)
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  volume: number = 0.3,
  delay: number = 0,
) {
  const ctx = getContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.value = 0;

  osc.connect(gain);
  gain.connect(ctx.destination);

  const startTime = ctx.currentTime + delay;
  // Fade in
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.02);
  // Fade out
  gain.gain.setValueAtTime(volume, startTime + duration - 0.05);
  gain.gain.linearRampToValueAtTime(0, startTime + duration);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

// ── Sound effects ───────────────────────────────────────────────────────

/** Pleasant rising two-note chime for correct answers. */
export function playCorrect() {
  playTone(523.25, 0.12, "sine", 0.25); // C5
  playTone(659.25, 0.18, "sine", 0.25, 0.1); // E5
}

/** Satisfying three-note chime for streak correct (3+ in a row). */
export function playStreakCorrect() {
  playTone(523.25, 0.1, "sine", 0.2); // C5
  playTone(659.25, 0.1, "sine", 0.2, 0.08); // E5
  playTone(783.99, 0.2, "sine", 0.25, 0.16); // G5
}

/** Soft low tone for incorrect answers — not punishing, just informative. */
export function playIncorrect() {
  playTone(220, 0.2, "triangle", 0.15); // A3
  playTone(196, 0.25, "triangle", 0.12, 0.08); // G3
}

/** Triumphant ascending arpeggio for level up. */
export function playLevelUp() {
  playTone(523.25, 0.15, "sine", 0.2); // C5
  playTone(659.25, 0.15, "sine", 0.2, 0.12); // E5
  playTone(783.99, 0.15, "sine", 0.2, 0.24); // G5
  playTone(1046.5, 0.35, "sine", 0.3, 0.36); // C6
}

/** Warm resolution for session complete. */
export function playSessionComplete() {
  playTone(392, 0.2, "sine", 0.15); // G4
  playTone(493.88, 0.2, "sine", 0.15, 0.15); // B4
  playTone(587.33, 0.25, "sine", 0.2, 0.3); // D5
  playTone(783.99, 0.4, "sine", 0.2, 0.45); // G5
}

/** Subtle tick for UI interactions. */
export function playTick() {
  playTone(800, 0.04, "square", 0.06);
}

/** XP counting sound — rapid soft ticks. */
export function playXPTick() {
  playTone(1200, 0.03, "sine", 0.08);
}
