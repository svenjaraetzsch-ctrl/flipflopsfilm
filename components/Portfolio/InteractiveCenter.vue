<template>
  <section class="interactive-center logo-hover-section">
    <div class="bg-logo">
      <div
        class="logo-mask"
        :style="{
          backgroundColor: activeColor,
          opacity: isHovering ? 0.45 : 0.06
        }"
      ></div>
    </div>

    <div class="container text-center">
      <div
        v-for="item in mergedData"
        :key="item.id"
        class="item block"
        @mouseenter="activeColor = item.color; isHovering = true"
        @mouseleave="activeColor = '#ffffff'; isHovering = false"
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
const isHovering = ref(false)

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

.logo-mask {
  width: 500px;
  height: 500px;
  -webkit-mask: url('/assets/imgs/logos/icon-transparent.png') center / contain no-repeat;
  mask: url('/assets/imgs/logos/icon-transparent.png') center / contain no-repeat;
  background-color: #ffffff;
  transition: background-color 0.4s ease, opacity 0.4s ease;
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

@media (max-width: 768px) {
  :deep(.interactive-center) {
    padding-top: 100px !important;
    padding-bottom: 30px !important;
  }
  :deep(.interactive-center .item a) {
    padding: 12px 0 !important;
  }
}
</style>
