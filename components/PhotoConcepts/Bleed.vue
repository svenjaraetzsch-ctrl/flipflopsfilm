<template>
  <div ref="wrap" class="pc-bleed">
    <div ref="frame" class="pc-bleed__frame">
      <video
        v-if="video"
        ref="img"
        class="pc-bleed__img"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
      >
        <source :src="video" type="video/mp4" />
      </video>
      <img
        v-else
        ref="img"
        class="pc-bleed__img"
        :src="image.src"
        :srcset="image.srcset"
        sizes="100vw"
        :width="image.w"
        :height="image.h"
        :alt="image.alt"
        loading="lazy"
        decoding="async"
      />
    </div>
    <div v-if="image" class="pc-bleed__caption container">
      <span v-if="caption">{{ caption }}</span>
      <span class="pc-bleed__credit">Photo · Daniel Bonhoff</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollFx } from '@/composables/useScrollFx'

const props = defineProps({
  // Pass either a photo from data/PhotoConcepts/photos.js or a video URL.
  image: { type: Object, default: null },
  video: { type: String, default: '' },
  caption: { type: String, default: '' },
  // For a frame that is already on screen when the page loads (the hero):
  // run the effect from the very top of the page instead of from when the
  // frame enters the viewport, so it starts fully framed.
  atTop: { type: Boolean, default: false }
})

const wrap = ref(null)
const frame = ref(null)
const img = ref(null)

useScrollFx(() => {
  const start = props.atTop ? 0 : 'top bottom'
  // The frame opens from an inset window to full screen as it scrolls in…
  gsap.fromTo(frame.value,
    { clipPath: 'inset(14% 10% 14% 10%)' },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      ease: 'none',
      scrollTrigger: { trigger: wrap.value, start, end: 'top top', scrub: true }
    }
  )
  // …while the picture settles out of a slow zoom over the whole pass.
  gsap.fromTo(img.value,
    { scale: 1.25 },
    {
      scale: 1,
      ease: 'none',
      scrollTrigger: { trigger: wrap.value, start, end: 'bottom top', scrub: true }
    }
  )
})
</script>

<style scoped>
.pc-bleed {
  position: relative;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
}

.pc-bleed__frame {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.pc-bleed__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform;
}

.pc-bleed__caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 30px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.5);
  pointer-events: none;
}

.pc-bleed__credit {
  margin-left: auto;
}
</style>
