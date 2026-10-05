<template>
  <div ref="menuEl" class="hamenu">
    <!-- A dimmed photo behind the links, from a different island each time
         the menu opens (concept 07). Chosen and loaded on the client only. -->
    <div class="hamenu-photo" aria-hidden="true">
      <img
        v-if="photo"
        :key="photo.src"
        :src="photo.src"
        :srcset="photo.srcset"
        sizes="100vw"
        alt=""
        decoding="async"
      />
    </div>

    <div class="container h-100 d-flex flex-column">
      <div class="row flex-grow-1">
        <div class="col-lg-8 d-flex flex-column justify-content-center">
          <div class="menu-links">
            <ul class="main-menu rest">
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <NuxtLink :to="localePath('index')" class="link animsition-link" @click="handleNav(localePath('index'))">
                    {{ $t('nav.home') }}
                  </NuxtLink>
                </div>
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <NuxtLink :to="localePath('/services')" class="link animsition-link" @click="handleNav(localePath('/services'))">
                    {{ $t('nav.services') }}
                  </NuxtLink>
                </div>
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <NuxtLink :to="localePath('/services/tax-incentives')" class="link animsition-link" @click="handleNav(localePath('/services/tax-incentives'))">
                    {{ $t('nav.tax_incentives') }}
                  </NuxtLink>
                </div>
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <NuxtLink :to="localePath('/services/locations')" class="link animsition-link" @click="handleNav(localePath('/services/locations'))">
                    {{ $t('nav.locations') }}
                  </NuxtLink>
                </div>
              </li>
              <li @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="o-hidden">
                  <NuxtLink :to="localePath('/about')" class="link animsition-link" @click="handleNav(localePath('/about'))">
                    {{ $t('nav.about') }}
                  </NuxtLink>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-lg-4 d-none d-lg-flex align-items-center">
          <div class="cont-info">
            <div class="item mb-50">
              <h6 class="text-u fw-600 mb-20">{{ $t('menu.our_offices') }}</h6>
              <p class="fw-400 fz-18">{{ $t('menu.offices') }}</p>
            </div>

            <div class="item mb-50">
              <h6 class="text-u fw-600 mb-20">{{ $t('menu.contact') }}</h6>
              <p class="fw-400 fz-18">
                <a href="mailto:info@flipflopsfilm.com" style="color: inherit; pointer-events: auto; position: relative; z-index: 9999;">
                  info@flipflopsfilm.com
                </a>
              </p>
            </div>

            <div class="item mb-50">
              <h6 class="text-u fw-600 mb-20">{{ $t('menu.socials') }}</h6>
              <ul class="rest social-text d-flex fz-13">
                <li class="mr-20">
                  <a href="https://www.instagram.com/flipflopsfilm/" target="_blank" rel="noopener noreferrer" style="pointer-events: auto; position: relative; z-index: 9999;">
                    <span>Instagram</span>
                  </a>
                </li>
                <li class="mr-20">
                  <a href="https://www.linkedin.com/company/flip-flops-film-sl" target="_blank" rel="noopener noreferrer" style="pointer-events: auto; position: relative; z-index: 9999;">
                    <span>LinkedIn</span>
                  </a>
                </li>
              </ul>
            </div>

            <div class="bottom">
              <CommonLangSwitcher />
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile-only bottom bar -->
      <div class="mobile-bottom d-lg-none">
        <ul class="rest social-text d-flex">
          <li class="mr-20">
            <a href="https://www.instagram.com/flipflopsfilm/" target="_blank" rel="noopener noreferrer" style="pointer-events: auto; position: relative; z-index: 9999;">
              Instagram
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/company/flip-flops-film-sl" target="_blank" rel="noopener noreferrer" style="pointer-events: auto; position: relative; z-index: 9999;">
              LinkedIn
            </a>
          </li>
        </ul>
        <CommonLangSwitcher />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { menuPhotos } from '@/data/PhotoConcepts/photos'

const localePath = useLocalePath()
const route = useRoute()

const menuEl = ref(null)
const photo = ref(null)
let shown = -1 // island last actually seen in the open menu
let next = -1 // island loaded and waiting for the next open
let observer = null
let idle = null

// Every navigation is a full page load, so the island last seen is kept
// for the session; storage can be unavailable, so it is optional.
const LAST_KEY = 'ff-menu-photo'
const readLast = () => { try { return Number(sessionStorage.getItem(LAST_KEY) ?? -1) } catch { return -1 } }
const saveLast = (i) => { try { sessionStorage.setItem(LAST_KEY, String(i)) } catch {} }

// Load any island except the one seen last time.
const pickNext = () => {
  const n = menuPhotos.length
  let i
  if (!(shown >= 0 && shown < n)) {
    i = Math.floor(Math.random() * n)
  } else {
    i = Math.floor(Math.random() * (n - 1))
    if (i >= shown) i++
  }
  next = i
  photo.value = menuPhotos[i]
}

