<template>
  <div ref="pin" class="pc-bg">
    <div class="pc-bg__layers">
      <img
        v-for="(step, i) in steps"
        :key="step.title"
        :ref="(el) => (layers[i] = el)"
        class="pc-bg__layer"
        :src="step.image.src"
        :srcset="step.image.srcset"
        sizes="100vw"
        :width="step.image.w"
        :height="step.image.h"
        :alt="step.image.alt"
        :loading="i === 0 ? 'eager' : 'lazy'"
        decoding="async"
      />
      <div class="pc-bg__shade"></div>
    </div>

    <div class="pc-bg__content container">
      <span class="sub-title">What we believe</span>
      <div class="pc-bg__texts">
        <div
          v-for="(step, i) in steps"
          :key="step.title"
          :ref="(el) => (texts[i] = el)"
          class="pc-bg__text"
        >
          <span class="pc-bg__no">0{{ i + 1 }} / 0{{ steps.length }}</span>
          <h3 class="pc-bg__title">{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollFx } from '@/composables/useScrollFx'
import { hierro } from '@/data/PhotoConcepts/hierro'

// Copy taken from the live "What we believe" block (locales/en.json).
const steps = [
  {
    title: 'Local First',
    text: 'The strongest productions are built on local knowledge. Understanding the people, culture and practical realities of a location creates smoother workflows and better creative outcomes.',
    image: hierro.village
  },
  {
    title: 'Relationships Matter',
    text: 'Great productions are built on trust. Long-term partnerships with clients, crew, suppliers and creative collaborators let us solve challenges before they become problems.',
    image: hierro.sabina
  },
  {
    title: 'One Team',
    text: "We don't see a distinction between local and international teams. Every project works best when communication is clear and everyone moves towards the same goal.",
    image: hierro.fog
  },
  {
    title: 'Solutions Over Obstacles',
    text: 'Production rarely follows a perfect plan. We stay flexible, adapt quickly and find practical solutions that keep projects moving without compromising quality.',
    image: hierro.crater
  }
]

const pin = ref(null)
const layers = ref([])
const texts = ref([])

useScrollFx(() => {
  const n = steps.length
  const L = layers.value
  const T = texts.value

  gsap.set(L.slice(1), { autoAlpha: 0 })
  gsap.set(T.slice(1), { autoAlpha: 0, y: 40 })

  // One viewport of scrolling per step. Each step holds, then the next
  // landscape fades in over it while the text hands over.
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: pin.value,
      start: 'top top',
      end: () => '+=' + (n - 1) * window.innerHeight,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  })

  for (let i = 1; i < n; i++) {
    const at = i - 1 + 0.35
    tl.to(T[i - 1], { autoAlpha: 0, y: -40, duration: 0.25 }, at)
      .to(L[i], { autoAlpha: 1, duration: 0.4 }, at)
      .fromTo(L[i], { scale: 1.12 }, { scale: 1, duration: 0.65, ease: 'none' }, at)
      .to(T[i], { autoAlpha: 1, y: 0, duration: 0.25 }, at + 0.2)
  }
  tl.to({}, { duration: 0.2 })
})
</script>

<style scoped>
.pc-bg {
  position: relative;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
}

.pc-bg__layers {
  position: absolute;
  inset: 0;
}

.pc-bg__layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform, opacity;
}

.pc-bg__shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, rgba(32, 29, 29, 0.85) 0%, rgba(32, 29, 29, 0.25) 55%, rgba(32, 29, 29, 0.35) 100%);
}

.pc-bg__content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 12vh;
}

.pc-bg__content .sub-title {
  color: #C8B49A;
  margin-bottom: 24px;
}

/* All steps share one grid cell, so the block is as tall as the longest step
   and the label above never collides with a title that wraps. */
.pc-bg__texts {
  display: grid;
}

.pc-bg__text {
  grid-area: 1 / 1;
  align-self: end;
  max-width: 900px;
}

.pc-bg__no {
  display: block;
  font-size: 13px;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 14px;
}

.pc-bg__title {
  font-family: 'Mona-Sans ExtraBold', sans-serif;
  font-size: clamp(38px, 6vw, 96px);
  line-height: 1;
  text-transform: uppercase;
  margin-bottom: 24px;
}

.pc-bg__text p {
  max-width: 560px;
  color: rgba(255, 255, 255, 0.9);
}

@media (max-width: 991px) {
  .pc-bg__text p {
    font-size: 15px;
  }
}
</style>
