import { onMounted, onBeforeUnmount } from 'vue'

// One shared sort + refresh for every component that registers effects, so
// triggers created out of DOM order (pins above the footer reveal) still get
// correct start/end positions.
let refreshTimer = null
const scheduleRefresh = () => {
  clearTimeout(refreshTimer)
  refreshTimer = setTimeout(() => {
    ScrollTrigger.sort()
    ScrollTrigger.refresh()
  }, 120)
}

// Runs `setup` once GSAP is loaded and, on desktop, once ScrollSmoother exists
// (smoother-script.js is deferred, and triggers must be created after it).
// Everything created inside `setup` is reverted on unmount; `setup` may also
// return its own cleanup function.
export function useScrollFx(setup) {
  let ctx = null
  let cleanup = null
  let timer = null

  onMounted(() => {
    let tries = 0
    const start = () => {
      const hasGsap = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined'
      const needsSmoother = window.innerWidth > 991
      const smootherReady = typeof ScrollSmoother !== 'undefined' && ScrollSmoother.get()
      if ((!hasGsap || (needsSmoother && !smootherReady)) && tries++ < 60) {
        timer = setTimeout(start, 50)
        return
      }
      if (!hasGsap) return
      ctx = gsap.context(() => {
        cleanup = setup()
      })
      scheduleRefresh()
    }
    start()
  })

  onBeforeUnmount(() => {
    clearTimeout(timer)
    if (typeof cleanup === 'function') cleanup()
    ctx?.revert()
  })
}
