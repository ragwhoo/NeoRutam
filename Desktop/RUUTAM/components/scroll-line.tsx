"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const ScrollLine = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="fixed right-[10%] top-0 w-px h-screen pointer-events-none z-0">
      <motion.div
        className="w-full bg-[#fdffee]/30 origin-top"
        style={{ scaleY, height: "100%" }}
      />
    </div>
  );
};
