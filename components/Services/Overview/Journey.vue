<template>
  <!-- Services overview, proposal 2: "Prep to wrap". The services told as the
       schedule of a shoot with Flip Flops Film. An opening (the statement,
       the call sheet and the Production Services text), then the schedule:
       four phases from development to wrap, each with the service that
       matters then, while Production Services runs as one bar across all of
       them.
       Larger screens (and motion allowed): the schedule is held in view and
       its stations pass by sideways as the page scrolls, the bar filling up
       towards wrap. Phones, tablets and reduced motion: the same stations as a
       vertical timeline. -->
  <section class="jr">
    <div class="container jr-open">
      <div class="jr-open__head">
        <h2 class="jr-open__title">{{ pick(opening.title) }}</h2>
        <p class="jr-open__intro">{{ pick(opening.intro) }}</p>
      </div>

      <div class="row jr-open__body">
        <div class="col-lg-5">
          <span class="sub-title bord">{{ $t('services.top_label') }}</span>
          <div class="jr-sheet">
            <p class="jr-sheet__label">{{ pick(callSheet.label) }}</p>
            <dl class="jr-sheet__facts">
              <div v-for="f in facts" :key="f.label">
                <dt>{{ f.label }}</dt>
                <dd>{{ f.value }}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div class="col-lg-6 offset-lg-1">
          <div class="jr-open__text">
            <h5 class="fw-400 line-height-40">{{ $t('services.top_h5') }}</h5>
            <p class="fz-18">{{ $t('services.top_p') }}</p>
          </div>
        </div>
      </div>
    </div>

    <div ref="stage" class="jr-stage" :class="{ 'is-driven': driven }">
      <!-- Larger screens: the phases, and Production Services as the bar
           that spans them all and fills up on the way to wrap -->
      <div ref="schedWrap" class="container jr-sched-wrap">
        <nav class="jr-sched" :aria-label="pick(schedule.label)">
          <ol class="jr-sched__phases">
            <li v-for="(s, i) in stations" :key="s.key">
              <a
                :href="`#jr-${s.key}`"
                :class="{ 'is-active': active === i, 'is-past': active > i }"
                :aria-current="active === i ? 'step' : null"
                @click="goTo(i, $event)"
              >
                <span class="jr-sched__no">{{ pad(i + 1) }}</span>
                <span class="jr-sched__phase">{{ s.phase }}</span>
                <span class="jr-sched__when">{{ s.when }}</span>
              </a>
            </li>
          </ol>
          <div class="jr-sched__bar" aria-hidden="true">
            <i ref="barFill" class="jr-sched__fill"></i>
            <i v-for="n in stations.length - 1" :key="n" class="jr-sched__tick" :style="{ left: `${(n / stations.length) * 100}%` }"></i>
            <span class="jr-sched__ps">{{ $t('services.top_label') }}</span>
            <span class="jr-sched__span">{{ items[0]?.category }}</span>
          </div>
        </nav>
      </div>

      <div ref="viewport" class="jr-viewport">
        <div class="container jr-rail">
          <!-- Phones and tablets: Production Services heads the line -->
          <p class="jr-rail__tag" aria-hidden="true">
            <span>{{ $t('services.top_label') }}</span>{{ items[0]?.category }}
          </p>
          <div class="jr-rail__body">
            <span class="jr-rail__line" aria-hidden="true"><i ref="lineFill"></i></span>
            <ol ref="track" class="jr-track">
              <li
                v-for="(s, i) in stations"
                :id="`jr-${s.key}`"
                :key="s.key"
                :ref="(el) => (stationEls[i] = el)"
                class="jr-station"
                :class="`jr-station--${s.key}`"
                :aria-labelledby="`jr-title-${s.key}`"
              >
                <span class="jr-station__dot" aria-hidden="true"></span>
                <p class="jr-station__label">
                  <span class="jr-station__no">{{ pad(i + 1) }}</span>
                  <span class="jr-station__phase">{{ s.phase }}</span>
                  <span class="jr-station__when">{{ s.when }}</span>
                </p>
                <div class="jr-station__photo">
                  <figure class="pc-filmic jr-station__frame">
                    <img
                      :src="s.photo.md"
                      :srcset="s.photo.srcset"
                      sizes="(max-width: 991px) 100vw, 40vw"
                      :width="s.photo.w"
                      :height="s.photo.h"
                      :alt="s.photo.alt"
                      :style="s.pos ? { objectPosition: s.pos } : null"
                      decoding="async"
                    />
                    <figcaption>{{ s.photo.island }}</figcaption>
                  </figure>
                </div>
                <h3 :id="`jr-title-${s.key}`" class="jr-station__title">{{ s.title }}</h3>
                <p class="jr-station__line">{{ s.line }}</p>
                <ul class="jr-station__points">
                  <li v-for="(p, j) in s.points" :key="j">{{ p }}</li>
                </ul>
                <NuxtLink v-if="s.to" :to="localePath(s.to)" class="jr-station__link">
                  <span>{{ s.link }}</span>
                  <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M5 13L13 5M6.5 5H13v6.5" /></svg>
                </NuxtLink>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useScrollFx } from '@/composables/useScrollFx'
