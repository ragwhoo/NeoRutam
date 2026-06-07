"use client";

import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { products } from "@/data/products";

export const ProductCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="products" className="bg-black px-6 py-24 md:px-12 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h2 className="font-display text-4xl font-bold tracking-tight text-brand-gold md:text-5xl">
          Our Products
        </h2>
        <div className="mx-auto mt-4 h-px w-16 bg-brand-pink" />
      </motion.div>

      <div className="mx-auto max-w-6xl">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{ loop: true, slidesToScroll: 1 }}
          plugins={[
            Autoplay({ delay: 2000, stopOnInteraction: true, stopOnMouseEnter: true }),
          ]}
        >
          <CarouselContent className="flex h-[400px] w-full">
            {products.map((product, index) => (
              <CarouselItem
                key={index}
                className="relative flex h-full basis-[73%] items-center justify-center sm:basis-[50%] md:basis-[30%] lg:basis-[25%]"
              >
                <motion.div
                  initial={false}
                  animate={{
                    clipPath:
                      current !== index
                        ? "inset(10% 0 10% 0 round 1.5rem)"
                        : "inset(0 0 0 0 round 1.5rem)",
                  }}
                  className="h-[320px] w-full overflow-hidden rounded-2xl bg-zinc-900 shadow-md"
                >
                  <div className="relative h-3/5 w-full overflow-hidden bg-zinc-800">
                    <div className="flex h-full items-center justify-center text-gray-400">
                      <span className="text-sm">Product Image</span>
                    </div>
                  </div>
                  <div className="flex h-2/5 flex-col items-center justify-center gap-1 p-4 text-center">
                    <h3 className="font-semibold text-white">{product.title}</h3>
                    <span className="text-lg font-bold text-brand-pink">{product.price}</span>
                  </div>
                </motion.div>
                <AnimatePresence mode="wait">
                  {current === index && (
                    <motion.div
                      initial={{ opacity: 0, filter: "blur(10px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      transition={{ duration: 0.5 }}
                      className="absolute -bottom-6 text-sm font-medium tracking-tight text-brand-gold"
                    >
                      Featured
                    </motion.div>
                  )}
                </AnimatePresence>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-6 flex items-center justify-between">
            <button
              aria-label="Previous slide"
              onClick={() => api?.scrollPrev()}
              className="rounded-full bg-brand-pink/10 p-2 transition-colors hover:bg-brand-pink/20"
            >
              <ChevronLeft className="h-5 w-5 text-brand-pink" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: products.length }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    "h-2 w-2 cursor-pointer rounded-full transition-all",
                    current === index ? "bg-brand-gold" : "bg-gray-300",
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              aria-label="Next slide"
              onClick={() => api?.scrollNext()}
              className="rounded-full bg-brand-pink/10 p-2 transition-colors hover:bg-brand-pink/20"
            >
              <ChevronRight className="h-5 w-5 text-brand-pink" />
            </button>
          </div>
        </Carousel>
      </div>
    </section>
  );
};
