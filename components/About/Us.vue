<template>
  <section class="about section-padding">
    <div class="container">
      <div class="row pb-100 bord-thin-bottom mb-80">
        <div class="col-lg-4">
          <div class="sec-head">
            <span class="sub-title bord mb-30">{{ $t('home.company_label') }}</span>
          </div>
        </div>
        <div class="col-lg-7 offset-lg-1">
          <div>
            <h3 class="text-u text-indent">{{ $t('home.company_heading') }}</h3>
            <div class="text mt-30">
              <p>{{ $t('home.company_text') }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <div class="sec-head">
            <span class="sub-title bord mb-30">{{ $t('home.believe_label') }}</span>
          </div>
        </div>
        <div class="col-lg-7 offset-lg-1">
          <div class="cont">
            <div class="accordion bord">
              <div v-for="(item, index) in believeItems" :key="item.id" class="item mb-20 wow fadeInUp" @click="openAccordion"
                :data-wow-delay="`${((index * 0.2) + 0.1).toFixed(1)}s`">
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
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
const { tm, rt } = useI18n()

const believeItems = computed(() =>
  tm('believe_items').map(item => ({
    id: rt(item.id),
    title: rt(item.title),
    content: rt(item.content)
  }))
)

const openAccordion = (event) => {
  document.querySelectorAll('.accordion .item').forEach((el) => {
    el.classList.remove('active')
    el.querySelector('.accordion-info').style.display = 'none'
  })
  event.currentTarget.classList.add('active')
  event.currentTarget.querySelector('.accordion-info').style.display = 'block'
}
</script>
