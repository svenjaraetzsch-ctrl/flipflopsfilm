import { ref } from 'vue'

// The line that compares the original with the cinematic look (the home
// video): dragged anywhere on its stage, or moved with the arrow keys on a
// hidden range input bound to `pos`. `onGrab` runs when a drag starts, e.g. to
// stop an intro animation.
export function useCompareLine(stage, { onGrab } = {}) {
  const pos = ref(50)
  let dragging = false

  const setFromEvent = (e) => {
    const r = stage.value.getBoundingClientRect()
    pos.value = Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100))
  }

  const startDrag = (e) => {
    onGrab?.()
    dragging = true
    stage.value.setPointerCapture(e.pointerId)
    // A touch may turn out to be a vertical scroll, so the line only follows
    // once the finger moves sideways.
    if (e.pointerType !== 'touch') setFromEvent(e)
  }

  const drag = (e) => {
    if (dragging) setFromEvent(e)
  }

  const endDrag = () => {
    dragging = false
  }

  return { pos, startDrag, drag, endDrag }
}
