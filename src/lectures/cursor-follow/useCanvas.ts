import { useEffect, useRef, useCallback } from "react";
import { BallSettings } from "./types";

interface UseCanvasProps {
  settings: BallSettings;
  showDemoBall?: boolean;
}

export function useCanvas({ settings, showDemoBall = false }: UseCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    }>
  >([]);

  const setMousePosition = useCallback((x: number, y: number) => {
    mouseRef.current = { x, y };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition(event.clientX - rect.left, event.clientY - rect.top);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [setMousePosition]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      if (mouse.x > 0 && mouse.y > 0 && !showDemoBall) {
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
          particlesRef.current.push({
            x: mouse.x,
            y: mouse.y,
            vx: (Math.random() - 0.5) * settings.particleSpeed,
            vy: (Math.random() - 0.5) * settings.particleSpeed,
            life: 1,
            maxLife: 1,
          });
        }
      }

      if (showDemoBall) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.save();
        ctx.globalCompositeOperation = "screen";

        const demoGradient = ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          settings.glowSize
        );
        demoGradient.addColorStop(
          0,
          `${settings.glowColor}${Math.floor(settings.glowIntensity * 255)
            .toString(16)
            .padStart(2, "0")}`
        );
        demoGradient.addColorStop(
          0.5,
          `${settings.glowColor}${Math.floor(settings.glowIntensity * 0.5 * 255)
            .toString(16)
            .padStart(2, "0")}`
        );
        demoGradient.addColorStop(1, `${settings.glowColor}00`);

        ctx.fillStyle = demoGradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, settings.glowSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        if (Math.random() < settings.particleCount / 100) {
          particlesRef.current.push({
            x: centerX,
            y: centerY,
            vx: (Math.random() - 0.5) * settings.particleSpeed,
            vy: (Math.random() - 0.5) * settings.particleSpeed,
            life: 1,
            maxLife: 1,
          });
        }
      }

      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Add gravity to make particles fall down
        particle.vy += 0.1;

        particle.life -= 1 / (settings.particleLife * 50);

        if (particle.life > 0) {
          ctx.save();
          ctx.globalAlpha = particle.life;
          ctx.fillStyle = settings.glowColor;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 3 * particle.life, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          return true;
        }
        return false;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [settings, showDemoBall]);

  return { canvasRef };
}
