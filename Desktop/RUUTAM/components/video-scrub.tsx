"use client";

import { useRef, useEffect } from "react";

const TOTAL_FRAMES = 300;

const frameSrc = (i: number) =>
  `/ezgif-frames/ezgif-frame-${String(i).padStart(3, "0")}.png`;

export const HeroVideo = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cacheRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const cache: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      cache.push(img);
    }
    cacheRef.current = cache;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement!;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      const dpr = devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (idx: number) => {
      const img = cacheRef.current[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    draw(0);

    const update = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / (rect.height - window.innerHeight))
      );
      const idx = Math.round(progress * (TOTAL_FRAMES - 1));
      if (idx !== frameRef.current) {
        frameRef.current = idx;
        draw(idx);
      }
      rafId = requestAnimationFrame(update);
    };

    let rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative"
      style={{ height: `${TOTAL_FRAMES}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas ref={canvasRef} className="block h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
        <img src="/overlay.png" alt="" className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover" />
        <img src="/neowruta.png" alt="RUTAM" className="pointer-events-none absolute bottom-0 right-0 z-20 h-auto w-60 md:w-80" />
      </div>
    </section>
  );
};
