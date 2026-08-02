<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />

    <div id="smooth-content">
      <main class="main-bg">
        <section class="about section-padding section-top-clearance">
          <div class="container">
            <div class="row">
              <div class="col-lg-11">
                <span class="sub-title bord mb-30">{{ $t('cookie_policy.label') }}</span>
                <h3 class="text-u text-indent ls1">{{ $t('cookie_policy.heading') }}</h3>
              </div>
              <div class="col-lg-7 offset-lg-5">
                <div class="text mt-50">
                  <!-- `.text` alone is not a unique hook: the theme uses it in
                       the nav and menu too. -->
                  <div class="cookie-policy-body" v-html="$t('cookie_policy.body')"></div>
                </div>

                <!-- Withdrawing consent has to be reachable from the policy that
                     describes it, not only from the footer. -->
                <div class="mt-40">
                  <button type="button" class="cookie-reopen-btn" @click="reopen">
                    {{ $t('footer.cookie_settings') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <CommonFooter1 />
    </div>
  </div>
</template>

<script setup>
import { useCookieConsent } from '@/composables/useCookieConsent'

usePageSeo('cookie_policy')

const { reopen } = useCookieConsent()

useHead({
  bodyAttrs: { class: 'main-bg' },
  script: [{ src: '/assets/js/smoother-script.js', defer: true }]
})
</script>

<style scoped>
/* The theme's reset is `* { margin: 0 }`, so the paragraphs inside the v-html
   body would otherwise run together into one wall of text. :deep() is required
   because scoped styles do not reach v-html content. */
.cookie-policy-body :deep(p) {
  margin-bottom: 18px;
}

.cookie-policy-body :deep(p:last-child) {
  margin-bottom: 0;
}

.cookie-policy-body :deep(strong) {
  color: #fff;
  font-weight: 600;
}

/* pointer-events is explicit because the theme lays a full-screen .noise
   overlay over the page (same reason the footer's links set it). */
.cookie-reopen-btn {
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

.cookie-reopen-btn:hover {
  background: transparent;
  color: #fff;
}

.cookie-reopen-btn:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
}
</style>
