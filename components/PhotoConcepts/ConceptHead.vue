<template>
  <div class="pc-head container">
    <div class="row">
      <div class="col-lg-4">
        <span class="sub-title bord">Concept {{ no }}</span>
      </div>
      <div class="col-lg-8">
        <h2 class="pc-head__title">{{ title }}</h2>
        <p class="pc-head__text">{{ text }}</p>
        <p class="pc-head__where"><span>Where it could live</span>{{ where }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  no: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  where: { type: String, required: true }
})
</script>

<style scoped>
.pc-head {
  padding-top: 140px;
  padding-bottom: 70px;
}

.pc-head .sub-title {
  display: inline-block;
  margin-bottom: 30px;
}

.pc-head__title {
  font-family: 'Mona-Sans Light', sans-serif;
  font-size: clamp(34px, 4.2vw, 60px);
  line-height: 1.1;
  text-transform: uppercase;
  margin-bottom: 30px;
}

.pc-head__text {
  max-width: 640px;
}

.pc-head__where {
  max-width: 640px;
  margin-top: 24px;
  font-size: 15px;
  color: #C8B49A;
}

.pc-head__where span {
  display: block;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  opacity: 0.7;
  margin-bottom: 4px;
}

@media (max-width: 991px) {
  .pc-head {
    padding-top: 90px;
    padding-bottom: 45px;
  }
}
</style>
