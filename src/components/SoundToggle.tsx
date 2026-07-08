import { useSound } from "../hooks/useSound";
import { IconVolumeOff, IconVolumeOn } from "./icons";

export function SoundToggle() {
  const { enabled, toggle } = useSound();

  return (
    <button
      type="button"
      aria-pressed={enabled}
      aria-label={enabled ? "Mute interface sounds" : "Enable interface sounds"}
      title={enabled ? "Sound on" : "Sound off"}
      onClick={toggle}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors"
      style={{ borderColor: "var(--border-strong)", color: "var(--fg-muted)" }}
    >
      {enabled ? <IconVolumeOn className="h-3.5 w-3.5" /> : <IconVolumeOff className="h-3.5 w-3.5" />}
    </button>
  );
}
