import { useEffect, useRef, useCallback } from "react";
import { BallSettings } from "./types";
import { AnimationFunction } from "./config";

interface UseCanvasProps {
  settings: BallSettings;
  showDemoBall?: boolean;
  animate: AnimationFunction;
}

export function useCanvas({
  settings,
  showDemoBall = false,
  animate,
}: UseCanvasProps) {
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

    const animationLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      if (mouse.x > 0 && mouse.y > 0 && !showDemoBall) {
        animate(ctx, canvas, mouse, settings, particlesRef.current);
      }

      if (showDemoBall) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        animate(
          ctx,
          canvas,
          { x: centerX, y: centerY },
          settings,
          particlesRef.current
        );
      }

      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

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

      animationRef.current = requestAnimationFrame(animationLoop);
    };

    animationLoop();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [settings, showDemoBall, animate]);

  return { canvasRef };
}
