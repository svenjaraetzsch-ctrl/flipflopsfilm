<template>
  <section class="pc-intro section-padding section-top-clearance">
    <div class="container">
      <span class="sub-title bord mb-30">Photography · Proposal</span>
      <h1 class="pc-intro__title f-xbold">
        <span class="f-ultra-light d-block">Photography</span>Concepts
      </h1>
      <div class="row mt-80">
        <div class="col-lg-6 offset-lg-6">
          <p>
            Seven ways Daniel Bonhoff's photographs could run through the Flip Flops Film
            site — not as a location catalogue, but as part of its look and rhythm. Every idea
            below is built with the site's real design and a first selection of 21 photographs,
            three from each island, so what you see is how it would actually behave. They work
            on their own or combined.
          </p>
          <ol class="pc-intro__index">
            <li v-for="(item, i) in index" :key="item">
              <a :href="`#c0${i + 1}`" @click.prevent="go(`c0${i + 1}`)">
                <span>0{{ i + 1 }}</span>{{ item }}
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const index = [
  'Full-screen breaks',
  'A visual sequence',
  'Changing backgrounds',
  'Words that reveal images',
  'Editorial pairings',
  'One film texture for everything',
  'Small moments'
]

// ScrollSmoother (desktop) moves the content with transforms, so native
// anchor jumps land in the wrong place — scroll through the smoother instead.
const go = (id) => {
  const smoother = typeof ScrollSmoother !== 'undefined' && ScrollSmoother.get()
  if (smoother) smoother.scrollTo(`#${id}`, true, 'top top')
  else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.pc-intro__title {
  font-size: clamp(40px, 11vw, 170px);
  line-height: 0.95;
  text-transform: uppercase;
  margin-top: 30px;
}

.mt-80 {
  margin-top: 80px;
}

.pc-intro__index {
  margin-top: 50px;
  padding: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.pc-intro__index li a {
  display: flex;
  gap: 24px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 18px;
  color: #fff;
  transition: color 0.3s, padding-left 0.3s;
}

.pc-intro__index li a span {
  font-size: 13px;
  color: #C8B49A;
  padding-top: 4px;
}

.pc-intro__index li a:hover {
  color: #C8B49A;
  padding-left: 10px;
}

@media (max-width: 991px) {
  .mt-80 {
    margin-top: 40px;
  }
}
</style>
