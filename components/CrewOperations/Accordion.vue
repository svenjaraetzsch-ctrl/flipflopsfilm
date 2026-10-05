<template>
  <section class="section-padding">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-11">
          <div class="row">
            <div class="col-lg-7">
              <div class="accordion bord">
                <div v-for="(item, index) in networkItems" :key="item.id" class="item mb-20 wow fadeInUp" @click="openAccordion"
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
            <div class="col-lg-5">
              <PhotoConceptsSidePhoto class="pc-side-photo--right" :image="photos.redCliffs" portrait />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { photos } from '@/data/PhotoConcepts/photos'
const { tm, rt } = useI18n()

const networkItems = computed(() =>
  tm('crew.network_items').map(item => ({
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
