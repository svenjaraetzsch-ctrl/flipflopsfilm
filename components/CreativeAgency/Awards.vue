<template>
  <section class="awards section-padding">
    <div class="container">
      <div class="row md-marg">
        <div class="col-lg-6">
          <div class="sec-head mb-80">
            <span class="sub-title bord mb-30">
              {{ t('home_awards.frog') }}
            </span>

            <h3 class="text-u text-indent ls1">
              {{ t('home_awards.text') }}
            </h3>
          </div>
        </div>

        <div class="col-lg-12">
          <div class="item-title row">
            <div class="col-md-5">
              <h6 class="sub-title">{{ t('home_awards.service') }}</h6>
            </div>

            <div class="col-md-5">
              <h6 class="sub-title">{{ t('home_awards.description') }}</h6>
            </div>
          </div>

          <div class="item-line row">
            <div class="col-md-5">
              <h6>{{ t('home_awards.service1') }}</h6>
            </div>
            <div class="col-md-5">
              <h6>{{ t('home_awards.service1_desc') }}</h6>
            </div>
          </div>

          <div class="item-line row">
            <div class="col-md-5">
              <h6>{{ t('home_awards.service2') }}</h6>
            </div>
            <div class="col-md-5">
              <h6>{{ t('home_awards.service2_desc') }}</h6>
            </div>
          </div>

          <div class="item-line row">
            <div class="col-md-5">
              <h6>{{ t('home_awards.service3') }}</h6>
            </div>
            <div class="col-md-5">
              <h6>{{ t('home_awards.service3_desc') }}</h6>
            </div>
          </div>

          <div class="item-line row">
            <div class="col-md-5">
              <h6>{{ t('home_awards.service4') }}</h6>
            </div>
            <div class="col-md-5">
              <h6>{{ t('home_awards.service4_desc') }}</h6>
            </div>
          </div>

          <div class="item-line row">
            <div class="col-md-5">
              <h6>{{ t('home_awards.service5') }}</h6>
            </div>
            <div class="col-md-5">
              <h6>{{ t('home_awards.service5_desc') }}</h6>
            </div>
          </div>

          <div class="item-line row">
            <div class="col-md-5">
              <h6>{{ t('home_awards.service6') }}</h6>
            </div>
            <div class="col-md-5">
              <h6>{{ t('home_awards.service6_desc') }}</h6>
            </div>
          </div>

          <div class="item-line row">
            <div class="col-md-5">
              <h6>{{ t('home_awards.service7') }}</h6>
            </div>
            <div class="col-md-5">
              <h6>{{ t('home_awards.service7_desc') }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n()
</script>