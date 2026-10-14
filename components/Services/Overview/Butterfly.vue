<template>
  <!-- Proposal 1 for the Services overview: the Flip Flops butterfly is the
       menu. Its four wings are the four services, listed beside it as on Home.
       Pointing at or focusing a service lights its wing in sand, and pointing
       at a wing lights its row. Production Services, which has no page of its
       own, is the first clapperboard wing and leads down to its text. Built
       from the site's own pieces: the page title, Home's services list and the
       Production Services section of the live Services page. -->
  <div class="bf" :class="{ 'is-armed': armed, 'is-drawn': drawn }">
    <header class="pc-page-head pc-page-head--plain">
      <div class="caption">
        <div class="text-center">
          <h2>{{ statement }}</h2>
        </div>
      </div>
    </header>

    <!-- The butterfly beside the services list of the home page
         (CreativeAgency/Awards.vue), so every wing and its row are in view
         together; one above the other on smaller screens -->
    <section class="awards pb-80">
      <div class="container">
        <div class="row md-marg">
          <div class="col-xl-4 mb-5 mb-xl-0">
            <!-- The butterfly as a line drawing, one copy per wing, each clipped to
                 its quarter around the point where the wings cross -->
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
                :class="{ 'is-lit': active === i }"
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

              <!-- Pointer targets: a whole quarter of the circle per wing. Keyboards
                   and screen readers use the list below. -->
              <g clip-path="url(#bf-disc)">
                <rect
                  v-for="(s, i) in services"
                  :key="s.wing"
                  class="bf-hit"
                  :x="s.wing[1] === 'l' ? -17 : 0"
                  :y="s.wing[0] === 'u' ? -17 : 3.63"
                  width="17"
                  :height="s.wing[0] === 'u' ? 20.63 : 13.37"
                  @mouseenter="active = i"
                  @mouseleave="active = null"
                  @click="go(s)"
                />
              </g>
            </svg>
          </div>

          <div class="col-xl-8">
            <div class="item-title row">
              <div class="col-md-5">
                <div><h6 class="sub-title">{{ columnService }}</h6></div>
              </div>
              <div class="col-md-5">
                <div><h6 class="sub-title">{{ columnDescription }}</h6></div>
              </div>
            </div>

            <div
              v-for="(s, i) in services"
              :key="s.wing"
              class="item-line row"
              :class="{ 'is-lit': active === i }"
              @mouseenter="active = i"
              @mouseleave="active = null"
            >
              <div class="col-md-5">
                <div class="project-date">
                  <h6>
                    <component
                      :is="s.target ? 'a' : NuxtLink"
                      v-bind="s.target ? { href: s.href } : { to: s.href }"
                      @focus="active = i"
                      @blur="active = null"
                      @click="onClick($event, s)"
                    >
                      {{ s.title }}
                      <span v-if="s.target" class="pc-sr-only">({{ onPage }})</span>
                    </component>
                  </h6>
                </div>
              </div>
              <div class="col-md-5">
                <div class="honors"><h6>{{ s.category }}</h6></div>
              </div>
              <div class="col-md-2">
                <!-- The same target again, for the pointer only -->
                <component
                  :is="s.target ? 'a' : NuxtLink"
                  v-bind="s.target ? { href: s.href } : { to: s.href }"
                  class="link"
                  tabindex="-1"
                  aria-hidden="true"
                  @click="onClick($event, s)"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z" fill="currentColor" />
                  </svg>
                </component>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Production Services, as on the live Services page -->
    <ServicesTopContent />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, resolveComponent } from 'vue'
import { statement as statementText, columns, onThisPage, wings } from '@/data/Services/butterfly'
import { useScrollFx } from '@/composables/useScrollFx'

const NuxtLink = resolveComponent('NuxtLink')
const { locale, tm, rt } = useI18n()
const localePath = useLocalePath()

const pick = (text) => text[locale.value] || text.en
const statement = computed(() => pick(statementText))
const columnService = computed(() => pick(columns.service))
const columnDescription = computed(() => pick(columns.description))
const onPage = computed(() => pick(onThisPage))

const services = computed(() => {
  const items = tm('services_items')
  return wings.map((w, i) => ({
    ...w,
    title: items[i] ? rt(items[i].title) : '',
    category: items[i] ? rt(items[i].category) : '',
    href: w.target ? `#${w.target}` : localePath(w.link)
  }))
})

