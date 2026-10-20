<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <LocationsOptionsNav :current="1" />
    <div id="smooth-content">
      <main class="main-bg">
        <div class="main-box main-bg ontop">
          <LocationsGallery />
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

// Review only: version 1 of the Locations map (two maps: the islands, and a
// map of Spain beside them), kept out of search engines. The live page is
// pages/services/locations.vue.
definePageMeta({
  layout: 'preview'
})

useHead({
  title: 'Locations, map version 1 | Flip Flops Film',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
  script: [{ src: '/assets/js/smoother-script.js', defer: true }]
})
</script>
