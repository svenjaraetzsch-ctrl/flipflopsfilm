<template>
  <!-- The head of the Locations page without the photo marquee. "photo": the
       title over a dimmed landscape, as on Tax Incentives and Crew &
       Operations, but shorter so the map follows in the first screen.
       "text": the title, then the introduction beside its label, no photo
       at all. -->
  <header v-if="variant === 'photo'" class="pc-photo-header loc-head loc-head--photo">
    <PhotoConceptsHeaderPhoto :image="photos.coast" />
    <div class="caption">
      <div class="text-center">
        <h1>{{ $t('locations.header') }}</h1>
      </div>
    </div>
  </header>

  <header v-else class="loc-head loc-head--text">
    <div class="container">
      <h1 class="loc-head__title">{{ $t('locations.header') }}</h1>
      <div class="row">
        <div class="col-lg-5">
          <span class="sub-title bord">{{ $t('locations.label') }}</span>
        </div>
        <div class="col-lg-7">
          <h5 class="fw-400 line-height-40">{{ $t('locations.h5') }}</h5>
          <p class="fz-18 mt-30">{{ $t('locations.p') }}</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { photos } from '@/data/PhotoConcepts/photos'

defineProps({
  variant: { type: String, default: 'text' }
})
</script>

<style scoped>
/* Photo head: shorter than the other service pages' heads */
.loc-head--photo {
  padding-top: 170px;
  padding-bottom: 90px;
}

.loc-head--text {
  padding: 170px 0 60px;
}

.loc-head__title {
  margin-bottom: 50px;
  font-size: clamp(40px, 7vw, 110px);
  line-height: 1;
  text-transform: uppercase;
  overflow-wrap: anywhere;
}

@media (max-width: 991px) {
  .loc-head--photo {
    padding-top: 130px;
    padding-bottom: 60px;
  }

  .loc-head--text {
    padding: 140px 0 30px;
  }

  .loc-head__title {
    margin-bottom: 30px;
  }

  .loc-head--text .sub-title {
    margin-bottom: 30px;
  }
}
</style>
