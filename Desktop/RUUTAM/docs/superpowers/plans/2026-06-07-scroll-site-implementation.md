# Scroll-Based Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page scroll-based brand showcase website for virgin coconut oil with video scrub, gallery, product carousel, and WhatsApp CTA.

**Architecture:** Next.js 14+ App Router with Tailwind CSS. Each page section is a standalone component composed in `app/page.tsx`. Scroll-based video scrubbing uses `requestAnimationFrame` to sync `<video>.currentTime` with scroll progress through a sticky container. Existing Skiper UI components are adapted for navbar and product carousel.

**Tech Stack:** Next.js 14+, TypeScript, Tailwind CSS, Framer Motion, shadcn/ui (carousel), Lucide React, Embla Carousel

---

## File Structure

```
ruutam/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Main page composing all sections
│   └── globals.css         # Tailwind directives + brand custom properties
├── components/
│   ├── navbar.tsx          # Adapted from skiper58.tsx
│   ├── hero.tsx            # Full-screen brand intro
│   ├── video-scrub.tsx     # Scroll-driven video scrub section
│   ├── video-gallery.tsx   # Embedded YouTube/Vimeo grid
│   ├── product-carousel.tsx# Adapted from productgallery.tsx
│   ├── contact.tsx         # WhatsApp CTA + footer
│   └── scroll-progress.tsx # Fixed side progress bar
├── data/
│   ├── products.ts         # Product data (images, names, prices)
│   └── gallery.ts          # Gallery video embed URLs
├── lib/
│   └── utils.ts            # cn() utility
├── public/
│   └── videos/             # Video assets
├── components.json         # shadcn/ui config
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── package.json
```

---

### Task 1: Scaffold Next.js Project + Dependencies

**Files:** Auto-generated, then modified

- [ ] **Step 1: Create Next.js project**

```powershell
cd C:\Users\raghu\Desktop\RUUTAM
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

When prompted: confirm the directory is not empty (the video + components exist), then proceed.

- [ ] **Step 2: Install additional dependencies**

```powershell
npm install framer-motion lucide-react
npx shadcn@latest init -y
npx shadcn@latest add carousel -y
```

- [ ] **Step 3: Create data directory and lib directory**

```powershell
New-Item -ItemType Directory -Path "C:\Users\raghu\Desktop\RUUTAM\data" -Force
```

- [ ] **Step 4: Move video to public folder**

```powershell
Copy-Item "C:\Users\raghu\Desktop\RUUTAM\Virgin_coconut_oil_advertisement_202606071509.mp4" "C:\Users\raghu\Desktop\RUUTAM\public\videos\advertisement.mp4"
```

- [ ] **Step 5: Verify scaffold works**

```powershell
npm run dev
```

Visit http://localhost:3000 — should see default Next.js page. Kill the server (Ctrl+C).

---

### Task 2: Configure Tailwind Theme + Globals

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Set up brand colors in tailwind.config.ts**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: "#E91E63",
          gold: "#D4AF37",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui"],
        body: ["var(--font-body)", "system-ui"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Update globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --brand-pink: #E91E63;
  --brand-gold: #D4AF37;
}

@layer base {
  * {
    @apply border-gray-200;
  }
  body {
    @apply bg-white text-gray-900;
  }
}

@layer utilities {
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

- [ ] **Step 3: Ensure utils.ts exists (shadcn/ui should have created it)**

Check `lib/utils.ts` exists. If not, create it:

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

### Task 3: Create Data Files

**Files:**
- Create: `data/products.ts`
- Create: `data/gallery.ts`
- Create: `data/navigation.ts`

- [ ] **Step 1: Create products data**

```typescript
export interface Product {
  src: string;
  alt: string;
  title: string;
  price?: string;
}

export const products: Product[] = [
  {
    src: "/images/products/coconut-oil-1.jpg",
    alt: "Virgin Coconut Oil",
    title: "Pure Virgin Coconut Oil",
    price: "₹299",
  },
  {
    src: "/images/products/coconut-oil-2.jpg",
    alt: "Cold Pressed Coconut Oil",
    title: "Cold Pressed Coconut Oil",
    price: "₹349",
  },
  {
    src: "/images/products/coconut-oil-3.jpg",
    alt: "Organic Coconut Oil",
    title: "Organic Coconut Oil",
    price: "₹399",
  },
  {
    src: "/images/products/coconut-oil-4.jpg",
    alt: "Coconut Hair Oil",
    title: "Coconut Hair Oil",
    price: "₹249",
  },
  {
    src: "/images/products/coconut-oil-5.jpg",
    alt: "Coconut Body Oil",
    title: "Coconut Body Oil",
    price: "₹449",
  },
];
```

- [ ] **Step 2: Create gallery data**

```typescript
export interface GalleryVideo {
  id: string;
  title: string;
  embedUrl: string;
  thumbnail?: string;
}

