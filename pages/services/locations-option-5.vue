<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <LocationsOptionsNav :current="5" />
    <div id="smooth-content">
        <main class="main-bg">
            <div class="main-box main-bg ontop">
                <!-- Option 5: the map opens the page, as large as in option 1,
                     but with no window: straight on the page, in line with
                     the container, its heading the page title. The
                     description follows below. -->
                <div class="loc-option__map-first">
                  <LocationsGallery layout="open" :title="$t('locations.header')" />
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

// Review only: one of the proposals for the Locations page, kept out of
// search engines. The live page is pages/services/locations.vue.
definePageMeta({
  layout: "preview",
});

useHead({
  title: 'Locations, option 5 | Flip Flops Film',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
  script: [
    { src: "/assets/js/smoother-script.js", defer: true }
  ]
});
</script>

<style scoped>
/* The map's heading starts where every page title starts (.pc-page-head
   in globals: 200px from the top, 160px and 120px on smaller screens) */
.loc-option__map-first {
  padding-top: 158px;
}

@media (max-width: 991px) {
  .loc-option__map-first {
    padding-top: 124px;
  }
}

@media (max-width: 768px) {
  .loc-option__map-first {
    padding-top: 84px;
  }
}
</style>
