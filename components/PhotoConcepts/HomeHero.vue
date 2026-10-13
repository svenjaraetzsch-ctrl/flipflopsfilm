<template>
  <!-- Same title as CreativeAgency/Header.vue. Below it the video opens from an
       inset window to full screen as the page scrolls and settles out of a
       slow zoom, with a compare line on it: the original
       left of the line, the cinematic look right of it. -->
  <header class="crev-header pc-hero">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="caption text-center">
            <h1 style="position: absolute; opacity: 0;">Flip Flops Film</h1>
            <h1 class="f-xbold"><span class="f-ultra-light d-block">{{ t('home.hero_title1') }}</span>{{ t('home.hero_title2') }}</h1>
          </div>
        </div>
      </div>
    </div>
    <div ref="wrap" class="pc-hero__bleed mt-50">
      <div class="pc-hero__frame">
        <video ref="video" autoplay muted loop playsinline preload="auto" class="pc-hero__video">
          <source src="/assets/vid/flipflops_video_smaller-verkleinert-online.mp4" type="video/mp4" />
        </video>
      </div>
      <!-- The line, its labels and the look sit in a window that always
           matches the visible part of the video, so they stay in view while it
           opens and a drag maps onto what is actually seen. The look is a
           backdrop filter over the one video rather than a second copy of it,
           so both sides always show the same frame. -->
      <div
        ref="stage"
        class="pc-hero__window"
        @pointerdown="startDrag"
        @pointermove="drag"
        @pointerup="endDrag"
        @pointercancel="endDrag"
      >
        <div class="pc-hero__look" :style="{ clipPath: `inset(0 0 0 ${pos}%)` }" aria-hidden="true"></div>
        <div class="pc-hero__handle" :style="{ left: pos + '%' }"><span></span></div>
        <span class="pc-hero__label">{{ t('compare.original') }}</span>
        <span class="pc-hero__label pc-hero__label--right">{{ t('compare.cinematic') }}</span>
        <input
          v-model.number="pos"
          class="pc-hero__range"
          type="range"
          min="0"
          max="100"
          :aria-label="t('compare.label')"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useCompareLine } from '@/composables/useCompareLine'
import { useScrollFx } from '@/composables/useScrollFx'

const { t } = useI18n()

const wrap = ref(null)
const video = ref(null)
const stage = ref(null)
const { pos, startDrag, drag, endDrag } = useCompareLine(stage)

// The video is on screen when the page loads, so the effect runs from the very
// top of the page: the window opens until the video reaches the top of the
// screen, the zoom settles over the whole pass.
useScrollFx(() => {
  // Once the video fills the screen its top runs under the fixed navigation,
  // so the two labels slide down to stay just below it. Measured every frame
  // while the video is on screen: the smoother keeps moving the page after
  // the scroll events have stopped.
  const nav = document.getElementById('navi')
  const placeLabels = () => {
    const min = window.innerWidth < 768 ? 12 : 20
    const below = (nav ? nav.getBoundingClientRect().bottom : 0) + 16
    const top = stage.value.getBoundingClientRect().top
    stage.value.style.setProperty('--label-top', Math.max(min, below - top) + 'px')
  }
  const watcher = new IntersectionObserver(([entry]) => {
    gsap.ticker.remove(placeLabels)
    if (entry.isIntersecting) gsap.ticker.add(placeLabels)
  })
  watcher.observe(wrap.value)
  placeLabels()
  const stopLabels = () => {
    watcher.disconnect()
    gsap.ticker.remove(placeLabels)
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(wrap.value, { '--iy': '0%', '--ix': '0%' })
    gsap.set(video.value, { scale: 1 })
    return stopLabels
  }
  gsap.fromTo(wrap.value,
    { '--iy': '14%', '--ix': '10%' },
    {
      '--iy': '0%',
      '--ix': '0%',
      ease: 'none',
      scrollTrigger: { trigger: wrap.value, start: 0, end: 'top top', scrub: true }
    }
  )
  gsap.fromTo(video.value,
    { scale: 1.25 },
    {
      scale: 1,
      ease: 'none',
      scrollTrigger: { trigger: wrap.value, start: 0, end: 'bottom top', scrub: true }
    }
  )
  return stopLabels
})
</script>

<style scoped>
/* Full screen, framed by an inset window at first (the same start values the
   scroll effect animates from, so nothing jumps before it takes over) */
.pc-hero__bleed {
  --iy: 14%;
  --ix: 10%;
  position: relative;
  height: 100vh;
  height: 100svh;
  overflow: hidden;
}

.pc-hero__frame {
  position: absolute;
  inset: 0;
  overflow: hidden;
  clip-path: inset(var(--iy) var(--ix));
}

.pc-hero__video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.25);
  will-change: transform;
  pointer-events: none;
}

.pc-hero__window {
  position: absolute;
  top: var(--iy);
  bottom: var(--iy);
  left: var(--ix);
  right: var(--ix);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
  user-select: none;
}

/* The film treatment of the site's photos: grade, warm wash, vignette, grain */
.pc-hero__look {
  position: absolute;
  inset: 0;
  -webkit-backdrop-filter: var(--pc-film-filter);
  backdrop-filter: var(--pc-film-filter);
  pointer-events: none;
}

.pc-hero__look::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 50%, rgba(30, 20, 12, 0.5) 100%),
    rgba(215, 170, 115, 0.16);
  mix-blend-mode: multiply;
}

.pc-hero__look::after {
  content: '';
  position: absolute;
  inset: -100%;
  background-image: url(/assets/imgs/noise.png);
  opacity: 0.35;
  mix-blend-mode: overlay;
  animation: grain 8s steps(10) infinite;
}

.pc-hero__handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: #fff;
  transform: translateX(-50%);
  pointer-events: none;
}

.pc-hero__handle span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid #fff;
  background: rgba(32, 29, 29, 0.55);
  transform: translate(-50%, -50%);
}

.pc-hero__handle span::before {
  content: '‹ ›';
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  letter-spacing: 4px;
  color: #fff;
}

.pc-hero__window:focus-within .pc-hero__handle span {
  border-color: #C8B49A;
}

.pc-hero__label {
  position: absolute;
  top: var(--label-top, 20px);
  left: 20px;
  padding: 6px 14px;
  border-radius: 30px;
  background: rgba(32, 29, 29, 0.6);
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  pointer-events: none;
}

.pc-hero__label--right {
  left: auto;
  right: 20px;
}

/* Keyboard-accessible control; pointer dragging is handled on the window. */
.pc-hero__range {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

@media (max-width: 767px) {
  .pc-hero__handle span {
    width: 38px;
    height: 38px;
  }

  .pc-hero__label {
    top: var(--label-top, 12px);
    left: 12px;
    padding: 4px 10px;
    font-size: 10px;
    letter-spacing: 1px;
  }

  .pc-hero__label--right {
    left: auto;
    right: 12px;
  }
}
</style>
