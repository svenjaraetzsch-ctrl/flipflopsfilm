<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <div id="smooth-content">
        <CommonNavbar />
        <CommonMenu />
        <main class="main-bg">
            <div class="main-box main-bg ontop">
                <LocationsHeader />
                <LocationsTopContent></LocationsTopContent>
                <LocationsGrid></LocationsGrid>
            </div>
            <CreativePortfolioContact />
        </main>
      
        <CommonFooter1 />
    </div>
  </div>
</template>

<script setup>
//= Page Metadata
definePageMeta({
  layout: "preview",
});
//= Page Head
useHead({
  titleTemplate: `%s - Locations`,
  script: [
    { src: "/assets/js/smoother-script.js", defer: true }
  ]
});
</script>
