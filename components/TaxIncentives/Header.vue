<template>
  <header class="pc-photo-header">
    <PhotoConceptsHeaderPhoto :image="serviceImages[2]" />
    <div class="caption">
      <div class="text-center">
        <h1>{{ $t('tax.header') }}</h1>
      </div>
    </div>
  </header>
</template>

<script setup>
// Same photo as the Tax Incentives row of the services list on home.
import { serviceImages } from '@/data/PhotoConcepts/photos'
</script>
