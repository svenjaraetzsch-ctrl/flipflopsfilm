<template>
  <div class="lang-switcher">
    <select v-model="selected" aria-label="Language">
      <option
        v-for="loc in locales"
        :key="loc.code"
        :value="loc.code"
      >{{ loc.code.toUpperCase() }}</option>
    </select>
  </div>
</template>

<script setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()

const selected = computed({
  get: () => locale.value,
  set: (val) => {
    const path = switchLocalePath(val)
    if (path) router.push(path)
  }
})
</script>

<style scoped>
.lang-switcher {
  display: inline-flex;
  align-items: center;
}

select {
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  color: inherit;
  font-family: inherit;
  font-size: 11px;
  letter-spacing: 2px;
  cursor: pointer;
  padding: 2px 18px 2px 0;
  outline: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='rgba(255,255,255,0.5)'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 2px center;
  background-size: 8px;
  transition: border-color 0.25s, opacity 0.25s;
  opacity: 0.6;
}

select:hover,
select:focus {
  opacity: 1;
  border-bottom-color: rgba(255, 255, 255, 0.8);
}

option {
  background: #201D1D;
  color: #fff;
}
</style>
