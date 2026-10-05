<template>
  <!-- Puts a dimmed photograph behind whatever section is placed inside it,
       e.g. the contact block or "Read more". The section stays unchanged. -->
  <div class="pc-backdrop">
    <div class="pc-backdrop__bg">
      <img
        :src="image.src"
        :srcset="image.srcset"
        sizes="100vw"
        :width="image.w"
        :height="image.h"
        :alt="image.alt"
        loading="lazy"
        decoding="async"
      />
    </div>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  image: { type: Object, required: true }
})
</script>

<style scoped>
.pc-backdrop {
  position: relative;
}

.pc-backdrop__bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.pc-backdrop__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pc-backdrop__bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(32, 29, 29, 0.55), rgba(32, 29, 29, 0.75));
}

/* The section on top: above the photo, and without its own background
   colour (e.g. the theme's .sub-bg on "Read more") hiding the photo. */
.pc-backdrop > :slotted(section) {
  position: relative;
  background: transparent;
}
</style>
