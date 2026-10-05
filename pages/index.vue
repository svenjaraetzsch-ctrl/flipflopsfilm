<template>
  <CommonLoader />
  <div id="smooth-wrapper">

    <CommonNavbar />
    <CommonMenu />
    <div id="smooth-content">
      <!-- photo-concepts branch: the home page with Daniel Bonhoff's images woven
           in (concepts 01, 04, 06, 07 from /photo-concepts). Not on main. -->
      <main class="main-bg pc-home">
        <div class="main-box main-bg ontop">
          <PhotoConceptsHomeHero />
          <CreativeAgencyAbout />
          <CreativeAgencyTestimonials />
          <PhotoConceptsHomeServices />
        </div>
        <PhotoConceptsContact />
      </main>
      <CommonFooter1 />
    </div>
  </div>
</template>

<script setup>
usePageSeo('home')

useHead({
  bodyAttrs: {
    class: 'main-bg'
  },

  script: [
    {
      src: '/assets/js/smoother-script.js',
      defer: true
    }
  ]
})
</script>

<style>
/* Concept 06 on the existing hero video: the same soft, warm grade and moving
   grain as the photographs, so footage and stills read as one family. The
   layers sit inside the clipped frame, so they open up together with it. */
.pc-hero .pc-bleed__img {
  filter: var(--pc-film-filter);
}

.pc-hero .pc-bleed__frame::before {
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

.pc-hero .pc-bleed__frame::after {
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
</style>
