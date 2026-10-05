<template>
  <!-- An editorial photo for the empty label column next to a block of text.
       It unveils upwards once it is well into view (concept 05). -->
  <figure class="pc-side-photo" :class="`pc-side-photo--${shape}`">
    <div ref="frame" class="pc-side-photo__frame">
      <img
        ref="img"
        :src="image.src"
        :srcset="image.srcset"
        sizes="(max-width: 991px) 100vw, 30vw"
        :width="image.w"
        :height="image.h"
        :alt="image.alt"
        loading="lazy"
        decoding="async"
      />
    </div>
    <figcaption>{{ image.island }}</figcaption>
  </figure>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollFx } from '@/composables/useScrollFx'

defineProps({
  image: { type: Object, required: true },
  // 'portrait' beside longer text, 'landscape' beside shorter text.
  shape: { type: String, default: 'portrait' }
})

const frame = ref(null)
const img = ref(null)

useScrollFx(() => {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: frame.value, start: 'top 85%', once: true }
  })
  tl.fromTo(frame.value,
    { clipPath: 'inset(100% 0% 0% 0%)' },
    { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out' }
  ).fromTo(img.value, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0)
})
</script>

<style scoped>
.pc-side-photo {
  margin: 40px 0 0;
  width: 78%;
}

.pc-side-photo__frame {
  overflow: hidden;
}

.pc-side-photo--portrait .pc-side-photo__frame {
  aspect-ratio: 4 / 5;
}

.pc-side-photo--landscape .pc-side-photo__frame {
  aspect-ratio: 3 / 2;
}

.pc-side-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.pc-side-photo figcaption {
  margin-top: 12px;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}

/* Stacked layout on phones and tablets: label, photo, then the text. */
@media (max-width: 991px) {
  .pc-side-photo {
    width: 100%;
    margin: 10px 0 40px;
  }

  .pc-side-photo--portrait .pc-side-photo__frame,
  .pc-side-photo--landscape .pc-side-photo__frame {
    aspect-ratio: 16 / 10;
  }
}
</style>
