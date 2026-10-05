<template>
  <!-- A quiet background photo for a page header: dimmed, film-graded, fading
       into the page at the bottom, drifting slightly as the header scrolls away.
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
  /* Stops 2px short of the header's bottom edge. At fractional scroll
     positions Chrome let one pixel row of the moving photo slip past the
     clip at that edge, which showed as a thin bright line while scrolling.
     The bottom of the photo is transparent anyway (mask below), so the
     2px are invisible. */
  inset: 0 0 2px 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 55%, transparent 94%);
  mask-image: linear-gradient(to bottom, #000 0%, #000 55%, transparent 94%);
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

/* Darker at the top for the navigation and open in the middle; the mask
   above takes it back to the page colour at the bottom. */
.pc-header-photo::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(32, 29, 29, 0.75) 0%,
    rgba(32, 29, 29, 0.45) 40%,
    rgba(32, 29, 29, 0.6) 70%
  );
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
