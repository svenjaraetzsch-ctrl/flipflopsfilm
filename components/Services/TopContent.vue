<template>
  <!-- Set as the first section of About (AboutUs): the label and a photo on
       the left, a heading in capitals and the text on the right. The heading
       is the text's first sentence. -->
  <section id="production-services" class="section-padding bord-thin-bottom">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="sec-head">
            <span class="sub-title bord mb-30">{{ $t('services.top_label') }}</span>
          </div>
          <PhotoConceptsSidePhoto :image="photos.caldera" />
        </div>
        <div class="col-lg-5 offset-lg-1">
          <h3 class="text-u text-indent">{{ text[0] }}</h3>
          <div class="text mt-30">
            <p>{{ text[1] }}</p>
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

const text = computed(() => splitFirstSentence(t('services.top_p')))
</script>
