<script setup lang="ts">
const { t } = useI18n()
console.log(window.Telegram)

function toggleMainButton() {
  const isVisible = window.Telegram.WebApp.MainButton.isVisible
  if (isVisible) {
    window.Telegram.WebApp.MainButton.hide()
    window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy')
    window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy')
    window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy')
    window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy')
    window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy')
  }
  else {
    window.Telegram.WebApp.HapticFeedback.impactOccurred('soft')
    window.Telegram.WebApp.HapticFeedback.impactOccurred('soft')
    window.Telegram.WebApp.HapticFeedback.impactOccurred('soft')
    window.Telegram.WebApp.HapticFeedback.impactOccurred('soft')
    window.Telegram.WebApp.HapticFeedback.impactOccurred('soft')
    window.Telegram.WebApp.HapticFeedback.impactOccurred('soft')
    window.Telegram.WebApp.MainButton.show()
  }
}
</script>

<template>
  <div class="w-screen h-100dvh">
    hi its a test of webapp

    <button class="bg-" @click="toggleMainButton">
      TOGGLE MAIN BUTTOn
    </button>
  </div>
</template>

<style>
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
