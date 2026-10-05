<template>
  <div ref="area" class="pc-reveal container" @mousemove="onMove" @mouseleave="hide">
    <div ref="float" class="pc-reveal__float" aria-hidden="true">
      <img
        v-for="(row, i) in rows"
        :key="row.title"
        :ref="(el) => (floatImgs[i] = el)"
        :src="row.image.md"
        alt=""
        loading="lazy"
        decoding="async"
      />
    </div>

    <ul class="pc-reveal__list">
      <li v-for="(row, i) in rows" :key="row.title" class="pc-reveal__row" @mouseenter="show(i)">
        <span class="pc-reveal__no">0{{ i + 1 }}</span>
        <span class="pc-reveal__word">{{ row.title }}</span>
        <span class="pc-reveal__sub">{{ row.sub }}</span>
        <img
          class="pc-reveal__thumb"
          :src="row.image.md"
          :alt="row.image.alt"
          loading="lazy"
          decoding="async"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollFx } from '@/composables/useScrollFx'
import { hierro } from '@/data/PhotoConcepts/hierro'

// The live services list (locales/en.json → services_items).
const rows = [
  { title: 'Production Services', sub: 'Full-service support from prep to wrap.', image: hierro.serpentine },
  { title: 'Locations', sub: 'Scouting and securing unique filming locations.', image: hierro.beach },
  { title: 'Tax Incentives', sub: 'Guidance on permits and rebates.', image: hierro.chapel },
  { title: 'Crew & Operations', sub: 'Trusted crews and smooth operations.', image: hierro.sabina }
]

const area = ref(null)
const float = ref(null)
const floatImgs = []

let moveX = null
let moveY = null
let active = -1
let lastX = 0

const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

useScrollFx(() => {
  gsap.set(float.value, { autoAlpha: 0, scale: 0.85 })
  gsap.set(floatImgs, { autoAlpha: 0 })
  moveX = gsap.quickTo(float.value, 'x', { duration: 0.6, ease: 'power3' })
  moveY = gsap.quickTo(float.value, 'y', { duration: 0.6, ease: 'power3' })
})

const onMove = (e) => {
  if (!moveX || !canHover()) return
  const box = area.value.getBoundingClientRect()
  const x = e.clientX - box.left - float.value.offsetWidth / 2
  const y = e.clientY - box.top - float.value.offsetHeight / 2
  moveX(x)
  moveY(y)
  // A slight tilt in the direction of travel makes the print feel handled.
  gsap.to(float.value, { rotation: gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.6), duration: 0.5 })
  lastX = e.clientX
}

const show = (i) => {
  if (!moveX || !canHover() || i === active) return
  if (active > -1) gsap.to(floatImgs[active], { autoAlpha: 0, duration: 0.3 })
  gsap.to(floatImgs[i], { autoAlpha: 1, duration: 0.3 })
  gsap.to(float.value, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'power3.out' })
  active = i
}

const hide = () => {
  if (!moveX) return
  gsap.to(float.value, { autoAlpha: 0, scale: 0.85, rotation: 0, duration: 0.35 })
  if (active > -1) gsap.to(floatImgs[active], { autoAlpha: 0, duration: 0.35 })
  active = -1
}
</script>

<style scoped>
.pc-reveal {
  position: relative;
  padding-bottom: 40px;
}

.pc-reveal__float {
  position: absolute;
  left: 0;
  top: 0;
  width: 340px;
  height: 420px;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.pc-reveal__float img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pc-reveal__list {
  position: relative;
  z-index: 1;
  padding: 0;
  margin: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.pc-reveal__row {
  display: grid;
  grid-template-columns: 60px 1fr 320px;
  align-items: center;
  gap: 20px;
  padding: 34px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  cursor: default;
  transition: opacity 0.35s;
}

.pc-reveal__list:hover .pc-reveal__row {
  opacity: 0.35;
}

.pc-reveal__list:hover .pc-reveal__row:hover {
  opacity: 1;
}

.pc-reveal__no {
  font-size: 13px;
  color: #C8B49A;
}

.pc-reveal__word {
  font-family: 'Mona-Sans UltraLight', sans-serif;
  font-size: clamp(30px, 5.4vw, 84px);
  line-height: 1;
  text-transform: uppercase;
}

.pc-reveal__sub {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.65);
  text-align: right;
}

.pc-reveal__thumb {
  display: none;
}

/* Touch screens have no cursor to follow: show each image as a small print in its row. */
@media (hover: none), (pointer: coarse) {
  .pc-reveal__float {
    display: none;
  }

  .pc-reveal__list:hover .pc-reveal__row {
    opacity: 1;
  }

  .pc-reveal__row {
    grid-template-columns: 1fr 96px;
    grid-template-areas: 'word thumb' 'sub thumb';
    row-gap: 8px;
    padding: 22px 0;
  }

  .pc-reveal__no {
    display: none;
  }

  .pc-reveal__word {
    grid-area: word;
  }

  .pc-reveal__sub {
    grid-area: sub;
    text-align: left;
    font-size: 13px;
  }

  .pc-reveal__thumb {
    grid-area: thumb;
    display: block;
    width: 96px;
    height: 120px;
    object-fit: cover;
  }
}

@media (max-width: 991px) and (hover: hover) {
  .pc-reveal__row {
    grid-template-columns: 40px 1fr;
  }

  .pc-reveal__sub {
    grid-column: 2;
    text-align: left;
  }
}
</style>