import { opening, callSheet, schedule } from '@/data/Services/journey'

const { locale, t, tm, rt } = useI18n()
const localePath = useLocalePath()

const pick = (text) => text[locale.value] || text.en
const pad = (n) => String(n).padStart(2, '0')

const items = computed(() =>
  tm('services_items').map((item) => ({ title: rt(item.title), category: rt(item.category) }))
)

const facts = computed(() =>
  callSheet.facts.map((f) => ({
    label: f.labelKey ? t(f.labelKey) : pick(f.label),
    value: f.valueKey ? t(f.valueKey) : pick(f.value)
  }))
)

const stations = computed(() =>
  schedule.stations.map((s) => ({
    key: s.key,
    to: s.to,
    photo: s.photo,
    pos: s.pos,
    phase: pick(s.phase),
    when: pick(s.when),
    title: s.title ? pick(s.title) : items.value[s.item]?.title,
    line: s.line ? pick(s.line) : items.value[s.item]?.category,
    points: s.points.map(pick),
    link: s.link ? pick(s.link) : null
  }))
)

const stage = ref(null)
const schedWrap = ref(null)
const viewport = ref(null)
const track = ref(null)
const barFill = ref(null)
const lineFill = ref(null)
const stationEls = []

// The station in view (larger screens), and whether the schedule is driven
// by the scroll (until then the row of stations can be scrolled sideways)
const active = ref(0)
const driven = ref(false)

const TRACK = '(min-width: 992px) and (prefers-reduced-motion: no-preference)'
const LIST = '(max-width: 991px) and (prefers-reduced-motion: no-preference)'

// Sideways travel per pixel scrolled, and the pause (in screen heights) at
// either end, while the first station settles and the bar fills up to wrap
const SPEED = 1.25
const HOLD = 0.3

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

let goToStation = null
const goTo = (i, e) => {
  if (!goToStation) return
  e?.preventDefault()
  goToStation(i)
}

const scrollToY = (y) => {
  const smoother = typeof ScrollSmoother !== 'undefined' && ScrollSmoother.get()
  if (smoother) smoother.scrollTo(y, true)
  else window.scrollTo({ top: y, behavior: 'smooth' })
}

