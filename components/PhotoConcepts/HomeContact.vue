<template>
  <!-- The live contact block, unchanged, with one closing photograph behind it
       that the content box uncovers as it scrolls away. -->
  <div class="pc-home-contact">
    <div class="pc-home-contact__bg">
      <img
        :src="hierro.arch.src"
        :srcset="hierro.arch.srcset"
        sizes="100vw"
        :width="hierro.arch.w"
        :height="hierro.arch.h"
        :alt="hierro.arch.alt"
        loading="lazy"
        decoding="async"
      />
    </div>
    <CreativePortfolioContact />
  </div>
</template>

<script setup>
import { hierro } from '@/data/PhotoConcepts/hierro'
</script>

<style scoped>
.pc-home-contact {
  position: relative;
}

.pc-home-contact__bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.pc-home-contact__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pc-home-contact__bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(32, 29, 29, 0.55), rgba(32, 29, 29, 0.75));
}

.pc-home-contact :deep(.call-action) {
  position: relative;
}
</style>
