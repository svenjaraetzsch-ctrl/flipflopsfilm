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
                <span class="sub-title bord mb-30">{{ $t('imprint.label') }}</span>
                <h3 class="text-u text-indent ls1">{{ $t('imprint.heading') }}</h3>
              </div>
              <div class="col-lg-7 offset-lg-5">
                <div class="text mt-50">
                  <p v-html="$t('imprint.body')"></p>
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
const { t } = useI18n()

useHead({
  title: t('imprint.label') + ' | Flip Flops Film',
  bodyAttrs: { class: 'main-bg' },
  script: [{ src: '/assets/js/smoother-script.js', defer: true }]
})
</script>