// Larger screens: the stage (phases and stations) is pinned while the row of
// stations moves to the left; each station's photo is wiped in as it enters.
const setupTrack = () => {
  const els = stationEls.filter(Boolean)
  const frames = els.map((el) => el.querySelector('.jr-station__frame'))
  const imgs = frames.map((f) => f.querySelector('img'))
  let hold = 0
  let travel = 0
  let pos = []
  let pad0 = 0
  let vw = window.innerWidth

  const measure = () => {
    vw = window.innerWidth
    viewport.value.scrollLeft = 0
    const c = schedWrap.value
    pad0 = Math.round(c.getBoundingClientRect().left + parseFloat(getComputedStyle(c).paddingLeft))
    viewport.value.style.setProperty('--jr-pad', `${pad0}px`)
    const first = els[0].offsetLeft
    pos = els.map((el) => el.offsetLeft - first)
    travel = pos[pos.length - 1]
    hold = Math.round(window.innerHeight * HOLD)
  }

  const n = els.length
  const render = (self) => {
    if (!self) return
    const s = self.progress * (self.end - self.start)
    const x = clamp((s - hold) * SPEED, 0, travel)
    track.value.style.transform = `translate3d(${-x}px, 0, 0)`

    // The bar: each station's moment is the middle of its phase
    let f
    if (s <= hold) f = (s / hold) * (0.5 / n)
    else if (x >= travel) f = (n - 0.5) / n + clamp((s - hold - travel / SPEED) / hold, 0, 1) * (0.5 / n)
    else {
      let i = 0
      while (i < n - 2 && x > pos[i + 1]) i++
      f = (i + 0.5 + (x - pos[i]) / (pos[i + 1] - pos[i] || 1)) / n
    }
    barFill.value.style.transform = `translate3d(${(f - 1) * 100}%, 0, 0)`

    // The station that holds the left half of the screen is the current one
    let a = 0
    pos.forEach((p, i) => {
      if (pad0 + p - x < vw * 0.5) a = i
    })
    if (active.value !== a) active.value = a

    // Photos after the first: wiped in from the left as they come in from the
    // right, the image drifting a little inside its frame
    for (let i = 1; i < n; i++) {
      const left = pad0 + pos[i] - x
      const r = clamp((vw - left) / (vw * 0.5), 0, 1)
      frames[i].style.clipPath = `inset(0% ${((1 - r) * 100).toFixed(2)}% 0% 0%)`
    }
    for (let i = 0; i < n; i++) {
      const left = pad0 + pos[i] - x
      const d = clamp((left - pad0) / vw, -1, 1)
      imgs[i].style.transform = `translate3d(${(d * -5).toFixed(2)}%, 0, 0) scale(1.12)`
    }
  }

  measure()
  const st = ScrollTrigger.create({
    trigger: stage.value,
    start: 'top top',
    end: () => `+=${Math.round(hold * 2 + travel / SPEED)}`,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onRefreshInit: measure,
    onRefresh: render,
    onUpdate: render
  })
  render(st)

  // The first photo is in view from the start: wiped in once
  gsap.fromTo(
    frames[0],
    { clipPath: 'inset(0% 100% 0% 0%)' },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.4,
      ease: 'expo.out',
      scrollTrigger: { trigger: frames[0], start: 'top 85%', once: true }
    }
  )

  // A station's moment on the scroll: its photo at the left edge
  const yOf = (i) => st.start + hold + pos[i] / SPEED + (i === n - 1 ? hold : 0)
  goToStation = (i) => scrollToY(yOf(i))

  // Keyboard: a link that gets focus brings its station into view (the row
  // must not be scrolled sideways by the browser, it is moved instead)
  const onFocus = (e) => {
    viewport.value.scrollLeft = 0
    const li = e.target.closest('.jr-station')
    const i = els.indexOf(li)
    if (i < 0) return
    requestAnimationFrame(() => {
      viewport.value.scrollLeft = 0
      if (active.value !== i || st.progress === 0 || st.progress === 1) scrollToY(yOf(i))
    })
  }
  const onScroll = () => {
    if (viewport.value.scrollLeft) viewport.value.scrollLeft = 0
  }
  stage.value.addEventListener('focusin', onFocus)
  viewport.value.addEventListener('scroll', onScroll)
  driven.value = true

  return () => {
    goToStation = null
    driven.value = false
    active.value = 0
    stage.value?.removeEventListener('focusin', onFocus)
    viewport.value?.removeEventListener('scroll', onScroll)
    st.kill()
    track.value?.style.removeProperty('transform')
    viewport.value?.style.removeProperty('--jr-pad')
    barFill.value?.style.removeProperty('transform')
    frames.forEach((f) => f.style.removeProperty('clip-path'))
    imgs.forEach((img) => img.style.removeProperty('transform'))
  }
}

// Phones and tablets: the line fills as the stations pass, each station's
// mark lights up when reached and its photo unveils upwards once.
const setupList = () => {
  const els = stationEls.filter(Boolean)
  const body = track.value.parentElement
  body.classList.add('is-live')
  gsap.fromTo(
    lineFill.value,
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: body, start: 'top 65%', end: 'bottom 65%', scrub: true }
    }
  )
  els.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 65%',
      toggleClass: { targets: el, className: 'is-reached' }
    })
    const frame = el.querySelector('.jr-station__frame')
    gsap.fromTo(
      frame,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.3,
        ease: 'expo.out',
        scrollTrigger: { trigger: frame, start: 'top 85%', once: true }
      }
    )
  })
  return () => {
    body.classList.remove('is-live')
    els.forEach((el) => el.classList.remove('is-reached'))
  }
}

