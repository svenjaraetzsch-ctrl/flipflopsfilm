<template>
  <section class="section-padding">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-11">
          <div class="row">
            <div class="col-lg-5">
              <div class="text">
                <p class="fz-18">{{ $t('tax.approach_p') }}</p>
              </div>
            </div>
            <div class="col-lg-6 offset-lg-1">
              <PhotoConceptsSidePhoto class="pc-side-photo--right" :image="photos.famara" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { photos } from '@/data/PhotoConcepts/photos'
</script>
