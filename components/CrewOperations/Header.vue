<template>
  <header class="pc-photo-header">
    <PhotoConceptsHeaderPhoto :image="serviceImages[3]" />
    <div class="caption">
      <div class="text-center">
        <h1>{{ $t('crew.header') }}</h1>
      </div>
    </div>
  </header>
</template>

<script setup>
// Same photo as the Crew & Operations row of the services list on home.
import { serviceImages } from '@/data/PhotoConcepts/photos'
</script>
