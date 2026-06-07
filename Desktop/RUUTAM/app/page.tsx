import { HeroVideo } from "@/components/video-scrub";

import { About } from "@/components/about";
import { ProductGallery } from "@/components/product-gallery";
import { Benefits } from "@/components/benefits";
import { Gallery } from "@/components/gallery";
import { Contact } from "@/components/contact";
import { SmoothScroll } from "@/components/smooth-scroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main>
         <HeroVideo />
         <section className="bg-[url('/green.png')] bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center">
          <div className="text-center -space-y-4">
            <h1 className="font-display font-bold text-[13rem] text-white m-0 leading-none">Organic</h1>
            <h1 className="font-display font-bold text-[13rem] text-white">Unadultrated</h1>
            <h1 className="font-display font-bold text-[13rem] text-white">Natural</h1>
          </div>
        </section>

        <About />
        <ProductGallery />
        <Benefits />
        <Gallery />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
