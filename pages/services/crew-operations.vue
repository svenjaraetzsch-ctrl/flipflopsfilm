<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    
    <div id="smooth-content">
      <main class="main-bg">
        <div class="main-box main-bg ontop">
          
          <CrewOperationsHeader />
          <CrewOperationsTopContent />
          <LandingMarquee />
          <!--<TaxIncentivesImageColumn />-->
          <CrewOperationsAccordion />
          <!--<TaxIncentivesBottomImage />-->
        </div>
        <PhotoConceptsBackdrop :image="photos.teideCaldera">
          <CrewOperationsNextProject />
        </PhotoConceptsBackdrop>
      </main>
      <CommonFooter1 />
    </div>
  </div>
</template>

<script setup>
import { photos } from '@/data/PhotoConcepts/photos'

//= Page Meta
definePageMeta({
  layout: "preview",
});
usePageSeo('crewOperations')

//= Page Head
useHead({
  bodyAttrs: {
    class: 'main-bg'
  },
  script: [
    { src: "/assets/js/smoother-script.js", defer: true }
  ]
});
</script>
