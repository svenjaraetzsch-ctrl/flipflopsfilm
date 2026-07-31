<template>
  <div class="lang-switcher">
    <select v-model="selected" aria-label="Language">
      <option
        v-for="loc in locales"
        :key="loc.code"
        :value="loc.code"
      >{{ loc.code.toUpperCase() }}</option>
    </select>
  </div>
</template>

<script setup>
const { locale, locales } = useI18n()

// Matches the i18n config: English is the default locale, served at the site root
// with no URL prefix; /de and /es carry a locale prefix. Slugs are identical across
// locales, so switching is just a matter of swapping the leading /<locale> prefix.
const DEFAULT_LOCALE = 'en'

const selected = computed({
  get: () => locale.value,
  set: (val) => {
    if (val === locale.value) return

    const codes = locales.value.map((l) => l.code)
    // Strip any existing locale prefix → the path without a locale.
    const bare =
      window.location.pathname.replace(
        new RegExp(`^/(?:${codes.join('|')})(?=/|$)`),
        ''
      ) || '/'
    // Re-add the target locale prefix (none for the default locale).
    const target =
      val === DEFAULT_LOCALE ? bare : `/${val}${bare === '/' ? '' : bare}`

    // Hard navigation: the app already re-inits GSAP via a full reload on every
    // route change, and this guarantees the URL actually changes. The previous
    // switchLocalePath + router.push chain silently no-op'd on the static build,
    // so all languages stayed on the same address.
    window.location.href =
      (target || '/') + window.location.search + window.location.hash
  }
})
</script>

<style scoped>
.lang-switcher {
  display: inline-flex;
  align-items: center;
}

select {
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  color: inherit;
  font-family: inherit;
  font-size: 11px;
  letter-spacing: 2px;
  cursor: pointer;
  padding: 2px 18px 2px 0;
  outline: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='rgba(255,255,255,0.5)'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 2px center;
  background-size: 8px;
  transition: border-color 0.25s, opacity 0.25s;
  opacity: 0.6;
}

select:hover,
select:focus {
  opacity: 1;
  border-bottom-color: rgba(255, 255, 255, 0.8);
}

option {
  background: #201D1D;
  color: #fff;
}
</style>
