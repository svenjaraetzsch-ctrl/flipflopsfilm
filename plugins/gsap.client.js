export default defineNuxtPlugin(() => {
  // Every page load starts with the loader intro at the top and ScrollSmoother
  // positions the page itself. The browser restoring the old scroll position
  // on reload/back made the page jump down once the intro was done, so every
  // load starts at the top. ScrollTrigger remembers the browser's original
  // setting and puts it back after each refresh, so it has to be told.
  if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.clearScrollMemory('manual')
  else if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

  const router = useRouter()
  let ready = false

  router.beforeEach((to, from) => {
    if (!ready) {
      ready = true
      return true
    }
    if (to.fullPath === from.fullPath) {
      window.location.reload()
      return false
    }
    window.location.href = to.fullPath
    return false
  })
})
