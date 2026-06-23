export default defineNuxtPlugin(() => {
  const router = useRouter()
  let ready = false

  router.afterEach(() => {
    if (!ready) {
      ready = true
      return
    }
    window.location.reload()
  })
})
