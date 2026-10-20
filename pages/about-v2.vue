<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <div id="smooth-content">
      <main class="main-bg">
        <div class="main-box main-bg ontop">
          <AboutHeader />
          <AboutUs founders />
          <AboutAccordions />
        </div>
        
      </main>
      <CommonFooter1 />
    </div>
  </div>
</template>

<script setup>
// Review only: About with David's feedback (the founders at the top, the
// flag photo for "One Team"), kept out of search engines. The team section
// at the end is left out, as the faces are already at the top. The live page
// is pages/about.vue.
usePageSeo('about')

//= Page Head
useHead({
  title: 'About, version 2 | Flip Flops Film',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
  bodyAttrs: {
    class: 'about'
  },
  link: [
    {
      rel: "stylesheet",
      href: '/assets/css/base.css'
    }
  ],
  script: [
    { src: "/assets/js/TweenMax.min.js" },
    { src: "/assets/js/charming.min.js" },
    { src: "/assets/js/smoother-script.js", defer: true }
  ]
});
</script>
