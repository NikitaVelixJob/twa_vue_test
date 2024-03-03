<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import gsap from 'gsap'
import { useKeenSlider } from 'keen-slider/vue'
import useShop from '@/composables/useShop'

const shop = ref()
const { toggleShop } = useShop()
onClickOutside(shop, () => {
  toggleShop()
})

const [container] = useKeenSlider(
  {
    loop: true,
    slides: {
      origin: 'center',
      perView: 2,
    },
    mode: 'snap',
  },
  [],
)

const shopItems = ref([{
  title: 'Viking',
  image: '/buns/Viking.png',
  description: 'A classic viking bun',
}, {
  title: 'Police',
  image: '/buns/Police.png',
  description: 'Bun on the mission to save the city',
}, {
  title: 'Paris Bun',
  image: '/buns/ParisGirl.png',
  description: 'What a pretty Paris Bun',
}, {
  title: 'Gold',
  image: '/buns/Gold.png',
  description: 'THEGOLD',
}, {
  title: 'Catchty',
  image: '/buns/Catchty.png',
  description: 'The hunt for some catchty...',
}])

type Tab = 'BG' | 'BUNS' | 'HATS' | 'ITEMS' | 'MISC' | 'POWERS'
const currentTab = ref<Tab>('BUNS')
const tabs = ref<{ id: number, title: Tab }[]>([
  {
    id: 0,
    title: 'BUNS',
  },
  {
    id: 1,
    title: 'BG',
  },
  {
    id: 2,
    title: 'HATS',
  },
  {
    id: 3,
    title: 'POWERS',
  },
  {
    id: 4,
    title: 'ITEMS',
  },
  {
    id: 5,
    title: 'MISC',
  },

])

const tl = gsap.timeline()
onMounted(() => {
  tl.from('.animateOnce_0', {
    scale: 1.1,
    filter: 'blur(2px)',
    duration: 0.17,
    delay: 0.3,
  })
  tl.from('.animateOnce_1', {
    scale: 1.1,
    filter: 'blur(2px)',
    duration: 0.13,
  })
  tl.from('.animateOnce_2', {
    scale: 1.1,
    filter: 'blur(2px)',
    duration: 0.1,
  })
  tl.from('.animateOnce_3', {
    scale: 1.1,
    filter: 'blur(2px)',
    duration: 0.1,
  })
  tl.from('.animateOnce_4', {
    scale: 1.1,
    filter: 'blur(2px)',
    duration: 0.10,
  })

  gsap.from('.animateBackgroundHeight', {
    height: 0,
    duration: 0.8,
    delay: 0.3,
    ease: 'power1.inOut',
  })
})
</script>

<template>
  <div class="w-full bg-black h-full fixed flex items-center justify-center black/10 backdrop-blur-md z-100000">
    <div ref="shop" class="w-full h-full flex flex-col items-center justify-start p-4 after:content-[''] z-10">
      <div class="absolute top-6 right-6 hover:cursor-pointer bg-[#FEC601] backdrop-blur-xl rounded-md duration-100" style="box-shadow: 4px 4px 0px rgba(0, 0, 0, 1);" @click="toggleShop">
        <i class="ico-carbon:close text-5xl text-black size-8" />
      </div>

      <div
        v-motion-slide-visible-top="{
          initial: {
            opacity: 0,
            filter: 'blur(5px)',
            y: -100,
          },
          enter: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
              duration: 400,
            },
          },
        }"
        class="after:text-black after:content-['THESHOP'] relative after:absolute after:left-1 after:top-1 text-5xl text-[#FEC601] fw-1000 z-0 after:-z-1"
      >
        THESHOP
      </div>

      <div class="my-2 bg-white/20 rounded-xl w-95% h-95% absolute -z-10 top-0 backdrop-blur-md backdrop-filter animateBackgroundHeight" />

      <div class="flex flex-col justify-center gap-y-8 flex-1 w-full px-4">
        <ShopItem
          v-for="item, index in shopItems"
          :key="`${item.title}${index}`"
          :title="item.title"
          :image="item.image"
          :description="item.description"
          :gsap-class="`animateOnce_${index}`"
        />
      </div>

      <div
        ref="container" v-motion-slide-bottom="{
          initial: {
            opacity: 0,
            y: 100,
          },
          enter: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 1000,
              ease: 'easeOut',
            },
          },
        }"
        class="flex items-end gap-x-1 bg-white/30 rounded-lg backdrop-filter backdrop-blur-xl border border-white/30 z-10 shadow duration-100 px-8 keen-slider max-w-75% text-2xl"
        style="box-shadow: 4px 4px 0px rgba(0, 0, 0, 1);"
      >
        <div
          v-for="tab, index in tabs"
          :key="index"
          class="text-center py-3 px-4 max-w-200px cursor-pointer"
          :class="`keen-slider__slide number-slide${index + 1} ${tab.title === currentTab
            ? 'text-[#FEC601] fw-700 bg-[#FEC601]/30 rounded-md' : null}`"
          @click="currentTab = tab.title"
        >
          {{ tab.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url('keen-slider/keen-slider.css');
</style>
