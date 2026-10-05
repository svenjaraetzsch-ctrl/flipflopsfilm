<template>
  <section class="interactive-center logo-hover-section">
    <!-- The logo as a window onto the islands: the service photos take turns
         inside it at rest; hovering a service shows that service's photo. -->
    <div class="svc-logo" aria-hidden="true">
      <div class="svc-logo__window">
        <div ref="logoInner" class="svc-logo__inner">
          <img
            v-for="(image, i) in serviceImages"
            :key="image.src"
            :ref="(el) => (logoImgs[i] = el)"
            class="svc-logo__img"
            :src="image.src"
            :srcset="image.srcset"
            sizes="min(1040px, 130vw)"
            alt=""
            decoding="async"
          />
        </div>
      </div>
    </div>

    <div class="container text-center">
      <div
        v-for="(item, i) in mergedData"
        :key="item.id"
        class="item block"
        :class="{ 'is-active': hoverIndex === i, 'is-dim': hoverIndex > -1 && hoverIndex !== i }"
        @mouseenter="enter(i)"
        @mouseleave="leave"
      >
        <!-- Production Services is this very page: scroll down to its section
             instead of reloading the page. -->
        <a
          v-if="item.link === '/services'"
          href="#production-services"
          class="block__link"
          @click.prevent="scrollToSection('production-services')"
        >
          <div class="cont">
            <h4 class="f-bold">{{ item.title }}</h4>
            <p>{{ item.category }}</p>
          </div>
        </a>
        <NuxtLink v-else :to="localePath(item.link)" class="block__link animsition-link">
          <div class="cont">
            <h4 class="f-bold">{{ item.title }}</h4>
            <p>{{ item.category }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onBeforeUnmount } from 'vue'
import staticData from '@/data/Portfolio/interactive-center.json'
import { serviceImages } from '@/data/PhotoConcepts/photos'
import { useScrollFx } from '@/composables/useScrollFx'

const { tm, rt } = useI18n()
const localePath = useLocalePath()
const hoverIndex = ref(-1)

const mergedData = computed(() => {
  const translated = tm('services_items')
  return staticData.map((item, i) => {
    const t = translated[i]
    return {
      ...item,
      title: t ? rt(t.title) : item.title,
      category: t ? rt(t.category) : item.category
    }
  })
})

const logoImgs = []
const logoInner = ref(null)

let ready = false
let reduced = false
let cycle = null
let current = 0
let leaveTimer = null

const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

// ScrollSmoother (desktop) moves the page with transforms, so scroll through
// it; on phones there is no smoother, so scroll natively and stop below the
// fixed navbar.
const scrollToSection = (id) => {
  const smoother = typeof ScrollSmoother !== 'undefined' && ScrollSmoother.get()
  if (smoother) return smoother.scrollTo(`#${id}`, true, 'top 80px')
  const el = document.getElementById(id)
  if (!el) return
  const nav = document.querySelector('.topnav')?.offsetHeight || 0
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - nav, behavior: 'smooth' })
}

// Crossfade to photo i inside the logo: slow at rest, quicker on hover.
const showInLogo = (i, duration = 1.4) => {
  logoImgs.forEach((el, j) => gsap.to(el, { autoAlpha: j === i ? 1 : 0, duration, ease: 'sine.inOut', overwrite: 'auto' }))
  current = i
}

const startCycle = () => {
  if (reduced || cycle) return
  cycle = gsap.delayedCall(3.2, function next() {
    showInLogo((current + 1) % logoImgs.length)
    cycle = gsap.delayedCall(3.2, next)
  })
}

const stopCycle = () => {
  cycle?.kill()
  cycle = null
}

useScrollFx(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  gsap.set(logoImgs, { autoAlpha: 0 })
  gsap.set(logoImgs[0], { autoAlpha: 1 })
  if (!reduced) {
    gsap.to(logoInner.value, { scale: 1.12, duration: 9, ease: 'sine.inOut', yoyo: true, repeat: -1 })
  }
  ready = true
  startCycle()
  return stopCycle
})

const enter = (i) => {
  if (!ready || !canHover()) return
  clearTimeout(leaveTimer)
  stopCycle()
  if (hoverIndex.value === i) return
  hoverIndex.value = i
  showInLogo(i, 0.7)
  // The new photo settles in with a small zoom.
  if (!reduced) gsap.fromTo(logoImgs[i], { scale: 1.1 }, { scale: 1, duration: 1.6, ease: 'power2.out' })
}

// A short delay so moving from one service to the next doesn't restart
// the rest cycle in between. The cycle carries on from the hovered photo.
const leave = () => {
  if (!ready || !canHover()) return
  clearTimeout(leaveTimer)
  leaveTimer = setTimeout(() => {
    hoverIndex.value = -1
    startCycle()
  }, 90)
}

onBeforeUnmount(() => clearTimeout(leaveTimer))
</script>

<style scoped>
.logo-hover-section {
  position: relative;
  overflow: hidden;
}

/* ---- Logo window ---- */
.svc-logo {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  /* How strongly the photo shows through the logo. */
  opacity: 0.45;
}

/* Large, so the photo inside reads as a landscape and the logo as one bold
   shape rather than cutting the picture into small pieces. */
.svc-logo__window {
  width: min(1040px, 130vw);
  aspect-ratio: 657 / 493;
  overflow: hidden;
  -webkit-mask: url('/assets/imgs/logos/icon.svg') center / contain no-repeat;
  mask: url('/assets/imgs/logos/icon.svg') center / contain no-repeat;
  /* Vector mask (public/assets/imgs/logos/icon.svg): sharp at any size,
     unlike the 657px icon PNG it replaces here. */
}

.svc-logo__inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.svc-logo__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: var(--pc-film-filter);
}

/* ---- Titles ---- */
.container {
  position: relative;
  z-index: 2;
}

.item {
  cursor: pointer;
  transition: opacity 0.45s ease;
}

/* Keeps the small descriptions readable over the photo in the logo. */
.item p {
  text-shadow: 0 1px 14px rgba(0, 0, 0, 0.8);
}

.item.is-dim {
  opacity: 0.3;
}

.item.is-active h4 {
  color: #fff;
  -webkit-text-stroke-color: transparent;
}

@media (max-width: 768px) {
  :deep(.interactive-center) {
    padding-top: 100px !important;
    padding-bottom: 30px !important;
  }
  :deep(.interactive-center .item a) {
    padding: 12px 0 !important;
  }
}
</style>
