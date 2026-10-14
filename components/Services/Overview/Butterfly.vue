<template>
  <!-- Proposal 1 for the Services overview: the Flip Flops butterfly is the
       menu. Its four wings are the four services; pointing at a service (or
       its wing) lights the wing in sand. Production Services, which has no page
       of its own, is the first clapperboard wing and leads down to its text. -->
  <div
    class="bf"
    :class="{ 'is-armed': armed, 'is-drawn': drawn, 'has-active': active !== null }"
  >
    <section class="bf-hero">
      <div class="container">
        <p class="bf-intro">
          <span class="bf-intro__lead">{{ intro.lead }}</span>
          {{ intro.rest }}
        </p>

        <div ref="stage" class="bf-stage" @mouseleave="active = null">
          <!-- The butterfly as a line drawing, one copy per wing, each clipped
               to its quarter around the point where the wings cross -->
          <svg
            ref="art"
            class="bf-art"
            viewBox="-17.2 -17.2 34.4 34.4"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <g id="bf-body" transform="translate(-557.89 -102.34)">
                <path pathLength="1" d="M555.11,97.22c-.77-.89-1.49-1.63-2.08-2.02,0,0-3.53-2.7-6.23-1.02-2.35,1.46-1.71,5.81,1.67,9.15.1.1.27.03.27-.11v-5.74h6.25c.13,0,.21-.16.12-.26" />
                <path pathLength="1" d="M568.99,94.18c-2.7-1.68-6.23,1.02-6.23,1.02-.59.39-1.32,1.13-2.08,2.02-.09.1-.02.26.12.26h6.25v5.74c0,.14.17.21.27.11,3.38-3.34,4.03-7.68,1.67-9.15" />
                <path pathLength="1" d="M566.01,98.36h-6.2s-.1.03-.12.06c-.62.79-1.24,1.62-1.8,2.4-.56-.78-1.18-1.61-1.8-2.4-.03-.03-.08-.06-.12-.06h-6.2c-.09,0-.16.07-.16.16v5.61c0,.12.08.27.17.34.1.08.21.16.32.24,0,0,1.03.56,2.39,1.26-.9.72-1.78,1.67-2.29,2.85-1.36,3.18.7,4.08.7,4.08,3.34,1.2,6.54-3.43,6.97-4.25.43.82,3.64,5.45,6.97,4.25,0,0,2.06-.9.7-4.08-.51-1.19-1.39-2.13-2.29-2.85,1.36-.71,2.39-1.26,2.39-1.26.11-.08.22-.16.32-.24.09-.07.17-.23.17-.34v-5.61c0-.09-.07-.16-.16-.16M549.88,100.62v-.88h.59l-.59-.69v-.18h.43l.74.87h.32l-.66-.78s-.04-.06-.05-.09h.54l.74.87h.32l-.66-.78s-.04-.06-.05-.09h.54l.74.87h.18c.24,0,.44.2.44.44s-.2.44-.44.44h-3.15ZM565.91,99.04l-.59.69h.59v.88h-3.15c-.24,0-.44-.2-.44-.44s.2-.44.44-.44h.18l.74-.87h.54s-.02.07-.05.09l-.66.78h.32l.74-.87h.54s-.02.07-.05.09l-.66.78h.32l.74-.87h.43v.18Z" />
              </g>
              <clipPath id="bf-q-ul"><rect x="-18" y="-18" width="18" height="21.63" /></clipPath>
              <clipPath id="bf-q-ur"><rect x="0" y="-18" width="18" height="21.63" /></clipPath>
              <clipPath id="bf-q-ll"><rect x="-18" y="3.63" width="18" height="14.37" /></clipPath>
              <clipPath id="bf-q-lr"><rect x="0" y="3.63" width="18" height="14.37" /></clipPath>
              <clipPath id="bf-disc"><circle cx="0" cy="0" r="16.67" /></clipPath>
            </defs>

            <!-- The ring, as the outline of the logo's solid ring -->
            <g class="bf-ring">
              <circle pathLength="1" cx="0" cy="0" r="16.67" />
              <circle pathLength="1" cx="0" cy="0" r="15.68" />
            </g>

            <!-- A faint body under the four line drawings, as one piece so the
                 quarters leave no seams where they meet -->
            <g transform="translate(0 3.63)">
              <g class="bf-wing__flap">
                <use href="#bf-body" class="bf-underlay" transform="translate(0 -3.63)" />
              </g>
            </g>

            <g
              v-for="(s, i) in services"
              :key="s.wing"
              class="bf-wing"
              :class="[`bf-wing--${s.wing}`, { 'is-lit': active === i }]"
            >
              <g transform="translate(0 3.63)">
                <g class="bf-wing__flap">
                  <g class="bf-wing__lift">
                    <g class="bf-wing__flutter">
                      <g transform="translate(0 -3.63)">
                        <use href="#bf-body" class="bf-wing__shape" :clip-path="`url(#bf-q-${s.wing})`" />
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>

            <!-- Generous targets: a whole quarter of the circle per wing -->
            <g clip-path="url(#bf-disc)">
              <rect
                v-for="(s, i) in services"
                :key="s.wing"
                class="bf-hit"
                :x="s.side === 'left' ? -17 : 0"
                :y="s.wing[0] === 'u' ? -17 : 3.63"
                width="17"
                :height="s.wing[0] === 'u' ? 20.63 : 13.37"
                @mouseenter="active = i"
                @mouseleave="active = null"
                @click="go(s)"
              />
            </g>
          </svg>

          <!-- Leader lines, from a dot on each wing out to the edge of the page
               (measured in pixels, so drawn once the stage has a size) -->
          <svg
            v-if="box.w"
            class="bf-leaders"
            :viewBox="`0 0 ${box.w} ${box.h}`"
            aria-hidden="true"
            focusable="false"
          >
            <g
              v-for="(l, i) in leaders"
              :key="i"
              class="bf-leader"
              :class="{ 'is-lit': active === i }"
              :style="{ '--n': i }"
            >
              <path class="bf-leader__line" pathLength="1" :d="l.d" />
              <circle class="bf-leader__dot" :cx="l.x" :cy="l.y" r="3" />
            </g>
          </svg>

          <ul class="bf-list" :aria-label="listLabel">
            <li
              v-for="(s, i) in services"
              :key="s.wing"
              class="bf-svc"
              :class="[`bf-svc--${s.side}`, s.target ? 'bf-svc--here' : 'bf-svc--page', { 'is-lit': active === i }]"
              :style="{ '--ly': s.line, '--ex': s.elbow, '--n': i }"
            >
              <component
                :is="s.target ? 'a' : NuxtLink"
                v-bind="s.target ? { href: s.href } : { to: s.href }"
                class="bf-svc__link"
                @mouseenter="active = i"
                @mouseleave="active = null"
                @focus="active = i"
                @blur="active = null"
                @click="onClick($event, s)"
              >
                <span class="bf-svc__head">
                  <svg class="bf-mini" viewBox="-17.2 -17.2 34.4 34.4" aria-hidden="true" focusable="false">
                    <circle class="bf-mini__ring" cx="0" cy="0" r="16.2" />
                    <use
                      v-for="q in quarters"
                      :key="q"
                      href="#bf-body"
                      class="bf-mini__wing"
                      :class="{ 'is-on': q === s.wing }"
                      :clip-path="`url(#bf-q-${q})`"
                    />
                  </svg>
                  <span class="bf-svc__no" aria-hidden="true">{{ s.no }}</span>
                  <span class="bf-svc__name">{{ s.title }}</span>
                  <svg class="bf-svc__arrow" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
                    <path v-if="s.target" d="M6 1.5v9M2.5 7 6 10.5 9.5 7" />
                    <path v-else d="M3 9 9 3M4 3h5v5" />
                  </svg>
                </span>
                <span class="bf-svc__desc">
                  {{ s.category }}
                  <span v-if="s.target" class="pc-sr-only">({{ onPage }})</span>
                </span>
              </component>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Production Services: the text of the first wing, with one photograph -->
    <section id="production-services" ref="ps" class="bf-ps section-padding" tabindex="-1">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <span class="sub-title bord mb-30 bf-ps__label">
              <svg class="bf-mini bf-mini--label" viewBox="-17.2 -17.2 34.4 34.4" aria-hidden="true" focusable="false">
                <circle class="bf-mini__ring" cx="0" cy="0" r="16.2" />
                <use
                  v-for="q in quarters"
                  :key="q"
                  href="#bf-body"
                  class="bf-mini__wing"
                  :class="{ 'is-on': q === 'ul' }"
                  :clip-path="`url(#bf-q-${q})`"
                />
              </svg>
              {{ $t('services.top_label') }}
            </span>
            <PhotoConceptsSidePhoto :image="photos.laGeria" />
          </div>
          <div class="col-lg-5 offset-lg-1">
            <div class="text">
              <h5 class="mb-30 fw-400 line-height-40">{{ $t('services.top_h5') }}</h5>
              <p class="fz-18">{{ $t('services.top_p') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, resolveComponent } from 'vue'
import { photos } from '@/data/PhotoConcepts/photos'
import { intro as introText, onThisPage, listLabel as listLabelText, wings } from '@/data/Services/butterfly'
import { useScrollFx } from '@/composables/useScrollFx'

const NuxtLink = resolveComponent('NuxtLink')
const { locale, tm, rt } = useI18n()
const localePath = useLocalePath()

const pick = (text) => text[locale.value] || text.en
const intro = computed(() => pick(introText))
const onPage = computed(() => pick(onThisPage))
const listLabel = computed(() => pick(listLabelText))

// The logo's units: the drawing is 34.4 units across the ring
const VB = 34.4
const quarters = ['ul', 'ur', 'll', 'lr']

const services = computed(() => {
  const items = tm('services_items')
  return wings.map((w, i) => {
    const item = items[i]
    // Where the leader turns from its 45° run into the horizontal rule
    const elbow = Math.abs(w.anchor[0]) + Math.abs(w.line - w.anchor[1])
    return {
      ...w,
      no: `0${i + 1}`,
      title: item ? rt(item.title) : '',
      category: item ? rt(item.category) : '',
      href: w.target ? `#${w.target}` : localePath(w.link),
      elbow
    }
  })
})

const active = ref(null)
const stage = ref(null)
const art = ref(null)
const ps = ref(null)
const box = ref({ w: 0, h: 0 })

// Leader lines in pixels: dot on the wing, 45° out to the rule's height, then
// along the rule to the edge of the page
const leaders = computed(() => {
  const { w, h } = box.value
  const k = h / VB
  const cx = w / 2
  const cy = h / 2
  return services.value.map((s) => {
    const dir = s.side === 'left' ? -1 : 1
    const x = cx + s.anchor[0] * k
    const y = cy + s.anchor[1] * k
    const ly = cy + s.line * k
    const ex = cx + dir * s.elbow * k
    const edge = dir < 0 ? 0 : w
    return { x, y, d: `M${x},${y} L${ex},${ly} L${edge},${ly}` }
  })
})

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Production Services stays on this page: glide down to its text
const scrollToText = () => {
  const el = ps.value
  if (!el) return
  const smooth = !reducedMotion()
  const smoother = typeof ScrollSmoother !== 'undefined' && ScrollSmoother.get()
  if (smoother) smoother.scrollTo(el, smooth, 'top 60px')
  else el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
  el.focus({ preventScroll: true })
}

const go = (s) => {
  if (s.target) scrollToText()
  else navigateTo(s.href)
}

const onClick = (e, s) => {
  if (!s.target) return
  e.preventDefault()
  scrollToText()
}

// Size of the stage for the leaders, and the stroke width in logo units so
// every line stays a hairline at any size
let ro = null
const measure = () => {
  if (stage.value) {
    box.value = { w: stage.value.clientWidth, h: stage.value.clientHeight }
  }
  if (art.value && art.value.clientWidth) {
    art.value.style.setProperty('--sw', String(VB / art.value.clientWidth))
  }
}

onMounted(() => {
  measure()
  ro = new ResizeObserver(measure)
  ro.observe(stage.value)
})

onBeforeUnmount(() => {
  ro?.disconnect()
})

// The drawing draws itself once it is in view (after the page loader has
// lifted), then the wings make one slow beat. Nothing moves with reduced motion.
const armed = ref(false)
const drawn = ref(false)
const mountedAt = typeof performance !== 'undefined' ? performance.now() : 0
let drawTimer = null

useScrollFx(() => {
  if (reducedMotion()) return
  armed.value = true
  ScrollTrigger.create({
    trigger: stage.value,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      const wait = Math.max(0, 2500 - (performance.now() - mountedAt))
      drawTimer = setTimeout(() => {
        drawn.value = true
        drawTimer = setTimeout(() => {
          armed.value = false
        }, 3200)
      }, wait)
    }
  })
  return () => clearTimeout(drawTimer)
})
</script>

