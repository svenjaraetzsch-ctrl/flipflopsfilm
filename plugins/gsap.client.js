export default defineNuxtPlugin(() => {
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
