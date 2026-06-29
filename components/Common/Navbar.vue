<template>
  <div id="navi" class="topnav blur" :class="{ 'bord-thin-bottom': borderBottom }">
    <div class="container">
      <div class="nav-left">
        <CommonBreadcrumbs />
      </div>

      <div class="logo">
        <nuxt-link to="/" class="logo-link">
          <img src="/assets/imgs/logo-light.png" alt="" />
        </nuxt-link>
      </div>

      <div class="nav-right">
        <CommonLangSwitcher />
        <div class="menu-icon cursor-pointer" @click="toggleMenu">
          <span class="text"><span class="word">Menu</span></span>
          <span class="icon">
            <i></i>
            <i></i>
          </span>
        </div>
      </div>

    </div>
  </div>
  
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

const { borderBottom } = defineProps(['borderBottom']);

const handleScroll = () => {
  const menu = document.querySelector('.topnav');
  if (window.scrollY > 100) {
    menu.classList.add('nav-scroll');
  } else {
    menu.classList.remove('nav-scroll');
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const toggleMenu = () => {
  const navDark = document.querySelector('.topnav');
  document.querySelector('.hamenu').classList.toggle('open');
  document.querySelector('.topnav .menu-icon').classList.toggle('open');
  navDark.classList.toggle('navlit');

  if (document.querySelector('.topnav .menu-icon').classList.contains('open')) {
    document.querySelector('.hamenu').style.top = '0';
  } else {
    document.querySelector('.hamenu').style.top = '-100%';
  }
};
</script>

<style scoped>
/* ── Nav columns ── */
.nav-right {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-left: auto;        /* flex fallback: pushes to far right */
  justify-content: flex-end; /* grid mode: items right-aligned in their column */
}

/* ── Mobile ── */
@media (max-width: 991px) {
  .nav-left {
    display: none;
  }
  /* hide lang switcher from top nav on mobile — it lives in the hamburger menu */
  .nav-right :deep(.lang-switcher) {
    display: none;
  }
}
</style>
