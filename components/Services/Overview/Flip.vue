<template>
  <!-- Services overview, proposal 3 "Flip": the four services as four tall
       cards that turn over like a flip flop or a clapperboard. The front is a
       photo with the service name; the back is a film slate whose clapper
       claps shut as the card lands. Hover flips on a desktop, a tap on touch,
       Enter or Space from the keyboard. Below, the Production Services text. -->
  <div class="ff" :lang="locale">
    <section class="ff-top">
      <div class="container">
        <div class="ff-intro row">
          <div class="col-lg-8">
            <h2 class="ff-intro__title">
              <span>{{ pick(statement)[0] }}</span>
              <span class="ff-intro__title-2">{{ pick(statement)[1] }}</span>
            </h2>
          </div>
          <div class="col-lg-4 ff-intro__aside">
            <p class="ff-intro__text">{{ pick(intro) }}</p>
          </div>
        </div>

        <ul ref="list" class="ff-cards">
          <li
            v-for="(card, i) in items"
            :key="i"
            class="ff-card"
            :class="{ 'is-flipped': flipped[i] }"
            @pointerenter="onEnter(i, $event)"
            @pointerleave="onLeave(i, $event)"
            @pointerdown="lastPointer = $event.pointerType"
            @keydown.esc="close(i)"
          >
            <!-- The card itself is this button; the faces are drawn above it
                 and let clicks through except on the back's link. -->
            <button
              :ref="(el) => (buttons[i] = el)"
              type="button"
              class="ff-card__hit"
              :aria-expanded="flipped[i] ? 'true' : 'false'"
              :aria-controls="`ff-back-${i}`"
              aria-describedby="ff-hint"
              @click="onClick(i, $event)"
            >
              <span class="pc-sr-only">{{ card.title }}</span>
            </button>

            <div class="ff-card__tilt">
              <div class="ff-card__inner">
                <!-- Front: the photo, the number and the name -->
                <div class="ff-face ff-front" aria-hidden="true">
                  <div class="ff-front__photo pc-filmic">
                    <img
                      :src="card.photo.md"
                      :srcset="card.photo.srcset"
                      sizes="(max-width: 767px) 80vw, (max-width: 1199px) 50vw, 25vw"
                      :width="card.photo.w"
                      :height="card.photo.h"
                      :style="{ objectPosition: card.pos }"
                      alt=""
                      decoding="async"
                    />
                  </div>
                  <span class="ff-front__no">{{ card.no }}</span>
                  <span class="ff-front__turn">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 11a8 8 0 0 0-14.2-4.9L4 8" />
                      <path d="M4 3.5V8h4.5" />
                      <path d="M4 13a8 8 0 0 0 14.2 4.9L20 16" />
                      <path d="M20 20.5V16h-4.5" />
                    </svg>
                  </span>
                  <p class="ff-front__title">{{ card.display }}</p>
                </div>

                <!-- Back: the slate -->
                <div :id="`ff-back-${i}`" class="ff-face ff-back" :inert="!flipped[i]">
                  <div class="ff-clap" aria-hidden="true">
                    <span class="ff-clap__stick"><i class="ff-clap__pin"></i></span>
                    <span class="ff-clap__bar"></span>
                  </div>

                  <div class="ff-slate">
                    <div class="ff-slate__row" aria-hidden="true">
                      <div class="ff-field">
                        <span class="ff-field__label">{{ pick(slate.prod) }}</span>
                        <span class="ff-field__value">{{ slate.company }}</span>
                      </div>
                      <div class="ff-field ff-field--take">
                        <span class="ff-field__label">{{ pick(slate.take) }}</span>
                        <span class="ff-field__value">{{ takes[i] || 1 }}</span>
                      </div>
                    </div>

                    <div class="ff-field ff-field--scene">
                      <span class="ff-field__label" aria-hidden="true">{{ pick(slate.scene) }} {{ card.no }}</span>
                      <h3 class="ff-field__title">{{ card.display }}</h3>
                    </div>

                    <div class="ff-slate__body">
                      <p class="ff-slate__line">{{ card.line }}</p>
                      <ul class="ff-slate__points">
                        <li v-for="point in card.points" :key="point">{{ point }}</li>
                      </ul>

                      <a
                        v-if="card.to.startsWith('#')"
                        class="ff-slate__link"
                        :href="card.to"
                        @click.prevent="toText"
                      >
                        <span>{{ card.link }}</span>
                        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" />
                        </svg>
                      </a>
                      <NuxtLink v-else class="ff-slate__link" :to="localePath(card.to)">
                        <span>{{ card.link }}</span>
                        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
                        </svg>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <span id="ff-hint" class="pc-sr-only">{{ pick(flipHint) }}</span>
      </div>
    </section>

    <!-- The Production Services text, where the first card's link leads -->
    <section id="production-services" ref="prodText" class="ff-prod section-padding bord-thin-bottom" tabindex="-1">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <span class="sub-title bord mb-30"><em class="ff-prod__no" aria-hidden="true">01</em>{{ $t('services.top_label') }}</span>
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
import { ref, reactive, computed, onBeforeUnmount } from 'vue'
import { useScrollFx } from '@/composables/useScrollFx'
import { statement, intro, slate, flipHint, breaks, cards } from '@/data/Services/flip'

