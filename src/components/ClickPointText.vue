<script lang="ts" setup>
defineProps<{
  amount: string
  color: string
}
>()

onActivated(() => {
  window.Telegram.WebApp.HapticFeedback.impactOccurred('light')
})
</script>

<template>
  <div class="w-full h-full fixed flex items-center justify-center z-0 got_coin" :class="color">
    <div class="font-black text-8xl">
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
