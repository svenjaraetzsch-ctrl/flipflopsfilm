<template>
  <!-- The contact block ("Why work with us"), unchanged, with one closing
       photograph behind it that the content box uncovers as it scrolls away.
       Used wherever the contact block appears. -->
  <div class="pc-contact">
    <div class="pc-contact__bg">
      <img
        :src="photos.sunsetPeaks.src"
        :srcset="photos.sunsetPeaks.srcset"
        sizes="100vw"
        :width="photos.sunsetPeaks.w"
        :height="photos.sunsetPeaks.h"
        :alt="photos.sunsetPeaks.alt"
        loading="lazy"
        decoding="async"
      />
    </div>
    <CreativePortfolioContact />
  </div>
</template>

<script setup>
import { photos } from '@/data/PhotoConcepts/photos'
</script>

<style scoped>
.pc-contact {
  position: relative;
}

.pc-contact__bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.pc-contact__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pc-contact__bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(32, 29, 29, 0.55), rgba(32, 29, 29, 0.75));
}

.pc-contact :deep(.call-action) {
  position: relative;
}
</style>
