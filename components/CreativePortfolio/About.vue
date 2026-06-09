<template>
  <section class="intro section-padding pb-0">
    <div class="container">
      <div class="row pb-100 bord-thin-bottom mb-80">
        <div class="col-lg-4">
          <div class="sec-head">
            <span class="sub-title bord mb-30">Company</span>
          </div>
        </div>
        <div class="col-lg-7 offset-lg-1">
          <div>
            <h3 class="text-u text-indent">A COMPANY DRIVEN BY PEOPLE, PARTNERSHIPS AND A COMMITMENT TO EVERY PROJECT'S SUCCESS.</h3>
            <div class="text mt-30">
              <p>At Flip Flops Film, we believe great productions are built through strong relationships and seamless collaboration. Combining deep regional knowledge with international expertise, we create the foundation for projects to perform at their highest level.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <div class="sec-head">
            <span class="sub-title bord mb-30">Crew & Network</span>
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
