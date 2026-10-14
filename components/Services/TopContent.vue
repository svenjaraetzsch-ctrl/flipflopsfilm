<template>
  <section id="production-services" class="section-padding bord-thin-bottom">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <span class="sub-title bord mb-30">{{ $t('services.top_label') }}</span>
          <PhotoConceptsSidePhoto :image="photos.caldera" />
        </div>
        <div class="col-lg-5 offset-lg-1">
          <div class="text">
            <h5 class="mb-30 fw-400 line-height-40">{{ lead }}</h5>
            <p class="fz-18">{{ text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { photos } from '@/data/PhotoConcepts/photos'

const props = defineProps({
  // For a page that already shows the usual lead higher up (the Butterfly
  // proposal): the first sentence of the text becomes the lead instead
  leadFromText: { type: Boolean, default: false }
})

const { t } = useI18n()

const split = computed(() => {
  const all = t('services.top_p')
  const m = all.match(/^(.+?[.!?])\s+([\s\S]+)$/)
  return m ? [m[1], m[2]] : [all, '']
})

const lead = computed(() => (props.leadFromText ? split.value[0] : t('services.top_h5')))
const text = computed(() => (props.leadFromText ? split.value[1] : t('services.top_p')))
</script>
