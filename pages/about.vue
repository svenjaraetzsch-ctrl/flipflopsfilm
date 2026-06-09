<template>
  <CommonLoader />
  <div class="noise"></div>
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <div id="smooth-content">
      <main class="main-bg">
        <div class="main-box main-bg ontop">
          <LandingHeader />
          <!--<CreativePortfolioHeader />-->
          <!--<CreativePortfolioMarquee />-->
          <CreativePortfolioAbout />
          <CreativePortfolioServices />
          <!---<CreativePortfolioWorks />-->
          <!--<CreativePortfolioTestimonials />-->
          <!--<CreativePortfolioBlog />-->
          
        </div>
        <CreativeAgencyTeam />
      </main>
      <CommonFooter1 />
    </div>
  </div>
</template>

<script setup>
//= Page Head
useHead({
  titleTemplate: `%s - About`,
  bodyAttrs: {
    class: 'crev-portfolio'
  },
  script: [
    { src: "/assets/js/smoother-script.js", defer: true }
  ]
});
</script>
