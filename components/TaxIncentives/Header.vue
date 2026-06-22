<template>
  <header class="header-project3 bg-img d-flex align-items-center justify-content-center" data-background=""
    data-overlay-dark="9">
    <div class="container text-center">
      <h1>TAX INCENTIVES</h1>
    </div>
  </header>
</template>

<script setup>
import { onMounted } from 'vue';
//= Scripts
import loadBackgroudImages from '@/common/loadBackgroudImages';

onMounted(() => {
  loadBackgroudImages();
});
</script>
