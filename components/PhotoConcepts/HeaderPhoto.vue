<template>
  <!-- A quiet background photo for a page header: dimmed, film-graded, fading
       into the page at the bottom, drifting slightly as the header scrolls away.
       Place it as the first child of a header that has class "pc-photo-header". -->
  <div ref="wrap" class="pc-header-photo" aria-hidden="true">
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
  image: { type: Object, required: true }
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

/* Darker at the top for the navigation, open in the middle, and fully back
   to the page colour at the bottom so the content below sits on plain dark. */
.pc-header-photo::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(32, 29, 29, 0.75) 0%,
    rgba(32, 29, 29, 0.45) 40%,
    rgba(32, 29, 29, 0.6) 70%,
    #201D1D 100%
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
