<script setup lang="ts">
onMounted(() => {
  window.Telegram.WebApp.WebApp.expand()
})
</script>

<template>
  <router-view />
</template>

<style lang="postcss">
</style>
