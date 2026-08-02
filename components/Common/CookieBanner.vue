<template>
  <!--
    Rendered only after the client has read localStorage (`ready`), so the
    prerendered HTML never ships a visible banner that would flash for returning
    visitors who already decided. `decided` hides it once a choice exists; the
    footer "Cookie settings" link flips it back open via reopen().
  -->
  <ClientOnly>
    <div
      v-if="ready && !decided"
      class="cookie-banner"
      role="dialog"
      aria-modal="false"
      :aria-label="$t('cookies.title')"
    >
      <div class="cookie-banner__inner">
        <div class="cookie-banner__head">
          <h2 class="cookie-banner__title">{{ $t('cookies.title') }}</h2>
          <p class="cookie-banner__text">
            {{ $t('cookies.text') }}
            <NuxtLink :to="localePath('/cookie-policy')" class="cookie-banner__link">
              {{ $t('cookies.policy_link') }}
            </NuxtLink>
          </p>
        </div>

        <!-- Per-category detail, collapsed by default -->
        <div v-if="settingsOpen" class="cookie-banner__categories">
          <div class="cookie-cat">
            <div class="cookie-cat__row">
              <span class="cookie-cat__name">{{ $t('cookies.necessary_title') }}</span>
              <span class="cookie-cat__always">{{ $t('cookies.always_on') }}</span>
            </div>
            <p class="cookie-cat__desc">{{ $t('cookies.necessary_desc') }}</p>
          </div>

          <div v-for="cat in OPTIONAL_CATEGORIES" :key="cat" class="cookie-cat">
            <div class="cookie-cat__row">
              <label class="cookie-cat__name" :for="`cookie-cat-${cat}`">
                {{ $t(`cookies.${cat}_title`) }}
              </label>
              <label class="cookie-switch">
                <input
                  :id="`cookie-cat-${cat}`"
                  v-model="categories[cat]"
                  type="checkbox"
                />
                <span class="cookie-switch__track"><span class="cookie-switch__dot"></span></span>
              </label>
            </div>
            <p class="cookie-cat__desc">{{ $t(`cookies.${cat}_desc`) }}</p>
          </div>
        </div>

        <!--
          Reject sits next to Accept with identical weight. Under GDPR/ePrivacy
          refusing has to be as easy as agreeing, so no "accept" hero button and
          no greyed-out decline link.
        -->
        <div class="cookie-banner__actions">
          <button type="button" class="cookie-btn cookie-btn--solid" @click="acceptAll">
            {{ $t('cookies.accept_all') }}
          </button>
          <button type="button" class="cookie-btn cookie-btn--solid" @click="rejectAll">
            {{ $t('cookies.reject_all') }}
          </button>
          <button
            v-if="!settingsOpen"
            type="button"
            class="cookie-btn cookie-btn--ghost"
            @click="settingsOpen = true"
          >
            {{ $t('cookies.customize') }}
          </button>
          <button
            v-else
            type="button"
            class="cookie-btn cookie-btn--ghost"
            @click="saveSelection"
          >
            {{ $t('cookies.save') }}
          </button>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { OPTIONAL_CATEGORIES, useCookieConsent } from '@/composables/useCookieConsent'

const localePath = useLocalePath()
const {
  categories,
  decided,
  ready,
  settingsOpen,
  load,
  acceptAll,
  rejectAll,
  saveSelection
} = useCookieConsent()

// localStorage only exists on the client; ClientOnly guarantees this runs there.
onMounted(load)
</script>

<style scoped>
/*
  z-index 9999999 puts the banner above .topnav (999999) but below the loader
  (99999999999999) and the .animsition-overlay-slide page transition (999999999),
  so it never covers the intro animation.
  pointer-events is set explicitly because the theme paints a full-screen
  .noise / body:after overlay above much of the page.
*/
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999999;
  pointer-events: auto;
  padding: 20px;
  background: rgba(24, 21, 21, 0.97);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  font-family: 'Poppins', sans-serif;
  color: #fff;
  animation: cookie-rise 0.4s ease both;
}

@keyframes cookie-rise {
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .cookie-banner { animation: none; }
}

.cookie-banner__inner {
  max-width: 1200px;
  margin: 0 auto;
}

.cookie-banner__title {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  margin: 0 0 8px;
  color: #fff;
}

.cookie-banner__text {
  font-size: 13px;
  line-height: 1.6;
  margin: 0;
  color: rgba(255, 255, 255, 0.75);
  max-width: 720px;
}

.cookie-banner__link {
  color: #fff;
  text-decoration: underline;
  text-underline-offset: 2px;
  pointer-events: auto;
}

.cookie-banner__link:hover { opacity: 0.7; }

/* Scrolls independently so the banner can't grow taller than the viewport on
   a phone once all categories are expanded. */
.cookie-banner__categories {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  max-height: 38vh;
  overflow-y: auto;
}

.cookie-cat { padding: 10px 0; }
.cookie-cat + .cookie-cat { border-top: 1px solid rgba(255, 255, 255, 0.07); }

.cookie-cat__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.cookie-cat__name {
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
}

.cookie-cat__always {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.45);
  white-space: nowrap;
}

.cookie-cat__desc {
  font-size: 12px;
  line-height: 1.55;
  margin: 4px 0 0;
  color: rgba(255, 255, 255, 0.6);
  max-width: 640px;
}

/* Toggle switch */
.cookie-switch {
  position: relative;
  flex-shrink: 0;
  cursor: pointer;
  pointer-events: auto;
}

.cookie-switch input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  cursor: pointer;
}

.cookie-switch__track {
  display: block;
  width: 40px;
  height: 22px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.18);
  transition: background 0.25s ease;
}

.cookie-switch__dot {
  display: block;
  width: 16px;
  height: 16px;
  margin: 3px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.25s ease;
}

.cookie-switch input:checked + .cookie-switch__track { background: #4c9a5f; }
.cookie-switch input:checked + .cookie-switch__track .cookie-switch__dot {
  transform: translateX(18px);
}

.cookie-switch input:focus-visible + .cookie-switch__track {
  outline: 2px solid #fff;
  outline-offset: 2px;
}

/* Actions */
.cookie-banner__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}

.cookie-btn {
  flex: 0 0 auto;
  min-width: 140px;
  padding: 11px 22px;
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  font-family: inherit;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  pointer-events: auto;
  transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}

.cookie-btn--solid {
  background: #fff;
  color: #201d1d;
  border-color: #fff;
}

.cookie-btn--solid:hover {
  background: transparent;
  color: #fff;
}

.cookie-btn--ghost {
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
}

.cookie-btn--ghost:hover {
  color: #201d1d;
  background: #fff;
  border-color: #fff;
}

.cookie-btn:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
}

@media (max-width: 767px) {
  .cookie-banner { padding: 16px; }
  .cookie-banner__actions { gap: 8px; }
  .cookie-btn { flex: 1 1 100%; min-width: 0; }
}
</style>
