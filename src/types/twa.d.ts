import type { TelegramWebApp } from './WebApp'
import type { TelegramWebAppVersion6_1 } from './WebAppVersion_6.1'
import type { TelegramWebAppVersion6_2 } from './WebAppVersion_6.2'
import type { TelegramWebAppVersion6_4 } from './WebAppVersion_6.4'
import type { TelegramWebAppVersion6_7 } from './WebAppVersion_6.7'
import type { TelegramWebAppVersion6_9 } from './WebAppVersion_6.9'

export type WebApp = TelegramWebApp.WebApp &
  Partial<TelegramWebAppVersion6_1.WebApp> &
  Partial<TelegramWebAppVersion6_2.WebApp> &
  Partial<TelegramWebAppVersion6_4.WebApp> &
  Partial<TelegramWebAppVersion6_7.WebApp> &
  Partial<TelegramWebAppVersion6_9.WebApp>
