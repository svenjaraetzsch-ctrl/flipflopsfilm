// Per-route SEO: title, description and Open Graph tags, pulled from the
// `seo.<key>` block in locales/{en,de,es}.json so each route AND each language
// gets its own unique meta. Reactive (computed) so it updates on locale change.
//
// Usage in a page's <script setup>:
//   usePageSeo('services')
//
// The i18n strings hold ONLY the page title (no brand, no "|"). The brand suffix
// is appended here in JS, NOT in the locale files, because vue-i18n treats "|"
// as the pluralization separator and would otherwise truncate the title at it.
// og:title stays brand-free (just the page title) per social-share best practice.
//
// The site-wide fallbacks (og:image, og:site_name, twitter:card, og:type) live
// in nuxt.config.ts app.head; these per-page tags override title/description/
// og:title/og:description for the specific route.
const BRAND = 'Flip Flops Film'

export function usePageSeo(key) {
  const { t } = useI18n()
  const route = useRoute()

  const pageTitle = computed(() => t(`seo.${key}.title`))
  const description = computed(() => t(`seo.${key}.description`))
  const url = `https://flipflopsfilm.com${route.path}`

  useHead({
    title: computed(() => `${pageTitle.value} | ${BRAND}`),
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url }
    ]
  })

  // hreflang alternates (en/de/es) + x-default, rel=canonical and og:locale,
  // generated from the i18n config. Relies on i18n.baseUrl for absolute URLs.
  const localeHead = useLocaleHead({ addSeoAttributes: true })
  useHead(() => ({
    htmlAttrs: { lang: localeHead.value.htmlAttrs?.lang },
    link: localeHead.value.link,
    meta: localeHead.value.meta
  }))
}
