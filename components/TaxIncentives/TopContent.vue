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
      <!-- Set as the first section of About (AboutUs): the label and a photo
           on the left, a heading in capitals and the text on the right -->
      <div class="row">
        <div class="col-lg-6">
          <div class="sec-head">
            <span class="sub-title bord mb-30">{{ $t('tax.opportunity_label') }}</span>
          </div>
          <PhotoConceptsSidePhoto :image="photos.seaOfClouds" />
        </div>
        <div class="col-lg-5 offset-lg-1">
          <h3 class="text-u text-indent">{{ opportunity[0] }}</h3>
          <div class="text mt-30">
            <p>{{ opportunity[1] }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { photos } from '@/data/PhotoConcepts/photos'

const { t } = useI18n()

// [heading, text]: the rest of the lead and the text as one paragraph
const opportunity = computed(() => [
  t('tax.opportunity_heading'),
  `${t('tax.opportunity_text')} ${t('tax.opportunity_p')}`
])

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
