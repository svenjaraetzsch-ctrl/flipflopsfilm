import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default" | "preview"
declare module "/Users/svenjaraetzsch/Documents/FLIP_FLOPS_FILMS/WEBDEV/Main_Files/bayone_nuxtjs/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}