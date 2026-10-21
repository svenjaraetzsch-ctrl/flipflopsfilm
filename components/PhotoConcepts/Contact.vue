<template>
  <!-- The contact block ("Why work with us"), unchanged, with a closing
       photograph behind it that the content box uncovers as it scrolls away.
       Used wherever the contact block appears, with its own photo per page. -->
  <PhotoConceptsBackdrop :image="image">
    <CreativePortfolioContact />
  </PhotoConceptsBackdrop>
</template>

<script setup>
defineProps({
  image: { type: Object, required: true }
})
</script>
