<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <LocationsOptionsNav :current="3" />
    <div id="smooth-content">
        <main class="main-bg">
            <div class="main-box main-bg ontop">
                <!-- Option 3: title and introduction as text, then the map, then
                     the location photos as a band of their own. -->
                <LocationsPageHead variant="text" />
                <LocationsGallery />
                <LocationsPhotoBand />
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
  title: 'Locations, option 3 | Flip Flops Film',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
  script: [
    { src: "/assets/js/smoother-script.js", defer: true }
  ]
});
</script>
