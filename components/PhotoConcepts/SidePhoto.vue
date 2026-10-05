<template>
  <!-- An editorial photo for the empty label column next to a block of text
       (concept 05). With `detail`, a square frame plus a smaller print that
       drifts at its own speed; without, a single frame that drifts gently.
       Frames unveil upwards once they are well into view. -->
  <div
    class="pc-side-photo"
    :class="[detail ? 'pc-side-photo--duo' : 'pc-side-photo--single', { 'pc-side-photo--portrait': portrait }]"
  >
    <div ref="drift" class="pc-side-photo__main">
      <div ref="frame" class="pc-side-photo__frame">
        <img
          ref="img"
          :src="image.src"
          :srcset="image.srcset"
          sizes="(max-width: 991px) 100vw, 30vw"
          :width="image.w"
          :height="image.h"
          :alt="image.alt"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
    <div v-if="detail" ref="small" class="pc-side-photo__small">
      <img
        :src="detail.md"
        :width="detail.w"
        :height="detail.h"
        :alt="detail.alt"
        loading="lazy"
        decoding="async"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollFx } from '@/composables/useScrollFx'

const props = defineProps({
  image: { type: Object, required: true },
  // Optional second, smaller photo overlapping the first.
  detail: { type: Object, default: null },
  // Single photo as a portrait frame instead of a landscape one.
  portrait: { type: Boolean, default: false }
})

const drift = ref(null)
const frame = ref(null)
const img = ref(null)
const small = ref(null)

useScrollFx(() => {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: frame.value, start: 'top 80%', once: true }
  })
  tl.fromTo(frame.value,
    { clipPath: 'inset(100% 0% 0% 0%)' },
    { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out' }
  ).fromTo(img.value, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0)

  // Depth while scrolling: the small print drifts at its own speed; a single
  // photo drifts as a whole, more gently.
  const target = props.detail ? small.value : drift.value
  const range = props.detail ? 30 : 10
  gsap.fromTo(target,
    { yPercent: range },
    {
      yPercent: -range,
      ease: 'none',
      scrollTrigger: { trigger: target, start: 'top bottom', end: 'bottom top', scrub: true }
    }
  )
})
</script>

<style scoped>
.pc-side-photo {
  position: relative;
  margin-top: 40px;
}

.pc-side-photo__frame {
  overflow: hidden;
}

.pc-side-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: var(--pc-film-filter);
}

/* Single: a landscape frame */
.pc-side-photo--single .pc-side-photo__main {
  width: 78%;
}

.pc-side-photo--single .pc-side-photo__frame {
  aspect-ratio: 3 / 2;
}

.pc-side-photo--portrait.pc-side-photo--single .pc-side-photo__main {
  width: 62%;
}

.pc-side-photo--portrait.pc-side-photo--single .pc-side-photo__frame {
  aspect-ratio: 4 / 5;
}

/* Right-hand column beside the text instead of under a label */
.pc-side-photo--right {
  margin-top: 0;
}

.pc-side-photo--right .pc-side-photo__main {
  margin-left: auto;
}

/* Duo: a square frame with a smaller print over its lower right corner */
.pc-side-photo--duo {
  padding-bottom: 12%;
}

.pc-side-photo--duo .pc-side-photo__main {
  width: 72%;
}

.pc-side-photo--duo .pc-side-photo__frame {
  aspect-ratio: 1 / 1;
}

.pc-side-photo__small {
  position: absolute;
  right: 6%;
  bottom: 0;
  width: 36%;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.45);
}

.pc-side-photo__small img {
  height: auto;
}

/* Stacked layout on phones and tablets: label, photo, then the text. */
@media (max-width: 991px) {
  .pc-side-photo {
    margin: 10px 0 40px;
  }

  .pc-side-photo--single .pc-side-photo__main {
    width: 100%;
  }

  .pc-side-photo--single .pc-side-photo__frame {
    aspect-ratio: 16 / 10;
  }

  .pc-side-photo--portrait.pc-side-photo--single .pc-side-photo__main {
    width: 78%;
  }

  .pc-side-photo--portrait.pc-side-photo--single .pc-side-photo__frame {
    aspect-ratio: 4 / 5;
  }

  .pc-side-photo--duo .pc-side-photo__main {
    width: 78%;
  }

  .pc-side-photo__small {
    right: 0;
  }

  /* Comes after the text when stacked */
  .pc-side-photo--right {
    margin: 40px 0 0;
  }
}
</style>
