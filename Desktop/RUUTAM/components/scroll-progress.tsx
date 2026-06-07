"use client";

import { useEffect, useState } from "react";

export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed right-0 top-0 z-50 h-full w-1.5 bg-gray-100">
      <div
        className="w-full transition-all duration-150"
        style={{
          height: `${progress}%`,
          background: "linear-gradient(to bottom, #E91E63, #D4AF37)",
        }}
      />
    </div>
  );
};
