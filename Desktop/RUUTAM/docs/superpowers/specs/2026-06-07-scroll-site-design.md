# Scroll-Based Website — Virgin Coconut Oil Brand

## Overview
A single-page scroll-based brand showcase for a virgin coconut oil product. The page uses scroll-driven animation to scrub through a product video, alongside a video gallery, product carousel, and WhatsApp contact CTA.

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Animation:** Framer Motion
- **UI Library:** shadcn/ui (existing pattern)
- **Carousel:** Embla Carousel via shadcn/ui (existing component)
- **Icons:** Lucide React (existing)
- **CSS:** Tailwind CSS (via shadcn/ui)

## Color Palette
| Role     | Hex       |
|----------|-----------|
| White    | `#FFFFFF` |
| Pink     | `#E91E63` (or brand-defined pink) |
| Gold     | `#D4AF37` (or brand-defined gold) |

## Page Sections

### 1. Navbar (Skiper58)
- Fixed at top, transparent → white on scroll
- Brand logo/name left, nav links right
- Uses the existing `skiper58.tsx` component with navigation items customized for this site

### 2. Hero Section
- Full-screen (100vh), white background
- Brand name in large gold type
- Tagline in pink
- Subtle gold accent/divider
- Scroll-down indicator (animated chevron) at bottom
- Framer Motion entrance animations on mount

### 3. Video Scrub Section
- The coconut oil ad video scrubs frame-by-frame as user scrolls
- **Implementation:** Use `<video>` element with `currentTime` synced to scroll progress via scroll event + `requestAnimationFrame`
- **Layout:** Video sits in a sticky container (`position: sticky; top: 0; height: 100vh`) within a tall scroll section. A pink-to-gold gradient progress bar indicates scrub position.
- Progress indicator (pink/gold gradient bar) showing scrub position
- Framer Motion opacity/scale transitions on entering/exiting the section

### 4. Video Gallery
- Grid of 3-6 embedded video players (YouTube/Vimeo embeds)
- 2-column layout on desktop, single column on mobile
- White cards with rounded corners
- Pink border accents, gold highlights on hover
- Each card: video thumbnail + play button overlay

### 5. Product Carousel
- Uses `productgallery.tsx` (Skiper54) component
- Adapted with product images, names, and prices
- Auto-play enabled
- Navigation arrows and pagination dots in pink/gold
- Product cards: white background, gold border, pink accent details

### 6. Contact Section
- Pink or white background with pink/gold accents
- WhatsApp CTA button styled in gold with WhatsApp icon
- Optional: simple contact form (name, email, message)
- WhatsApp button opens `wa.me` link in new tab
- Footer with brand info

## Scroll Behavior
- Smooth scroll throughout
- Fixed scroll progress bar (pink-to-gold gradient) on the right edge
- Section entrance animations via Framer Motion `whileInView`
- Video scrub section uses a tall spacer div to drive scroll distance while video stays fixed

## Data Flow
- Video assets: served from `/public/videos/` directory
- Gallery videos: Embedded via YouTube/Vimeo iframe embed URLs in a config file
- Products: image paths, names, prices in a config/data file
- WhatsApp number: environment variable or config

## Responsive Design
- Mobile-first approach
- Video scrub section adapts height on mobile
- Gallery grid: 2-col desktop, 1-col tablet/mobile
- Navbar collapses to hamburger menu on mobile

## Next Steps
1. Scaffold Next.js project with shadcn/ui
2. Set up color theme (tailwind config)
3. Build each section as a separate component
4. Implement video scrub logic
5. Integrate existing Skiper components
6. Test scroll animations and responsiveness
