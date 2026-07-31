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
// Scroll-scrubbed reveal for the contact block.
// Desktop only (matches ScrollSmoother / Works / Slider, which all gate at 991):
// on mobile the scrubbed parallax fought the momentum scroll + the URL-bar
// resize and jittered, so on phones the block just sits in its natural place.
let st = null
let lastWidth = 0

const build = () => {
  // Tear down any previous instance so triggers never stack up — mobile browsers
  // fire many resize events (one per URL-bar show/hide) which otherwise pile up
  // multiple ScrollTriggers on the same element and cause the shaking.
  if (st) {
    st.kill()
    st = null
    gsap.set('.contact-container', { clearProps: 'transform' })
  }

  if (window.innerWidth <= 991) return

  gsap.set('.contact-container', { yPercent: -50 })
  const cover = gsap.timeline({ paused: true })
  cover.to('.contact-container', { yPercent: 0, ease: 'none' })
  st = ScrollTrigger.create({
    trigger: '.main-box',
    start: 'bottom 80%',
    end: '+=50%',
    animation: cover,
    scrub: true,
  })
}

const handleResize = () => {
  // Ignore height-only changes (mobile URL bar) — only rebuild on a real width change.
  if (window.innerWidth === lastWidth) return
  lastWidth = window.innerWidth
  build()
}

onMounted(() => {
  lastWidth = window.innerWidth
  build()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (st) {
    st.kill()
    st = null
  }
})
</script>
