<template>
  <section class="about">
    <div class="container section-padding">
      <div class="row">
        <div class="col-lg-4">
          <div class="sec-head">
            <span class="sub-title bord mb-30">FAQ's</span>
          </div>
        </div>

        <div class="col-lg-7 offset-lg-1">
          <div class="cont">
            <div class="accordion bord">
              <div
                v-for="(item, index) in data"
                :key="item.id"
                class="item mb-20"
                :class="{ active: activeIndex === index }"
                @click="toggleAccordion(index)"
              >
                <div class="title">
                  <h4>{{ item.title }}</h4>
                  <span class="ico"></span>
                </div>

                <div
                  class="accordion-info"
                  v-show="activeIndex === index"
                >
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
import { ref } from 'vue';
import data from '@/data/Faqs/accordion.json';

const activeIndex = ref(0);

const toggleAccordion = (index) => {
  activeIndex.value =
    activeIndex.value === index ? null : index;
};
</script>