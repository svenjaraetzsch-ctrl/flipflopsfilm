<template>
  <section class="section-padding">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 d-flex align-items-center justify-content-center">
          <div class="exp valign text-center">
            <div class="full-width">
              <h2>15+</h2>
              <h6 class="sub-title">{{ $t('common.years_in_production') }}</h6>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="accordion bord full-width">
            <div class="sec-head mb-70">
              <div class="sec-head">
                <span class="sub-title bord mb-30">{{ $t('common.why_label') }}</span>
              </div>
              <h3 class="text-u f-bold fz-50">
                {{ $t('common.why_heading') }}
                <span class="f-ultra-light">{{ $t('common.why_heading_light') }}</span>
              </h3>
            </div>

            <div
              v-for="(item, index) in whyItems"
              :key="item.id"
              :class="`item ${index !== whyItems.length - 1 ? 'mb-20' : ''} wow fadeInUp`"
              :data-wow-delay="`${(index * 0.2) + 0.1}s`"
              @click="openAccordion"
            >
              <div class="title">
                <h4>{{ item.title }}</h4>
                <span class="ico"></span>
              </div>
              <div class="accordion-info">
                <p>{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
const { tm, rt } = useI18n()

const whyItems = computed(() =>
  tm('why_items').map(item => ({
    id: rt(item.id),
    title: rt(item.title),
    content: rt(item.content)
  }))
)

function openAccordion(event) {
  document.querySelectorAll('.accordion .item').forEach((el) => {
    el.classList.remove('active')
    const info = el.querySelector('.accordion-info')
    if (info) info.style.display = 'none'
  })
  event.currentTarget.classList.add('active')
  const activeInfo = event.currentTarget.querySelector('.accordion-info')
  if (activeInfo) activeInfo.style.display = 'block'
}
</script>

<style scoped>
@media (max-width: 768px) {
  section {
    padding-top: 30px !important;
    padding-bottom: 30px !important;
  }

  /* Scale the circle down and reduce bottom gap */
  .exp {
    width: 200px !important;
    height: 200px !important;
    margin-bottom: 30px;
  }

  .exp h2 {
    font-size: 64px !important;
  }

  /* Scale WHY WORK heading down to fit mobile width */
  .sec-head h3 {
    font-size: 32px !important;
  }

  /* Tighten the internal sec-head margin */
  .sec-head.mb-70 {
    margin-bottom: 20px !important;
  }
}
</style>
