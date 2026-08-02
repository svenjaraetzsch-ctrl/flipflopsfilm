// Cookie / tracking consent state, shared across the app.
//
// WHAT THIS SITE ACTUALLY LOADS (keep this list honest — it's what the privacy
// policy promises):
//   necessary      — nothing but the consent choice itself. No app cookies, no
//                    session storage, no tracking. Always on, not refusable.
//   external_media — the Google Maps embed on /contact. Google sets cookies and
//                    reads storage as soon as the iframe loads, so the iframe
//                    must NOT be in the DOM until this is true.
//   analytics      — reserved. Nothing uses it yet (Search Console needs no
//                    consent: it never touches the visitor's device). Wired up
//                    now so adding GA4 later is a drop-in, not a rewrite.
//
// TO ADD GA4 LATER: don't put the gtag script in nuxt.config.ts — that would
// fire before consent. Instead create plugins/analytics.client.js:
//
//   export default defineNuxtPlugin(() => {
//     const { categories } = useCookieConsent()
//     watch(() => categories.value.analytics, (ok) => {
//       if (!ok || window.__gaLoaded) return
//       window.__gaLoaded = true
//       const s = document.createElement('script')
//       s.async = true
//       s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX'
//       document.head.appendChild(s)
//       window.dataLayer = window.dataLayer || []
//       window.gtag = function () { window.dataLayer.push(arguments) }
//       gtag('js', new Date())
//       gtag('config', 'G-XXXXXXX', { anonymize_ip: true })
//     }, { immediate: true })
//   })
//
// ...then add the GA cookies to the table in the privacy policy.

const STORAGE_KEY = 'fff_consent'

// Bump this whenever the CATEGORIES list changes (adding a new category means
// the visitor's old choice no longer covers everything, so we must re-ask).
const CONSENT_VERSION = 1

// Re-ask after 12 months — the retention period the Spanish AEPD and the
// EDPB both point to for consent that hasn't been renewed.
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000

// `necessary` is deliberately absent: it's implicit, always granted, and
// showing it as a locked toggle only invites "why can't I turn this off".
export const OPTIONAL_CATEGORIES = ['analytics', 'external_media']

const emptyState = () => ({ analytics: false, external_media: false })

export function useCookieConsent() {
  // useState keeps one instance shared between the banner, the footer link and
  // the Maps embed, and is SSR-safe (prerender just gets the default).
  const categories = useState('cookie-consent-categories', emptyState)
  const decided = useState('cookie-consent-decided', () => false)
  // False during prerender and until the client has read localStorage. The
  // banner keys off this so the static HTML never ships a visible banner that
  // would flash for visitors who already decided.
  const ready = useState('cookie-consent-ready', () => false)
  const settingsOpen = useState('cookie-consent-settings-open', () => false)

  function persist() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          v: CONSENT_VERSION,
          ts: Date.now(),
          ...categories.value
        })
      )
    } catch {
      // Private mode / storage disabled. Consent still applies for this page
      // view; we just can't remember it, so the banner returns next visit.
    }
  }

  function load() {
    if (ready.value) return
    let stored = null
    try {
      stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    } catch {
      stored = null
    }

    const usable =
      stored &&
      stored.v === CONSENT_VERSION &&
      typeof stored.ts === 'number' &&
      Date.now() - stored.ts < MAX_AGE_MS

    if (usable) {
      for (const key of OPTIONAL_CATEGORIES) {
        categories.value[key] = stored[key] === true
      }
      decided.value = true
    } else {
      // No choice yet, outdated version, or expired → everything stays off
      // until the visitor actively opts in. Opt-out is not consent.
      categories.value = emptyState()
      decided.value = false
    }
    ready.value = true
  }

  function acceptAll() {
    for (const key of OPTIONAL_CATEGORIES) categories.value[key] = true
    decided.value = true
    settingsOpen.value = false
    persist()
  }

  // "Reject" must be exactly as easy as "accept" — same click count, same
  // visual weight. Deliberately not styled as a secondary link.
  function rejectAll() {
    categories.value = emptyState()
    decided.value = true
    settingsOpen.value = false
    persist()
  }

  function saveSelection() {
    decided.value = true
    settingsOpen.value = false
    persist()
  }

  // Consent for one purpose, given at the point of use — e.g. the "load the map"
  // button on /contact. Counts as a decision, so the banner stops asking; the
  // other categories stay off because the visitor didn't agree to those.
  function grant(category) {
    if (!OPTIONAL_CATEGORIES.includes(category)) return
    categories.value[category] = true
    decided.value = true
    persist()
  }

  // Lets the visitor change their mind later (footer link). Withdrawing consent
  // has to be as easy as giving it, so this reopens the full banner.
  function reopen() {
    settingsOpen.value = true
    decided.value = false
  }

  const hasConsent = (category) =>
    category === 'necessary' ? true : categories.value[category] === true

  return {
    categories,
    decided,
    ready,
    settingsOpen,
    load,
    acceptAll,
    rejectAll,
    saveSelection,
    grant,
    reopen,
    hasConsent
  }
}
