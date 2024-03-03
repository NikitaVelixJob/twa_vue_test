const isShopToggled = ref(false)
export default function () {
  function toggleShop() {
    isShopToggled.value = !isShopToggled.value
  }

  return {
    toggleShop,
    isShopToggled,
}
}
