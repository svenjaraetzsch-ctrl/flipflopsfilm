<template>
  <section class="section-padding">
    <div class="container">
      <!-- One row per region, the same columns in each so they compare at a
           glance: the rebate rate large, then the minimum spend and the
           maximum rebate -->
      <div class="tax-rates mb-80 pb-20">
        <div v-for="region in regions" :key="region.key" class="row tax-rates__row">
          <div class="col-lg-4">
            <div class="item mb-30">
              <span class="opacity-8 mb-5">{{ region.label }}</span>
              <h2 class="tax-rates__rate">{{ region.rate[0] }}</h2>
              <p class="item-detail">{{ region.rate[1] }}</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="item mb-30">
              <span class="opacity-8 mb-5">{{ $t('tax.min_spend_label') }}</span>
              <p v-for="text in region.minSpend" :key="text" class="item-detail">
                <strong>{{ amount(text)[0] }}</strong> {{ amount(text)[1] }}
              </p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="item mb-30">
              <span class="opacity-8 mb-5">{{ $t('tax.max_rebate_label') }}</span>
              <p v-for="text in region.maxRebate" :key="text" class="item-detail">
                <strong>{{ amount(text)[0] }}</strong> {{ amount(text)[1] }}
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

// The rate on its own line ("Up to 54%", "Bis zu 54%", "Hasta un 54%"), what
// it is below ("Tax Rebate").
const rate = (text) => {
  const m = text.match(/^(.*?\d+\s?%)\s*(.*)$/)
  return m ? [m[1], m[2]] : [text, '']
}

const regions = computed(() => ['canary', 'mainland'].map((key) => ({
  key,
  label: t(`tax.${key}_label`),
  rate: rate(t(`tax.${key}_value`)),
  minSpend: ['live', 'animation'].map((k) => t(`tax.${key}_min_spend_${k}`)),
  maxRebate: ['film', 'series'].map((k) => t(`tax.${key}_max_rebate_${k}`))
})))

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
.tax-rates__row + .tax-rates__row {
  margin-top: 30px;
}

.tax-rates__rate {
  margin-top: 4px;
}

/* Minimum spend and maximum rebate list two figures each, one under the
   other, smaller than the rate beside them */
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