useScrollFx(() => {
  const mm = gsap.matchMedia()
  mm.add(TRACK, setupTrack)
  mm.add(LIST, setupList)
  return () => mm.revert()
})
</script>

<style scoped>
/* ---------- Opening ---------- */

.jr-open {
  padding-top: 200px;
}

.jr-open__head {
  text-align: center;
}

.jr-open__title {
  margin: 0;
  font-family: 'Mona-Sans Medium', sans-serif;
  font-weight: 500;
  font-size: 60px;
  line-height: 1.2;
  text-transform: uppercase;
  text-wrap: balance;
}

.jr-open__intro {
  max-width: 760px;
  text-wrap: balance;
  margin: 30px auto 0;
  font-size: 20px;
  line-height: 1.75;
  color: #ddd;
}

.jr-open__body {
  margin-top: 130px;
}

.jr-open__text h5 {
  margin-bottom: 30px;
}

/* The call sheet: facts on fine rules */
.jr-sheet {
  margin-top: 60px;
  max-width: 440px;
}

.jr-sheet__label {
  margin-bottom: 18px;
  font-family: 'Mona-Sans Regular', sans-serif;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #c8b49a;
}

.jr-sheet__facts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.jr-sheet__facts > div {
  padding: 18px 20px 20px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.jr-sheet__facts > div:nth-child(even) {
  padding-left: 20px;
  border-left: 1px solid rgba(255, 255, 255, 0.12);
}

.jr-sheet__facts dt {
  margin-bottom: 6px;
  font-family: 'Mona-Sans Regular', sans-serif;
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}

.jr-sheet__facts dd {
  margin: 0;
  font-family: 'Mona-Sans Medium', sans-serif;
  font-size: 18px;
  line-height: 1.4;
  color: #fff;
}

/* ---------- The schedule: shared ---------- */

.jr-stage {
  position: relative;
  padding: 140px 0 120px;
}

.jr-sched-wrap {
  display: none;
}

.jr-track {
  margin: 0;
  padding: 0;
  list-style: none;
}

.jr-station {
  position: relative;
}

.jr-station__label {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 12px;
  margin: 0 0 16px;
  font-family: 'Mona-Sans Regular', sans-serif;
  font-size: 12px;
  line-height: 1.5;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}

.jr-station__no {
  color: #c8b49a;
}

.jr-station__phase {
  color: #fff;
}

.jr-station__photo {
  position: relative;
}

.jr-station__frame {
  height: auto;
  margin: 0;
  aspect-ratio: 4 / 5;
  background: #2a2626;
}

.jr-station__frame img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.jr-station__frame figcaption {
  position: absolute;
  left: 18px;
  bottom: 16px;
  z-index: 3;
  font-family: 'Mona-Sans Regular', sans-serif;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
  pointer-events: none;
}

.jr-station__title {
  margin: 0 0 12px;
  font-family: 'Mona-Sans Medium', sans-serif;
  font-weight: 500;
  font-size: 40px;
  line-height: 1.15;
  text-transform: uppercase;
  overflow-wrap: break-word;
}

.jr-station__line {
  font-size: 18px;
  line-height: 1.6;
  color: #fff;
}

.jr-station__points {
  margin: 26px 0 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.jr-station__points li {
  position: relative;
  padding: 13px 0 13px 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 300;
  line-height: 1.65;
  color: #ddd;
}

.jr-station__points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 25px;
  width: 12px;
  height: 1px;
  background: #c8b49a;
}

/* Wrap: the last line is the punchline */
.jr-station--wrap .jr-station__points li:last-child {
  color: #fff;
}

.jr-station__link {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
  padding: 12px 22px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  font-family: 'Mona-Sans Regular', sans-serif;
  font-size: 13px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #fff;
  transition: border-color 0.3s ease, color 0.3s ease;
}

.jr-station__link svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  transition: transform 0.3s ease;
}

.jr-station__link:hover {
  border-color: #c8b49a;
  color: #c8b49a;
}

.jr-station__link:hover svg {
  transform: translate(2px, -2px);
}

/* Focus in sand */
.jr a:focus-visible {
  outline: 2px solid #c8b49a;
  outline-offset: 4px;
}

/* ---------- Vertical timeline (phones, tablets, reduced motion) ---------- */

.jr-rail__tag {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 12px;
  margin: 0 0 22px;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.6);
}

.jr-rail__tag span {
  font-family: 'Mona-Sans Regular', sans-serif;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #c8b49a;
}

