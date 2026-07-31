<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <div id="smooth-content">
      <main class="main-bg">
        <div class="main-box main-bg ontop">
          <AboutHeader />
          <AboutUs />
          <SliderScroll></SliderScroll>
          <AboutAccordions />
          <CreativeAgencyTeam />
        </div>
        
      </main>
      <CommonFooter1 />
    </div>
  </div>
</template>

<script setup>
usePageSeo('about')

//= Page Head
useHead({
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
