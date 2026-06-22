<template>
  <section class="section-padding">
    <div class="container">
      <div class="info mb-80 pb-20 bord-thin-bottom">
        <div class="row">
          <div class="col-md-6 col-lg-3">
            <div class="item mb-30">
              <span class="opacity-8 mb-5">{{ $t('tax.canary_label') }}</span>
              <h6>{{ $t('tax.canary_value') }}</h6>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="item mb-30">
              <span class="opacity-8 mb-5">{{ $t('tax.mainland_label') }}</span>
              <h6>{{ $t('tax.mainland_value') }}</h6>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="item mb-30">
              <span class="opacity-8 mb-5">{{ $t('tax.min_spend_label') }}</span>
              <h6>{{ $t('tax.min_spend_value') }}</h6>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="item">
              <span class="opacity-8 mb-5">{{ $t('tax.max_rebate_label') }}</span>
              <h6>{{ $t('tax.max_rebate_value') }}</h6>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-11">
          <div class="row">
            <div class="col-lg-5">
              <span class="sub-title bord mb-30">{{ $t('tax.opportunity_label') }}</span>
            </div>
            <div class="col-lg-7">
              <div class="text">
                <h5 class="mb-30 fw-400 line-height-40">{{ $t('tax.opportunity_h5') }}</h5>
                <p class="fz-18">{{ $t('tax.opportunity_p') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
