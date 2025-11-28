import { useEffect, useRef, useState } from "react";
import "./SnakeGame.css";
import snakeHead from "../assets/snake_head.png";
import eggImageSrc from "../assets/egg.png";

const CANVAS_SIZE = 500;
const SCALE = 20;

type Coord = { x: number; y: number };

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Game state
  const [snake, setSnake] = useState<Coord[]>([{ x: 10, y: 10 }]);
  const [direction, setDirection] =
    useState<"Up" | "Down" | "Left" | "Right">("Right");
  const [food, setFood] = useState<Coord>({ x: 15, y: 15 });
  const [speed] = useState(180);

  // Images
  const [snakeHeadImg, setSnakeHeadImg] = useState<HTMLImageElement | null>(null);
  const [eggImg, setEggImg] = useState<HTMLImageElement | null>(null);

  const [theme, setTheme] = useState("Tropical");

  // Load images
  useEffect(() => {
    const headImg = new Image();
    headImg.src = snakeHead;
    headImg.onload = () => setSnakeHeadImg(headImg);

    const egg = new Image();
    egg.src = eggImageSrc;
    egg.onload = () => setEggImg(egg);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          if (direction !== "Down") setDirection("Up");
          break;
        case "ArrowDown":
          e.preventDefault();
          if (direction !== "Up") setDirection("Down");
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (direction !== "Right") setDirection("Left");
          break;
        case "ArrowRight":
          e.preventDefault();
          if (direction !== "Left") setDirection("Right");
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction]);

  // Game movement loop
  useEffect(() => {
    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = { ...prev[0] };
        if (direction === "Up") head.y -= 1;
        if (direction === "Down") head.y += 1;
        if (direction === "Left") head.x -= 1;
        if (direction === "Right") head.x += 1;

        const max = CANVAS_SIZE / SCALE;
        head.x = (head.x + max) % max;
        head.y = (head.y + max) % max;

        const newSnake = [head, ...prev];

        // Food eaten
        if (head.x === food.x && head.y === food.y) {
          setFood({
            x: Math.floor(Math.random() * max),
            y: Math.floor(Math.random() * max),
          });
          return newSnake; // grow snake
        }

        newSnake.pop();
        return newSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [direction, food, speed]);

  // Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Background
    ctx.fillStyle = "#7EC850";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Border vines
    const vineColor = "#1B5E20";
    const vineWidth = 20;
    ctx.fillStyle = vineColor;
    ctx.fillRect(0, 0, CANVAS_SIZE, vineWidth);
    ctx.fillRect(0, CANVAS_SIZE - vineWidth, CANVAS_SIZE, vineWidth);
    ctx.fillRect(0, 0, vineWidth, CANVAS_SIZE);
    ctx.fillRect(CANVAS_SIZE - vineWidth, 0, vineWidth, CANVAS_SIZE);

    // Leaves
    ctx.fillStyle = "#43A047";
    for (let i = 0; i < CANVAS_SIZE; i += 30) {
      // Top
      ctx.beginPath();
      ctx.ellipse(i, vineWidth / 2, 8, 15, Math.PI / 4, 0, 2 * Math.PI);
      ctx.fill();
      // Bottom
      ctx.beginPath();
      ctx.ellipse(i, CANVAS_SIZE - vineWidth / 2, 8, 15, -Math.PI / 4, 0, 2 * Math.PI);
      ctx.fill();
      // Left
      ctx.beginPath();
      ctx.ellipse(vineWidth / 2, i, 15, 8, -Math.PI / 4, 0, 2 * Math.PI);
      ctx.fill();
      // Right
      ctx.beginPath();
      ctx.ellipse(CANVAS_SIZE - vineWidth / 2, i, 15, 8, Math.PI / 4, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Snake body (skip head)
    snake.forEach((seg, i) => {
      if (i === 0) return;
      ctx.fillStyle = `hsl(${(i * 60) % 360}, 70%, 50%)`;
      ctx.fillRect(seg.x * SCALE, seg.y * SCALE, SCALE, SCALE);
    });

    // Snake head
    const head = snake[0];
    if (snakeHeadImg) {
      const px = head.x * SCALE;
      const py = head.y * SCALE;

      ctx.save();
      ctx.translate(px + SCALE / 2, py + SCALE / 2);

      let angle = 0; // default right
      if (direction === "Up") angle = -Math.PI / 2;
      else if (direction === "Down") angle = Math.PI / 2;
      else if (direction === "Left") angle = Math.PI;

      ctx.rotate(angle);
      const headSize = SCALE * 1.5;
      ctx.drawImage(snakeHeadImg, -headSize / 2, -headSize / 2, headSize, headSize);
      ctx.restore();
    }

    // Draw egg (food)
    if (eggImg) {
      const eggSize = SCALE * 1.2;
      const eggX = food.x * SCALE + SCALE / 2 - eggSize / 2;
      const eggY = food.y * SCALE + SCALE / 2 - eggSize / 2;
      ctx.drawImage(eggImg, eggX, eggY, eggSize, eggSize);
    }

    // Theme2 flower
    if (theme === "Theme2") {
      const flowerX = CANVAS_SIZE - 30;
      const flowerY = 50;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(
          flowerX + Math.cos((i * 2 * Math.PI) / 5) * 15,
          flowerY + Math.sin((i * 2 * Math.PI) / 5) * 15,
          10,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = "pink";
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(flowerX, flowerY, 8, 0, 2 * Math.PI);
      ctx.fillStyle = "yellow";
      ctx.fill();
    }
  }, [snake, food, snakeHeadImg, eggImg, direction, theme]);

  return (
    <div className="snake-wrapper">
      <div className="game-content">
        <h1 className="title">Tropical Snake Game</h1>
        <canvas
          ref={canvasRef}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          style={{ border: "3px solid black" }}
        />
      </div>

      <div className="score">
        <h2>Eggs eaten: {snake.length - 1}</h2>
      </div>

      <div className="instructions">
        <div className="theme">
          <label htmlFor="theme-select">Select Theme:</label>
          <select
            id="theme-select"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="Tropical">Tropical</option>
            <option value="Theme2">Theme2</option>
            <option value="Theme3">Theme3</option>
          </select>
        </div>

        <h2>How to Play:</h2>
        <ul>
          <li>Use Arrow Keys to move the snake.</li>
          <li>Eat the egg to grow longer.</li>
          <li>Avoid running into yourself!</li>
        </ul>
      </div>
    </div>
  );
}
