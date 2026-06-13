<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    
    <div id="smooth-content">
      <main class="main-bg">
        <div class="main-box main-bg ontop">
          
          <CrewOperationsHeader />
          <CrewOperationsTopContent />
          <LandingMarquee />
          <!--<TaxIncentivesImageColumn />-->
          <CrewOperationsAccordion />
          <!--<TaxIncentivesBottomImage />-->
        </div>
        <CrewOperationsNextProject />
      </main>
      <CommonFooter1 />
    </div>
  </div>
</template>

<script setup>
//= Page Head
useHead({
  titleTemplate: `%s - Tax Incentives`,
  bodyAttrs: {
    class: 'main-bg'
  },
  script: [
    { src: "/assets/js/smoother-script.js", defer: true }
  ]
});
</script>
