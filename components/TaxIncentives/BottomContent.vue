<template>
  <section class="section-padding">
    <div class="container">
      <!-- Set as the second row of About's first section: the text on the
           left, a photo on the right -->
      <div class="row">
        <div class="col-lg-5">
          <div class="text">
            <p>{{ $t('tax.approach_p') }}</p>
          </div>
        </div>
        <div class="col-lg-6 offset-lg-1">
          <PhotoConceptsSidePhoto class="pc-side-photo--right" :image="photos.famara" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { photos } from '@/data/PhotoConcepts/photos'
</script>
