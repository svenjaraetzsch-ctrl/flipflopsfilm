<template>
  <CommonLoader />
  <div id="smooth-wrapper">

    <CommonNavbar />
    <CommonMenu />
    <div id="smooth-content">
      <!-- The home page with Daniel Bonhoff's photographs woven in; the hero
           video opens to full screen as the page scrolls and carries a line
           that compares the original with the cinematic look. -->
      <main class="main-bg pc-home">
        <div class="main-box main-bg ontop">
          <PhotoConceptsHomeHero />
          <CreativeAgencyAbout />
          <CreativeAgencyTestimonials />
          <CreativeAgencyAwards />
        </div>
        <PhotoConceptsContact :image="photos.reflection" />
      </main>
      <CommonFooter1 />
    </div>
  </div>
</template>

<script setup>
import { photos } from '@/data/PhotoConcepts/photos'

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

