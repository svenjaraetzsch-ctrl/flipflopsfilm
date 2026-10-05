<template>
  <div ref="area" class="pc-reveal container" @mousemove="onMove" @mouseleave="hide">
    <div ref="float" class="pc-reveal__float" aria-hidden="true">
      <img
        v-for="(row, i) in rows"
        :key="row.title"
        :ref="(el) => (floatImgs[i] = el)"
        :src="row.image.md"
        alt=""
        loading="lazy"
        decoding="async"
      />
    </div>

    <ul class="pc-reveal__list">
      <li v-for="(row, i) in rows" :key="row.title" class="pc-reveal__row" @mouseenter="show(i)">
        <span class="pc-reveal__no">0{{ i + 1 }}</span>
        <span class="pc-reveal__word">{{ row.title }}</span>
        <span class="pc-reveal__sub">{{ row.sub }}</span>
        <img
          class="pc-reveal__thumb"
          :src="row.image.md"
          :alt="row.image.alt"
          loading="lazy"
          decoding="async"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useFloatReveal } from '@/composables/useFloatReveal'
import { serviceImages } from '@/data/PhotoConcepts/photos'

// The live services list (locales/en.json → services_items).
const rows = [
  { title: 'Production Services', sub: 'Full-service support from prep to wrap.', image: serviceImages[0] },
  { title: 'Locations', sub: 'Scouting and securing unique filming locations.', image: serviceImages[1] },
  { title: 'Tax Incentives', sub: 'Guidance on permits and rebates.', image: serviceImages[2] },
  { title: 'Crew & Operations', sub: 'Trusted crews and smooth operations.', image: serviceImages[3] }
]

const { area, float, imgs: floatImgs, onMove, show, hide } = useFloatReveal()
</script>

<style scoped>
.pc-reveal {
  position: relative;
  padding-bottom: 40px;
}

.pc-reveal__float {
  position: absolute;
  left: 0;
  top: 0;
  width: 340px;
  height: 420px;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.pc-reveal__float img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pc-reveal__list {
  position: relative;
  z-index: 1;
  padding: 0;
  margin: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.pc-reveal__row {
  display: grid;
  grid-template-columns: 60px 1fr 320px;
  align-items: center;
  gap: 20px;
  padding: 34px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  cursor: default;
  transition: opacity 0.35s;
}

.pc-reveal__list:hover .pc-reveal__row {
  opacity: 0.35;
}

.pc-reveal__list:hover .pc-reveal__row:hover {
  opacity: 1;
}

.pc-reveal__no {
  font-size: 13px;
  color: #C8B49A;
}

.pc-reveal__word {
  font-family: 'Mona-Sans UltraLight', sans-serif;
  font-size: clamp(30px, 5.4vw, 84px);
  line-height: 1;
  text-transform: uppercase;
}

.pc-reveal__sub {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.65);
  text-align: right;
}

.pc-reveal__thumb {
  display: none;
}

/* Touch screens have no cursor to follow: show each image as a small print in its row. */
@media (hover: none), (pointer: coarse) {
  .pc-reveal__float {
    display: none;
  }

  .pc-reveal__list:hover .pc-reveal__row {
    opacity: 1;
  }

  .pc-reveal__row {
    grid-template-columns: 1fr 96px;
    grid-template-areas: 'word thumb' 'sub thumb';
    row-gap: 8px;
    padding: 22px 0;
  }

  .pc-reveal__no {
    display: none;
  }

  .pc-reveal__word {
    grid-area: word;
  }

  .pc-reveal__sub {
    grid-area: sub;
    text-align: left;
    font-size: 13px;
  }

  .pc-reveal__thumb {
    grid-area: thumb;
    display: block;
    width: 96px;
    height: 120px;
    object-fit: cover;
  }
}

@media (max-width: 991px) and (hover: hover) {
  .pc-reveal__row {
    grid-template-columns: 40px 1fr;
  }

  .pc-reveal__sub {
    grid-column: 2;
    text-align: left;
  }
}
</style>
