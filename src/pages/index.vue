<script setup lang="ts">
import type { Component } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { promiseTimeout, useTimeout, useTimeoutFn, useTransition, watchDebounced } from '@vueuse/core'
import ClickPointText from '../components/ClickPointText.vue'
import useTWA from '@/composables/useTWA'
import useShop from '@/composables/useShop'
import { supabase } from '@/plugins/supabase'

const { ready, start, stop } = useTimeout(5000, { controls: true })
watch(ready, () => {
  if (ready.value)
    getUserData()

  start()
})

const textComponents = ref<{
  id: any
  amount: string
  color: string
  component: Component
  size: string
}[]>([])
const isOnFire = ref(false)

const { WebApp } = useTWA()
const data = ref()
const coins = ref()
const users_data = ref({
  id: null,
  created_at: null,
  username: null,
  telegram_id: null,
  coins: 0,
})
const users_data_coins = computed(() => users_data.value.coins)
const _coinsTransition = useTransition(users_data_coins, { duration: 1000, transition: [0, 0, 1, 1] })
const coinsTransition = computed(() => Math.floor(_coinsTransition.value))
function onClick() {
  // if (!WebApp?.value?.HapticFeedback)
  // return

  // WebApp?.value?.HapticFeedback?.impactOccurred('medium')

  // generate a new insanse of text on click
  const colorsOnFire = ['text-orange-200', 'text-orange-400', 'text-orange-600']
  const defaultColor = 'text-white/60'
  const amounts = ['1']
  const sizes = ['text-4xl', 'text-6xl', 'text-8xl']
  const randomIndex = Math.floor(Math.random() * amounts.length)
  const text = isOnFire.value ? (Number(amounts[randomIndex]) * 10).toString() : amounts[randomIndex]
  const size = sizes[randomIndex]
  const item = {
    id: uuidv4(),
    amount: text,
    color: isOnFire.value ? colorsOnFire[randomIndex] : defaultColor,
    component: markRaw(ClickPointText),
    size,
  }
  textComponents.value.push(item)

  users_data.value.coins += Number(text)

  // remove item from array in 1.5s
  setTimeout(() => {
    textComponents.value = textComponents.value.filter(i => i.id !== item.id)
    coins.value.children[0].remove()
  }, 1500)
}

// const local_ID = ref(342428802)
const local_ID = ref(null)

async function updateDB() {
  if (!WebApp.value?.initDataUnsafe?.user?.id && !local_ID.value)
    return

  const { data, error } = await supabase
    .from('users')
    .update({ coins: users_data.value.coins })
    .eq('telegram_id', WebApp.value?.initDataUnsafe?.user?.id ?? local_ID.value)

  if (data)
    users_data.value = data[0]

  if (error)
    console.log(error)
}

watchDebounced(
  [users_data],
  () => { updateDB() },
  { debounce: 500, maxWait: 1000, deep: true },

)
async function getUserData() {
  if (!WebApp.value?.initDataUnsafe?.user?.id && !local_ID.value)
    return

  const { data } = await supabase
    .from('users')
    .select()
    .eq('telegram_id', WebApp.value?.initDataUnsafe?.user?.id ?? local_ID.value)

  if (data)
    users_data.value = data[0]
}

data.value = WebApp.value.initDataUnsafe
getUserData()

const { toggleShop } = useShop()
</script>

<template>
  <div
    :style="{
      backgroundImage: `url(/attr/bg/Sunset.png)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'bottom',
    }"
    class="w-100vw h-100dvh overflow-clip relative object-cover object-bottom"
  >
    <div
      class="bg-gradient-to-r bg-black/50 backdrop-blur-md w-full absolute top-0 z-100 h-10% flex items-center justify-between px-10"
      style="box-shadow: 0px 4px 0px rgba(0, 0, 0, 1);"
    >
      <!-- <div
        class="text-3xl font-black text-[#FEC601] uppercase"
        style="text-shadow: 4px 4px 0px rgba(0, 0, 0, 1);"
      >
        THEBUNS
      </div> -->

      <div class="flex ic jc gap-x-2 max-w-50 text-3xl font-black text-[#FEC601] uppercase">
        <div
          class="truncate"
          style="text-shadow: 4px 4px 0px rgba(0, 0, 0, 1);"
        >
          {{ WebApp.initDataUnsafe.user?.username }}
        </div>
      </div>
      <div
        class="text-3xl font-black text-[#FEC601] rounded-md px-2 uppercase"
        style="text-shadow: 4px 4px 0px rgba(0, 0, 0, 1);"
      >
        {{ coinsTransition }}
      </div>
      <!-- {{ WebApp.initDataUnsafe.user?.id }} -->
    </div>
    <!-- <ClickPointText amount="10" color="text-orange-400" /> -->
    <div ref="coins" class="w-full h-full absolute">
      <template v-for="item in textComponents" :key="item.id">
        <component
          :is="markRaw(item.component)"
          :id="item.id"
          :amount="item.amount"
          :color="item.color"
          :size="item.size"
        />
      </template>
    </div>
    <!-- <div class="max-w-screen">
      {{ data }}
    </div> -->
    <div class="h-full w-full flex items-end relative">
      <!-- <div class="text-black bg-white w-full">
        {{ users_data }}
      </div> -->

      <div
        class="w-full h-fit flex items-end justify-center group z-10 mt-auto z-1000 relative hover:cursor-pointer active:scale-90 duration-100"
        @click="onClick"
      >
        <img
          src="/buns/Police.png" alt="bun"
          class="w-full aspect-square h-fit mt-auto select-none z-10"
        >

        <Transition name="slide-fade">
          <div
            v-if="isOnFire" class="absolute bottom-0 z-0 mix-blend-screen h-80%"
          >
            <img src="/fire.gif" class="mix-blend-screen h-full">
          </div>
        </Transition>
      </div>
    </div>

    <div class="w-full absolute bottom-0 z-10000 h-8% mb-4 flex items-center justify-end p-4">
      <UIIcon name="ico-carbon-shopping-bag" @click="toggleShop" />
      <!-- <div class="bg-gradient-to-r from-orange-400 to-orange-600 border-orange-600 border rounded-xl px-4 py-1" @click="isOnFire = !isOnFire">
        TOGGLE FIRE
      </div> -->
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
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(50%) scale(0.5);
  opacity: 0;
}
.down-to-middle,
.middle-to-down {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
}
.middle-to-down {
  transform: translateY(50%) scale(0.5);
  opacity: 0;
}
</style>
