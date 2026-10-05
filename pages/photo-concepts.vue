<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />

    <div id="smooth-content">
      <main class="main-bg">
        <PhotoConceptsIntro />

        <section id="c01">
          <PhotoConceptsConceptHead
            no="01"
            title="Full-screen breaks"
            text="A single photograph takes over the whole screen between two sections — a pause in the reading, like cutting to a wide shot. As it scrolls in, the frame opens up and the image settles out of a slow zoom."
            where="Home, between the introduction and “What we believe”; between the blocks of each service page."
          />
          <PhotoConceptsBleed :image="hierro.coast" />
        </section>

        <section id="c02">
          <PhotoConceptsConceptHead
            no="02"
            title="A visual sequence"
            text="A reel of frames that moves sideways as you scroll down, like running a contact sheet through your hands. Mixed formats and frame numbers lean into the analogue character of the photographs. On phones it becomes a simple swipe."
            where="Home or About — one reel mixing all the islands, or a short reel per island."
          />
          <PhotoConceptsFilmstrip />
        </section>

        <section id="c03">
          <PhotoConceptsConceptHead
            no="03"
            title="Changing backgrounds"
            text="The words stay where they are while the island behind them changes. Each step of a story brings its own landscape, so the photographs set the mood without competing with the copy. Shown here with the live “What we believe” values."
            where="The values on Home, the services overview, the About story."
          />
          <PhotoConceptsBackgroundSequence />
        </section>

        <section id="c04">
          <PhotoConceptsConceptHead
            no="04"
            title="Words that reveal images"
            text="Large type stays clean until you point at it — then a photograph surfaces under the cursor and follows it. Images only appear when someone is curious, which keeps them special. On phones each line simply carries a small print."
            where="The services list on Home, the menu, the FAQ topics."
          />
          <PhotoConceptsHoverReveal />
        </section>

        <section id="c05">
          <PhotoConceptsConceptHead
            no="05"
            title="Editorial pairings"
            text="Photographs sit beside the copy like a magazine spread: tall frames that unveil as you reach them, and a second, smaller print drifting at its own speed for depth."
            where="Each service page (Locations, Tax Incentives, Crew & Operations) and the About page."
          />
          <PhotoConceptsEditorialSplit />
        </section>

        <div class="pc-again">
          <PhotoConceptsBleed :image="hierro.redCliff" caption="01 again · a second break further down" />
        </div>

        <section id="c06">
          <PhotoConceptsConceptHead
            no="06"
            title="One film texture for everything"
            text="The photos already on the site are crisp and saturated; Daniel's are soft, warm and grainy. A light grade plus a moving grain layer, applied in code, pulls the existing images — and the hero video — into the same family without re-editing a single file."
            where="Site-wide: the current location photos, the hero video and any image added later."
          />
          <PhotoConceptsFilmTexture />
        </section>

        <section id="c07">
          <PhotoConceptsConceptHead
            no="07"
            title="Small moments"
            text="Photographs in the places people pass through without thinking: the menu, the contact block, the footer. Small doses, but they make the whole site feel like it belongs to the islands."
            where="Menu overlay, contact block, footer, 404 page."
          />
          <PhotoConceptsSmallMoments />
        </section>

        <PhotoConceptsDistribution />
      </main>

      <CommonFooter1 />
    </div>
  </div>
</template>

<script setup>
import { hierro } from '@/data/PhotoConcepts/hierro'

// Internal proposal for the client, deployed only to the staging domain.
// Kept out of search engines.
useHead({
  title: 'Photography concepts | Flip Flops Film',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
  bodyAttrs: { class: 'main-bg' },
  script: [{ src: '/assets/js/smoother-script.js', defer: true }]
})
</script>

<style>
/* Shared "film" look (concepts 06 and 07): softer contrast, warmer and less
   saturated, a vignette and moving grain from the theme's own noise texture. */
.pc-filmic {
  position: relative;
  overflow: hidden;
  height: 100%;
}

.pc-filmic img {
  filter: sepia(0.25) saturate(0.7) contrast(0.9) brightness(1.03);
}

.pc-filmic::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 50%, rgba(30, 20, 12, 0.5) 100%),
    rgba(215, 170, 115, 0.16);
  mix-blend-mode: multiply;
}

.pc-filmic::after {
  content: '';
  position: absolute;
  inset: -100%;
  z-index: 2;
  pointer-events: none;
  background-image: url(/assets/imgs/noise.png);
  opacity: 0.35;
  mix-blend-mode: overlay;
  animation: grain 8s steps(10) infinite;
}

.pc-again {
  margin-top: 160px;
}
</style>