const { locale, tm, rt } = useI18n()
const localePath = useLocalePath()

const pick = (o) => o[locale.value] ?? o.en
const text = (v) => (typeof v === 'string' ? v : rt(v))
// Soft hyphens at the joints of long compounds (see `breaks`)
const soft = (s) => s.replace(/\p{L}{13,}/gu, (w) => breaks[w] ?? w)

const items = computed(() =>
  tm('services_items').map((item, i) => ({
    ...cards[i],
    no: String(i + 1).padStart(2, '0'),
    title: text(item.title),
    display: soft(text(item.title)),
    line: text(item.category),
    link: pick(cards[i].link),
    points: pick(cards[i].points)
  }))
)

const flipped = reactive([false, false, false, false])
// How often each card has been turned to its slate: the take number.
const takes = reactive([0, 0, 0, 0])
const buttons = []
const list = ref(null)
const prodText = ref(null)
const lastPointer = ref('')

const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

function setFlip(i, value) {
  if (flipped[i] === value) return
  flipped[i] = value
  if (value) takes[i]++
}

// A mouse turns the card while it rests on it, after a beat, so a cursor
// that only sweeps across the row leaves the cards alone.
const hoverTimers = []

function onEnter(i, e) {
  if (e.pointerType !== 'mouse' || !canHover()) return
  clearTimeout(hoverTimers[i])
  hoverTimers[i] = setTimeout(() => setFlip(i, true), 110)
}

function onLeave(i, e) {
  if (e.pointerType !== 'mouse' || !canHover()) return
  clearTimeout(hoverTimers[i])
  setFlip(i, false)
}

onBeforeUnmount(() => hoverTimers.forEach(clearTimeout))

// Keyboard (detail 0) and touch toggle; a mouse click only keeps the card
// turned, since hovering already turned it.
function onClick(i, e) {
  if (e.detail > 0 && lastPointer.value === 'mouse' && canHover()) {
    setFlip(i, true)
    return
  }
  setFlip(i, !flipped[i])
}

function close(i) {
  if (!flipped[i]) return
  setFlip(i, false)
  buttons[i]?.focus()
}

// The first card's link: down to the Production Services text.
function toText() {
  const el = prodText.value
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const smoother = typeof ScrollSmoother !== 'undefined' && ScrollSmoother.get()
  if (smoother) smoother.scrollTo(el, !reduce, 'top 60px')
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: reduce ? 'auto' : 'smooth' })
  el.focus({ preventScroll: true })
}

// The cards are dealt onto the table, then each gives a small nudge, as if
// about to turn, to show that they do.
useScrollFx(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const cardsEls = list.value.querySelectorAll('.ff-card')
  const tilts = list.value.querySelectorAll('.ff-card__tilt')
  const loader = document.querySelector('.loader-wrap')
  const waitForLoader = loader && getComputedStyle(loader).display !== 'none' && list.value.getBoundingClientRect().top < window.innerHeight
  const tl = gsap.timeline({
    delay: waitForLoader ? 2.6 : 0,
    scrollTrigger: { trigger: list.value, start: 'top 85%', once: true }
  })
  tl.from(cardsEls, { y: 90, opacity: 0, duration: 1.3, ease: 'expo.out', stagger: 0.1 })
    .to(tilts, {
      keyframes: [
        { rotationY: -16, duration: 0.32, ease: 'power2.out' },
        { rotationY: 0, duration: 0.7, ease: 'back.out(3)' }
      ],
      stagger: 0.09,
      clearProps: 'transform'
    }, '-=0.5')
})
</script>

<style scoped>
.ff {
  --ff-sand: #C8B49A;
  --ff-ink: #141212;
  --ff-slate: #171515;
  --ff-chalk: rgba(255, 255, 255, 0.16);
}

/* ---------- Intro ---------- */

.ff-top {
  padding: 200px 0 140px;
}

.ff-intro {
  align-items: flex-end;
  margin-bottom: 70px;
}

.ff-intro__title {
  margin: 0;
  font-family: 'Mona-Sans Medium', sans-serif;
  font-weight: 500;
  font-size: 60px;
  line-height: 1.2;
  text-transform: uppercase;
}

.ff-intro__title span {
  display: block;
}

.ff-intro__title-2 {
  color: var(--ff-sand);
}

.ff-intro__text {
  font-size: 17px;
  line-height: 1.75;
  padding-bottom: 8px;
}

