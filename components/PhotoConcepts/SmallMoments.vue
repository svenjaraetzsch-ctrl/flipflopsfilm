<template>
  <div class="pc-moments container">
    <div class="row">
      <div class="col-lg-7">
        <figure class="pc-moment">
          <div class="pc-moment__screen pc-moment__screen--menu">
            <div class="pc-filmic pc-moment__bg">
              <img :src="hierro.fog.md" :alt="hierro.fog.alt" loading="lazy" decoding="async" />
            </div>
            <ul class="pc-moment__menu">
              <li v-for="item in menu" :key="item">{{ item }}</li>
            </ul>
            <span class="pc-moment__close">Close ×</span>
          </div>
          <figcaption>The menu opens on a different island each time — quiet, dimmed, behind the links.</figcaption>
        </figure>
      </div>
      <div class="col-lg-5">
        <figure class="pc-moment">
          <div class="pc-moment__screen pc-moment__screen--contact">
            <div class="pc-moment__bg">
              <img :src="hierro.arch.md" :alt="hierro.arch.alt" loading="lazy" decoding="async" />
            </div>
            <div class="pc-moment__cta">
              <span class="sub-title">Get in touch</span>
              <h3>Let's talk about your next production</h3>
              <span class="pc-moment__mail">info@flipflopsfilm.com</span>
            </div>
          </div>
          <figcaption>One closing image behind the contact block and footer, so every page ends on the islands.</figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>

<script setup>
import { hierro } from '@/data/PhotoConcepts/hierro'

const menu = ['Home', 'Services', 'Locations', 'About', "FAQ's"]
</script>

<style scoped>
.pc-moment {
  margin: 0 0 40px;
}

.pc-moment__screen {
  position: relative;
  overflow: hidden;
  background: #201D1D;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.pc-moment__screen--menu {
  aspect-ratio: 16 / 10;
}

.pc-moment__screen--contact {
  aspect-ratio: 4 / 5;
}

.pc-moment__bg {
  position: absolute;
  inset: 0;
}

.pc-moment__bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pc-moment__screen--menu .pc-moment__bg {
  opacity: 0.38;
}

.pc-moment__screen--contact .pc-moment__bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(32, 29, 29, 0.9), rgba(32, 29, 29, 0.1) 70%);
}

.pc-moment__menu {
  position: absolute;
  left: 8%;
  bottom: 10%;
  padding: 0;
  margin: 0;
}

.pc-moment__menu li {
  font-family: 'Mona-Sans Medium', sans-serif;
  font-size: clamp(22px, 3.2vw, 46px);
  line-height: 1.2;
  text-transform: uppercase;
}

.pc-moment__menu li:first-child {
  color: #C8B49A;
}

.pc-moment__close {
  position: absolute;
  top: 6%;
  right: 5%;
  font-size: 13px;
  letter-spacing: 1px;
}

.pc-moment__cta {
  position: absolute;
  left: 8%;
  right: 8%;
  bottom: 8%;
}

.pc-moment__cta .sub-title {
  display: block;
  color: #C8B49A;
  margin-bottom: 14px;
}

.pc-moment__cta h3 {
  font-family: 'Mona-Sans Light', sans-serif;
  font-size: clamp(26px, 2.6vw, 38px);
  line-height: 1.2;
  margin-bottom: 18px;
}

.pc-moment__mail {
  font-size: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  padding-bottom: 2px;
}

.pc-moment figcaption {
  margin-top: 14px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.65);
  max-width: 520px;
}
</style>
