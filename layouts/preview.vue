<template>
  <CommonCursor />
  <CommonProgressScroll />
  <slot />
  <!-- The /services/* pages use this layout, not `default`, so the banner has to
       be repeated here — otherwise three real pages would ship without it. -->
  <CommonCookieBanner />
</template>

<script setup>
useHead({
  link: [{ rel: "stylesheet", href: "/landing-preview/css/preview-style.css" }],
});
</script>
