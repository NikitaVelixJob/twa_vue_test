<script setup lang="ts">
import type { Component } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import ClickPointText from '../components/ClickPointText.vue'

const { t } = useI18n()
const points = ref(0)

const textComponents = ref<{
  id: any
  amount: string
  color: string
  component: Component
  size: string
}[]>([])
const coins = ref()
function onClick() {
  window.Telegram.WebApp.HapticFeedback.impactOccurred('medium')

  // generate a new insanse of text on click
  const colors = ['text-orange-200', 'text-orange-400', 'text-orange-600']
  const amounts = ['12', '15', '18']
  const sizes = ['text-4xl', 'text-6xl', 'text-8xl']
  const randomIndex = Math.floor(Math.random() * amounts.length)
  const text = amounts[randomIndex]
  const textColor = colors[randomIndex]
  const size = sizes[randomIndex]
  const item = {
    id: uuidv4(),
    amount: text,
    color: textColor,
    component: ClickPointText,
    size,
  }
  textComponents.value.push(item)

  points.value += Number(text)

  // remove item from array in 1.5s
  setTimeout(() => {
    textComponents.value = textComponents.value.filter(i => i.id !== item.id)
    coins.value.children[0].remove()
  }, 1500)
}

const isTouching = ref(false)
const data = ref()
onMounted(() => {
  data.value = window.Telegram.WebApp.initDataUnsafe
})
</script>

<template>
  <div
    :style="{ backgroundImage: `url(/attr/bg/DarkForest.png)`, backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover' }"
    class="w-screen h-screen overflow-clip relative object-cover object-bottom"
  >
    <div class="bg-black/50 backdrop-blur-xl w-full absolute top-0 z-10 h-10% flex items-center justify-center ">
      <div class="text-3xl font-black">
        {{ points }}
      </div>
    </div>
    <!-- <ClickPointText amount="10" color="text-orange-400" /> -->
    <div ref="coins" class="w-full h-full absolute">
      <template v-for="item in textComponents" :key="item.id">
        <component
          :is="item.component"
          :id="item.id"
          :amount="item.amount"
          :color="item.color"
          :size="item.size"
        />
      </template>
    </div>
    <div class="max-w-screen">
      {{ data }}
    </div>
    <div class="h-full w-full flex items-end">
      <div class="w-full h-full flex items-end justify-center group z-10 max-h-70% mt-auto z-1000" @click="onClick">
        <img
          src="/buns/Police.png" alt="bun"
          class="group-active:scale-90 scale-100 w-full aspect-square h-fit mt-auto select-none"
          :class="{
            on_touch_bun: isTouching,
          }"
          @touchstart="isTouching = true"
          @touchend="isTouching = false"
        >
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --tg-theme-bg-color: #0a0a0a;
  --tg-theme-text-color: #fff;
  --tg-theme-hint-color: #929292;
  --tg-theme-link-color: #207ae4;
  --tg-theme-button-color: #5bc8fb;
  --tg-theme-button-text-color: #fffeec;
  --tg-theme-secondary-bg-color: #f3f2f9;

  --default-font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
}

body {
  color: var(--tg-theme-text-color);
  background: var(--tg-theme-bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
}

.hint {
  color: var(--tg-theme-hint-color);
}

.link {
  color: var(--tg-theme-link-color);
}

.button {
  background: var(--tg-theme-button-color);
  color: var(--tg-theme-button-text-color);
  border: none;
  font-size: 18px;
}

.button:not(:last-child) {
  margin-bottom: 20px
}

#usercard {
  text-align: center;
}

.on_touch_bun {
  scale: 0.9;
}
</style>
