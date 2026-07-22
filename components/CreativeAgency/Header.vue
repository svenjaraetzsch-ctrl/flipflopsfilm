<template>
  <header class="crev-header">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="caption text-center">
            <h1 style="position: absolute; opacity: 0;">Flip Flops Film</h1>
            <h1 class="f-xbold"><span class="f-ultra-light d-block">{{ t('home.hero_title1') }}</span>{{ t('home.hero_title2') }}</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="img mt-50">
      <video autoplay muted loop playsinline preload="auto" class="w-100 h-100" style="object-fit: cover;">
        <source src="/assets/vid/flipflops_video_smaller-verkleinert-online.mp4" type="video/mp4" />
      </video>
    </div>
  </header>
</template>

<script setup>
const { t } = useI18n()
</script>
