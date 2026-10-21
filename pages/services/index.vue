<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />

    <div id="smooth-content">
      <main class="main-bg">
        <div class="main-box main-bg ontop">
          <!-- No visible title: the butterfly opens the page -->
          <h1 class="pc-sr-only">{{ $t('nav.services') }}</h1>
          <ServicesButterfly />
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
