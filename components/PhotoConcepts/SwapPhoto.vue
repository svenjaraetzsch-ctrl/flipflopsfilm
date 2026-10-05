<template>
  <!-- A portrait frame for the label column next to a list: it unveils when
       scrolled into view and crossfades to the photo of the active item. -->
  <div class="pc-swap">
    <div ref="frame" class="pc-swap__frame">
      <img
        v-for="(image, i) in images"
        :key="image.src"
        class="pc-swap__img"
        :class="{ 'is-active': i === active }"
        :src="image.src"
        :srcset="image.srcset"
        sizes="(max-width: 991px) 100vw, 45vw"
        :width="image.w"
        :height="image.h"
        :alt="i === active ? image.alt : ''"
        loading="lazy"
        decoding="async"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollFx } from '@/composables/useScrollFx'

defineProps({
  images: { type: Array, required: true },
  active: { type: Number, default: 0 }
})

const frame = ref(null)

useScrollFx(() => {
  gsap.fromTo(frame.value,
    { clipPath: 'inset(100% 0% 0% 0%)' },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.4,
      ease: 'expo.out',
      scrollTrigger: { trigger: frame.value, start: 'top 80%', once: true }
    }
  )
})
</script>

<style scoped>
.pc-swap {
  margin-top: 40px;
  width: 82%;
}

.pc-swap__frame {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
}

.pc-swap__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: var(--pc-film-filter);
  opacity: 0;
  transform: scale(1.06);
  transition: opacity 0.8s ease, transform 2.4s ease;
}

.pc-swap__img.is-active {
  opacity: 1;
  transform: scale(1);
}

/* Right-hand column beside a list instead of under a label */
.pc-swap--right {
  margin-top: 0;
  margin-left: auto;
}

@media (max-width: 991px) {
  .pc-swap {
    width: 78%;
    margin: 10px 0 40px;
  }

  /* Comes after the list when stacked */
  .pc-swap--right {
    margin: 40px 0 0 auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pc-swap__img {
    transform: none;
    transition: opacity 0.4s ease;
  }
}
</style>
