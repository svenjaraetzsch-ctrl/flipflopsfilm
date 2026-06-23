<template>
  <section class="call-action section-padding bord-thin-bottom">
    <div class="contact-container">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="text-center">
              <div class="mb-30">
                <span class="sub-title bord">{{ $t('common.work_with_us') }}</span>
              </div>
              <h2 class="fz-70 f-bold text-u">
                {{ $t('common.contact_cta_1') }} <span class="d-block f-ultra-light">{{ $t('common.contact_cta_2') }}</span> {{ $t('common.contact_cta_3') }}
              </h2>
              <a href="mailto:info@flipflopsfilm.com" class="butn-circle animsition-link colorbg mt-30">
                <span>{{ $t('common.get_in_touch') }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const handleResize = () => {
  gsap.set('.contact-container', { yPercent: -50 })
  const cover = gsap.timeline({ paused: true })
  cover.to('.contact-container', { yPercent: 0, ease: 'none' })
  ScrollTrigger.create({
    trigger: '.main-box',
    start: 'bottom bottom',
    end: '+=50%',
    animation: cover,
    scrub: true,
  })
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
