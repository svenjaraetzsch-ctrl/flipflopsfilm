<template>
  <div ref="pin" class="pc-strip" :class="{ 'pc-strip--with-head': $slots.default }">
    <!-- Optional heading that stays in view while the reel runs. -->
    <div v-if="$slots.default" class="pc-strip__head container"><slot /></div>
    <div ref="track" class="pc-strip__track">
      <figure v-for="(frame, i) in frames" :key="frame.src" class="pc-strip__frame">
        <img
          :src="frame.src"
          :srcset="frame.srcset"
          sizes="(max-width: 991px) 90vw, 60vw"
          :width="frame.w"
          :height="frame.h"
          :alt="frame.alt"
          loading="lazy"
          decoding="async"
        />
        <figcaption>
          <span>{{ String(i + 1).padStart(2, '0') }} / {{ String(frames.length).padStart(2, '0') }}</span>
          <span>{{ frame.island }}</span>
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollFx } from '@/composables/useScrollFx'
import { photos } from '@/data/PhotoConcepts/photos'

defineProps({
  frames: {
    type: Array,
    default: () => [
      photos.serpentine,
      photos.meadow,
      photos.palm,
      photos.canyon,
      photos.arch,
      photos.laGeria,
      photos.treeRoad,
      photos.waterfall
    ]
  }
})

const pin = ref(null)
const track = ref(null)

useScrollFx(() => {
  // Desktop: scrolling down moves the reel sideways. Phones keep a native
  // swipe (see CSS) — pinning a sideways reel under a thumb feels sticky.
  const mm = gsap.matchMedia()
  mm.add('(min-width: 992px)', () => {
    const distance = () => track.value.scrollWidth - window.innerWidth
    gsap.to(track.value, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: pin.value,
        start: 'top top',
        end: () => '+=' + distance(),
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    })
  })
  return () => mm.revert()
})
</script>

<style scoped>
.pc-strip {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.pc-strip__head {
  position: absolute;
  top: 110px;
  left: 0;
  right: 0;
}

.pc-strip--with-head .pc-strip__track {
  margin-top: 8vh;
}

.pc-strip__track {
  display: flex;
  align-items: flex-end;
  gap: 3vw;
  padding: 0 8vw;
  will-change: transform;
}

.pc-strip__frame {
  flex: 0 0 auto;
  margin: 0;
  height: 62vh;
}

.pc-strip__frame img {
  height: calc(100% - 34px);
  width: auto;
  display: block;
}

.pc-strip__frame figcaption {
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 991px) {
  /* The strip is the horizontal scroller on phones; sticky keeps the heading
     put while the frames are swiped. */
  .pc-strip__head {
    position: sticky;
    top: auto;
    left: 0;
    margin-bottom: 30px;
  }

  .pc-strip--with-head .pc-strip__track {
    margin-top: 0;
  }

  .pc-strip {
    height: auto;
    display: block;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .pc-strip::-webkit-scrollbar {
    display: none;
  }

  .pc-strip__track {
    gap: 14px;
    padding: 0 20px;
    width: max-content;
  }

  /* image 56vw tall + caption, so a landscape frame (3:2) stays narrower than the screen */
  .pc-strip__frame {
    height: calc(56vw + 34px);
    scroll-snap-align: center;
  }
}
</style>
