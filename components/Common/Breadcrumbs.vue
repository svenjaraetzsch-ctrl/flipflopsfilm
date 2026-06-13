<template>
  <nav class="breadcrumbs">
    <NuxtLink to="/">Home</NuxtLink>

    <template v-for="crumb in breadcrumbs" :key="crumb.path">
      <span class="sep">/</span>

      <span v-if="crumb.isCurrent" class="current">
        {{ crumb.name }}
      </span>

      <NuxtLink v-else :to="crumb.path">
        {{ crumb.name }}
      </NuxtLink>
    </template>
  </nav>
</template>

<script setup>
const route = useRoute();

const labels = {
  about: 'About',
  services: 'Services',
  locations: 'Locations',
  'tax-incentives': 'Tax Incentives',
  contact: 'Contact',
  privacy: 'Privacy Policy',
  imprint: 'Imprint'
};

const breadcrumbs = computed(() => {
  const segments = route.path.split('/').filter(Boolean);

  return segments.map((segment, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/');

    return {
      name:
        labels[segment] ||
        segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      path,
      isCurrent: index === segments.length - 1
    };
  });
});
</script>

<style scoped>


.breadcrumbs {
  
  margin-left: 20px;
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;

}
.breadcrumbs a {
  color: rgba(255, 255, 255, 0.45);
  text-decoration: none;
}

.breadcrumbs a:hover {
  color: #fff;
}

.sep {
  color: rgba(255, 255, 255, 0.25);
}

.current {
  color: #fff;
}

</style>