const markShown = () => {
  shown = next
  saveLast(shown)
}

// While the menu is open the page behind it must not scroll: otherwise it
// moves underneath, its scrollbar shows next to the menu and the navbar
// logo shrinks. ScrollSmoother (desktop) scrolls programmatically, so it is
// paused too; the gutter keeps the layout from shifting.
const lockPage = (lock) => {
  const smoother = typeof ScrollSmoother !== 'undefined' && ScrollSmoother.get()
  smoother?.paused(lock)
  const html = document.documentElement
  html.style.overflow = lock ? 'hidden' : ''
  html.style.scrollbarGutter = lock ? 'stable' : ''
}

onMounted(() => {
  shown = readLast()
  // Load the photo once the page itself has settled, not during page load.
  const load = () => { if (!photo.value) pickNext() }
  idle = window.requestIdleCallback ? window.requestIdleCallback(load, { timeout: 2500 }) : setTimeout(load, 1500)

  // The navbar opens and closes the menu by toggling the "open" class.
  // After each close, prepare the next island for the next open.
  let wasOpen = false
  observer = new MutationObserver(() => {
    const open = menuEl.value.classList.contains('open')
    if (open && !wasOpen) {
      if (!photo.value) pickNext()
      markShown()
      lockPage(true)
    }
    if (wasOpen && !open) {
      lockPage(false)
      setTimeout(pickNext, 600)
    }
    wasOpen = open
  })
  observer.observe(menuEl.value, { attributes: true, attributeFilter: ['class'] })
})

onBeforeUnmount(() => {
  observer?.disconnect()
  lockPage(false)
  if (window.cancelIdleCallback && typeof idle === 'number') window.cancelIdleCallback(idle)
  clearTimeout(idle)
})

const closeMenu = () => {
  document.querySelector('.hamenu').classList.remove('open')
  document.querySelector('.topnav').classList.remove('navlit')
  document.querySelector('.topnav .menu-icon').classList.remove('open')
}

const handleNav = (targetPath) => {
  closeMenu()
  if (route.path === targetPath) {
    window.location.reload()
  }
}

const handleMouseEnter = (event) => {
  Object.values(event.currentTarget.parentElement.children).forEach(
    el => el.style.opacity = '0.5'
  )
  event.currentTarget.style.opacity = '1'
}

const handleMouseLeave = (event) => {
  Object.values(event.currentTarget.parentElement.children).forEach(
    el => el.style.opacity = '1'
  )
}
</script>

<style scoped>
.hamenu {
  display: flex;
  flex-direction: column;
  /* Scrolling inside the menu (small phones) must not reach the page. */
  overscroll-behavior: contain;
}

/* Desktop windows tall enough for the whole menu: no scrolling inside it.
   The theme's decorative vertical line (200vh tall) otherwise made it
   scrollable, because globals.css allows menu scrolling for small phones.
   Shorter windows keep scrolling so nothing gets cut off. */
@media (min-width: 992px) and (min-height: 720px) {
  .hamenu {
    overflow: hidden !important;
  }
}

/* Fill the menu exactly (h-100 plus the menu's own padding made it 96px
   taller than the screen, which gave the menu its own scrollbar). */
.hamenu .container {
  position: relative;
  z-index: 1;
  flex: 1;
  height: auto !important;
  min-height: 0;
  padding-top: 100px;
  padding-bottom: 32px;
}

/* Background photo: fades in after the menu has slid down, then drifts. */
.hamenu-photo {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.hamenu-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: var(--pc-film-filter);
  opacity: 0;
  transform: scale(1.08);
  transition: opacity 1.2s ease 0.5s, transform 8s ease-out 0.5s;
}

.hamenu.open .hamenu-photo img {
  opacity: 0.4;
  transform: scale(1);
}

/* Darker on the left, where the links are. */
.hamenu-photo::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(32, 29, 29, 0.85) 0%,
    rgba(32, 29, 29, 0.35) 65%,
    rgba(32, 29, 29, 0.55) 100%
  );
}

@media (prefers-reduced-motion: reduce) {
  .hamenu-photo img {
    transform: none;
    transition: opacity 0.6s ease 0.3s;
  }
}

/* Mobile bottom bar: socials + lang side by side */
.mobile-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-bottom .social-text {
  font-size: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  opacity: 0.6;
}

.mobile-bottom :deep(.lang-switcher) {
  font-size: 12px;
  letter-spacing: 1.5px;
  pointer-events: auto;
  position: relative;
  z-index: 9999;
}

.mobile-bottom :deep(.lang-item),
.mobile-bottom :deep(.lang-sep) {
  pointer-events: auto;
  position: relative;
  z-index: 9999;
}
</style>
