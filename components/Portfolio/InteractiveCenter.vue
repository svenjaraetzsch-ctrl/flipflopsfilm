<template>
  <section class="interactive-center logo-hover-section">
    <div class="bg-logo" :style="{ filter: `drop-shadow(0 0 0 ${activeColor})` }">
      <img src="/assets/imgs/logos/favicon.svg" alt="Logo" />
    </div>

    <div class="container text-center">
      <div
        v-for="item in mergedData"
        :key="item.id"
        class="item block"
        @mouseenter="activeColor = item.color"
        @mouseleave="activeColor = '#ffffff'"
      >
        <NuxtLink :to="localePath(item.link)" class="block__link animsition-link">
          <div class="cont">
            <h4 class="f-bold">{{ item.title }}</h4>
            <p>{{ item.category }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import staticData from '@/data/Portfolio/interactive-center.json'

const { tm, rt } = useI18n()
const localePath = useLocalePath()
const activeColor = ref('#ffffff')

const mergedData = computed(() => {
  const translated = tm('services_items')
  return staticData.map((item, i) => {
    const t = translated[i]
    return {
      ...item,
      title: t ? rt(t.title) : item.title,
      category: t ? rt(t.category) : item.category
    }
  })
})
</script>

<style scoped>
.logo-hover-section {
  position: relative;
  overflow: hidden;
}

.bg-logo {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 1;
}

.bg-logo img {
  width: 500px;
  opacity: 0.05;
  transition: all 0.4s ease;
}

.container {
  position: relative;
  z-index: 2;
}

.item {
  cursor: pointer;
}

.item:hover h4 {
  color: var(--main-color);
}
</style>
