import { setupLayouts } from 'virtual:generated-layouts'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { createHead } from '@vueuse/head'

import generatedRoutes from 'virtual:generated-pages'
import NProgress from 'nprogress'
import App from './APP.vue'

// 使用unocss和tailwind样式重置库
import '@unocss/reset/tailwind.css'
import 'uno.css'

import './styles/main.css'

// 使用路由和page插件
const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  routes,
  history: createWebHistory()
})

// 使用进度条
router.beforeEach((to, from) => {
  if (to.path !== from.path) NProgress.start()
  router.afterEach(() => {
    NProgress.done()
  })
})

// 国际化i18n
const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: any }>('../locales/*.y(a)?ml', {
      eager: true
    })
  ).map(([key, value]) => {
    const yaml = key.endsWith('.yaml')
    return [key.slice(14, yaml ? -5 : -4), value.default]
  })
)
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages
})

// 使用pwa缓存
router.isReady().then(async () => {
  const { registerSW } = await import('virtual:pwa-register')
  registerSW({ immediate: true })
})

// 使用vueuse/head
const head = createHead()

// 创建spa
const app = createApp(App)

app.use(router).use(createPinia()).use(i18n).use(head)

app.mount('#app')
