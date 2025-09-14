import { BallSettings } from "./types";

export interface FollowType {
  id: string;
  name: string;
  defaultSettings: BallSettings;
  controls: ControlConfig[];
}

export interface ControlConfig {
  key: keyof BallSettings;
  label: string;
  type: "slider" | "color";
  min?: number;
  max?: number;
  step?: number;
  formatValue?: (value: number) => string;
}

export interface AnimationFunction {
  (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    mouse: { x: number; y: number },
    settings: BallSettings,
    particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    }>
  ): void;
}

export const followTypes: FollowType[] = [
  {
    id: "glow",
    name: "Glow Ball",
    defaultSettings: {
      glowSize: 30,
      glowIntensity: 0.2,
      particleCount: 0,
      particleSpeed: 4,
      particleLife: 5,
      glowColor: "#3FE8FF",
    },
    controls: [
      {
        key: "glowSize",
        label: "Glow Size",
        type: "slider",
        min: 20,
        max: 800,
        step: 1,
      },
      {
        key: "glowIntensity",
        label: "Glow Intensity",
        type: "slider",
        min: 0.1,
        max: 1,
        step: 0.01,
        formatValue: (value) => `${Math.round(value * 100)}%`,
      },
      {
        key: "particleCount",
        label: "Particle Count",
        type: "slider",
        min: 0,
        max: 400,
        step: 1,
      },
      {
        key: "particleSpeed",
        label: "Particle Speed",
        type: "slider",
        min: 1,
        max: 10,
        step: 1,
      },
      {
        key: "particleLife",
        label: "Particle Life",
        type: "slider",
        min: 1,
        max: 100,
        step: 1,
      },
      {
        key: "glowColor",
        label: "Glow Color",
        type: "color",
      },
    ],
  },
  {
    id: "trail",
    name: "Trail Effect",
    defaultSettings: {
      glowSize: 15,
      glowIntensity: 0.6,
      particleCount: 50,
      particleSpeed: 2,
      particleLife: 20,
      glowColor: "#FF6B6B",
    },
    controls: [
      {
        key: "glowSize",
        label: "Trail Size",
        type: "slider",
        min: 5,
        max: 100,
        step: 1,
      },
      {
        key: "glowIntensity",
        label: "Trail Opacity",
        type: "slider",
        min: 0.1,
        max: 1,
        step: 0.01,
        formatValue: (value) => `${Math.round(value * 100)}%`,
      },
      {
        key: "particleCount",
        label: "Trail Length",
        type: "slider",
        min: 10,
        max: 200,
        step: 1,
      },
      {
        key: "particleSpeed",
        label: "Trail Speed",
        type: "slider",
        min: 0.5,
        max: 5,
        step: 0.1,
      },
      {
        key: "particleLife",
        label: "Trail Duration",
        type: "slider",
        min: 10,
        max: 100,
        step: 1,
      },
      {
        key: "glowColor",
        label: "Trail Color",
        type: "color",
      },
    ],
  },
];

export const animationFunctions: Record<string, AnimationFunction> = {
  glow: (ctx, canvas, mouse, settings, particles) => {
    if (mouse.x > 0 && mouse.y > 0) {
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        settings.glowSize
      );
      gradient.addColorStop(
        0,
        `${settings.glowColor}${Math.floor(settings.glowIntensity * 255)
          .toString(16)
          .padStart(2, "0")}`
      );
      gradient.addColorStop(
        0.5,
        `${settings.glowColor}${Math.floor(settings.glowIntensity * 0.5 * 255)
          .toString(16)
          .padStart(2, "0")}`
      );
      gradient.addColorStop(1, `${settings.glowColor}00`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, settings.glowSize, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      if (Math.random() < settings.particleCount / 100) {
        particles.push({
          x: mouse.x,
          y: mouse.y,
          vx: (Math.random() - 0.5) * settings.particleSpeed,
          vy: (Math.random() - 0.5) * settings.particleSpeed,
          life: 1,
          maxLife: 1,
        });
      }
    }
  },
  trail: (ctx, canvas, mouse, settings, particles) => {
    if (mouse.x > 0 && mouse.y > 0) {
      if (Math.random() < settings.particleCount / 100) {
        particles.push({
          x: mouse.x,
          y: mouse.y,
          vx: (Math.random() - 0.5) * settings.particleSpeed,
          vy: (Math.random() - 0.5) * settings.particleSpeed,
          life: 1,
          maxLife: 1,
        });
      }
    }
  },
};

export function getFollowType(id: string): FollowType | undefined {
  return followTypes.find((type) => type.id === id);
}

export function getAnimationFunction(
  id: string
): AnimationFunction | undefined {
  return animationFunctions[id];
}
