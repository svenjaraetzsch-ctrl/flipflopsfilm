import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/Users/svenjaraetzsch/Documents/FLIP_FLOPS_FILMS/WEBDEV/Main_Files/bayone_nuxtjs/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}