export const galleryVideos: GalleryVideo[] = [
  {
    id: "vid-1",
    title: "Coconut Oil Benefits",
    embedUrl: "https://www.youtube.com/embed/PLACEHOLDER_1",
  },
  {
    id: "vid-2",
    title: "How We Make Coconut Oil",
    embedUrl: "https://www.youtube.com/embed/PLACEHOLDER_2",
  },
  {
    id: "vid-3",
    title: "Customer Reviews",
    embedUrl: "https://www.youtube.com/embed/PLACEHOLDER_3",
  },
  {
    id: "vid-4",
    title: "Coconut Oil Recipes",
    embedUrl: "https://www.youtube.com/embed/PLACEHOLDER_4",
  },
];
```

- [ ] **Step 3: Create navigation data**

```typescript
export interface NavItem {
  name: string;
  href: string;
}

export const navigationItems: NavItem[] = [
  { name: "Home", href: "#home" },
  { name: "Video", href: "#video" },
  { name: "Gallery", href: "#gallery" },
  { name: "Products", href: "#products" },
  { name: "Contact", href: "#contact" },
];
```

---

### Task 4: Navbar Component

**Files:**
- Create: `components/navbar.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create navbar component**

```tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { navigationItems } from "@/data/navigation";

const STAGGER = 0.035;

const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
}> = ({ children, className, center = false }) => {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn("relative block overflow-hidden", className)}
      style={{ lineHeight: 0.75 }}
    >
      <div>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;
          return (
            <motion.span
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
              transition={{ ease: "easeInOut", delay }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;
          return (
            <motion.span
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 },
              }}
              transition={{ ease: "easeInOut", delay }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="text-xl font-bold tracking-tight text-brand-gold">
          RUUTAM
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-700 transition-colors hover:text-brand-gold"
            >
              {item.name}
            </a>
          ))}
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="text-brand-gold" /> : <Menu className="text-brand-gold" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-white shadow-md md:hidden"
          >
            <div className="flex flex-col gap-2 px-6 pb-6 pt-2">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-lg font-medium text-gray-700 transition-colors hover:text-brand-gold"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
```

- [ ] **Step 2: Update layout.tsx to include Navbar**

```tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "RUUTAM — Pure Virgin Coconut Oil",
  description: "Discover the purity of nature with RUUTAM virgin coconut oil.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-body`}>
        {children}
      </body>
    </html>
  );
}
```

---

### Task 5: Hero Section

**Files:**
- Create: `components/hero.tsx`

- [ ] **Step 1: Create Hero component**

```tsx
"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="font-display text-6xl font-bold tracking-tight text-brand-gold md:text-8xl lg:text-9xl">
          RUUTAM
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-4 text-lg font-medium tracking-wide text-brand-pink md:text-xl"
        >
          Pure. Natural. Virgin Coconut Oil.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mt-6 h-px w-24 bg-brand-gold"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-10 animate-bounce"
      >
        <ChevronDown className="h-8 w-8 text-brand-gold" />
      </motion.div>
    </section>
  );
};
```

---

### Task 6: Video Scrub Section

**Files:**
- Create: `components/video-scrub.tsx`

This is the core technical piece. The video sits in a sticky container. As the user scrolls through a tall spacer, the video's `currentTime` is set proportionally.

- [ ] **Step 1: Create VideoScrub component**

```tsx
"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";

