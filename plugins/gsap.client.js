export default defineNuxtPlugin(() => {
  const router = useRouter()
  let ready = false

  router.beforeEach((to) => {
    if (!ready) {
      ready = true
      return true
    }
    window.location.href = to.fullPath
    return false
  })
})
