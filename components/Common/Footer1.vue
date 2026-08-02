<!-- Main Footer -->
<template>
  <footer :class="{ 'sub-bg': subBg }">
    <div class="footer-container">
      <div class="container pb-80 pt-80 ontop">
        <div class="row">
          <div class="col-lg-6">
            <div class="eml">
              <h6 class="sub-title opacity-8">{{ $t('footer.tagline') }}</h6>
              <h2 class="underline footer-email">
                <a :href="emailHref">{{ emailLabel }}</a>
              </h2>
            </div>
          </div>
        </div>

        <div class="row mt-80">
          <div class="col-lg-3">
            <div class="logo">
              <CommonLogoSVG />
            </div>
          </div>

          <div class="col-lg-6">
            <div class="column">
              <h6 class="sub-title mb-30">{{ $t('footer.social_media') }}</h6>
              <ul class="rest">
                <li>
                  <a href="https://www.instagram.com/flipflopsfilm/" target="_blank" rel="noopener noreferrer" style="pointer-events:auto;">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/flip-flops-film-sl" target="_blank" rel="noopener noreferrer" style="pointer-events:auto;">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-lg-3">
            <div class="column">
              <h6 class="sub-title mb-30">{{ $t('footer.our_offices') }}</h6>
              <p>{{ $t('footer.offices') }}</p>
              <h5 class="mt-15 underline">
                <a :href="emailHref">{{ $t('footer.contact_us') }}</a>
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div class="container bord pt-30 pb-20 bord-thin-top">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="links">
              <ul class="rest">
                <li><NuxtLink :to="localePath('/about')" class="animsition-link">{{ $t('footer.about_us') }}</NuxtLink></li>
                <li><NuxtLink :to="localePath('/services/tax-incentives')" class="animsition-link">{{ $t('nav.tax_incentives') }}</NuxtLink></li>
                <li><NuxtLink :to="localePath('/services/locations')" class="animsition-link">{{ $t('nav.locations') }}</NuxtLink></li>
                <li><NuxtLink :to="localePath('/services')" class="animsition-link">{{ $t('nav.services') }}</NuxtLink></li>
                <li><NuxtLink :to="localePath('/faqs')" class="animsition-link">{{ $t('nav.faqs') }}</NuxtLink></li>
              </ul>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="d-flex align-items-center justify-content-end gap-30 footer-bottom-right">
              <CommonLangSwitcher />
              <p class="fz-13 mb-0">{{ $t('footer.copyright') }}</p>
            </div>
          </div>
        </div>

        <div class="row mt-15">
          <div class="col-12">
            <div class="legal-links">
              <NuxtLink :to="localePath('/privacy-policy')" class="animsition-link">{{ $t('footer.privacy_policy') }}</NuxtLink>
              <NuxtLink :to="localePath('/imprint')" class="animsition-link">{{ $t('footer.imprint') }}</NuxtLink>
              <NuxtLink :to="localePath('/cookie-policy')" class="animsition-link">{{ $t('footer.cookie_policy') }}</NuxtLink>
              <!-- Reopens the consent banner. Withdrawing consent has to be as
                   easy as giving it, so this sits with the other legal links on
                   every page rather than being buried in the privacy policy. -->
              <button type="button" class="cookie-settings-link" @click="reopen">
                {{ $t('footer.cookie_settings') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { onMounted, onBeforeUnmount, computed } from 'vue'
import { useCookieConsent } from '@/composables/useCookieConsent'

const { subBg } = defineProps({ subBg: Boolean })

const localePath = useLocalePath()

// Footer sits on all 21 real pages, so this is the site-wide way back into the
// consent banner.
const { reopen } = useCookieConsent()

const emailUser = 'info'
const emailDomain = 'flipflopsfilm.com'
const emailLabel = computed(() => `${emailUser}@${emailDomain}`)
const emailHref = computed(() => `mailto:${emailUser}@${emailDomain}`)

// Footer "uncover" reveal. Desktop only (matches ScrollSmoother / Works / Slider,
// which all gate at 991): on mobile the scrubbed transform fought the momentum
// scroll + the URL-bar resize and made the footer jitter, so on phones the footer
// just sits in its natural position.
let st = null
let lastWidth = 0

const build = () => {
  // Tear down any previous instance so triggers never stack up — mobile browsers
  // fire many resize events (one per URL-bar show/hide) which otherwise pile up
  // multiple ScrollTriggers on the same element and cause the shaking.
  if (st) {
    st.kill()
    st = null
    gsap.set('.footer-container', { clearProps: 'transform' })
  }

  if (window.innerWidth <= 991) return

  gsap.set('.footer-container', { yPercent: -50 })
  const uncover = gsap.timeline({ paused: true })
  uncover.to('.footer-container', { yPercent: 0, ease: 'none' })
  st = ScrollTrigger.create({
    trigger: 'main',
    start: 'bottom bottom',
    end: '+=50%',
    animation: uncover,
    scrub: true
  })
}

const handleResize = () => {
  // Ignore height-only changes (mobile URL bar) — only rebuild on a real width change.
  if (window.innerWidth === lastWidth) return
  lastWidth = window.innerWidth
  build()
}

onMounted(() => {
  lastWidth = window.innerWidth
  build()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (st) {
    st.kill()
    st = null
  }
})
</script>

<style scoped>
.footer-email {
  font-size: clamp(1.1rem, 2.6vw, 2rem);
  word-break: break-all;
}

.legal-links {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  letter-spacing: 1px;
  opacity: 0.45;
}

.legal-links a,
.legal-links .cookie-settings-link {
  color: inherit;
  text-decoration: none;
  transition: opacity 0.2s;
}

.legal-links a:hover,
.legal-links .cookie-settings-link:hover {
  opacity: 0.8;
}

/* A button, not a link, because it opens a dialog rather than navigating.
   Stripped back to look identical to its neighbours. */
.cookie-settings-link {
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  letter-spacing: inherit;
  cursor: pointer;
  pointer-events: auto;
}

.cookie-settings-link:focus-visible {
  outline: 1px solid currentColor;
  outline-offset: 3px;
}

.legal-links .sep {
  opacity: 0.5;
}

.footer-bottom-right :deep(.lang-switcher) {
  margin-right: 8px;
}

@media (max-width: 991px) {
  .footer-bottom-right {
    flex-direction: column !important;
    align-items: flex-start !important;
    justify-content: flex-start !important;
    gap: 14px !important;
    margin-top: 24px;
  }

  .footer-bottom-right p {
    margin-top: 0;
  }
}
</style>
