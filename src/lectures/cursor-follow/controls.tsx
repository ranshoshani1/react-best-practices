import { BallSettings } from "./types";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface SliderControlProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  formatValue?: (value: number) => string;
}

function SliderControl({
  label,
  value,
  onValueChange,
  min,
  max,
  step,
  formatValue,
}: SliderControlProps) {
  return (
    <div className="flex flex-col gap-4">
      <label className="text-sm font-medium">
        {label}: {formatValue ? formatValue(value) : value}
      </label>
      <Slider
        value={[value]}
        onValueChange={(values) => onValueChange(values[0])}
        min={min}
        max={max}
        step={step}
        className="w-full [&_[data-slot=slider-thumb]]:bg-slate-300"
      />
    </div>
  );
}

interface ControlsProps {
  settings: BallSettings;
  onSettingsChange: (settings: BallSettings) => void;
  onToggle: () => void;
}

export function Controls({
  settings,
  onSettingsChange,
  onToggle,
}: ControlsProps) {
  const updateSetting = (key: keyof BallSettings, value: number | string) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <>
      <SidebarTrigger className="fixed top-6 right-5 z-50" onClick={onToggle}>
        <Button variant="outline" size="lg">
          <Settings className="mr-2 h-4 w-4" />
          Controls
        </Button>
      </SidebarTrigger>

      <Sidebar side="right">
        <SidebarHeader className="flex items-center justify-between p-6 border-b border-sidebar-border">
          <h2 className="text-xl font-bold">Ball Controls</h2>
        </SidebarHeader>

        <SidebarContent className="p-6 space-y-7">
          <SliderControl
            label="Glow Size"
            value={settings.glowSize}
            onValueChange={(value) => updateSetting("glowSize", value)}
            min={20}
            max={800}
            step={1}
          />

          <SliderControl
            label="Glow Intensity"
            value={settings.glowIntensity}
            onValueChange={(value) => updateSetting("glowIntensity", value)}
            min={0.1}
            max={1}
            step={0.01}
            formatValue={(value) => `${Math.round(value * 100)}%`}
          />

          <SliderControl
            label="Particle Count"
            value={settings.particleCount}
            onValueChange={(value) => updateSetting("particleCount", value)}
            min={0}
            max={400}
            step={1}
          />

          <SliderControl
            label="Particle Speed"
            value={settings.particleSpeed}
            onValueChange={(value) => updateSetting("particleSpeed", value)}
            min={1}
            max={10}
            step={1}
          />

          <SliderControl
            label="Particle Life"
            value={settings.particleLife}
            onValueChange={(value) => updateSetting("particleLife", value)}
            min={1}
            max={100}
            step={1}
          />

          <div className="space-y-5">
            <label className="text-sm font-medium">Glow Color</label>
            <input
              type="color"
              value={settings.glowColor}
              onChange={(e) => updateSetting("glowColor", e.target.value)}
              className="w-full h-10 cursor-pointer"
            />
          </div>

          <Button
            onClick={() =>
              onSettingsChange({
                glowSize: 100,
                glowIntensity: 0.8,
                particleCount: 20,
                particleSpeed: 4,
                particleLife: 5,
                glowColor: "#3FE8FF",
              })
            }
            variant="default"
            className="w-full"
          >
            Reset to Default
          </Button>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
