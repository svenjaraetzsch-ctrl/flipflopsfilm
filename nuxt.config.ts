import { fileURLToPath } from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [],
  modules: ['@nuxtjs/i18n'],

  i18n: {
    defaultLocale: 'en',
    // English at root (no prefix); /de/… and /es/… for the other locales.
    // NOTE: strategy 'prefix' (en → /en) crashes the prerender on this stack
    // (Nuxt 3.6.5 + @nuxtjs/i18n v8: "First argument to String.prototype
    // .startsWith must not be a regular expression"). The hreflang + x-default
    // + canonical tags below cover multilingual SEO without moving English.
    // Revisit 'prefix' only after a Nuxt/i18n upgrade.
    strategy: 'prefix_except_default',
    // Absolute base URL so useLocaleHead emits absolute hreflang + canonical URLs.
    baseUrl: 'https://flipflopsfilm.com',
    // Deterministic URLs for crawlers: no cookie/Accept-Language auto-redirect.
    detectBrowserLanguage: false,
    langDir: 'locales/',
    locales: [
      { code: 'en', language: 'en', name: 'English', file: 'en.json' },
      { code: 'de', language: 'de', name: 'Deutsch', file: 'de.json' },
      { code: 'es', language: 'es', name: 'Español', file: 'es.json' }
    ],
    compilation: {
      strictMessage: false,
      escapeHtml: false
    }
  },

  ssr: true,

  typescript: {
    shim: false
  },

  nitro: {
    // Force the plain static preset. On Vercel, Nitro would otherwise auto-detect
    // the `vercel` preset and emit `.vercel/output/static`, so the build script's
    // `cp -R .output/public dist` finds nothing and the deploy fails. Pinning
    // `static` makes every environment (local + Vercel) generate `.output/public`,
    // which the build script copies to `dist/`. Vercel's Output Directory must be
    // set to `dist`. vercel.json redirects are applied by Vercel regardless.
    preset: 'static',
    // `nuxt generate` prerenders every route to real HTML so Google sees content,
    // not an empty <div>. crawlLinks follows internal links to discover routes.
    prerender: {
      crawlLinks: true,
      // /photo-concepts is a client proposal that nothing links to, so the
      // crawler can't find it on its own.
      routes: ['/', '/photo-concepts', '/de/photo-concepts', '/es/photo-concepts'],
      // Don't abort the whole build on a single dead link (the theme demo data
      // still references non-existent pages, e.g. /creative-portfolio). Broken
      // links are logged. TODO: set back to true once demo pages/data are pruned.
      failOnError: false
    }
    // Static output lands in Nuxt's canonical `.output/public/` (incl. the
    // copied public/.htaccess and robots.txt). The `build` script then copies
    // it to `dist/` so Deploy Now can serve `dist` at the domain root.
  },

  alias: {
    '@': fileURLToPath(new URL('./', import.meta.url))
  },

  vite: {
    // Vue >= 3.4 warns in the browser console when this compile-time flag is
    // undefined; Nuxt 3.6 predates it, so define it explicitly.
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
    }
  },

  app: {
    head: {
      title: 'Flip Flops Film',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        {
          charset: 'utf-8'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=edge'
        },
        {
          name: 'keywords',
          content:
            'Flip Flops Film, film production Spain, production services Spain, production company Canary Islands, service production, location scouting Spain, tax incentives Spain, film crew Spain, film production Canary Islands'
        },
        {
          name: 'description',
          content:
            'Flip Flops Film provides production services across Spain and the Canary Islands, including locations, crew, logistics, permits and tax incentive support for international film, TV and commercial productions.'
        },
        {
          name: 'author',
          content: 'Flip Flops Film'
        },
        {
          property: 'og:title',
          content: 'Flip Flops Film'
        },
        {
          property: 'og:description',
          content:
            'Production services for international film, TV and commercial projects across Spain and the Canary Islands.'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:site_name',
          content: 'Flip Flops Film'
        },
        // Site-wide share image (link previews on WhatsApp, LinkedIn, X, iMessage).
        // The brand card: butterfly mark over the wordmark on the site's own
        // background (#201D1D), at the canonical 1200x630. It replaced a Teide
        // location photo that read as a random road rather than as Flip Flops.
        //
        // Alternatives sit next to it, already rendered at the same size:
        // og-share-butterfly.png (mark only) and og-share-wordmark.png (type
        // only). Swapping is just the URL below - but give the new file a NEW
        // name rather than overwriting this one: scrapers cache per URL, and a
        // reused path can keep serving the old picture for weeks.
        {
          property: 'og:image',
          content: 'https://flipflopsfilm.com/assets/imgs/og-share.png'
        },
        {
          property: 'og:image:width',
          content: '1200'
        },
        {
          property: 'og:image:height',
          content: '630'
        },
        {
          property: 'og:image:type',
          content: 'image/png'
        },
        {
          property: 'og:image:alt',
          content: 'The Flip Flops Film logo: a butterfly whose wings are film clapperboards, above the Flip Flops Film wordmark.'
        },
        // X falls back to og:image, but naming it explicitly stops the card
        // renderer guessing when both are present on a page.
        {
          name: 'twitter:image',
          content: 'https://flipflopsfilm.com/assets/imgs/og-share.png'
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        }
      ],
      link: [
        { rel: 'shortcut icon', href: '/assets/imgs/favicon.png' },
        // Poppins is self-hosted (see public/assets/fonts/poppins/). It used to
        // come from fonts.googleapis.com, which sent every visitor's IP to
        // Google before they could consent to anything — the exact issue German
        // courts have ruled on. Serving it ourselves removes that entirely, so
        // fonts need no cookie-banner category. Do not point this back at Google.
        { rel: 'stylesheet', href: '/assets/fonts/poppins/style.css' },
        { rel: 'stylesheet', href: '/assets/fonts/mona-sans/style.css' },
        { rel: 'stylesheet', href: '/assets/css/plugins.css' },
        { rel: 'stylesheet', href: '/assets/css/style.css' }
      ],
      script: [
        { src: '/assets/js/bootstrap.bundle.min.js' },
        { src: '/assets/js/plugins.js' },
        { src: '/assets/js/isotope.pkgd.min.js' },
        { src: '/assets/js/wow.min.js' },
        { src: '/assets/js/gsap.min.js' },
        { src: '/assets/js/ScrollTrigger.min.js' },
        { src: '/assets/js/ScrollSmoother.min.js' },
        { src: '/assets/js/scripts.js', defer: true }
      ]
    }
  },

  css: ['swiper/css/bundle', '@/styles/globals.css'],

  webpack: {
    extractCSS: true,
    optimization: {
      splitChunks: {
        layouts: true
      }
    }
  }
});