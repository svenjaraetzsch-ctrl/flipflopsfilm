<template>
  <CommonCursor />
  <CommonProgressScroll />
  <slot />
  <!-- Sibling of the page (and therefore of #smooth-wrapper), so ScrollSmoother
       never transforms it and it stays pinned to the viewport. Also present in
       layouts/preview.vue, which the /services/* pages use. -->
  <CommonCookieBanner />
</template>
