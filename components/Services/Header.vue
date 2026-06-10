<template>
  <header class="header-project1">
    <div class="container mt-100">
      <div class="row">
        <div class="col-lg-6 valign">
          <div class="full-width mb-30">
            <h1 class="fz-60">Production Services</h1>
            <p>The success of a production is often defined long before the cameras start rolling. Through careful preparation, local insight and years of hands-on experience, we help create the conditions that allow productions to focus on what matters most.</p>
          </div>
        </div>
        <div class="col-lg-5 offset-lg-1">
          <div class="info">
            <div class="row">
              <div class="col-md-6">
                <div class="item mb-30">
                  <span class="opacity-8 mb-5">Category :</span>
                  <h6>Development</h6>
                </div>
              </div>
              <div class="col-md-6">
                <div class="item mb-30">
                  <span class="opacity-8 mb-5">Client :</span>
                  <h6>Envato</h6>
                </div>
              </div>
              <div class="col-md-6">
                <div class="item mb-30">
                  <span class="opacity-8 mb-5">Start Date :</span>
                  <h6>7 August 2021</h6>
                </div>
              </div>
              <div class="col-md-6">
                <div class="item">
                  <span class="opacity-8 mb-5">Designer :</span>
                  <h6>UiCamp</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </header>
</template>

<script setup>
import { onMounted } from 'vue';
import loadBackgroudImages from '@/common/loadBackgroudImages';

onMounted(() => {
  loadBackgroudImages();
});
</script>
