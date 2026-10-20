<template>
  <!-- Review only: switches between the proposals for mainland Spain on the
       Locations map. Fixed to the bottom of the screen. -->
  <nav class="loc-options" aria-label="Proposals">
    <span class="loc-options__label">Mainland Spain</span>
    <NuxtLink
      v-for="item in options"
      :key="item.no"
      :to="localePath(`/services/locations-mainland-${item.no}`)"
      :class="{ 'is-active': item.no === current }"
      :aria-current="item.no === current ? 'page' : null"
    >
      <span>0{{ item.no }}</span><em>{{ item.name }}</em>
    </NuxtLink>
  </nav>
</template>

<script setup>
defineProps({
  current: { type: Number, required: true }
})

const localePath = useLocalePath()

const options = [
  { no: 1, name: 'Corner' },
  { no: 2, name: 'Spain first' },
  { no: 3, name: 'Side by side' }
]
</script>

<style scoped>
.loc-options {
  position: fixed;
  left: 50%;
  bottom: 22px;
  z-index: 90;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px;
  border-radius: 40px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(32, 29, 29, 0.86);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  transform: translateX(-50%);
}

.loc-options__label {
  padding: 0 10px 0 14px;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #C8B49A;
  white-space: nowrap;
}

.loc-options a {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 9px 16px;
  border-radius: 30px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  white-space: nowrap;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.loc-options a span {
  font-size: 11px;
  letter-spacing: 1px;
  color: #C8B49A;
}

.loc-options a em {
  font-style: normal;
}

.loc-options a:hover,
.loc-options a.is-active {
  color: #fff;
}

.loc-options a.is-active {
  background: rgba(255, 255, 255, 0.1);
}

/* Phones: numbers only, the active name beside its number */
@media (max-width: 767px) {
  .loc-options {
    left: 12px;
    bottom: 14px;
    transform: none;
  }

  .loc-options__label {
    display: none;
  }

  .loc-options a {
    padding: 8px 12px;
  }

  .loc-options a em {
    display: none;
  }

  .loc-options a.is-active em {
    display: inline;
  }
}
</style>
