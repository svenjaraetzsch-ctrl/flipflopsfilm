<template>
  <section id="production-services" class="section-padding bord-thin-bottom">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div :class="{ 'sec-head': headingFromText }">
            <span class="sub-title bord mb-30">{{ $t('services.top_label') }}</span>
          </div>
          <PhotoConceptsSidePhoto :image="photos.caldera" />
        </div>
        <div class="col-lg-5 offset-lg-1">
          <!-- As the first section of About (AboutUs): the heading in capitals,
               then the text -->
          <div v-if="headingFromText">
            <h3 class="text-u text-indent">{{ split[0] }}</h3>
            <div class="text mt-30">
              <p>{{ split[1] }}</p>
            </div>
          </div>
          <div v-else class="text">
            <h5 class="mb-30 fw-400 line-height-40">{{ $t('services.top_h5') }}</h5>
            <p class="fz-18">{{ $t('services.top_p') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { photos } from '@/data/PhotoConcepts/photos'

defineProps({
  // For the Butterfly proposal, which leaves the usual lead out: the section
  // is set as on About, headed by the text's first sentence
  headingFromText: { type: Boolean, default: false }
})

const { t } = useI18n()

const split = computed(() => {
  const all = t('services.top_p')
  const m = all.match(/^(.+?[.!?])\s+([\s\S]+)$/)
  return m ? [m[1], m[2]] : [all, '']
})
</script>
