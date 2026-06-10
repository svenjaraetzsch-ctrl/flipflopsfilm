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
const { t } = useI18n()

useHead({
  title: t('home_header.title'),

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
