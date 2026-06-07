"use client";

import { motion } from "framer-motion";
import { galleryVideos } from "@/data/gallery";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const VideoGallery = () => {
  return (
    <section
      id="gallery"
      className="bg-black px-6 py-24 md:px-12 lg:px-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h2 className="font-display text-4xl font-bold tracking-tight text-brand-gold md:text-5xl">
          Our Videos
        </h2>
        <div className="mx-auto mt-4 h-px w-16 bg-brand-pink" />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2"
      >
        {galleryVideos.map((video) => (
          <motion.div
            key={video.id}
            variants={itemVariants}
            className="group relative overflow-hidden rounded-2xl border border-transparent bg-zinc-900 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-pink hover:shadow-xl"
          >
            <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-gray-100">
              <iframe
                src={video.embedUrl}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-brand-gold">
                {video.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
