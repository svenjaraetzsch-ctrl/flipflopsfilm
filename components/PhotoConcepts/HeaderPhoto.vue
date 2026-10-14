<template>
  <!-- A background photo for a page header: film-graded and dimmed like the
       photo behind the contact block, so the title reads clearly; it fills
       the header to its edges and drifts slightly as the header scrolls away.
       Place it as the first child of a header that has class "pc-photo-header". -->
  <div ref="wrap" class="pc-header-photo" :style="shift ? { '--shift': shift } : null" aria-hidden="true">
    <img
      ref="img"
      :src="image.src"
      :srcset="image.srcset"
      sizes="100vw"
      :width="image.w"
      :height="image.h"
      alt=""
      decoding="async"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollFx } from '@/composables/useScrollFx'

defineProps({
  image: { type: Object, required: true },
  // Desktop only: widen the photo and move it left by this much (e.g. '16%')
  // to take a subject out from behind the centred title.
  shift: { type: String, default: '' }
})

const wrap = ref(null)
const img = ref(null)

useScrollFx(() => {
  gsap.to(img.value, {
    yPercent: 12,
    ease: 'none',
    scrollTrigger: { trigger: wrap.value, start: 'top top', end: 'bottom top', scrub: true }
  })
})
</script>

<style scoped>
.pc-header-photo {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.pc-header-photo img {
  position: absolute;
  left: 0;
  top: -10%;
  width: 100%;
  height: 120%;
  object-fit: cover;
  filter: var(--pc-film-filter);
  will-change: transform;
}

@media (min-width: 992px) {
  .pc-header-photo img {
    left: calc(-1 * var(--shift, 0%));
    width: calc(100% + var(--shift, 0%));
  }
}

/* The same dimming as the photo behind the contact block (Backdrop.vue) */
.pc-header-photo::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(32, 29, 29, 0.55), rgba(32, 29, 29, 0.75));
}
</style>

<style>
.pc-photo-header {
  position: relative;
  overflow: hidden;
}

.pc-photo-header > :not(.pc-header-photo) {
  position: relative;
  z-index: 1;
}
</style>
