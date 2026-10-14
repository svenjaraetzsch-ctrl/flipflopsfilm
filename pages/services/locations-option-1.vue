<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <LocationsOptionsNav :current="1" />
    <div id="smooth-content">
        <main class="main-bg">
            <div class="main-box main-bg ontop">
                <!-- Option 1: the map is the page. It opens the page in place of a
                     header (its "Canary Islands" title leads), the introduction
                     follows below. -->
                <h1 class="loc-option__h1">{{ $t('locations.header') }}</h1>
                <div class="loc-option__map-first">
                  <LocationsGallery />
                </div>
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
  title: 'Locations, option 1 | Flip Flops Film',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
  script: [
    { src: "/assets/js/smoother-script.js", defer: true }
  ]
});
</script>

<style scoped>
/* The page's title for search engines and screen readers; the map's own
   "Canary Islands" heading is what is seen. */
.loc-option__h1 {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* Clear of the fixed navigation */
.loc-option__map-first {
  padding-top: 120px;
}

@media (max-width: 991px) {
  .loc-option__map-first {
    padding-top: 100px;
  }
}
</style>
