"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Gallery = () => {
  const [videos, setVideos] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/content/gallery.json")
      .then((r) => r.json())
      .then((d) => setVideos(d.body || []))
      .catch(() => {});
  }, []);

  if (!videos.length) return null;

  const total = videos.length;
  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <section id="gallery" className="bg-[#365F37] pl-43 py-24">
      <div className="max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-left"
        >
          <span className="mb-3 block text-xs font-medium tracking-[0.25em] uppercase text-[#fdffee]/70">
            In Action
          </span>
          <h2 className="text-[clamp(3.5rem,10vw,10rem)] font-black leading-[0.85] tracking-[-0.04em] text-[#fdffee]">
            Gallery
          </h2>
          <p className="mt-6 max-w-2xl text-sm tracking-[0.15em] uppercase text-[#fdffee]/70">
            Watch the traditional wood-pressing process in action
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          <div className="aspect-video overflow-hidden rounded-xl bg-black/20">
            <video
              key={current}
              src={`/videos/${videos[current]}`}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-contain"
            />
          </div>

          <div className="mt-6 flex items-center justify-center gap-6">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#fdffee]/20 text-[#fdffee] transition-colors hover:bg-[#365F37]/50"
              aria-label="Previous video"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <span className="text-sm text-[#fdffee]/60">
              {current + 1} / {total}
            </span>

            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#fdffee]/20 text-[#fdffee] transition-colors hover:bg-[#365F37]/50"
              aria-label="Next video"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {videos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-6 bg-[#fdffee]" : "w-2 bg-[#fdffee]/30"
                }`}
                aria-label={`Go to video ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
