<script lang="ts" setup>
defineProps<{
  label: string
}>()
</script>

<template>
  <button
    type="button"
    class="bg-[#FEC601] text-black px-10 py-2 font-black rounded-lg h-fit duration-200 relative hover:-translate-y-1 hover:-translate-x-1"
    style="box-shadow: 4px 4px 0px rgba(0, 0, 0, 1);"
  >
    {{ label }}
  </button>
  <!-- <div class="absolute left-1 top-1 -z-10  bg-black rounded-lg w-full h-full content-[''] " /> -->
</template>

<style>

</style>
