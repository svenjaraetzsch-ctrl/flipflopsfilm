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
          <span class="sub-title bord mb-30">Imprint</span>

          <h3 class="text-u text-indent ls1">
            Company information, legal details and contact information for Flip
            Flops Film.
          </h3>
        </div>

        <div class="col-lg-7 offset-lg-5">
          <div class="text mt-50">
            <p>
              Flip Flops Film S.L. is a production services company supporting
              international film, television, commercial and photographic
              productions across Spain. With a presence in the Canary Islands,
              Madrid, Almería and Bilbao, the company provides production
              support, location services, incentives guidance, logistics and
              local coordination for projects of all scales.
              <br /><br />
              Company Name: Flip Flops Film S.L.
              <br />
              CIF: B75447698
              <br />
              Headquarters: Canary Islands, Spain
              <br />
              Additional Offices: Madrid, Almería and Bilbao
              <br />
              Email: hello@flipflopsfilm.com
              <br />
              Website: www.flipflopsfilm.com
              <br /><br />
              Managing Directors:
              <br />
              David Turpin
              <br />
              André Dolezal
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
