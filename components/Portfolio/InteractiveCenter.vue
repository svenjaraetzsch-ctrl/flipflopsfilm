<template>
  <section class="interactive-center logo-hover-section">
    <div
      class="bg-logo"
      :style="{ filter: `drop-shadow(0 0 0 ${activeColor})` }"
    >
      <img src="/assets/imgs/logos/favicon.svg" alt="Logo" />
    </div>

    <div class="container text-center">
      <div
        v-for="item in data"
        :key="item.id"
        class="item block"
        @mouseenter="activeColor = item.color"
        @mouseleave="activeColor = '#ffffff'"
      >
        <a :href="item.link" class="block__link animsition-link">
          <div class="cont">
            <h4 class="f-bold">{{ item.title }}</h4>
            <p>{{ item.category }}</p>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import data from '@/data/Portfolio/interactive-center.json';

const activeColor = ref('#ffffff');
</script>

<style scoped>
.logo-hover-section {
  position: relative;
  overflow: hidden;
}

/* LOGO HINTER DEM TEXT */
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

/* TEXT IMMER DARÜBER */
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