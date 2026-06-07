"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AboutData {
  subtitle: string;
  storyText: string;
  videoSrc: string;
}

export const About = () => {
  const [data, setData] = useState<AboutData | null>(null);

  useEffect(() => {
    fetch("/content/about.json")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data) return null;

  const paragraphs = data.storyText.split("\n\n").filter(Boolean);

  return (
    <section id="about" className="bg-[#365F37] pl-43 py-24">
      <div className="max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-left"
        >
          <span className="mb-3 block text-xs font-medium tracking-[0.25em] uppercase text-[#fdffee]/70">
            Our Story
          </span>
          <h2 className="text-[clamp(3.5rem,10vw,10rem)] font-black leading-[0.85] tracking-[-0.04em] text-[#fdffee]">
            About
          </h2>
          <p className="mt-6 max-w-2xl text-sm tracking-[0.15em] uppercase text-[#fdffee]/70">
            {data.subtitle}
          </p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {paragraphs.map((p, i) => (
              <p key={i} className="mb-4 leading-relaxed text-[#fdffee]/80">
                {p}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="aspect-video overflow-hidden rounded-xl bg-black/20"
          >
            <video
              src={`/videos/${data.videoSrc}`}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
