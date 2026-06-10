<template>
  <nav class="ff-breadcrumbs">
    <div class="ff-breadcrumbs-inner">
      <NuxtLink to="/">Home</NuxtLink>

      <template v-for="(crumb, index) in breadcrumbs" :key="crumb.path">
        <span class="dot"></span>

        <NuxtLink
          v-if="index !== breadcrumbs.length - 1"
          :to="crumb.path"
        >
          {{ crumb.name }}
        </NuxtLink>

        <span v-else class="current">
          {{ crumb.name }}
        </span>
      </template>
    </div>
  </nav>
</template>

<script setup>
const route = useRoute();

const labels = {
  about: 'About',
  services: 'Services',
  'production-services': 'Production Services',
  'tax-incentives': 'Tax Incentives',
  locations: 'Locations',
  contact: 'Contact'
};

const breadcrumbs = computed(() => {
  const segments = route.path.split('/').filter(Boolean);

  return segments.map((segment, index) => ({
    name:
      labels[segment] ||
      segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    path: '/' + segments.slice(0, index + 1).join('/')
  }));
});
</script>

<style scoped>
.ff-breadcrumbs {
  max-width: 1320px;
  position: absolute;
  
  top: 140px;
  z-index: 20;
  width: fit-content;
  max-width: calc(100vw - 40px);
  margin: 0 0 40px;
}

.ff-breadcrumbs-inner {
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 10px 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;

  background: rgba(15, 15, 15, 0.38);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  white-space: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
}

.ff-breadcrumbs-inner::-webkit-scrollbar {
  display: none;
}

.ff-breadcrumbs a,
.ff-breadcrumbs .current {
  font-size: 11px;
  line-height: 1;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  text-decoration: none;
}

.ff-breadcrumbs a {
  color: rgba(255, 255, 255, 0.55);
  transition: color 0.25s ease;
}

.ff-breadcrumbs a:hover {
  color: #fff;
}

.current {
  color: #fff;
}

.dot {
  width: 4px;
  height: 4px;
  min-width: 4px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
}

@media (max-width: 768px) {
  .ff-breadcrumbs {
    top: 75px;
    margin-bottom: 25px;
  }

  .ff-breadcrumbs-inner {
    max-width: calc(100vw - 30px);
  }
}
</style>