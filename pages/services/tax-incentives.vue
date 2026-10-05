<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    
    <div id="smooth-content">
      <main class="main-bg">
        <div class="main-box main-bg ontop">
          
          <TaxIncentivesHeader />
          <TaxIncentivesTopContent />
          <LandingMarquee />
          <!--<TaxIncentivesImageColumn />-->
          <TaxIncentivesBottomContent />
          <!--<TaxIncentivesBottomImage />-->
        </div>
        <PhotoConceptsBackdrop :image="photos.cliffCoast">
          <TaxIncentivesNextProject />
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
usePageSeo('taxIncentives')

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
