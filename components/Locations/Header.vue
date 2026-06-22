<template>
  <header>
    <div class="caption">
      <div class="text-center">
        <h1>{{ $t('locations.header') }}</h1>
      </div>
    </div>

    <div class="img-marq">
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

const shuffle = (array) => {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const leftImages = shuffle(data)
const rightImages = shuffle(data)
</script>
