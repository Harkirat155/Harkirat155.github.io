import { createContext, useCallback, useState, type ReactNode } from "react";

export type SoundKind = "click" | "tick" | "thud";

interface SoundContextValue {
  enabled: boolean;
  toggle: () => void;
  play: (kind: SoundKind) => void;
}

export const SoundContext = createContext<SoundContextValue | null>(null);

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext;
  if (!Ctor) return null;
  if (!audioCtx) audioCtx = new Ctor();
  if (audioCtx.state === "suspended") void audioCtx.resume();
  return audioCtx;
}

function tone(
  ctx: AudioContext,
  freq: number,
  duration: number,
  startDelay: number,
  peakGain: number,
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  const start = ctx.currentTime + startDelay;
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(peakGain, start + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

// Procedurally synthesized — zero audio-asset bundle cost. Every sound is a
// short, soft sine blip; nothing here is meant to be noticed unless you're
// listening for it.
function playSound(kind: SoundKind) {
  const ctx = getAudioContext();
  if (!ctx) return;
  if (kind === "click") {
    tone(ctx, 660, 0.09, 0, 0.05);
    tone(ctx, 880, 0.12, 0.045, 0.035);
  } else if (kind === "tick") {
    tone(ctx, 1200, 0.045, 0, 0.03);
  } else if (kind === "thud") {
    tone(ctx, 130, 0.16, 0, 0.06);
  }
}

function readInitialEnabled(): boolean {
  try {
    return localStorage.getItem("sound") === "on";
  } catch {
    return false;
  }
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(readInitialEnabled);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("sound", next ? "on" : "off");
      } catch {
        // sound just won't persist across visits — still works this session
      }
      // Constructing/resuming the AudioContext here — inside a real click
      // handler — is what satisfies the browser's autoplay-gesture policy.
      if (next) {
        getAudioContext();
        playSound("click");
      }
      return next;
    });
  }, []);

  const play = useCallback(
    (kind: SoundKind) => {
      if (!enabled) return;
      playSound(kind);
    },
    [enabled],
  );

  return <SoundContext.Provider value={{ enabled, toggle, play }}>{children}</SoundContext.Provider>;
}
