import { useEffect, useRef, useState } from "react";

const CANVAS_SIZE = 400;
const SCALE = 20;

type Coord = { x: number; y: number };

const colors = ["#FF3CAC", "#784BA0", "#2B86C5", "#FDC830", "#FF416C"];

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Coord[]>([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState<"Up" | "Down" | "Left" | "Right">("Right");
  const [food, setFood] = useState<Coord>({ x: 15, y: 15 });
  const [speed, setSpeed] = useState(200);

  // Control snake direction
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp": if (direction !== "Down") setDirection("Up"); break;
        case "ArrowDown": if (direction !== "Up") setDirection("Down"); break;
        case "ArrowLeft": if (direction !== "Right") setDirection("Left"); break;
        case "ArrowRight": if (direction !== "Left") setDirection("Right"); break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction]);

  // Game loop
  useEffect(() => {
    const interval = setInterval(() => {
      setSnake(prev => {
        const head = { ...prev[0] };
        switch (direction) {
          case "Up": head.y -= 1; break;
          case "Down": head.y += 1; break;
          case "Left": head.x -= 1; break;
          case "Right": head.x += 1; break;
        }

        // Wrap around canvas
        head.x = (head.x + CANVAS_SIZE / SCALE) % (CANVAS_SIZE / SCALE);
        head.y = (head.y + CANVAS_SIZE / SCALE) % (CANVAS_SIZE / SCALE);

        const newSnake = [head, ...prev];

        // Check if food eaten
        if (head.x === food.x && head.y === food.y) {
          setFood({
            x: Math.floor(Math.random() * (CANVAS_SIZE / SCALE)),
            y: Math.floor(Math.random() * (CANVAS_SIZE / SCALE)),
          });
          return newSnake;
        }

        newSnake.pop(); // remove tail
        return newSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [direction, food, speed]);

  // Draw snake + food
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * SCALE, food.y * SCALE, SCALE, SCALE);

    // Draw glowing rainbow snake
    snake.forEach((segment, idx) => {
      const color = colors[idx % colors.length];
      ctx.shadowBlur = 15;
      ctx.shadowColor = color;
      ctx.fillStyle = color;
      ctx.fillRect(segment.x * SCALE, segment.y * SCALE, SCALE, SCALE);
    });
  }, [snake, food]);

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <h1 className="text-2xl font-bold mb-4 text-white">Glowing Rainbow Snake</h1>
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="bg-black border-4 border-gray-800 rounded-lg"
      />
    </div>
  );
}