const active = ref(null)
const art = ref(null)

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Production Services stays on this page: glide down to its text (the
// section of ServicesTopContent)
const scrollToText = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const smooth = !reducedMotion()
  const smoother = typeof ScrollSmoother !== 'undefined' && ScrollSmoother.get()
  // From the layout, not from the screen: while the smoother is still
  // catching up with a scroll, on-screen positions are off by its lag
  let top = 0
  for (let n = el; n; n = n.offsetParent) top += n.offsetTop
  if (smoother) smoother.scrollTo(top - 60, smooth)
  else window.scrollTo({ top: top - 60, behavior: smooth ? 'smooth' : 'auto' })
  // Keyboard focus follows, once the section is in view: the smoother jumps
  // to anything focused off screen, which would cut the glide short
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  let frames = 0
  const focusOnArrival = () => {
    if (el.getBoundingClientRect().top < window.innerHeight / 2 || frames++ > 240) el.focus({ preventScroll: true })
    else requestAnimationFrame(focusOnArrival)
  }
  requestAnimationFrame(focusOnArrival)
}

const go = (s) => {
  if (s.target) scrollToText(s.target)
  else navigateTo(s.href)
}

const onClick = (e, s) => {
  if (!s.target) return
  e.preventDefault()
  scrollToText(s.target)
}

// The stroke width in logo units, so the lines stay hairlines at any size
let ro = null
const measure = () => {
  if (art.value?.clientWidth) art.value.style.setProperty('--sw', String(34.4 / art.value.clientWidth))
}

onMounted(() => {
  measure()
  ro = new ResizeObserver(measure)
  ro.observe(art.value)
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
    trigger: art.value,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      const wait = Math.max(0, 2500 - (performance.now() - mountedAt))
      drawTimer = setTimeout(() => {
        drawn.value = true
        // Drop the dashes once played: they leave a hairline gap where each
        // line starts
        drawTimer = setTimeout(() => {
          armed.value = false
        }, 2600)
      }, wait)
    }
  })
  return () => clearTimeout(drawTimer)
})
</script>

<style scoped>
/* ---------- The butterfly: size and place ---------- */

.bf-art {
  --sw: 0.07;
  display: block;
  width: min(100%, clamp(300px, calc(100vh - 400px), 460px));
  height: auto;
  aspect-ratio: 1;
  margin: 0 auto;
  overflow: visible;
}

@media (max-width: 991px) {
  .bf-art {
    width: 300px;
  }
}

@media (max-width: 768px) {
  .bf-art {
    width: 240px;
  }
}

/* ---------- The drawing ---------- */

.bf-ring {
  fill: none;
  stroke: rgba(255, 255, 255, 0.2);
  stroke-width: calc(var(--sw) * 1px);
}

.bf-underlay {
  fill: rgba(255, 255, 255, 0.035);
}

.bf-wing {
  pointer-events: none;
}

.bf-wing__shape {
  fill: transparent;
  stroke: rgba(255, 255, 255, 0.72);
  stroke-width: calc(var(--sw) * 1.1px);
  stroke-linejoin: round;
  transition: fill 0.5s ease, stroke 0.5s ease;
}

.bf-hit {
  fill: transparent;
  pointer-events: all;
  cursor: pointer;
}

/* ---------- A service in focus: its wing in sand, its row lit as on hover ---------- */

.bf-wing.is-lit .bf-wing__shape {
  fill: #C8B49A;
  stroke: #C8B49A;
}

.bf-wing__lift {
  transition: transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.bf-wing.is-lit .bf-wing__lift {
  transform: scale(1.04);
}

.bf-wing.is-lit .bf-wing__flutter {
  animation: bf-flutter 1.1s ease-in-out;
}

/* The theme's hover of the row, also when its wing or its link has focus */
.awards .item-line.is-lit {
  color: #201D1D;
}

.awards .item-line.is-lit::after {
  height: 100%;
}

/* ---------- Drawing in, once ---------- */

.is-armed .bf-ring circle,
.is-armed .bf-wing__shape {
  stroke-dasharray: 1 1;
  stroke-dashoffset: 1;
}

.is-armed .bf-underlay {
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

@keyframes bf-flutter {
  0%,
  100% {
    transform: scale(1, 1);
  }

  45% {
    transform: scale(0.95, 1.01);
  }
}

/* ---------- Reduced motion: colour only ---------- */

@media (prefers-reduced-motion: reduce) {
  .bf-wing__lift {
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
