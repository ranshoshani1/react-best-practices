import { useState } from "react";
import { useCanvas } from "./useCanvas";
import { Controls } from "./controls";
import { BallSettings } from "./types";
import { SidebarProvider } from "@/components/ui/sidebar";
import { followTypes, getAnimationFunction } from "./config";

export default function CursorFollow() {
  const [controlsOpen, setControlsOpen] = useState(false);
  const [selectedFollowType, setSelectedFollowType] = useState("glow");
  const [settings, setSettings] = useState<BallSettings>(() => {
    const defaultType = followTypes.find((type) => type.id === "glow");
    return (
      defaultType?.defaultSettings || {
        glowSize: 30,
        glowIntensity: 0.2,
        particleCount: 0,
        particleSpeed: 4,
        particleLife: 5,
        glowColor: "#3FE8FF",
      }
    );
  });

  const animationFunction = getAnimationFunction(selectedFollowType);

  const { canvasRef } = useCanvas({
    settings,
    showDemoBall: controlsOpen,
    animate: animationFunction || (() => {}),
  });

  const handleFollowTypeChange = (typeId: string) => {
    setSelectedFollowType(typeId);
    const followType = followTypes.find((type) => type.id === typeId);
    if (followType) {
      setSettings(followType.defaultSettings);
    }
  };

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
        selectedFollowType={selectedFollowType}
        onFollowTypeChange={handleFollowTypeChange}
      />
    </SidebarProvider>
  );
}
