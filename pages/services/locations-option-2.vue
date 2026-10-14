<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <LocationsOptionsNav :current="2" />
    <div id="smooth-content">
        <main class="main-bg">
            <div class="main-box main-bg ontop">
                <!-- Option 2: a short photo header as on the other service pages,
                     straight into the map, the introduction below. -->
                <LocationsPageHead variant="photo" />
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

// Review only: one of three proposals for the Locations page, kept out of
// search engines. The live page is pages/services/locations.vue.
definePageMeta({
  layout: "preview",
});

useHead({
  title: 'Locations, option 2 | Flip Flops Film',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
  script: [
    { src: "/assets/js/smoother-script.js", defer: true }
  ]
});
</script>
