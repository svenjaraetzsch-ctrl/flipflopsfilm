<template>
  <section class="marquee">
    <div class="container-fluid rest">
      <div class="row">
        <div class="col-12">
          <div class="main-marq">
            <div class="slide-har st1">

              <div class="box non-strok">
                <div v-for="item in data" :key="item.id" class="item">
                  <h4 class="d-flex align-items-center">
                    <span>{{ item.title }}</span>

                    <img
                      src="/assets/imgs/logos/icon-transparent.png"
                      alt="Flip Flops Film"
                      class="marquee-logo ml-50"
                    />
                  </h4>
                </div>
              </div>

              <div class="box non-strok">
                <div v-for="item in data" :key="`copy-${item.id}`" class="item">
                  <h4 class="d-flex align-items-center">
                    <span>{{ item.title }}</span>

                    <img
                      src="/assets/imgs/logos/icon-transparent.png"
                      alt="Flip Flops Film"
                      class="marquee-logo ml-50"
                    />
                  </h4>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import data from '@/data/Landing/marquee.json';
</script>

<style scoped>
.marquee-logo {
  width: 40px;
  height: 40px;
  min-width: 40px;

  display: inline-block;
  object-fit: contain;

  opacity: 1;
  visibility: visible;
}

.main-marq h4 {
  overflow: visible;
}

.main-marq .item {
  overflow: visible;
}
</style>