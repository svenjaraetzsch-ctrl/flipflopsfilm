<template>
  <header class="crev-header">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="caption text-center">
            <h1 style="position: absolute; opacity: 0;">{{ $t('home_header.title') }}</h1>
            <h1 class="f-xbold"><span class="f-ultra-light d-block">{{ $t('home_header.title1') }}</span>{{ $t('home_header.title2') }}</h1>
            <!--<div style="    
                  position: absolute;
                  width: 650px;
                  top: -100px;
                  right: 0;
                  z-index: -1;
                  opacity: 0.1;">
            <img src="/assets/imgs/logos/icon-transparent.png" alt="" />
            </div>-->
          </div>
        </div>
      </div>
    </div>
    <div class="img mt-50">
       <video
          autoplay
          muted
          loop
          playsinline
          preload="auto"
          class="w-100 h-100"
          style="object-fit: cover;"
        >
          <source src="/assets/vid/smaller_filesize.mp4" type="video/mp4" />
        </video>
    </div>
  </header>
</template>
<script setup>
const { t } = useI18n()
</script>