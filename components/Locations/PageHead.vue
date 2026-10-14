<template>
  <!-- The head of the Locations page without the photo marquee, with the
       site's page title (.pc-page-head). "photo": the title over a dimmed
       landscape, as on Tax Incentives and Crew & Operations. "text": the
       title without a photo, then the introduction beside its label. -->
  <header v-if="variant === 'photo'" class="pc-photo-header pc-page-head">
    <PhotoConceptsHeaderPhoto :image="photos.coast" />
    <div class="caption">
      <div class="text-center">
        <h1>{{ $t('locations.header') }}</h1>
      </div>
    </div>
  </header>

  <div v-else>
    <header class="pc-page-head pc-page-head--plain">
      <div class="caption">
        <div class="text-center">
          <h1>{{ $t('locations.header') }}</h1>
        </div>
      </div>
    </header>
    <LocationsTopContent />
  </div>
</template>

<script setup>
import { photos } from '@/data/PhotoConcepts/photos'

defineProps({
  variant: { type: String, default: 'text' }
})
</script>
