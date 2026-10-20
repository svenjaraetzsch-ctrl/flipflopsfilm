<template>
  <section class="section-padding">
    <div class="container">
      <div class="info mb-80 pb-20 bord-thin-bottom">
        <div class="row">
          <div class="col-md-6 col-lg-3">
            <div class="item mb-30">
              <span class="opacity-8 mb-5">{{ $t('crew.network_label') }}</span>
              <h6>{{ $t('crew.network_value') }}</h6>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="item mb-30">
              <span class="opacity-8 mb-5">{{ $t('crew.reach_label') }}</span>
              <h6>{{ $t('crew.reach_value') }}</h6>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="item mb-30">
              <span class="opacity-8 mb-5">{{ $t('crew.logistics_label') }}</span>
              <h6>{{ $t('crew.logistics_value') }}</h6>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="item">
              <span class="opacity-8 mb-5">{{ $t('crew.scale_label') }}</span>
              <h6>{{ $t('crew.scale_value') }}</h6>
            </div>
          </div>
        </div>
      </div>
      <!-- Set as the first section of About (AboutUs): the label and a photo
           on the left, a heading in capitals and the text on the right. The
           heading is the first sentence of the lead, the rest follows it. -->
      <div class="row">
        <div class="col-lg-6">
          <div class="sec-head">
            <span class="sub-title bord mb-30">{{ $t('crew.expertise_label') }}</span>
          </div>
          <PhotoConceptsSidePhoto :image="photos.roqueNublo" />
        </div>
        <div class="col-lg-5 offset-lg-1">
          <h3 class="text-u text-indent">{{ expertise[0] }}</h3>
          <div class="text mt-30">
            <p>{{ expertise[1] }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { photos } from '@/data/PhotoConcepts/photos'
import { splitFirstSentence } from '@/utils/text'

const { t } = useI18n()

// [heading, text]: the lead's first sentence, then the rest of the lead and
// the text as one paragraph
const expertise = computed(() => {
  const [heading, rest] = splitFirstSentence(t('crew.expertise_h5'))
  return [heading, [rest, t('crew.expertise_p')].filter(Boolean).join(' ')]
})
</script>
