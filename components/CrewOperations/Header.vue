<template>
  <header class="pc-photo-header">
    <PhotoConceptsHeaderPhoto :image="photos.sunsetWalk" shift="18%" />
    <div class="caption">
      <div class="text-center">
        <h1>{{ $t('crew.header') }}</h1>
      </div>
    </div>
  </header>
</template>

<script setup>
import { photos } from '@/data/PhotoConcepts/photos'
</script>
