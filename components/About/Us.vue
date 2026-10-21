<template>
  <section class="about section-padding">
    <div class="container">
      <div class="row pb-100 mb-80">
        <div class="col-lg-6">
          <div class="sec-head">
            <span class="sub-title bord mb-30">{{ $t('home.company_label') }}</span>
          </div>
          <AboutFounders v-if="founders" />
          <PhotoConceptsSidePhoto v-else :image="photos.dirtTrack" />
        </div>
        <div class="col-lg-5 offset-lg-1">
          <div>
            <h3 class="text-u text-indent">{{ $t('home.company_heading') }}</h3>
            <div class="text mt-30">
              <p>{{ $t('home.company_text') }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-5">
          <div class="cont">
            <div class="accordion bord">
              <div v-for="(item, index) in believeItems" :key="item.id" class="item mb-20 wow fadeInUp" @click="openAccordion($event, index)"
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
        <div class="col-lg-6 offset-lg-1">
          <!-- Shows the photo of the value that is open on the left. -->
          <PhotoConceptsSwapPhoto class="pc-swap--right" :images="believePhotos" :active="activeBelief" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (max-width: 768px) {
  section {
    padding-top: 30px !important;
  }
  .row.pb-100 {
    padding-bottom: 25px !important;
  }
  .row.mb-80 {
    margin-bottom: 20px !important;
  }
}
</style>

<script setup>
import { computed, ref } from 'vue'
import { photos } from '@/data/PhotoConcepts/photos'

// Version 2 (review page /about-v2, from David's feedback): the founders'
// faces instead of the landscape under "Who we are", and the Flip Flops
// flag on a boat as the photo of "One Team", shown first.
const props = defineProps({
  founders: { type: Boolean, default: false }
})

const { tm, rt } = useI18n()

const believeItems = computed(() =>
  tm('believe_items').map(item => ({
    id: rt(item.id),
    title: rt(item.title),
    content: rt(item.content)
  }))
)

// One photo per value, in the order of believe_items: Local First,
// Relationships Matter, One Team, Solutions Over Obstacles.
const flag = {
  src: '/assets/imgs/team/flag-boat.jpg',
  srcset: '/assets/imgs/team/flag-boat-md.jpg 480w, /assets/imgs/team/flag-boat.jpg 960w',
  w: 960,
  h: 1200,
  alt: 'The Flip Flops Film flag beside an Italian flag on the mast of a boat'
}
const believePhotos = [photos.villageStreet, photos.treeRoad, props.founders ? flag : photos.valleyVillage, photos.serpentine]
const activeBelief = ref(props.founders ? 2 : 0)

const openAccordion = (event, index) => {
  if (typeof index === 'number') activeBelief.value = index
  document.querySelectorAll('.accordion .item').forEach((el) => {
    el.classList.remove('active')
    el.querySelector('.accordion-info').style.display = 'none'
  })
  event.currentTarget.classList.add('active')
  event.currentTarget.querySelector('.accordion-info').style.display = 'block'
}
</script>
