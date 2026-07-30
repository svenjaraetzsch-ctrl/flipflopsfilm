import { fileURLToPath } from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [],
  modules: ['@nuxtjs/i18n'],

  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    langDir: 'locales/',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'de', name: 'Deutsch', file: 'de.json' },
      { code: 'es', name: 'Español', file: 'es.json' }
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
    // Static export for IONOS Deploy Now (Apache shared hosting, no Node runtime).
    // `nuxt generate` prerenders every route to real HTML so Google sees content,
    // not an empty <div>. crawlLinks follows internal links to discover routes.
    prerender: {
      crawlLinks: true,
      routes: ['/'],
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

  app: {
    head: {
      title: 'Flip Flops Film',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        // TODO: REMOVE THIS noindex/nofollow TAG BEFORE GOING LIVE.
        // It keeps search engines out while the site is on staging.
        {
          name: 'robots',
          content: 'noindex, nofollow'
        },
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
        }
      ],
      link: [
        { rel: 'shortcut icon', href: '/assets/imgs/favicon.png' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900&display=swap'
        },
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