<template>
  <header>
    <div class="caption">
      <div class="text-center">
        <h1>{{ $t('locations.header') }}</h1>
      </div>
    </div>

    <div class="img-marq d-none d-md-block">
      <div class="circle-shadow"></div>
      <div class="shadow-left box-shadow"></div>
      <div class="shadow-right box-shadow"></div>

      <div class="slide-img-left">
        <div class="box">
          <img v-for="item in leftImages" :key="`left-1-${item.id}`" :src="item.image" :alt="item.title" />
        </div>
        <div class="box">
          <img v-for="item in leftImages" :key="`left-2-${item.id}`" :src="item.image" :alt="item.title" />
        </div>
      </div>

      <div class="slide-img-right">
        <div class="box">
          <img v-for="item in rightImages" :key="`right-1-${item.id}`" :src="item.image" :alt="item.title" />
        </div>
        <div class="box">
          <img v-for="item in rightImages" :key="`right-2-${item.id}`" :src="item.image" :alt="item.title" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import data from '@/data/Locations/grid.json'

// Seeded so server and client produce the same order (Math.random caused
// hydration mismatches, and the static build froze one random order anyway).
const shuffle = (array, seed) => {
  const arr = [...array]
  let s = seed
  const rand = () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const leftImages = shuffle(data, 7)
const rightImages = shuffle(data, 42)
</script>

<style scoped>
/* Film look, so these photos sit in the same family as Daniel Bonhoff's. */
.img-marq img {
  filter: var(--pc-film-filter);
}
</style>
