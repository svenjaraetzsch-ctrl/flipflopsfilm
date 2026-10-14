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
              <p v-for="key in ['min_spend_live', 'min_spend_animation']" :key="key" class="item-detail">
                <strong>{{ amount($t(`tax.${key}`))[0] }}</strong> {{ amount($t(`tax.${key}`))[1] }}
              </p>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="item">
              <span class="opacity-8 mb-5">{{ $t('tax.max_rebate_label') }}</span>
              <p v-for="key in ['max_rebate_film', 'max_rebate_series']" :key="key" class="item-detail">
                <strong>{{ amount($t(`tax.${key}`))[0] }}</strong> {{ amount($t(`tax.${key}`))[1] }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-11">
          <div class="row">
            <div class="col-lg-6">
              <span class="sub-title bord mb-30">{{ $t('tax.opportunity_label') }}</span>
              <PhotoConceptsSidePhoto :image="photos.seaOfClouds" />
            </div>
            <div class="col-lg-5 offset-lg-1">
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

<script setup>
import { photos } from '@/data/PhotoConcepts/photos'

// Minimum spend and maximum rebate are full sentences in every language
// ("Up to €36,000,000 for feature films", "Bis zu 36.000.000 € für
// Spielfilme"); the part up to and including the amount is set apart from
// what it applies to.
const amount = (text) => {
  const m = text.match(/^(.*?\d[\d.,]*(?:\s?€)?)\s+(.+)$/)
  return m ? [m[1], m[2]] : [text, '']
}
</script>

<style scoped>
/* Minimum spend and maximum rebate list two figures each, one under the
   other, smaller than the headline rebates beside them */
.item-detail {
  margin: 4px 0 0;
  font-size: 16px;
  font-weight: 300;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.75);
}

.item-detail + .item-detail {
  margin-top: 8px;
}

.item-detail strong {
  font-weight: 500;
  color: #fff;
}

@media (max-width: 767px) {
  .item-detail {
    font-size: 15px;
  }
}
</style>
