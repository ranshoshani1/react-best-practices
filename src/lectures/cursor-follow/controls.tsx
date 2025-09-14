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
import { FollowType, ControlConfig, followTypes } from "./config";

interface SliderControlProps {
  control: ControlConfig;
  value: number;
  onValueChange: (value: number) => void;
}

function SliderControl({ control, value, onValueChange }: SliderControlProps) {
  if (control.type !== "slider") return null;
  
  return (
    <div className="flex flex-col gap-4">
      <label className="text-sm font-medium">
        {control.label}: {control.formatValue ? control.formatValue(value) : value}
      </label>
      <Slider
        value={[value]}
        onValueChange={(values) => onValueChange(values[0])}
        min={control.min || 0}
        max={control.max || 100}
        step={control.step || 1}
        className="w-full [&_[data-slot=slider-thumb]]:bg-slate-300"
      />
    </div>
  );
}

interface ColorControlProps {
  control: ControlConfig;
  value: string;
  onValueChange: (value: string) => void;
}

function ColorControl({ control, value, onValueChange }: ColorControlProps) {
  if (control.type !== "color") return null;
  
  return (
    <div className="space-y-5">
      <label className="text-sm font-medium">{control.label}</label>
      <input
        type="color"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="w-full h-10 cursor-pointer"
      />
    </div>
  );
}

interface ControlsProps {
  settings: BallSettings;
  onSettingsChange: (settings: BallSettings) => void;
  onToggle: () => void;
  selectedFollowType: string;
  onFollowTypeChange: (typeId: string) => void;
}

export function Controls({
  settings,
  onSettingsChange,
  onToggle,
  selectedFollowType,
  onFollowTypeChange,
}: ControlsProps) {
  const currentFollowType = followTypes.find(type => type.id === selectedFollowType);
  
  const updateSetting = (key: keyof BallSettings, value: number | string) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  const handleFollowTypeChange = (typeId: string) => {
    const followType = followTypes.find(type => type.id === typeId);
    if (followType) {
      onFollowTypeChange(typeId);
      onSettingsChange(followType.defaultSettings);
    }
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
          <h2 className="text-xl font-bold">Follow Controls</h2>
        </SidebarHeader>

        <SidebarContent className="p-6 space-y-7">
          <div className="space-y-4">
            <label className="text-sm font-medium">Follow Type</label>
            <div className="grid grid-cols-1 gap-2">
              {followTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={selectedFollowType === type.id ? "default" : "outline"}
                  onClick={() => handleFollowTypeChange(type.id)}
                  className="justify-start"
                >
                  {type.name}
                </Button>
              ))}
            </div>
          </div>

          {currentFollowType && (
            <>
              {currentFollowType.controls.map((control) => (
                <div key={control.key}>
                  {control.type === "slider" && (
                    <SliderControl
                      control={control}
                      value={settings[control.key] as number}
                      onValueChange={(value) => updateSetting(control.key, value)}
                    />
                  )}
                  {control.type === "color" && (
                    <ColorControl
                      control={control}
                      value={settings[control.key] as string}
                      onValueChange={(value) => updateSetting(control.key, value)}
                    />
                  )}
                </div>
              ))}

              <Button
                onClick={() => onSettingsChange(currentFollowType.defaultSettings)}
                variant="default"
                className="w-full"
              >
                Reset to Default
              </Button>
            </>
          )}
        </SidebarContent>
      </Sidebar>
    </>
  );
}
