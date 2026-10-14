<template>
  <!-- The location photos of the header marquee as a calm band of their own:
       flat, running slowly to the left, paused while pointed at. -->
  <section class="loc-band">
    <div class="container">
      <span class="sub-title bord">{{ $t('locations.band_label') }}</span>
    </div>
    <div class="loc-band__track" aria-hidden="true">
      <div v-for="copy in 2" :key="copy" class="loc-band__row">
        <figure v-for="item in data" :key="`${copy}-${item.id}`" class="loc-band__item">
          <img :src="item.image" alt="" loading="lazy" decoding="async" />
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup>
import data from '@/data/Locations/grid.json'
</script>

<style scoped>
.loc-band {
  padding: 40px 0 100px;
  overflow: hidden;
}

.loc-band__track {
  display: flex;
  width: max-content;
  margin-top: 40px;
  animation: loc-band 70s linear infinite;
}

.loc-band__track:hover {
  animation-play-state: paused;
}

.loc-band__row {
  display: flex;
  gap: 16px;
  padding-right: 16px;
}

.loc-band__item {
  flex: 0 0 auto;
  height: 280px;
  aspect-ratio: 3 / 2;
  margin: 0;
  overflow: hidden;
}

.loc-band__item img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: var(--pc-film-filter);
}

@keyframes loc-band {
  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 767px) {
  .loc-band {
    padding: 20px 0 60px;
  }

  .loc-band__track {
    margin-top: 24px;
  }

  .loc-band__item {
    height: 170px;
  }
}

/* Without motion the band becomes a row to swipe through */
@media (prefers-reduced-motion: reduce) {
  .loc-band__track {
    width: auto;
    animation: none;
    overflow-x: auto;
  }

  .loc-band__row + .loc-band__row {
    display: none;
  }
}
</style>
