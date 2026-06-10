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

        <!--<CreativePortfolioContact />-->
        <CreativePortfolioContact />
      </main>

      <CommonFooter1 />
    </div>
  </div>
</template>

<script setup>
//= Page Head
useHead({
  titleTemplate: `%s - Portfolio Interactive Center`,
  bodyAttrs: {
    class: 'main-bg'
  },
  link: [
    { rel: "stylesheet", href: "/assets/css/base.css" }
  ]
});
</script>
