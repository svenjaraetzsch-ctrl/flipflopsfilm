<template>
  <div class="pc-split container">
    <div class="row align-items-center">
      <div class="col-lg-5 pc-split__copy">
        <span class="sub-title">Locations</span>
        <h4>Fewer company moves, greater visual variety and more time where it matters most: on set.</h4>
        <p>
          Within a few hours, landscapes shift from lunar volcanic terrain and windswept coastlines
          to dense forests, desert roads and timeless villages. Locations that would normally require
          multiple countries can often be found within a single region.
        </p>
      </div>
      <div class="col-lg-6 offset-lg-1">
        <div :ref="(el) => (frames[0] = el)" class="pc-split__frame pc-split__frame--tall">
          <img
            :ref="(el) => (inners[0] = el)"
            :src="hierro.beach.src"
            :srcset="hierro.beach.srcset"
            sizes="(max-width: 991px) 100vw, 45vw"
            :width="hierro.beach.w"
            :height="hierro.beach.h"
            :alt="hierro.beach.alt"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>

    <div class="row align-items-center pc-split__row2">
      <div class="col-lg-6 order-2 order-lg-1">
        <div class="pc-split__duo">
          <div :ref="(el) => (frames[1] = el)" class="pc-split__frame pc-split__frame--square">
            <img
              :ref="(el) => (inners[1] = el)"
              :src="hierro.forest.src"
              :srcset="hierro.forest.srcset"
              sizes="(max-width: 991px) 80vw, 38vw"
              :width="hierro.forest.w"
              :height="hierro.forest.h"
              :alt="hierro.forest.alt"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div ref="drift" class="pc-split__small">
            <img
              :src="hierro.cave.md"
              :width="hierro.cave.w"
              :height="hierro.cave.h"
              :alt="hierro.cave.alt"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
      <div class="col-lg-5 offset-lg-1 order-1 order-lg-2 pc-split__copy">
        <span class="sub-title">Who we are</span>
        <h4>Built on production expertise and trusted partnerships.</h4>
        <p>
          Flip Flops Film was founded by David Turpin and André Dolezal, bringing together Spanish
          production management expertise and international line production experience.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollFx } from '@/composables/useScrollFx'
import { hierro } from '@/data/PhotoConcepts/hierro'

const frames = []
const inners = []
const drift = ref(null)

useScrollFx(() => {
  // Each frame unveils upwards once it is well into view, the photo easing
  // out of a zoom at the same time.
  frames.forEach((frame, i) => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: frame, start: 'top 80%', once: true }
    })
    tl.fromTo(frame,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.out' }
    ).fromTo(inners[i], { scale: 1.3 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0)
  })

  // The small print drifts at its own speed for a bit of depth.
  gsap.fromTo(drift.value,
    { yPercent: 30 },
    {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: { trigger: drift.value, start: 'top bottom', end: 'bottom top', scrub: true }
    }
  )
})
</script>

<style scoped>
.pc-split__copy .sub-title {
  display: block;
  color: #C8B49A;
  margin-bottom: 20px;
}

.pc-split__copy h4 {
  font-family: 'Mona-Sans Light', sans-serif;
  margin-bottom: 24px;
}

.pc-split__row2 {
  margin-top: 160px;
}

.pc-split__frame {
  overflow: hidden;
}

.pc-split__frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.pc-split__frame--tall {
  aspect-ratio: 2 / 3;
  max-height: 85vh;
  margin-left: auto;
}

.pc-split__duo {
  position: relative;
  padding-bottom: 12%;
}

.pc-split__frame--square {
  aspect-ratio: 1 / 1;
  width: 82%;
}

.pc-split__small {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 36%;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.45);
}

.pc-split__small img {
  width: 100%;
  height: auto;
  display: block;
}

@media (max-width: 991px) {
  .pc-split__copy {
    margin-bottom: 40px;
  }

  .pc-split__row2 {
    margin-top: 100px;
  }

  .pc-split__frame--tall {
    max-height: none;
  }
}
</style>
