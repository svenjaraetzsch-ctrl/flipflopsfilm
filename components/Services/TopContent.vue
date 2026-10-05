<template>
  <section id="production-services" class="section-padding bord-thin-bottom">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <span class="sub-title bord mb-30">{{ $t('services.top_label') }}</span>
          <PhotoConceptsSidePhoto :image="photos.roofTent" :detail="photos.mirador" />
        </div>
        <div class="col-lg-5 offset-lg-1">
          <div class="text">
            <h5 class="mb-30 fw-400 line-height-40">{{ $t('services.top_h5') }}</h5>
            <p class="fz-18">{{ $t('services.top_p') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { photos } from '@/data/PhotoConcepts/photos'
</script>
