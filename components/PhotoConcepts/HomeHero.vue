<template>
  <!-- Same title and fixed video box as CreativeAgency/Header.vue, with a
       compare line on the video: the original left of the line, the cinematic
       look right of it. -->
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
    <div
      ref="stage"
      class="img mt-50 pc-hero__stage"
      @pointerdown="startDrag"
      @pointermove="drag"
      @pointerup="endDrag"
      @pointercancel="endDrag"
    >
      <video autoplay muted loop playsinline preload="auto" class="pc-hero__video">
        <source src="/assets/vid/flipflops_video_smaller-verkleinert-online.mp4" type="video/mp4" />
      </video>
      <!-- The look is a backdrop filter over the one video rather than a second
           copy of it, so both sides always show the same frame. -->
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
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useCompareLine } from '@/composables/useCompareLine'

const { t } = useI18n()

const stage = ref(null)
const { pos, startDrag, drag, endDrag } = useCompareLine(stage)
</script>

<style scoped>
.pc-hero__stage {
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
  user-select: none;
}

.pc-hero__video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
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

.pc-hero__stage:focus-within .pc-hero__handle span {
  border-color: #C8B49A;
}

.pc-hero__label {
  position: absolute;
  top: 20px;
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

/* Keyboard-accessible control; pointer dragging is handled on the stage. */
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
    top: 12px;
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