/* ---------- The row of cards ---------- */

.ff-cards {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  margin: 0;
  padding: 0;
}

.ff-card {
  position: relative;
  display: grid;
  perspective: 1500px;
  container-type: inline-size;
}

.ff-card:not(.is-flipped) {
  cursor: pointer;
}

.ff-card__hit {
  position: absolute;
  inset: 0;
  z-index: 1;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 4px;
  background: transparent;
  cursor: inherit;
}

.ff-card__hit:focus {
  outline: none;
}

.ff-card__hit:focus-visible {
  outline: 2px solid var(--ff-sand);
  outline-offset: 6px;
}

/* Above the button but transparent to the pointer, so the whole card stays
   the button; only the back's link takes clicks. */
.ff-card__tilt {
  position: relative;
  z-index: 2;
  display: grid;
  pointer-events: none;
  transform-style: preserve-3d;
}

.ff-card__inner {
  position: relative;
  display: grid;
  transform-style: preserve-3d;
  transition: transform 0.9s cubic-bezier(0.34, 1.32, 0.52, 1);
}

/* A tall card, 2:3; it grows if a language needs more room on the back */
.ff-card__inner::before {
  content: '';
  grid-area: 1 / 1;
  padding-top: 150%;
}

.ff-card.is-flipped .ff-card__inner {
  transform: rotateY(180deg);
}

.ff-face {
  grid-area: 1 / 1;
  position: relative;
  border-radius: 4px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

/* ---------- Front ---------- */

.ff-front {
  overflow: hidden;
  background: var(--ff-ink);
}

.ff-front__photo {
  position: absolute;
  inset: 0;
}

.ff-front__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1.02);
  transition: transform 1.2s cubic-bezier(0.2, 0.7, 0.2, 1);
}

/* Shade at the foot of the photo for the name */
.ff-front::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 3;
  background:
    linear-gradient(to top, rgba(20, 16, 13, 0.82) 0%, rgba(20, 16, 13, 0.35) 34%, rgba(20, 16, 13, 0) 58%),
    linear-gradient(to bottom, rgba(20, 16, 13, 0.4) 0%, rgba(20, 16, 13, 0) 22%);
  pointer-events: none;
}

.ff-front__no,
.ff-front__turn,
.ff-front__title {
  position: absolute;
  z-index: 4;
}

.ff-front__no {
  top: 22px;
  left: 22px;
  font-size: 13px;
  letter-spacing: 2px;
  color: var(--ff-sand);
}

.ff-front__turn {
  top: 14px;
  right: 14px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #fff;
  transition: transform 0.6s ease, border-color 0.3s ease;
}

.ff-front__title {
  left: 22px;
  right: 22px;
  bottom: 22px;
  margin: 0;
  font-family: 'Mona-Sans Medium', sans-serif;
  font-weight: 500;
  font-size: clamp(19px, 8cqw, 28px);
  line-height: 1.15;
  text-transform: uppercase;
  color: #fff;
  -webkit-hyphens: manual;
  hyphens: manual;
  overflow-wrap: break-word;
}

/* ---------- Back: the slate ---------- */

.ff-back {
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  background: var(--ff-slate);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.35);
}

/* The clapper: a hinged stick over the striped top of the slate. Stripes run
   the other way on the stick, as on a real clapperboard. */
.ff-clap {
  position: relative;
  height: 50px;
  flex: none;
  margin: -1px -1px 0;
}

.ff-clap__stick,
.ff-clap__bar {
  position: absolute;
  left: 0;
  right: 0;
  height: 22px;
}

.ff-clap__stick {
  top: 0;
  border-radius: 4px 4px 1px 1px;
  background: repeating-linear-gradient(-58deg, var(--ff-sand) 0 13px, var(--ff-ink) 13px 26px);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.35);
  transform-origin: 11px 100%;
  transform: rotate(-11deg);
  transition: transform 0.25s ease 0.4s;
}

.ff-clap__bar {
  top: 25px;
  background: repeating-linear-gradient(58deg, var(--ff-sand) 0 13px, var(--ff-ink) 13px 26px);
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.35);
}

.ff-clap__pin {
  position: absolute;
  left: 5px;
  top: 7px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #8d8073;
  box-shadow: 0 0 0 2px var(--ff-ink);
}

/* Clap: shut once the card has landed */
.ff-card.is-flipped .ff-clap__stick {
  transform: rotate(0deg);
  transition: transform 0.13s cubic-bezier(0.6, 0, 1, 0.6) 0.55s;
}

.ff-card.is-flipped .ff-slate {
  animation: ff-knock 0.3s ease-out 0.68s;
}

@keyframes ff-knock {
  30% { transform: translateY(2px); }
  100% { transform: none; }
}

