<script lang="ts" setup>
defineProps<{
  name: string
}>()
</script>

<template>
  <button type="button" class="border p-2 border-light/20 rounded-lg bg-black/50 text-light active:scale-90 duration-100" :style="{ boxShadow: '4px 4px 0px rgba(0, 0, 0, 1)' }">
    <div class="text-3xl" :class="name" />
  </button>
</template>

<style>

</style>
