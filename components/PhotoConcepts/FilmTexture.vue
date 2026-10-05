<template>
  <div class="pc-film container">
    <div
      ref="box"
      class="pc-compare"
      @pointerdown="startDrag"
      @pointermove="drag"
      @pointerup="endDrag"
      @pointercancel="endDrag"
    >
      <img class="pc-compare__img" :src="existing" alt="Existing site photo: a ruined building above the sea" />
      <div class="pc-compare__after" :style="{ clipPath: `inset(0 0 0 ${pos}%)` }">
        <div class="pc-filmic">
          <img class="pc-compare__img" :src="existing" alt="" />
        </div>
      </div>
      <div class="pc-compare__handle" :style="{ left: pos + '%' }"><span></span></div>
      <span class="pc-compare__label">Today</span>
      <span class="pc-compare__label pc-compare__label--right">Film treatment</span>
      <input
        v-model.number="pos"
        class="pc-compare__range"
        type="range"
        min="0"
        max="100"
        aria-label="Compare the original photo with the film treatment"
      />
    </div>
    <p class="pc-film__hint">Drag the line to compare. Same file, no re-editing — the look is applied in code.</p>

    <div class="row pc-film__pairs">
      <div v-for="tile in tiles" :key="tile.src" class="col-6 col-lg-3">
        <figure class="pc-film__tile">
          <div :class="{ 'pc-filmic': tile.treated }">
            <img :src="tile.src" :alt="tile.alt" loading="lazy" decoding="async" />
          </div>
          <figcaption>{{ tile.label }}</figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { hierro } from '@/data/PhotoConcepts/hierro'

const existing = '/assets/imgs/locations/folder/04.jpeg'

// Existing site photos with the treatment, next to Daniel's originals.
const tiles = [
  { src: '/assets/imgs/locations/folder/10.jpeg', alt: 'Existing site photo: volcanic road', label: 'Existing · treated', treated: true },
  { src: hierro.crater.md, alt: hierro.crater.alt, label: 'Daniel Bonhoff', treated: false },
  { src: '/assets/imgs/locations/folder/06.jpeg', alt: 'Existing site photo', label: 'Existing · treated', treated: true },
  { src: hierro.coast.md, alt: hierro.coast.alt, label: 'Daniel Bonhoff', treated: false }
]

const box = ref(null)
const pos = ref(50)
let dragging = false

const setFromEvent = (e) => {
  const r = box.value.getBoundingClientRect()
  pos.value = Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100))
}

const startDrag = (e) => {
  dragging = true
  box.value.setPointerCapture(e.pointerId)
  setFromEvent(e)
}

const drag = (e) => {
  if (dragging) setFromEvent(e)
}

const endDrag = () => {
  dragging = false
}
</script>

<style scoped>
.pc-compare {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
  user-select: none;
}

.pc-compare__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.pc-compare__after {
  position: absolute;
  inset: 0;
}

.pc-compare__handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: #fff;
  transform: translateX(-50%);
  pointer-events: none;
}

.pc-compare__handle span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid #fff;
  background: rgba(32, 29, 29, 0.55);
  transform: translate(-50%, -50%);
}

.pc-compare__handle span::before {
  content: '‹ ›';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  letter-spacing: 4px;
  color: #fff;
}

.pc-compare__label {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 6px 14px;
  border-radius: 30px;
  background: rgba(32, 29, 29, 0.6);
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  pointer-events: none;
}

.pc-compare__label--right {
  left: auto;
  right: 20px;
}

/* Keyboard-accessible control; pointer dragging is handled on the box. */
.pc-compare__range {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.pc-compare:focus-within .pc-compare__handle span {
  border-color: #C8B49A;
}

.pc-film__hint {
  margin-top: 16px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.pc-film__pairs {
  margin-top: 60px;
  row-gap: 30px;
}

.pc-film__tile {
  margin: 0;
}

.pc-film__tile > div {
  aspect-ratio: 4 / 5;
  overflow: hidden;
}

.pc-film__tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.pc-film__tile figcaption {
  margin-top: 10px;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 767px) {
  .pc-compare {
    aspect-ratio: 4 / 5;
  }

  .pc-compare__label {
    top: 12px;
    left: 12px;
    padding: 4px 10px;
    font-size: 10px;
    letter-spacing: 1px;
  }

  .pc-compare__label--right {
    left: auto;
    right: 12px;
  }

  .pc-film__tile figcaption {
    font-size: 10px;
    letter-spacing: 1px;
  }
}
</style>
