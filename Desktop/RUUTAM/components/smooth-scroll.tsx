"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

export const SmoothScroll = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    (window as any).__lenis = lenis;
    return () => {
      (window as any).__lenis = null;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