.jr-rail__body {
  position: relative;
  padding-left: 44px;
}

.jr-rail__line {
  position: absolute;
  left: 5px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(255, 255, 255, 0.14);
}

/* the end of the line, at wrap */
.jr-rail__line::after {
  content: '';
  position: absolute;
  left: -5px;
  bottom: 0;
  width: 11px;
  height: 1px;
  background: #c8b49a;
}

.jr-rail__line i {
  position: absolute;
  inset: 0;
  background: #c8b49a;
  transform-origin: top;
}

.jr-station__dot {
  position: absolute;
  left: -44px;
  top: 2px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  border: 1px solid #c8b49a;
  background: #c8b49a;
  transition: background-color 0.4s ease, border-color 0.4s ease;
}

.is-live .jr-station:not(.is-reached) .jr-station__dot {
  border-color: rgba(255, 255, 255, 0.35);
  background: #201d1d;
}

.jr-station {
  display: flex;
  flex-direction: column;
  padding-bottom: 90px;
}

.jr-station:last-child {
  padding-bottom: 0;
}

/* Phones and tablets: label, name and line first, then the photo */
.jr-station__photo {
  order: 1;
  margin: 26px 0 0;
}

.jr-station__points,
.jr-station__link {
  order: 2;
}

.jr-station__frame {
  aspect-ratio: 16 / 10;
}

/* Desktop with reduced motion: the timeline with photo and text side by side */
@media (min-width: 992px) {
  .jr-rail__body {
    padding-left: 64px;
  }

  .jr-station__dot {
    left: -64px;
  }

  .jr-station {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
    grid-template-rows: auto auto auto auto 1fr;
    column-gap: 8%;
    padding-bottom: 120px;
  }

  .jr-station__photo {
    grid-column: 1;
    grid-row: 1 / -1;
    margin: 0;
  }

  .jr-station__link {
    align-self: start;
    justify-self: start;
  }

  .jr-station__frame {
    aspect-ratio: 4 / 5;
  }

  .jr-station__label,
  .jr-station__title,
  .jr-station__line,
  .jr-station__points,
  .jr-station__link {
    grid-column: 2;
  }

  .jr-station__dot {
    top: 2px;
  }
}

/* ---------- Larger screens: the schedule held in view ---------- */

