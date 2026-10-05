<template>
  <header class="pc-photo-header">
    <PhotoConceptsHeaderPhoto :image="photos.ridge" />
    <div class="caption">
      <div class="text-center">
        <h1>{{ $t('tax.header') }}</h1>
      </div>
    </div>
  </header>
</template>

<script setup>
import { photos } from '@/data/PhotoConcepts/photos'
</script>