.ff-slate {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.ff-slate__row {
  display: grid;
  grid-template-columns: 1fr auto;
  border-bottom: 1px solid var(--ff-chalk);
}

.ff-field {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 11px 16px 10px;
  min-width: 0;
}

.ff-field__label {
  font-size: 10px;
  line-height: 1.2;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--ff-sand);
}

.ff-field__value {
  font-family: 'Mona-Sans Medium', sans-serif;
  font-size: 13px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #fff;
  white-space: nowrap;
}

.ff-field--take {
  align-items: center;
  min-width: 64px;
  border-left: 1px solid var(--ff-chalk);
}

.ff-field--take .ff-field__value {
  font-size: 22px;
  line-height: 1;
  margin-top: 1px;
}

.ff-field--scene {
  gap: 6px;
  padding: 13px 16px 15px;
  border-bottom: 1px solid var(--ff-chalk);
}

.ff-field__title {
  margin: 0;
  font-family: 'Mona-Sans Medium', sans-serif;
  font-weight: 500;
  font-size: clamp(18px, 7.6cqw, 28px);
  line-height: 1.15;
  text-transform: uppercase;
  color: #fff;
  -webkit-hyphens: manual;
  hyphens: manual;
  overflow-wrap: break-word;
}

.ff-slate__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px 16px 18px;
}

.ff-slate__line {
  font-size: clamp(13px, 5cqw, 16px);
  line-height: 1.55;
  color: #fff;
}

.ff-slate__points {
  margin: 14px 0 22px;
  padding: 0;
}

.ff-slate__points li {
  position: relative;
  padding-left: 18px;
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-size: clamp(12.5px, 4.6cqw, 14.5px);
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.72);
}

.ff-slate__points li + li {
  margin-top: 8px;
}

.ff-slate__points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.75em;
  width: 9px;
  height: 1px;
  background: var(--ff-sand);
}

.ff-slate__link {
  pointer-events: auto;
  margin-top: auto;
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 30px;
  font-size: 11px;
  letter-spacing: 1.2px;
  line-height: 1.3;
  text-transform: uppercase;
  color: #fff;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.ff-slate__link:hover {
  background: var(--ff-sand);
  border-color: var(--ff-sand);
  color: var(--ff-ink);
}

.ff-slate__link:focus {
  outline: none;
}

.ff-slate__link:focus-visible {
  outline: 2px solid var(--ff-sand);
  outline-offset: 3px;
}

.ff-slate__link svg {
  flex: none;
}

/* ---------- The Production Services text ---------- */

.ff-prod:focus {
  outline: none;
}

.ff-prod__no {
  margin-right: 14px;
  font-style: normal;
  color: var(--ff-sand);
}

/* ---------- Smaller screens ---------- */

/* Tablets and small laptops: two by two, less tall */
@media (max-width: 1199px) {
  .ff-cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }

  .ff-card__inner::before {
    padding-top: 100%;
  }
}

@media (max-width: 991px) {
  .ff-top {
    padding: 160px 0 100px;
  }

  .ff-intro {
    margin-bottom: 50px;
  }

  .ff-intro__title {
    font-size: 40px;
  }

  .ff-intro__aside {
    margin-top: 24px;
  }

  .ff-card__inner::before {
    padding-top: 125%;
  }
}

/* Phones: a row to swipe through, one card at a time */
@media (max-width: 767px) {
  .ff-top {
    padding: 120px 0 70px;
  }

  .ff-intro {
    margin-bottom: 26px;
  }

  .ff-intro__title {
    font-size: 32px;
  }

  .ff-intro__text {
    font-size: 16px;
  }

  .ff-cards {
    display: flex;
    gap: 14px;
    margin: 0 calc(50% - 50vw);
    padding: 44px 16px 10px;
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    scroll-padding: 0 16px;
    scrollbar-width: none;
  }

  .ff-cards::-webkit-scrollbar {
    display: none;
  }

  .ff-card {
    flex: 0 0 80%;
    scroll-snap-align: start;
  }

  .ff-card__inner::before {
    padding-top: 145%;
  }

  .ff-clap__stick {
    transform: rotate(-8deg);
  }
}

/* No motion: front and back cross-fade in place */
@media (prefers-reduced-motion: reduce) {
  .ff-card__inner,
  .ff-card.is-flipped .ff-card__inner {
    transform: none;
    transition: none;
  }

  .ff-front,
  .ff-back {
    transition: opacity 0.35s ease;
  }

  .ff-back {
    transform: none;
    opacity: 0;
  }

  .ff-card.is-flipped .ff-back {
    opacity: 1;
  }

  .ff-card.is-flipped .ff-front {
    opacity: 0;
  }

  .ff-clap__stick,
  .ff-card.is-flipped .ff-clap__stick {
    transform: none;
    transition: none;
  }

  .ff-card.is-flipped .ff-slate {
    animation: none;
  }
}
</style>
