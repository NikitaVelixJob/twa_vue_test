<script setup lang="ts">
import { useMotion } from '@vueuse/motion'
import useShop from '@/composables/useShop'

onMounted(() => {
  window.Telegram.WebApp.expand()
})

const { isShopToggled } = useShop()

const shop = ref<HTMLElement>()
const { leave, apply } = useMotion(shop, {
  initial: {
    y: 800,
    filter: 'blur(10px)',
  },
})
async function onEnter(_: Element, done: () => void) {
  await apply({
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 300,
      bounce: 0,
    },
  })
  done()
}

async function onLeave(_: Element, done: () => void) {
  await apply({
    y: 1000,
    filter: 'blur(15px)',
    transition: {
      duration: 400,
      bounce: 0,
    },
  })
  leave(done)
}
</script>

<template>
  <Transition @enter="onEnter" @leave="onLeave">
    <Shop
      v-if="isShopToggled"
      ref="shop"
    />
  </Transition>
  <router-view />
</template>

<style lang="postcss">
</style>
