<!-- Main Footer -->
<template>
  <footer :class="{ 'sub-bg': subBg }">
    <div class="footer-container">
      <div class="container pb-80 pt-80 ontop">
        <div class="row">
          <div class="col-lg-6">
            <div class="eml">
              <h6 class="sub-title opacity-8">
                We would love to hear from you.
              </h6>
              <h2 class="underline fz-60">
                <a :href="emailHref">{{ emailLabel }}</a>
              </h2>
            </div>
          </div>
        </div>

        <div class="row mt-80">
          <div class="col-lg-3">
            <div class="logo">
              <img src="/assets/imgs/logo-light.png" alt="Flip Flops Film" />
            </div>
          </div>

          <div class="col-lg-6">
  <div class="column">
    <h6 class="sub-title mb-30">Social Media</h6>

    <ul class="rest">
      <li>
        <a
          href="https://www.instagram.com/flipflopsfilm/"
          target="_blank"
          rel="noopener noreferrer"
          style="pointer-events:auto;"
        >
          Instagram
        </a>
      </li>

      <li>
        <a
          href="https://www.linkedin.com/company/flip-flops-film/"
          target="_blank"
          rel="noopener noreferrer"
          style="pointer-events:auto;"
        >
          LinkedIn
        </a>
      </li>
    </ul>
  </div>
</div>
          <div class="col-lg-3">
            <div class="column">
              <h6 class="sub-title mb-30">Our Offices</h6>
              <p>
                Canary Islands · Madrid · Almería · Bilbao
              </p>
              <h5 class="mt-15 underline">
                <a :href="emailHref">Contact Us</a>
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div class="container bord pt-30 pb-30 bord-thin-top">
        <div class="row">
          <div class="col-lg-6">
            <div class="links">
              <ul class="rest">
                <li>
                  <NuxtLink to="/about" class="animsition-link">About Us</NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/spanish-tax-incentives" class="animsition-link">
                    Spanish Tax Incentives
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/contact" class="animsition-link">Contact</NuxtLink>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="copyright d-flex">
              <div class="ml-auto">
                <p class="fz-13">
                  © 2024 Flip Flops Film S.L. CIF: B75447698
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { onMounted, onBeforeUnmount, computed } from 'vue'

const { subBg } = defineProps({
  subBg: Boolean
})

const emailUser = 'info'
const emailDomain = 'flipflopsfilm.com'

const emailLabel = computed(() => `${emailUser}@${emailDomain}`)
const emailHref = computed(() => `mailto:${emailUser}@${emailDomain}`)

const handleResize = () => {
  if (window.innerWidth > 991) {
    gsap.set('.footer-container', { yPercent: -50 })

    const uncover = gsap.timeline({ paused: true })
    uncover.to('.footer-container', { yPercent: 0, ease: 'none' })

    ScrollTrigger.create({
      trigger: 'main',
      start: 'bottom bottom',
      end: '+=50%',
      animation: uncover,
      scrub: true
    })
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>