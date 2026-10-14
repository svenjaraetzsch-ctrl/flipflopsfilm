<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <LocationsOptionsNav :current="4" />
    <div id="smooth-content">
        <main class="main-bg">
            <div class="main-box main-bg ontop">
                <!-- Option 4: the map as part of the page. A short title, then
                     the introduction, the facts and the themes in the left
                     column of the site's grid and the map in the right one,
                     with no window of its own. -->
                <header class="loc-option4__head">
                  <div class="container">
                    <h1 class="loc-option4__title">{{ $t('locations.header') }}</h1>
                  </div>
                </header>
                <LocationsGallery integrated />
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
  title: 'Locations, option 4 | Flip Flops Film',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
  script: [
    { src: "/assets/js/smoother-script.js", defer: true }
  ]
});
</script>

<style scoped>
/* The site's head title, without a photo and compact, so the section below
   starts in the first screen */
.loc-option4__head {
  padding: 150px 0 70px;
  text-align: center;
}

.loc-option4__title {
  font-size: clamp(40px, 6.5vw, 96px);
  line-height: 1;
  text-transform: uppercase;
  overflow-wrap: anywhere;
}

@media (max-width: 991px) {
  .loc-option4__head {
    padding: 130px 0 40px;
  }
}
</style>
