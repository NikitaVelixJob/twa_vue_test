<script setup lang="ts">
import type { Component } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import ClickPointText from '../components/ClickPointText.vue'

const { t } = useI18n()

const textComponents = ref<{
  id: any
  amount: string
  color: string
  component: Component
}[]>([])
const coins = ref()
function onClick() {
  // generate a new insanse of text on click
  const text = '12'
  const textColor = 'text-orange-400'

  const item = {
    id: uuidv4(),
    amount: text,
    color: textColor,
    component: ClickPointText,
  }
  textComponents.value.push(item)

  // remove item from array in 1.5s
  setTimeout(() => {
    textComponents.value = textComponents.value.filter(i => i.id !== item.id)
    coins.value.children[0].remove()
  }, 1500)
}
</script>

<template>
  <div
    :style="{ backgroundImage: `url(/attr/bg/DarkForest.png)`, backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundSize: 'cover' }"
    class="w-screen h-100dvh relative object-cover object-bottom "
  >
    <!-- <ClickPointText amount="10" color="text-orange-400" /> -->
    <div ref="coins" class="w-full h-full absolute">
      <template v-for="item in textComponents" :key="item.id">
        <component
          :is="item.component"
          :id="item.id"
          :amount="item.amount"
          :color="item.color"
        />
      </template>
    </div>

    <div class="h-full w-full flex items-end">
      <div class="w-full h-full flex items-end justify-center group z-10 max-h-70% mt-auto" @click="onClick">
        <img src="/buns/Police.png" alt="bun" class="group-active:scale-90 scale-100 h-full mt-auto">
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
</style>
