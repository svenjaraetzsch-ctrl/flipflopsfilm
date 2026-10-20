<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <LocationsOptionsNav :current="3" />
    <div id="smooth-content">
      <main class="main-bg">
        <div class="main-box main-bg ontop">
          <LocationsGallery mainland="side" />
          <LocationsTopContent />
        </div>
        <PhotoConceptsContact :image="photos.caldera" />
      </main>

      <CommonFooter1 />
    </div>
  </div>
</template>

<script setup>
import { photos } from '@/data/PhotoConcepts/photos'

// Review only: proposal 3 for mainland Spain on the Locations map, kept out
// of search engines. The live page is pages/services/locations.vue.
definePageMeta({
  layout: 'preview'
})

useHead({
  title: 'Locations, mainland option 3 | Flip Flops Film',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
  script: [{ src: '/assets/js/smoother-script.js', defer: true }]
})
</script>
