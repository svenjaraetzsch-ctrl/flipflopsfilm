<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />

    <div id="smooth-content">
      <main class="main-bg">
        <div class="main-box main-bg ontop">
          <CommonMarqueeHeader :title="$t('nav.services')" />
          <PortfolioInteractiveCenter class="pc-after-header" />
          <ServicesTopContent></ServicesTopContent>
          
          
        </div>

        <PhotoConceptsContact :image="photos.famara" />
      </main>

      <CommonFooter1 />
    </div>
  </div>
</template>

<script setup>
import { photos } from '@/data/PhotoConcepts/photos'

definePageMeta({
  layout: 'preview'
})

usePageSeo('services')

useHead({
  bodyAttrs: {
    class: 'main-bg'
  },

  script: [
    {
      src: '/assets/js/smoother-script.js',
      defer: true
    }
  ]
})
</script>
