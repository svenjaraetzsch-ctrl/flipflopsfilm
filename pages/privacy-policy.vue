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
                <span class="sub-title bord mb-30">{{ $t('privacy.label') }}</span>
                <h3 class="text-u text-indent ls1">{{ $t('privacy.heading') }}</h3>
              </div>
              <div class="col-lg-7 offset-lg-5">
                <div class="text mt-50">
                  <p v-html="$t('privacy.body')"></p>
                </div>

                <!-- Pointer only. The full cookie disclosure lives on its own
                     page so there is a single source of truth for it; keeping a
                     copy here as well would guarantee the two drift apart. -->
                <div class="text mt-50">
                  <h4 class="mb-20">{{ $t('privacy.cookies_heading') }}</h4>
                  <p>
                    {{ $t('privacy.cookies_pointer') }}
                    <NuxtLink :to="localePath('/cookie-policy')" class="cookie-policy-link">
                      {{ $t('footer.cookie_policy') }}
                    </NuxtLink>
                  </p>
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
usePageSeo('privacy')

const localePath = useLocalePath()

useHead({
  bodyAttrs: { class: 'main-bg' },
  script: [{ src: '/assets/js/smoother-script.js', defer: true }]
})
</script>

<style scoped>
.cookie-policy-link {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
  pointer-events: auto;
}

.cookie-policy-link:hover { opacity: 0.7; }
</style>
