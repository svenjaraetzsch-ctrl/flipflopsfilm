<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <ServicesOptionsNav :current="3" />
    <div id="smooth-content">
      <main class="main-bg">
        <div class="main-box main-bg ontop">
          <h1 class="pc-sr-only">{{ $t('nav.services') }}</h1>
          <ServicesOverviewFlip />
        </div>
        <PhotoConceptsContact :image="photos.famara" />
      </main>
      <CommonFooter1 />
    </div>
  </div>
</template>

<script setup>
import { photos } from '@/data/PhotoConcepts/photos'

// Review only: proposal 3 for the Services overview, kept out of search
// engines. The live page is pages/services/index.vue.
definePageMeta({
  layout: 'preview'
})

useHead({
  title: 'Services, option 3 | Flip Flops Film',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
  bodyAttrs: { class: 'main-bg' },
  script: [{ src: '/assets/js/smoother-script.js', defer: true }]
})
</script>
