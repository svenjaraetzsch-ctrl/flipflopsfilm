<template>
  <section class="about section-padding section-top-clearance">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <div class="sec-head">
            <span class="sub-title bord mb-30">{{ $t('faqs.label') }}</span>
          </div>
        </div>

        <div class="col-lg-7 offset-lg-1">
          <div class="cont">
            <div class="accordion bord">
              <div
                v-for="(item, index) in faqItems"
                :key="item.id"
                class="item mb-20"
                :class="{ active: activeIndex === index }"
                @click="toggleAccordion(index)"
              >
                <div class="title">
                  <h4>{{ item.title }}</h4>
                  <span class="ico"></span>
                </div>
                <div class="accordion-info" v-show="activeIndex === index">
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
import { ref, computed } from 'vue'
const { tm, rt } = useI18n()

const faqItems = computed(() =>
  tm('faqs.items').map(item => ({
    id: rt(item.id),
    title: rt(item.title),
    content: rt(item.content)
  }))
)

const activeIndex = ref(0)

const toggleAccordion = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>
