import { ref } from 'vue'
import { useScrollFx } from '@/composables/useScrollFx'

// A photo that surfaces under the cursor while hovering a list and follows it.
// Bind `area` to the positioned container, `float` to the floating frame and
// fill `imgs` with one <img> per row; call show(i) on row enter, hide() on leave.
// Inactive on touch screens, which have no cursor to follow.
export function useFloatReveal() {
  const area = ref(null)
  const float = ref(null)
  const imgs = []

  let moveX = null
  let moveY = null
  let active = -1
  let lastX = 0

  const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches

  useScrollFx(() => {
    gsap.set(float.value, { autoAlpha: 0, scale: 0.85 })
    gsap.set(imgs, { autoAlpha: 0 })
    moveX = gsap.quickTo(float.value, 'x', { duration: 0.6, ease: 'power3' })
    moveY = gsap.quickTo(float.value, 'y', { duration: 0.6, ease: 'power3' })
  })

  const onMove = (e) => {
    if (!moveX || !canHover()) return
    const box = area.value.getBoundingClientRect()
    moveX(e.clientX - box.left - float.value.offsetWidth / 2)
    moveY(e.clientY - box.top - float.value.offsetHeight / 2)
    // A slight tilt in the direction of travel makes the print feel handled.
    gsap.to(float.value, { rotation: gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.6), duration: 0.5 })
    lastX = e.clientX
  }

  const show = (i) => {
    if (!moveX || !canHover() || i === active) return
    if (active > -1) gsap.to(imgs[active], { autoAlpha: 0, duration: 0.3 })
    gsap.to(imgs[i], { autoAlpha: 1, duration: 0.3 })
    gsap.to(float.value, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'power3.out' })
    active = i
  }

  const hide = () => {
    if (!moveX) return
    gsap.to(float.value, { autoAlpha: 0, scale: 0.85, rotation: 0, duration: 0.35 })
    if (active > -1) gsap.to(imgs[active], { autoAlpha: 0, duration: 0.35 })
    active = -1
  }

  return { area, float, imgs, onMove, show, hide }
}
