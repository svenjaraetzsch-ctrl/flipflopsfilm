<template>
  <header class="header-project1">
    <div class="container mt-100">
      <div class="row">
        <div class="col-lg-6 valign">
          <div class="full-width mb-30">
            <h1 class="fz-60">{{ $t('services.header') }}</h1>
            <p>{{ $t('services.header_p') }}</p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onMounted } from 'vue'
import loadBackgroudImages from '@/common/loadBackgroudImages'

onMounted(() => {
  loadBackgroudImages()
})
</script>
