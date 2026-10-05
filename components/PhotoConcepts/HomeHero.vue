<template>
  <!-- Same title as CreativeAgency/Header.vue; the video below it runs through
       the full-screen break effect (concept 01) instead of a fixed 70vh box. -->
  <header class="crev-header pc-hero">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="caption text-center">
            <h1 style="position: absolute; opacity: 0;">Flip Flops Film</h1>
            <h1 class="f-xbold"><span class="f-ultra-light d-block">{{ t('home.hero_title1') }}</span>{{ t('home.hero_title2') }}</h1>
          </div>
        </div>
      </div>
    </div>
    <PhotoConceptsBleed
      class="mt-50"
      video="/assets/vid/flipflops_video_smaller-verkleinert-online.mp4"
      at-top
    />
  </header>
</template>

<script setup>
const { t } = useI18n()
</script>