export const VideoScrub = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const isInView = useInView(sectionRef, { amount: 0.1 });

  const handleScroll = useCallback(() => {
    if (!sectionRef.current || !videoRef.current || !isReady) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const sectionHeight = rect.height;
    const windowHeight = window.innerHeight;
    const scrollable = sectionHeight - windowHeight;
    const scrolled = -rect.top;
    const rawProgress = Math.min(Math.max(scrolled / scrollable, 0), 1);

    setProgress(rawProgress);

    if (videoRef.current.duration) {
      videoRef.current.currentTime = rawProgress * videoRef.current.duration;
    }
  }, [isReady]);

  useEffect(() => {
    if (!isInView) return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, isInView]);

  return (
    <section
      id="video"
      ref={sectionRef}
      className="relative"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative aspect-video w-full max-w-5xl px-4"
        >
          <video
            ref={videoRef}
            src="/videos/advertisement.mp4"
            preload="auto"
            muted
            playsInline
            onLoadedMetadata={() => setIsReady(true)}
            className="h-full w-full rounded-2xl object-cover shadow-2xl"
          />

          <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3">
            <div className="h-1 w-40 overflow-hidden rounded-full bg-gray-200 md:w-80">
              <div
                className="h-full rounded-full transition-all duration-100"
                style={{
                  width: `${progress * 100}%`,
                  background: "linear-gradient(to right, #E91E63, #D4AF37)",
                }}
              />
            </div>
            <span className="text-xs font-medium text-gray-500">
              {Math.round(progress * 100)}%
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
```

---

### Task 7: Video Gallery Section

**Files:**
- Create: `components/video-gallery.tsx`

- [ ] **Step 1: Create VideoGallery component**

```tsx
"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
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
      className="bg-white px-6 py-24 md:px-12 lg:px-20"
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
            className="group relative overflow-hidden rounded-2xl border border-transparent bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-brand-pink hover:shadow-xl"
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
              <h3 className="text-lg font-semibold text-gray-800 transition-colors group-hover:text-brand-gold">
                {video.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
```

---

### Task 8: Product Carousel Section

**Files:**
- Create: `components/product-carousel.tsx`

This adapts the existing `productgallery.tsx` (Skiper54) but products data instead of static images.

- [ ] **Step 1: Install carousel dependencies (already done in Task 1)**

- [ ] **Step 2: Create ProductCarousel component**

```tsx
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
    <section id="products" className="bg-gray-50 px-6 py-24 md:px-12 lg:px-20">
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
                  className="h-[320px] w-full overflow-hidden rounded-2xl bg-white shadow-md"
                >
                  <div className="relative h-3/5 w-full overflow-hidden bg-gray-100">
                    <div className="flex h-full items-center justify-center text-gray-400">
                      <span className="text-sm">Product Image</span>
                    </div>
                  </div>
                  <div className="flex h-2/5 flex-col items-center justify-center gap-1 p-4 text-center">
                    <h3 className="font-semibold text-gray-800">{product.title}</h3>
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
```

---

### Task 9: Contact Section with WhatsApp CTA

**Files:**
- Create: `components/contact.tsx`

- [ ] **Step 1: Create Contact component**

```tsx
"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail, MapPin } from "lucide-react";

const WHATSAPP_NUMBER = "919XXXXXXXXX";

export const Contact = () => {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi!%20I'm%20interested%20in%20RUUTAM%20coconut%20oil%20products.`;

  return (
    <section id="contact" className="bg-brand-pink px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            Get in Touch
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-brand-gold" />
          <p className="mx-auto mt-6 max-w-lg text-lg text-white/80">
            Have questions or want to place an order? Reach out to us on WhatsApp!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10"
        >
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-brand-gold px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <MessageCircle className="h-6 w-6" />
            Chat on WhatsApp
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 flex flex-col items-center justify-center gap-4 text-sm text-white/70 md:flex-row md:gap-8"
        >
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>hello@ruutam.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Kerala, India</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 border-t border-white/20 pt-8 text-xs text-white/50"
        >
          &copy; {new Date().getFullYear()} RUUTAM. All rights reserved.
        </motion.div>
      </div>
    </section>
  );
};
```

---

### Task 10: Scroll Progress Bar

**Files:**
- Create: `components/scroll-progress.tsx`

- [ ] **Step 1: Create ScrollProgress component**

```tsx
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
```

---

### Task 11: Compose Main Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Update page.tsx to compose all sections**

```tsx
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { VideoScrub } from "@/components/video-scrub";
import { VideoGallery } from "@/components/video-gallery";
import { ProductCarousel } from "@/components/product-carousel";
import { Contact } from "@/components/contact";
import { ScrollProgress } from "@/components/scroll-progress";

export default function Home() {
  return (
    <main>
      <Navbar />
      <ScrollProgress />
      <Hero />
      <VideoScrub />
      <VideoGallery />
      <ProductCarousel />
      <Contact />
    </main>
  );
}
```

---

### Task 12: Build, Test, and Polish

- [ ] **Step 1: Build the project**

```powershell
npm run build
```

Fix any TypeScript or build errors.

- [ ] **Step 2: Start dev server and verify**

```powershell
npm run dev
```

Visit http://localhost:3000. Verify:
- All sections render in order
- Navbar becomes opaque on scroll
- Video scrub section scrubs the video as you scroll
- Gallery section shows video cards
- Product carousel auto-plays with navigation
- Contact section WhatsApp link works
- Scroll progress bar moves correctly

- [ ] **Step 3: Test mobile responsiveness**

Open DevTools and test at 375px width. Verify:
- Navbar collapses to hamburger
- All sections stack properly
- Text sizes are legible

- [ ] **Step 4: Fix video scrub edge case**

Note: Some browsers block autoplay of unmuted video. The video has `muted` so it should work, but if the scrub doesn't work, add a user interaction handler:

```tsx
useEffect(() => {
  const handleInteraction = () => {
    if (videoRef.current && isReady) {
      videoRef.current.play().catch(() => {});
    }
  };
  document.addEventListener("click", handleInteraction, { once: true });
  return () => document.removeEventListener("click", handleInteraction);
}, [isReady]);
```
