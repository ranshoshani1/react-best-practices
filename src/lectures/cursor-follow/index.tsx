import { useState } from "react";
import { useCanvas } from "./useCanvas";
import { Controls } from "./controls";
import { BallSettings } from "./types";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function CursorFollow() {
  const [controlsOpen, setControlsOpen] = useState(false);
  const [settings, setSettings] = useState<BallSettings>({
    glowSize: 30,
    glowIntensity: 0.2,
    particleCount: 0,
    particleSpeed: 4,
    particleLife: 5,
    glowColor: "#3FE8FF",
  });

  const { canvasRef } = useCanvas({
    settings,
    showDemoBall: controlsOpen,
  });

  return (
    <SidebarProvider open={controlsOpen}>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          cursor: "default",
        }}
      />

      <Controls
        settings={settings}
        onSettingsChange={setSettings}
        onToggle={() => setControlsOpen((prev) => !prev)}
      />
    </SidebarProvider>
  );
}
