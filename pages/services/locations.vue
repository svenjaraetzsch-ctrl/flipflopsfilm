<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <div id="smooth-content">
        <main class="main-bg">
            <div class="main-box main-bg ontop">
                <!-- The map opens the page, straight on the page and in line
                     with the container; its heading is the page title. The
                     description follows below. -->
                <div class="loc-page__map">
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

//= Page Metadata
definePageMeta({
  layout: "preview",
});
usePageSeo('locations')

//= Page Head
useHead({
  script: [
    { src: "/assets/js/smoother-script.js", defer: true }
  ]
});
</script>

<style scoped>
/* The map's heading starts where every page title starts (.pc-page-head
   in globals: 200px from the top, 160px and 120px on smaller screens) */
.loc-page__map {
  padding-top: 158px;
}

@media (max-width: 991px) {
  .loc-page__map {
    padding-top: 124px;
  }
}

@media (max-width: 768px) {
  .loc-page__map {
    padding-top: 84px;
  }
}
</style>
