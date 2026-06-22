<template>
  <section class="about section-padding">

    <div class="container">
      <div class="row pb-100 bord-thin-bottom mb-80">
        <div class="col-lg-4">
          <div class="sec-head">
            <span class="sub-title bord mb-30">Company</span>
          </div>
        </div>
        <div class="col-lg-7 offset-lg-1">
          <div>
            <h3 class="text-u text-indent">BUILT ON PRODUCTION EXPERTISE AND TRUSTED PARTNERSHIPS.</h3>
            <div class="text mt-30">
              <p>Flip Flops Film was founded by David Turpin and André Dolezal, bringing together Spanish production management expertise and international line production experience. What started as a shared passion for filmmaking has grown into a trusted production partner, helping clients navigate Spain's unique opportunities with practical knowledge, personal involvement and a commitment to getting things done right.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <div class="sec-head">
            <span class="sub-title bord mb-30">What we believe</span>
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
import data from '@/data/About/accordion.json';

const openAccordion = (event) => {
  document.querySelectorAll('.accordion .item').forEach((el) => {
    el.classList.remove('active');
    el.querySelector('.accordion-info').style.display = 'none';
  });
  event.currentTarget.classList.add('active');
  event.currentTarget.querySelector('.accordion-info').style.display = 'block';
};
</script>