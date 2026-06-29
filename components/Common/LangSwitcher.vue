<template>
  <div class="lang-switcher">
    <template v-for="(loc, i) in locales" :key="loc.code">
      <NuxtLink
        :to="switchLocalePath(loc.code)"
        :class="['lang-item', { active: locale === loc.code }]"
      >{{ loc.code.toUpperCase() }}</NuxtLink>
      <span v-if="i < locales.length - 1" class="lang-sep">/</span>
    </template>
  </div>
</template>

<script setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<style scoped>
.lang-switcher {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  letter-spacing: 1.5px;
}
.lang-item {
  opacity: 0.4;
  transition: opacity 0.25s;
  color: inherit;
  text-decoration: none;
}
.lang-item:hover,
.lang-item.active {
  opacity: 1;
}
.lang-sep {
  opacity: 0.2;
  font-size: 10px;
}
</style>
