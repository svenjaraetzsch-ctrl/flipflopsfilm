<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />

    <div id="smooth-content">
      <main class="main-bg">
          <section class="about section-padding">
    <div class="container">
      <div class="row">
        <div class="col-lg-11">
          <span class="sub-title bord mb-30">Privacy Policy</span>

          <h3 class="text-u text-indent ls1">
            Respecting privacy through transparency, responsible data handling
            and secure communication.
          </h3>
        </div>

        <div class="col-lg-7 offset-lg-5">
          <div class="text mt-50">
            <p>
              We value transparency and respect the privacy of everyone who
              visits our website. Any information shared with Flip Flops Film
              through contact forms, email correspondence or other
              communications is used solely for the purpose of responding to
              enquiries and providing our services.
              <br /><br />
              Our website may collect certain technical information, such as
              browser type, device data and website usage statistics, to help
              improve performance and user experience. We do not sell personal
              information to third parties and take reasonable measures to
              protect any information entrusted to us.
              <br /><br />
              If you have questions regarding the collection or use of personal
              information, please contact us directly.
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
const { t } = useI18n()

useHead({
  title: t('home_header.title'),

  bodyAttrs: {
    class: 'main-bg'
  },

  script: [
    {
      src: '/assets/js/smoother-script.js',
      defer: true
    }
  ]
})
</script>
