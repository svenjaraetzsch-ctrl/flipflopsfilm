<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <div id="smooth-content">
        <main class="main-bg">
            <div class="main-box main-bg ontop">
                
                <LocationsHeader />
                <LocationsTopContent></LocationsTopContent>
                <LocationsGrid></LocationsGrid>
            </div>
            <PhotoConceptsContact :image="photos.seaStacks" />
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
