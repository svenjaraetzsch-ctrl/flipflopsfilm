<template>
  <header class="contact-header section-padding">
    <div class="container mt-100">
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="cont text-center mb-80">
            <h6 class="sub-title mb-15"><span class="icon-img-30 mr-10"><img src="/assets/imgs/svg-assets/hi.png"
                  alt="" /></span> Hello, Let's get in touch</h6>
            <h1>Get In Touch.</h1>
          </div>
        </div>
        <div class="col-lg-11">
          <div class="google-map">
            <!--
              The iframe is only mounted once the visitor has consented to
              external media. Google sets cookies and reads device storage the
              instant this element exists, so rendering it hidden (v-show, CSS,
              or a lazy iframe that still has a src) would still be a pre-consent
              transfer. The v-if is load-bearing — don't swap it for v-show.
            -->
            <iframe
              v-if="mapAllowed"
              id="gmap_canvas"
              :src="mapSrc"
              :title="$t('cookies.map_title')"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>

            <div v-else class="map-placeholder">
              <div class="map-placeholder__inner">
                <h3 class="map-placeholder__title">{{ $t('cookies.map_blocked_title') }}</h3>
                <p class="map-placeholder__text">{{ $t('cookies.map_blocked_text') }}</p>
                <button type="button" class="map-placeholder__btn" @click="grant('external_media')">
                  {{ $t('cookies.map_load') }}
                </button>
                <NuxtLink :to="localePath('/cookie-policy')" class="map-placeholder__link">
                  {{ $t('cookies.policy_link') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useCookieConsent } from '@/composables/useCookieConsent'

const localePath = useLocalePath()
const { categories, load, grant } = useCookieConsent()

// Registered office from the legal notice (Calle Secretario Artiles 12, Las
// Palmas de Gran Canaria). This was the theme's demo query ("hollwood"), which
// pointed the map at Hollywood, California.
const mapSrc =
  'https://www.google.com/maps?q=Calle%20Secretario%20Artiles%2012%2C%2035007%20Las%20Palmas%20de%20Gran%20Canaria&t=&z=14&ie=UTF8&iwloc=&output=embed'

const mapAllowed = computed(() => categories.value.external_media === true)

onMounted(load)
</script>

<style scoped>
.map-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.map-placeholder__inner { max-width: 480px; }

.map-placeholder__title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 10px;
  color: #fff;
}

.map-placeholder__text {
  font-size: 13px;
  line-height: 1.6;
  margin: 0 0 20px;
  color: rgba(255, 255, 255, 0.7);
}

/* pointer-events is explicit because the theme lays a full-screen .noise
   overlay over the page (same reason the footer's social links set it). */
.map-placeholder__btn {
  pointer-events: auto;
  cursor: pointer;
  padding: 11px 26px;
  border-radius: 30px;
  border: 1px solid #fff;
  background: #fff;
  color: #201d1d;
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: background 0.25s ease, color 0.25s ease;
}

.map-placeholder__btn:hover {
  background: transparent;
  color: #fff;
}

.map-placeholder__btn:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
}

.map-placeholder__link {
  display: block;
  margin-top: 14px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
  text-decoration: underline;
  text-underline-offset: 2px;
  pointer-events: auto;
}

.map-placeholder__link:hover { color: #fff; }
</style>
