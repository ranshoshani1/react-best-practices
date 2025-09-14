import { useEffect, useRef, useCallback } from "react";

interface GridPoint {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
}

export default function GravityBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const gridRef = useRef<GridPoint[][]>([]);

  const gridSize = 60;

  // Radius of gravity effect around the cursor
  const gravityStrength = 100;

  // Callback function to update mouse position
  // Memoized to prevent unnecessary re-renders
  const setMousePosition = useCallback((x: number, y: number) => {
    mouseRef.current = { x, y };
  }, []);

  // Effect to handle mouse movement and update cursor position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Get canvas bounds to calculate relative mouse position
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        // Convert global mouse coordinates to canvas-relative coordinates
        setMousePosition(event.clientX - rect.left, event.clientY - rect.top);
      }
    };

    // Add global mouse move listener
    window.addEventListener("mousemove", handleMouseMove);
    // Cleanup listener on unmount
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [setMousePosition]);

  // Main animation effect - handles canvas setup, grid generation, and animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Function to resize canvas and regenerate grid when window size changes
    const resizeCanvas = () => {
      // Set canvas dimensions to match window size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Calculate grid dimensions with extra padding to ensure full coverage
      const cols = Math.ceil(canvas.width / gridSize) + 2;
      const rows = Math.ceil(canvas.height / gridSize) + 2;

      // Initialize 2D grid array
      gridRef.current = [];
      for (let row = 0; row < rows; row++) {
        gridRef.current[row] = [];
        for (let col = 0; col < cols; col++) {
          // Create each grid point with initial positions
          gridRef.current[row][col] = {
            x: col * gridSize, // Current x position
            y: row * gridSize, // Current y position
            originalX: col * gridSize, // Original x position (never changes)
            originalY: row * gridSize, // Original y position (never changes)
          };
        }
      }
    };

    // Initial canvas setup
    resizeCanvas();
    // Listen for window resize events to maintain full coverage
    window.addEventListener("resize", resizeCanvas);

    // Main animation loop - runs at 60fps
    const animate = () => {
      // Clear entire canvas for fresh frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get current mouse position and grid reference
      const mouse = mouseRef.current;
      const grid = gridRef.current;

      // Set grid line appearance
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"; // Semi-transparent white lines
      ctx.lineWidth = 2; // Thin lines for subtle effect

      // Apply gravity effect to each grid point
      for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
          const point = grid[row][col];

          // Calculate distance from mouse to this grid point's original position
          const dx = mouse.x - point.originalX;
          const dy = mouse.y - point.originalY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Apply gravity effect if point is within gravity radius
          if (distance < gravityStrength && distance > 0) {
            // Calculate force strength (stronger when closer to cursor)
            const force = (gravityStrength - distance) / gravityStrength;
            // Calculate angle from point to mouse
            const angle = Math.atan2(dy, dx);

            // Move point toward mouse based on force and angle
            // Force * 20 determines maximum displacement
            point.x = point.originalX + Math.cos(angle) * force * 20;
            point.y = point.originalY + Math.sin(angle) * force * 20;
          } else {
            // Smoothly return point to original position when not affected by gravity
            // 0.1 is the "spring back" speed - higher values = faster return
            point.x += (point.originalX - point.x) * 0.1;
            point.y += (point.originalY - point.y) * 0.1;
          }
        }
      }

      // Render the distorted grid by drawing lines between adjacent points
      for (let row = 0; row < grid.length - 1; row++) {
        for (let col = 0; col < grid[row].length - 1; col++) {
          // Get the four corners of each grid cell
          const topLeft = grid[row][col];
          const topRight = grid[row][col + 1];
          const bottomLeft = grid[row + 1][col];
          const bottomRight = grid[row + 1][col + 1];

          // Draw the grid cell as a quadrilateral
          ctx.beginPath();
          ctx.moveTo(topLeft.x, topLeft.y);
          ctx.lineTo(topRight.x, topRight.y);
          ctx.lineTo(bottomRight.x, bottomRight.y);
          ctx.lineTo(bottomLeft.x, bottomLeft.y);
          ctx.closePath();
          ctx.stroke(); // Render the grid lines
        }
      }

      // Schedule next animation frame for smooth 60fps animation
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start the animation loop
    animate();

    // Cleanup function - remove event listeners and cancel animation
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Render the canvas element
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", // Fixed positioning to cover entire viewport
        top: 0, // Align to top of viewport
        left: 0, // Align to left of viewport
        width: "100vw", // Full viewport width
        height: "100vh", // Full viewport height
      }}
    />
  );
}
