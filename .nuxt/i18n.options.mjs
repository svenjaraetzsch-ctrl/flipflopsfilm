
// @ts-nocheck
import locale__Users_svenjaraetzsch_Documents_FLIP_FLOPS_FILMS_WEBDEV_Main_Files_bayone_nuxtjs_locales_en_json from "../locales/en.json";
import locale__Users_svenjaraetzsch_Documents_FLIP_FLOPS_FILMS_WEBDEV_Main_Files_bayone_nuxtjs_locales_de_json from "../locales/de.json";
import locale__Users_svenjaraetzsch_Documents_FLIP_FLOPS_FILMS_WEBDEV_Main_Files_bayone_nuxtjs_locales_es_json from "../locales/es.json";


export const localeCodes =  [
  "en",
  "de",
  "es"
]

export const localeLoaders = {
  "en": [{ key: "../locales/en.json", load: () => Promise.resolve(locale__Users_svenjaraetzsch_Documents_FLIP_FLOPS_FILMS_WEBDEV_Main_Files_bayone_nuxtjs_locales_en_json), cache: true }],
  "de": [{ key: "../locales/de.json", load: () => Promise.resolve(locale__Users_svenjaraetzsch_Documents_FLIP_FLOPS_FILMS_WEBDEV_Main_Files_bayone_nuxtjs_locales_de_json), cache: true }],
  "es": [{ key: "../locales/es.json", load: () => Promise.resolve(locale__Users_svenjaraetzsch_Documents_FLIP_FLOPS_FILMS_WEBDEV_Main_Files_bayone_nuxtjs_locales_es_json), cache: true }]
}

export const vueI18nConfigs = [
  
]

export const nuxtI18nOptions = {
  "experimental": {
    "localeDetector": "",
    "switchLocalePathLinkSSR": false,
    "autoImportTranslationFunctions": false
  },
  "bundle": {
    "compositionOnly": true,
    "runtimeOnly": false,
    "fullInstall": true,
    "dropMessageCompiler": false
  },
  "compilation": {
    "jit": true,
    "strictMessage": true,
    "escapeHtml": false
  },
  "customBlocks": {
    "defaultSFCLang": "json",
    "globalSFCScope": false
  },
  "vueI18n": "",
  "locales": [
    {
      "code": "en",
      "name": "English",
      "files": [
        "/Users/svenjaraetzsch/Documents/FLIP_FLOPS_FILMS/WEBDEV/Main_Files/bayone_nuxtjs/locales/en.json"
      ]
    },
    {
      "code": "de",
      "name": "Deutsch",
      "files": [
        "/Users/svenjaraetzsch/Documents/FLIP_FLOPS_FILMS/WEBDEV/Main_Files/bayone_nuxtjs/locales/de.json"
      ]
    },
    {
      "code": "es",
      "name": "Español",
      "files": [
        "/Users/svenjaraetzsch/Documents/FLIP_FLOPS_FILMS/WEBDEV/Main_Files/bayone_nuxtjs/locales/es.json"
      ]
    }
  ],
  "defaultLocale": "en",
  "defaultDirection": "ltr",
  "routesNameSeparator": "___",
  "trailingSlash": false,
  "defaultLocaleRouteNameSuffix": "default",
  "strategy": "prefix_except_default",
  "lazy": false,
  "langDir": "locales/",
  "detectBrowserLanguage": {
    "alwaysRedirect": false,
    "cookieCrossOrigin": false,
    "cookieDomain": null,
    "cookieKey": "i18n_redirected",
    "cookieSecure": false,
    "fallbackLocale": "",
    "redirectOn": "root",
    "useCookie": true
  },
  "differentDomains": false,
  "baseUrl": "",
  "dynamicRouteParams": false,
  "customRoutes": "page",
  "pages": {},
  "skipSettingLocaleOnNavigate": false,
  "types": "composition",
  "debug": false,
  "parallelPlugin": false,
  "multiDomainLocales": false,
  "i18nModules": []
}

export const normalizedLocales = [
  {
    "code": "en",
    "name": "English",
    "files": [
      {
        "path": "/Users/svenjaraetzsch/Documents/FLIP_FLOPS_FILMS/WEBDEV/Main_Files/bayone_nuxtjs/locales/en.json"
      }
    ]
  },
  {
    "code": "de",
    "name": "Deutsch",
    "files": [
      {
        "path": "/Users/svenjaraetzsch/Documents/FLIP_FLOPS_FILMS/WEBDEV/Main_Files/bayone_nuxtjs/locales/de.json"
      }
    ]
  },
  {
    "code": "es",
    "name": "Español",
    "files": [
      {
        "path": "/Users/svenjaraetzsch/Documents/FLIP_FLOPS_FILMS/WEBDEV/Main_Files/bayone_nuxtjs/locales/es.json"
      }
    ]
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false

export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18n"
export const DEFAULT_COOKIE_KEY = "i18n_redirected"
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp"
