<script lang="ts" setup>
defineProps<{
  amount: string
  color: string
  size: string
}
>()

onActivated(() => {
  window.Telegram.WebApp.HapticFeedback.impactOccurred('light')
})

const randomOffsets = [-100, -50, 0, 50, 100]
const randomIndex = Math.floor(Math.random() * randomOffsets.length)
const randomOffset = () => randomOffsets[randomIndex]
</script>

<template>
  <div class="w-full h-full fixed flex items-center justify-center z-15 got_coin" :class="color">
    <div
      class="font-black absolute"
      :class="size"
      :style="{ transform: `translate(${randomOffset()}px, ${randomOffset()}px)` }"
    >
      {{ amount }}
    </div>
  </div>
</template>

<style>
.got_coin {
    animation: coinAnimation 1.5s ease-in-out ;
}

@keyframes coinAnimation {
    0% {
        opacity: 0;
    }
    1%{
        opacity: 100;
    }
    65% {
        opacity: 75;
    }
    100% {
        translate: 0 -50%;
        opacity: 0
    }
}
</style>
