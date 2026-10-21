<template>
  <!-- The two founders side by side under "Who we are", in the label column
       where About otherwise has a landscape photo. Each portrait unveils
       upwards like the site's other photos; the second sits a little lower
       and drifts at its own speed. -->
  <div class="about-founders">
    <figure
      v-for="person in team"
      :key="person.id"
      ref="items"
      class="about-founders__item"
    >
      <div class="about-founders__frame">
        <img
          :src="person.portrait"
          width="800"
          height="1000"
          :alt="person.name"
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption class="info mt-20">
        <span class="fz-12 opacity-8">{{ $t('common.founder') }}</span>
        <h6 class="fz-18">{{ person.name }}</h6>
      </figcaption>
    </figure>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import team from '@/data/CreativeAgency/team.json'
import { useScrollFx } from '@/composables/useScrollFx'

const items = ref([])

useScrollFx(() => {
  items.value.forEach((item, i) => {
    const frame = item.querySelector('.about-founders__frame')
    const tl = gsap.timeline({
      delay: i * 0.15,
      scrollTrigger: { trigger: frame, start: 'top 80%', once: true }
    })
    tl.fromTo(frame,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out' }
    ).fromTo(frame.querySelector('img'), { scale: 1.3 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0)
  })

  const last = items.value[items.value.length - 1]
  gsap.fromTo(last,
    { yPercent: 6 },
    {
      yPercent: -6,
      ease: 'none',
      scrollTrigger: { trigger: last, start: 'top bottom', end: 'bottom top', scrub: true }
    }
  )
})
</script>

<style scoped>
.about-founders {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 40px;
}

.about-founders__item {
  margin: 0;
}

.about-founders__item:nth-child(2) {
  margin-top: 70px;
}

.about-founders__frame {
  aspect-ratio: 4 / 5;
  overflow: hidden;
}

.about-founders__frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: var(--pc-film-filter);
}

@media (max-width: 991px) {
  .about-founders {
    gap: 16px;
    margin: 10px 0 40px;
  }

  .about-founders__item:nth-child(2) {
    margin-top: 40px;
  }
}
</style>
