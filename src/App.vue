<script setup lang="ts">
onMounted(() => {
  window.Telegram.WebApp.expand()
})
</script>

<template>
  <router-view />
</template>

<style lang="postcss">
</style>
