<template>
  <section class="section-padding">
    <div class="container">
      <!-- Set as the first section of About (AboutUs): the label on the
           left, a heading in capitals and the text on the right -->
      <div class="row">
        <div class="col-lg-6">
          <div class="sec-head">
            <span class="sub-title bord mb-30">{{ $t('locations.label') }}</span>
          </div>
        </div>
        <div class="col-lg-5 offset-lg-1">
          <h3 class="text-u text-indent">{{ $t('locations.h5') }}</h3>
          <div class="text mt-30">
            <p>{{ $t('locations.p') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (max-width: 768px) {
  section {
    padding-bottom: 35px !important;
  }
}
</style>
