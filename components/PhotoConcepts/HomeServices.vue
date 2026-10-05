<template>
  <div ref="area" class="pc-home-services" @mousemove="onMove">
    <!-- The live services list, unchanged; only the photo on hover is added. -->
    <CreativeAgencyAwards />
    <div ref="float" class="pc-home-services__float" aria-hidden="true">
      <img
        v-for="(image, i) in images"
        :key="image.src"
        :ref="(el) => (imgs[i] = el)"
        :src="image.md"
        alt=""
        loading="lazy"
        decoding="async"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useFloatReveal } from '@/composables/useFloatReveal'
import { hierro } from '@/data/PhotoConcepts/hierro'

// Same order as data/CreativeAgency/awards.json: Production Services,
// Locations, Tax Incentives, Crew & Operations.
const images = [hierro.serpentine, hierro.beach, hierro.chapel, hierro.sabina]

const { area, float, imgs, onMove, show, hide } = useFloatReveal()

let rows = []
let list = null
const enters = []

onMounted(() => {
  rows = [...area.value.querySelectorAll('.item-line')]
  rows.forEach((row, i) => {
    enters[i] = () => show(i)
    row.addEventListener('mouseenter', enters[i])
  })
  list = rows[0]?.parentElement
  list?.addEventListener('mouseleave', hide)
})

onBeforeUnmount(() => {
  rows.forEach((row, i) => row.removeEventListener('mouseenter', enters[i]))
  list?.removeEventListener('mouseleave', hide)
})
</script>

<style scoped>
.pc-home-services {
  position: relative;
}

.pc-home-services__float {
  position: absolute;
  left: 0;
  top: 0;
  width: 260px;
  height: 330px;
  z-index: 3;
  pointer-events: none;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.45);
}

.pc-home-services__float img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (hover: none), (pointer: coarse) {
  .pc-home-services__float {
    display: none;
  }
}
</style>
