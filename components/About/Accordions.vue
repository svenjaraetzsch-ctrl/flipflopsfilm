<template>
  <section class="section-padding">
    <div class="container">
      <div class="row">

        <div class="col-lg-6 d-flex align-items-center justify-content-center">
          <div class="exp valign text-center">
            <div class="full-width">
              <h2>15+</h2>
              <h6 class="sub-title">Years in Production</h6>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="accordion bord full-width">

            <div class="sec-head mb-70">
              <div class="sec-head">
            <span class="sub-title bord mb-30">Why Flip Flops Film</span>
          </div>

              <h3 class="text-u f-bold fz-50">
                Why Work
                <span class="f-ultra-light">With Us</span>
              </h3>
            </div>

            <div
              v-for="(item, index) in accordionData"
              :key="item.id"
              :class="`item ${index !== accordionData.length - 1 ? 'mb-20' : ''} wow fadeInUp`"
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
const accordionData = [
  {
    id: 1,
    title: 'Leading Tax Incentives',
    content:
      "Benefit from some of Europe's most competitive film incentives and maximise your production budget through strategic planning and local expertise."
  },
  {
    id: 2,
    title: 'Strategic Production Planning',
    content:
      'From budgeting and scheduling to logistics and permits, we help productions run efficiently and stay on track from pre-production to final delivery.'
  },
  {
    id: 3,
    title: 'International Experience',
    content:
      'Our team combines local knowledge with extensive experience supporting international productions, agencies, brands and creative partners.'
  },
  {
    id: 4,
    title: 'End-to-End Support',
    content:
      'Location scouting, permits, crew sourcing, casting, equipment, transportation and production management — everything you need under one roof.'
  }
];

function openAccordion(event) {
  document.querySelectorAll('.accordion .item').forEach((el) => {
    el.classList.remove('active');

    const info = el.querySelector('.accordion-info');
    if (info) {
      info.style.display = 'none';
    }
  });

  event.currentTarget.classList.add('active');

  const activeInfo =
    event.currentTarget.querySelector('.accordion-info');

  if (activeInfo) {
    activeInfo.style.display = 'block';
  }
}
</script>