@media (min-width: 992px) and (prefers-reduced-motion: no-preference) {
  .jr-stage {
    display: flex;
    flex-direction: column;
    height: 100vh;
    min-height: 600px;
    padding: 118px 0 96px;
    overflow: hidden;
  }

  .jr-sched-wrap {
    display: block;
    flex: none;
  }

  .jr-sched__phases {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .jr-sched__phases a {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    column-gap: 12px;
    row-gap: 2px;
    height: 100%;
    padding: 2px 16px 14px 14px;
    border-left: 1px solid rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.4);
    transition: color 0.4s ease;
  }

  .jr-sched__phases a:hover,
  .jr-sched__phases a.is-past {
    color: rgba(255, 255, 255, 0.7);
  }

  .jr-sched__phases a.is-active {
    color: #fff;
  }

  .jr-sched__no {
    grid-row: span 2;
    font-family: 'Mona-Sans Regular', sans-serif;
    font-size: 12px;
    line-height: 1.6;
    letter-spacing: 1px;
    color: #c8b49a;
    opacity: 0.6;
    transition: opacity 0.4s ease;
  }

  .is-active .jr-sched__no,
  .is-past .jr-sched__no {
    opacity: 1;
  }

  .jr-sched__phase {
    font-family: 'Mona-Sans Regular', sans-serif;
    font-size: 13px;
    line-height: 1.5;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .jr-sched__when {
    font-size: 13px;
    line-height: 1.5;
    opacity: 0.75;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .jr-sched__phases a:focus-visible {
    outline-offset: -2px;
  }

  /* Production Services: one bar across every phase */
  .jr-sched__bar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    height: 32px;
    padding: 0 16px;
    border: 1px solid rgba(200, 180, 154, 0.4);
    border-radius: 16px;
    overflow: hidden;
  }

  .jr-sched__fill {
    position: absolute;
    inset: 0;
    background: rgba(200, 180, 154, 0.2);
    border-right: 2px solid #c8b49a;
    transform: translate3d(-100%, 0, 0);
    will-change: transform;
  }

  /* the phases' rules, continued as short marks into the bar */
  .jr-sched__tick {
    position: absolute;
    top: 0;
    height: 7px;
    width: 1px;
    background: rgba(255, 255, 255, 0.2);
  }

  .jr-sched__ps,
  .jr-sched__span {
    position: relative;
    z-index: 1;
    white-space: nowrap;
  }

  .jr-sched__ps {
    font-family: 'Mona-Sans Regular', sans-serif;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #c8b49a;
  }

  .jr-sched__span {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
  }

  /* The row of stations */
  .jr-viewport {
    flex: 1;
    min-height: 0;
    display: flex;
    align-items: center;
    margin-top: 44px;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
    container-type: size;
  }

  .jr-viewport::-webkit-scrollbar {
    display: none;
  }

  .jr-stage.is-driven .jr-viewport {
    overflow: hidden;
    /* what leaves the screen on the left fades out before the edge */
    -webkit-mask-image: linear-gradient(to right, transparent 0, #000 calc(var(--jr-pad, 75px) - 12px));
    mask-image: linear-gradient(to right, transparent 0, #000 calc(var(--jr-pad, 75px) - 12px));
  }

  .jr-rail {
    max-width: none;
    height: 100%;
    max-height: 640px;
    margin: 0;
    padding: 0;
  }

  .jr-rail__tag,
  .jr-rail__line,
  .jr-station__dot {
    display: none;
  }

  .jr-rail__body {
    height: 100%;
    padding: 0;
  }

  .jr-track {
    display: flex;
    width: max-content;
    height: 100%;
    padding: 0 var(--jr-pad, 75px);
    will-change: transform;
  }

  .jr-station {
    display: grid;
    grid-template-columns: auto 500px;
    grid-template-rows: auto auto auto auto 1fr;
    column-gap: 56px;
    height: 100%;
    padding: 0 9vw 0 0;
  }

  .jr-station:last-child {
    padding-right: 0;
  }

  .jr-station__photo {
    width: calc(min(100cqh, 640px) * 0.8);
    height: 100%;
  }

  .jr-station__frame {
    height: 100%;
    aspect-ratio: auto;
  }

  .jr-station__frame img {
    transform: scale(1.12);
  }

  .jr-station__link {
    align-self: end;
    justify-self: start;
    margin-top: 24px;
  }
}

/* Shorter screens: a tighter schedule */
@media (min-width: 992px) and (max-height: 820px) and (prefers-reduced-motion: no-preference) {
  .jr-stage {
    padding: 104px 0 88px;
  }

  .jr-viewport {
    margin-top: 30px;
  }

  .jr-station__title {
    font-size: 32px;
  }

  .jr-station__line {
    font-size: 17px;
  }

  .jr-station__points {
    margin-top: 18px;
  }

  .jr-station__points li {
    padding: 9px 0 9px 26px;
    font-size: 14px;
    line-height: 1.6;
  }

  .jr-station__points li::before {
    top: 20px;
  }

  .jr-station__link {
    margin-top: 16px;
    padding: 10px 20px;
  }
}

/* ---------- Smaller screens ---------- */

@media (max-width: 991px) {
  .jr-open {
    padding-top: 160px;
  }

  .jr-open__title {
    font-size: 40px;
  }

  .jr-open__body {
    margin-top: 90px;
  }

  .jr-sheet {
    margin: 40px 0 50px;
    max-width: none;
  }

  .jr-stage {
    padding: 100px 0 100px;
  }

  .jr-station__frame {
    aspect-ratio: 16 / 10;
  }
}

@media (max-width: 768px) {
  .jr-open {
    padding-top: 120px;
  }

  .jr-open__title {
    font-size: 32px;
  }

  .jr-open__intro {
    margin-top: 22px;
    font-size: 17px;
  }

  .jr-open__body {
    margin-top: 60px;
  }

  .jr-sheet__facts dd {
    font-size: 16px;
  }

  .jr-stage {
    padding: 80px 0 90px;
  }

  .jr-rail__body {
    padding-left: 32px;
  }

  .jr-station__dot {
    left: -32px;
  }

  .jr-station {
    padding-bottom: 70px;
  }

  .jr-station__title {
    font-size: 32px;
  }

  .jr-station__line {
    font-size: 17px;
  }

  .jr-station__photo {
    margin-top: 22px;
  }
}
</style>
