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
                <header class="pc-page-head pc-page-head--plain">
                  <div class="caption">
                    <div class="text-center">
                      <h1>{{ $t('locations.header') }}</h1>
                    </div>
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