<style scoped>
.bf {
  --sand: #C8B49A;
  --line: rgba(255, 255, 255, 0.72);
  /* The butterfly's ring, sized to fit the first screen with the line above */
  --d: clamp(360px, calc(100vh - 380px), 540px);
  --u: calc(var(--d) / 34.4);
}

/* ---------- The line above the butterfly ---------- */

.bf-hero {
  padding-top: 200px;
  padding-bottom: 40px;
}

.bf-intro {
  max-width: 940px;
  margin: 0 auto 44px;
  font-family: 'Mona-Sans Medium', sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 40px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
}

.bf-intro__lead {
  display: inline;
  color: #fff;
}

/* ---------- The stage: butterfly, leaders, services ---------- */

.bf-stage {
  position: relative;
  height: var(--d);
}

.bf-art {
  --sw: 0.0625;
  position: absolute;
  top: 0;
  left: 50%;
  width: var(--d);
  height: var(--d);
  margin-left: calc(var(--d) / -2);
  overflow: visible;
}

.bf-ring {
  fill: none;
  stroke: rgba(255, 255, 255, 0.2);
  stroke-width: calc(var(--sw) * 1px);
}

.bf-wing {
  pointer-events: none;
}

.bf-underlay {
  fill: rgba(255, 255, 255, 0.035);
  stroke: none;
}

