<script lang="ts" setup>
defineProps<{
  image: string
  title: string
  description: string
  gsapClass?: string
}>()
</script>

<template>
  <div class="flex justify-between items-center w-full gap-x-4">
    <div class="flex gap-x-2 items-center">
      <div class="w-16 h-16 shrink-0 rounded-lg overflow-clip bg-white/30 border border-white/30 shadow-xl shadow-[#FEC601]/30" :class="gsapClass">
        <img :src="image">
      </div>
      <div class="flex flex-col justify-between">
        <div class="font-semibold italic text-2xl text-white/80">
          {{ title }}
        </div>
        <div class="font-base text-sm text-white/40">
          {{ description }}
        </div>
      </div>
    </div>

    <UIButton label="BUY" />
  </div>
</template>

<style>

</style>
