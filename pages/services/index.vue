<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />

    <div id="smooth-content">
      <main class="main-bg">
        <div class="main-box main-bg ontop">
          <PortfolioInteractiveCenter />
          <ServicesTopContent></ServicesTopContent>
          
          
        </div>

        <CreativePortfolioContact />
      </main>

      <CommonFooter1 />
    </div>
  </div>
</template>

<script setup>
usePageSeo('services')

useHead({
  bodyAttrs: {
    class: 'main-bg'
  },

  script: [
    {
      src: '/assets/js/smoother-script.js',
      defer: true
    }
  ]
})
</script>