.bf-wing__shape {
  fill: transparent;
  stroke: var(--line);
  stroke-width: calc(var(--sw) * 1.1px);
  stroke-linejoin: round;
  transition: fill 0.5s ease, stroke 0.5s ease;
}

.bf-wing.is-lit .bf-wing__shape {
  fill: var(--sand);
  stroke: var(--sand);
}

/* The other wings step back while one is lit */
.has-active .bf-wing:not(.is-lit) .bf-wing__shape {
  stroke: rgba(255, 255, 255, 0.38);
}

/* A lit wing lifts a little, out from where the wings cross */
.bf-wing__lift {
  transition: transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.bf-wing.is-lit .bf-wing__lift {
  transform: scale(1.04);
}

.bf-wing.is-lit .bf-wing__flutter {
  animation: bf-flutter 1.1s ease-in-out;
}

@keyframes bf-flutter {
  0%,
  100% {
    transform: scale(1, 1);
  }

  45% {
    transform: scale(0.95, 1.01);
  }
}

.bf-hit {
  fill: transparent;
  pointer-events: all;
  cursor: pointer;
}

/* Leader lines and their dots */
.bf-leaders {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.bf-leader__line {
  fill: none;
  stroke: rgba(255, 255, 255, 0.24);
  stroke-width: 1;
  transition: stroke 0.5s ease;
}

.bf-leader__dot {
  fill: var(--sand);
  stroke: none;
  transition: fill 0.5s ease;
}

.bf-leader.is-lit .bf-leader__line {
  stroke: var(--sand);
}

/* On the sand wing the dot turns into a small dark pin */
.bf-leader.is-lit .bf-leader__dot {
  fill: #201D1D;
}

/* The services, on their rules at the edges of the page */
.bf-list {
  margin: 0;
  padding: 0;
}

.bf-svc {
  position: absolute;
  top: calc(50% + var(--ly) * var(--u));
  width: calc(50% - var(--ex) * var(--u) - 24px);
  transition: opacity 0.5s ease;
}

.bf-svc--left {
  left: 0;
}

.bf-svc--right {
  right: 0;
  text-align: right;
}

.has-active .bf-svc:not(.is-lit) {
  opacity: 0.45;
}

.bf-svc__link {
  position: relative;
  display: block;
  color: #fff;
}

.bf-svc__head {
  position: absolute;
  left: 0;
  bottom: 100%;
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding-bottom: 14px;
  white-space: nowrap;
}

/* The name may run on past the end of its rule, above the leader's 45° run:
   long names (Produktionsdienstleistungen) stay on one line */
.bf-svc--right .bf-svc__head {
  left: auto;
  right: 0;
}

.bf-svc__no {
  flex: none;
  font-size: 12px;
  letter-spacing: 2px;
  color: var(--sand);
}

.bf-svc__name {
  font-family: 'Mona-Sans Medium', sans-serif;
  font-size: 24px;
  line-height: 1.25;
}

.bf-svc__arrow {
  flex: none;
  width: 12px;
  height: 12px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  color: rgba(255, 255, 255, 0.55);
  transition: color 0.4s ease, transform 0.4s ease;
}

.bf-svc.is-lit .bf-svc__arrow {
  color: var(--sand);
}

.bf-svc--page.is-lit .bf-svc__arrow {
  transform: translate(2px, -2px);
}

.bf-svc--here.is-lit .bf-svc__arrow {
  transform: translateY(2px);
}

.bf-svc__desc {
  display: block;
  max-width: 320px;
  padding-top: 14px;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 300;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.72);
  text-wrap: balance;
  opacity: 0;
  transform: translateY(-6px);
  transition: opacity 0.45s ease, transform 0.45s ease;
}

.bf-svc--right .bf-svc__desc {
  margin-left: auto;
}

.bf-svc.is-lit .bf-svc__desc {
  opacity: 1;
  transform: none;
}

/* Keyboard focus in sand */
.bf-svc__link:focus {
  outline: none;
}

.bf-svc__link:focus-visible .bf-svc__name {
  outline: 1px solid var(--sand);
  outline-offset: 6px;
}

/* Only shown in the stacked list on smaller screens */
.bf-mini {
  display: none;
}

.bf-mini__ring {
  fill: none;
  stroke: rgba(255, 255, 255, 0.3);
  stroke-width: 1.1;
}

.bf-mini__wing {
  fill: none;
  stroke: rgba(255, 255, 255, 0.6);
  stroke-width: 0.9;
  stroke-linejoin: round;
}

.bf-mini__wing.is-on {
  fill: var(--sand);
  stroke: var(--sand);
}

/* Without a mouse there is nothing to point at: the lines stay open */
@media (hover: none) {
  .bf-svc__desc {
    opacity: 1;
    transform: none;
  }
}

/* ---------- Drawing in, once ----------
   Lines draw themselves as dashes; once everything has played the script
   drops `is-armed`, as the dashes would otherwise leave a hairline gap where
   each line starts. */

.is-armed .bf-ring circle,
.is-armed .bf-wing__shape,
.is-armed .bf-leader__line {
  stroke-dasharray: 1 1;
  stroke-dashoffset: 1;
}

.is-armed .bf-underlay {
  opacity: 0;
}

.is-armed .bf-leader__dot,
.is-armed .bf-svc {
  opacity: 0;
}

.is-armed.is-drawn .bf-ring circle {
  animation: bf-draw 1.5s cubic-bezier(0.45, 0, 0.25, 1) forwards;
}

.is-armed.is-drawn .bf-wing__shape {
  animation: bf-draw 1.3s cubic-bezier(0.45, 0, 0.25, 1) 0.1s forwards;
}

.is-armed.is-drawn .bf-underlay {
  animation: bf-show 0.8s ease 0.9s forwards;
}

.is-armed.is-drawn .bf-wing__flap {
  animation: bf-flap 1.3s ease-in-out 0.9s both;
}

.is-armed.is-drawn .bf-leader__line {
  animation: bf-draw 0.8s cubic-bezier(0.45, 0, 0.25, 1) calc(1.9s + var(--n) * 0.1s) forwards;
}

.is-armed.is-drawn .bf-leader__dot {
  animation: bf-show 0.3s ease calc(1.9s + var(--n) * 0.1s) forwards;
}

.is-armed.is-drawn .bf-svc {
  animation: bf-show 0.7s ease calc(1.1s + var(--n) * 0.1s) forwards;
}

@keyframes bf-draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes bf-show {
  to {
    opacity: 1;
  }
}

/* One slow beat of the wings: they fold in towards the body and open again */
@keyframes bf-flap {
  0%,
  100% {
    transform: scale(1, 1);
  }

  35% {
    transform: scale(0.8, 0.97);
  }

  70% {
    transform: scale(1.03, 1);
  }
}

/* ---------- Production Services ---------- */

.bf-ps:focus {
  outline: none;
}

.bf-ps__label {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.bf-mini--label {
  display: block;
  width: 22px;
  height: 22px;
}

/* ---------- Sizes ---------- */

@media (min-width: 992px) and (max-height: 800px) {
  .bf-intro {
    margin-bottom: 30px;
  }
}

@media (max-width: 1399px) {
  .bf {
    --d: clamp(320px, calc(100vh - 390px), 500px);
  }
}

@media (max-width: 1199px) {
  .bf {
    --d: clamp(320px, calc(100vh - 360px), 420px);
  }

  .bf-svc__name {
    font-size: 21px;
  }
}

/* ---------- Phones and tablets: the butterfly on top, the list below ---------- */

@media (max-width: 991px) {
  .bf {
    --d: 300px;
  }

  .bf-hero {
    padding-top: 160px;
  }

  .bf-intro {
    max-width: 640px;
    margin-bottom: 36px;
  }

  .bf-stage {
    height: auto;
  }

  .bf-art {
    position: relative;
    left: auto;
    display: block;
    margin: 0 auto 36px;
  }

  .bf-leaders {
    display: none;
  }

  .bf-list {
    max-width: 640px;
    margin: 0 auto;
    border-top: 1px solid rgba(255, 255, 255, 0.14);
  }

  .bf-svc,
  .bf-svc--right {
    position: static;
    width: auto;
    text-align: left;
  }

  .has-active .bf-svc:not(.is-lit) {
    opacity: 1;
  }

  .bf-svc__link {
    display: grid;
    grid-template-columns: 1fr;
    padding: 18px 0 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.14);
  }

  .bf-svc__head,
  .bf-svc--right .bf-svc__head {
    position: static;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 0;
  }

  .bf-mini {
    display: block;
    flex: none;
    width: 36px;
    height: 36px;
  }

  .bf-svc__no {
    display: none;
  }

  .bf-svc__name {
    flex: 1 1 auto;
    font-size: 21px;
  }

  .bf-svc__desc,
  .bf-svc--right .bf-svc__desc {
    max-width: none;
    margin-left: 50px;
    padding-top: 6px;
    font-size: 15px;
    opacity: 1;
    transform: none;
  }

  .bf-svc__link:focus-visible {
    outline: 1px solid var(--sand);
    outline-offset: 4px;
  }

  .bf-svc__link:focus-visible .bf-svc__name {
    outline: none;
  }
}

@media (max-width: 768px) {
  .bf {
    --d: 240px;
  }

  .bf-hero {
    padding-top: 120px;
  }

  .bf-intro {
    font-size: 20px;
    line-height: 32px;
    margin-bottom: 28px;
  }

  .bf-art {
    margin-bottom: 28px;
  }

  .bf-svc__name {
    font-size: 19px;
  }
}

/* ---------- Reduced motion: colour only ---------- */

@media (prefers-reduced-motion: reduce) {
  .bf-wing__lift,
  .bf-svc__desc,
  .bf-svc__arrow {
    transition: none;
  }

  .bf-wing.is-lit .bf-wing__lift {
    transform: none;
  }

  .bf-wing.is-lit .bf-wing__flutter {
    animation: none;
  }
}
</style>
