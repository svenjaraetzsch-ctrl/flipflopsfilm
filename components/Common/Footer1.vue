<!-- Main Footer -->
<template>
  <footer :class="{ 'sub-bg': subBg }">
    <div class="footer-container">
      <div class="container pb-80 pt-80 ontop">
        <div class="row">
          <div class="col-lg-6">
            <div class="eml">
              <h6 class="sub-title opacity-8">{{ $t('footer.tagline') }}</h6>
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
              <h6 class="sub-title mb-30">{{ $t('footer.social_media') }}</h6>
              <ul class="rest">
                <li>
                  <a href="https://www.instagram.com/flipflopsfilm/" target="_blank" rel="noopener noreferrer" style="pointer-events:auto;">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/posts/david-turpin-production_producciones-audiovisuales-canarias-flip-activity-7301559594177200130-EhoR" target="_blank" rel="noopener noreferrer" style="pointer-events:auto;">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-lg-3">
            <div class="column">
              <h6 class="sub-title mb-30">{{ $t('footer.our_offices') }}</h6>
              <p>{{ $t('footer.offices') }}</p>
              <h5 class="mt-15 underline">
                <a :href="emailHref">{{ $t('footer.contact_us') }}</a>
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div class="container bord pt-30 pb-30 bord-thin-top">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="links">
              <ul class="rest">
                <li><NuxtLink :to="localePath('/about')" class="animsition-link">{{ $t('footer.about_us') }}</NuxtLink></li>
                <li><NuxtLink :to="localePath('/tax-incentives')" class="animsition-link">{{ $t('nav.tax_incentives') }}</NuxtLink></li>
                <li><NuxtLink :to="localePath('/locations')" class="animsition-link">{{ $t('nav.locations') }}</NuxtLink></li>
                <li><NuxtLink :to="localePath('/services')" class="animsition-link">{{ $t('nav.services') }}</NuxtLink></li>
                <li><NuxtLink :to="localePath('/faqs')" class="animsition-link">{{ $t('nav.faqs') }}</NuxtLink></li>
                <li><NuxtLink :to="localePath('/privacy-policy')" class="animsition-link">{{ $t('footer.privacy_policy') }}</NuxtLink></li>
                <li><NuxtLink :to="localePath('/imprint')" class="animsition-link">{{ $t('footer.imprint') }}</NuxtLink></li>
              </ul>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="d-flex align-items-center justify-content-end gap-30 footer-bottom-right">
              <CommonLangSwitcher />
              <p class="fz-13 mb-0">{{ $t('footer.copyright') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { onMounted, onBeforeUnmount, computed } from 'vue'

const { subBg } = defineProps({ subBg: Boolean })

const localePath = useLocalePath()

const emailUser = 'info'
const emailDomain = 'flipflopsfilm.com'
const emailLabel = computed(() => `${emailUser}@${emailDomain}`)
const emailHref = computed(() => `mailto:${emailUser}@${emailDomain}`)

const handleResize = () => {
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

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
@media (max-width: 991px) {
  .footer-bottom-right {
    justify-content: space-between !important;
    margin-top: 16px;
  }
}
</style>
