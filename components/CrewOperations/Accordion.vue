<template>
  <section class="about section-padding">

    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <div class="sec-head">
            <span class="sub-title bord mb-30">Network</span>
          </div>
        </div>
        <div class="col-lg-7 offset-lg-1">
          <div class="cont">
            <div class="accordion bord">
              <div v-for="(item, index) in data" :key="item.id" class="item mb-20 wow fadeInUp" @click="openAccordion"
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
import data from '@/data/CreativePortfolio/about.json';

const openAccordion = (event) => {
  document.querySelectorAll('.accordion .item').forEach((el) => {
    el.classList.remove('active');
    el.querySelector('.accordion-info').style.display = 'none';
  });
  event.currentTarget.classList.add('active');
  event.currentTarget.querySelector('.accordion-info').style.display = 'block';
};
</script>