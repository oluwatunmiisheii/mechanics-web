import { FadeContainer, FadeDiv, FadeSpan } from "./fade";
import { useEffect, useRef } from "react";

type Grid = { alive: boolean; opacity: number }[][];

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const cellSize = 6;
    const cols = Math.floor(canvas.width / cellSize);
    const rows = Math.floor(canvas.height / cellSize);
    const transitionSpeed = 0.2; // Controls fade speed

    let grid: Grid = Array(rows)
      .fill(null)
      .map(() =>
        Array(cols)
          .fill(null)
          .map(() => ({
            alive: Math.random() > 0.85,
            opacity: Math.random() > 0.85 ? 0.5 : 0,
          }))
      );

    const countNeighbors = (grid: Grid, x: number, y: number): number => {
      let sum = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          const row = (x + i + rows) % rows;
          const col = (y + j + cols) % cols;
          sum += grid[row][col].alive ? 1 : 0;
        }
      }
      sum -= grid[x][y].alive ? 1 : 0;
      return sum;
    };

    const draw = () => {
      ctx.fillStyle = "#F9FAFB";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update opacities
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const cell = grid[i][j];
          if (cell.alive && cell.opacity < 1) {
            cell.opacity = Math.min(cell.opacity + transitionSpeed, 0.5);
          } else if (!cell.alive && cell.opacity > 0) {
            cell.opacity = Math.max(cell.opacity - transitionSpeed, 0);
          }

          if (cell.opacity > 0) {
            ctx.fillStyle = `rgba(0, 0, 0, ${cell.opacity})`;
            ctx.beginPath();
            ctx.arc(
              j * cellSize + cellSize / 2,
              i * cellSize + cellSize / 2,
              1,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
        }
      }

      const next = grid.map((row, i) =>
        row.map((cell, j) => {
          const neighbors = countNeighbors(grid, i, j);
          const willBeAlive = cell.alive
            ? neighbors >= 2 && neighbors <= 3
            : neighbors === 3;
          return {
            alive: willBeAlive,
            opacity: cell.opacity,
          };
        })
      );

      grid = next;
      setTimeout(() => {
        animationFrameId = requestAnimationFrame(draw);
      }, 125);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section aria-label="hero">
      <FadeContainer className="relative flex flex-col items-center justify-center">
        <FadeDiv className="mx-auto">
          <a
            aria-label="View latest update the changelog page"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto w-full"
          >
            <div className="inline-flex max-w-full items-center gap-3 rounded-full bg-white/5 px-2.5 py-0.5 pr-3 pl-0.5 font-medium text-gray-900 ring-1 shadow-lg shadow-orange-400/20 ring-black/10 filter backdrop-blur-[1px] transition-colors hover:bg-orange-500/[2.5%] focus:outline-hidden sm:text-sm">
              <span className="shrink-0 truncate rounded-full border bg-gray-50 px-2.5 py-1 text-sm text-gray-600 sm:text-xs">
                News
              </span>
              <span className="flex items-center gap-1 truncate">
                <span className="w-full truncate">
                  Smart Irrigation System Launch
                </span>

                {/* <RiArrowRightUpLine className="size-4 shrink-0 text-gray-700" /> */}
              </span>
            </div>
          </a>
        </FadeDiv>
        <h1 className="mt-8 text-center text-5xl font-semibold tracking-tighter text-gray-900 sm:text-8xl sm:leading-[5.5rem]">
          <FadeSpan>Autonomy</FadeSpan> <FadeSpan>for</FadeSpan>
          <br />
          <FadeSpan>every</FadeSpan> <FadeSpan>Farm</FadeSpan>
        </h1>
        <p className="mt-5 max-w-xl text-center text-base text-balance text-gray-700 sm:mt-8 sm:text-xl">
          <FadeSpan>Revolutionizing agriculture with AI-powered</FadeSpan>{" "}
          <FadeSpan>sensors, drones, and automation for</FadeSpan>{" "}
          <FadeSpan>sustainable and efficient farming.</FadeSpan>
        </p>
        <FadeDiv>
          <a
            className="mt-6 inline-flex cursor-pointer flex-row items-center justify-center gap-1 rounded-md border-b-[1.5px] border-orange-700 bg-linear-to-b from-orange-400 to-orange-500 px-5 py-3 leading-4 font-medium tracking-wide whitespace-nowrap text-white shadow-[0_0_0_2px_rgba(0,0,0,0.04),0_0_14px_0_rgba(255,255,255,0.19)] transition-all duration-200 ease-in-out hover:shadow-orange-300"
            href="#"
          >
            Automate now
          </a>
        </FadeDiv>
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="mask pointer-events-none overflow-hidden select-none">
            <canvas ref={canvasRef} width={1500} height={600} />
          </div>
        </div>
      </FadeContainer>
    </section>
  );
}
