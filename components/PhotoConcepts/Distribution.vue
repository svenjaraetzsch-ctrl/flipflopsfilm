<template>
  <section class="pc-plan container">
    <div class="row">
      <div class="col-lg-4">
        <span class="sub-title bord">Putting it together</span>
      </div>
      <div class="col-lg-8">
        <h2 class="pc-plan__title">How twenty images could be spread</h2>
        <p class="pc-plan__intro">
          One example of combining the ideas so that roughly twenty photographs carry the whole
          site, with every island appearing more than once and no page turning into a gallery.
        </p>

        <ul class="pc-plan__list">
          <li v-for="row in plan" :key="row.page">
            <span class="pc-plan__page">{{ row.page }}</span>
            <span class="pc-plan__idea">{{ row.idea }}</span>
            <span class="pc-plan__count">{{ row.count || '—' }}</span>
          </li>
          <li class="pc-plan__total">
            <span class="pc-plan__page">Total</span>
            <span class="pc-plan__idea">New photographs used</span>
            <span class="pc-plan__count">{{ total }}</span>
          </li>
        </ul>

        <p class="pc-plan__note">
          Shown here: a first selection of 21 photographs, three from each of the seven islands.
          The final twenty can be swapped freely. Photography © Daniel Bonhoff.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
const plan = [
  { page: 'Home', idea: '01 Full-screen breaks between sections', count: 2 },
  { page: 'Home or About', idea: '02 A visual sequence across the islands', count: 6 },
  { page: 'Services', idea: '03 Changing backgrounds behind the values or services', count: 4 },
  { page: 'Service pages', idea: '05 One editorial pairing per page (three pages)', count: 3 },
  { page: 'About', idea: '05 Editorial pairing for the founders story', count: 2 },
  { page: 'Menu, contact, footer', idea: '07 Small moments, rotating', count: 3 },
  { page: 'Everywhere', idea: '04 + 06 Hover reveals and the film texture reuse the same images', count: 0 }
]

const total = plan.reduce((sum, row) => sum + row.count, 0)
</script>

<style scoped>
.pc-plan {
  padding-top: 140px;
  padding-bottom: 140px;
}

.pc-plan .sub-title {
  display: inline-block;
  margin-bottom: 30px;
}

.pc-plan__title {
  font-family: 'Mona-Sans Light', sans-serif;
  font-size: clamp(34px, 4.2vw, 60px);
  line-height: 1.1;
  text-transform: uppercase;
  margin-bottom: 30px;
}

.pc-plan__intro {
  max-width: 640px;
}

.pc-plan__list {
  margin: 50px 0 0;
  padding: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.pc-plan__list li {
  display: grid;
  grid-template-columns: 200px 1fr 60px;
  gap: 20px;
  padding: 18px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  align-items: baseline;
}

.pc-plan__page {
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #C8B49A;
}

.pc-plan__idea {
  font-size: 17px;
}

.pc-plan__count {
  font-family: 'Mona-Sans Medium', sans-serif;
  font-size: 22px;
  text-align: right;
}

.pc-plan__total .pc-plan__idea,
.pc-plan__total .pc-plan__count {
  color: #C8B49A;
}

.pc-plan__note {
  margin-top: 30px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 767px) {
  .pc-plan {
    padding-top: 90px;
    padding-bottom: 90px;
  }

  .pc-plan__list li {
    grid-template-columns: 1fr 40px;
    row-gap: 6px;
  }

  .pc-plan__page {
    grid-column: 1 / -1;
  }

  .pc-plan__idea {
    font-size: 15px;
  }
}
</style>
