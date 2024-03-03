import type { WebApp } from '@/types/twa'

export default function () {
  const WebApp = ref<WebApp>(typeof window !== 'undefined' && window?.Telegram?.WebApp)

  return {
    WebApp,
  }
}
