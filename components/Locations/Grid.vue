<template>
  <section class="portfolio-grid portfolio pt-50">
    <div class="container pb-40 bord-thin-bottom">
      <div class="portfolio-grid-wrap">
        <div
          v-for="(item, index) in data"
          :key="item.id"
          class="portfolio-card"
        >
          <div class="img">
            <img :src="item.image" :alt="item.title" />

            <span class="portfolio-number">
              {{ String(index + 1).padStart(2, '0') }}
            </span>

            <div class="info-over">
              <h5>{{ item.title }}</h5>
              <span>{{ item.category }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import data from '@/data/Locations/grid.json';
</script>

<style scoped>
.portfolio-grid-wrap {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.portfolio-card .img {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.portfolio-card .img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Nummer */
.portfolio-number {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 3;
  color: #fff;
  font-size: 13px;
  letter-spacing: 1px;
}

/* responsive */
@media (max-width: 991px) {
  .portfolio-grid-wrap {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 575px) {
  .portfolio-grid-wrap {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  section {
    padding-top: 15px !important;
  }
}
</style>