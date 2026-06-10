<template>
  <section class="works thecontainer ontop sub-bg">
    <div
      v-for="item in data"
      :key="item.id"
      class="panel"
    >
      <div class="item">
        <div class="img">
          <img :src="item.img" :alt="item.title" />
        </div>

        <div class="cont d-flex align-items-center">
          <div>
            <span>{{ item.category }}</span>
            <h5>{{ item.title }}</h5>
          </div>

          <div class="ml-auto">
            <h6>{{ item.year }}</h6>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import data from '@/data/Slider/scroll.json';

const handleResize = () => {
  const allTriggers = ScrollTrigger.getAll();

  if (
    (window.innerWidth < 991 && allTriggers.length) ||
    (window.innerWidth > 991 && !allTriggers.length)
  ) {
    window.location.reload();
  }

  allTriggers.forEach((trigger) => trigger.update());
};

onMounted(() => {
  if (window.innerWidth > 991) {
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray('.panel');

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: '.thecontainer',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        end: () => '+=' + window.innerWidth * (sections.length - 1),
      },
    });
  }

  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.thecontainer {
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
}

.panel {
  flex: 0 0 33vw; /* 4 Bilder = 25% Breite pro Bild */
}

.item {
  width: 100%;
}

.img {
  width: 100%;
}

.img img {
  width: 100%;
  height: auto;
  display: block;
}

.cont {
  padding: 20px 0;
}

.thecontainer {
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;

  /* Hintergrund entfernen */
  background: transparent !important;

  /* weniger Abstand oben/unten */
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.panel {
  flex: 0 0 33vw;
  background: transparent !important;
}

.item {
  width: 100%;
  background: transparent !important;
}

.img {
  width: 100%;
}

.img img {
  width: 100%;
  height: auto;
  display: block;
}

.cont {
  padding: 10px 0; /* vorher 20px 0 */
  background: transparent !important;
}

/* Falls die Theme-Klassen Hintergrund/Padding setzen */
.works,
.sub-bg,
.ontop {
  background: transparent !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
</style>