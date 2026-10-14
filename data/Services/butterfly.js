// Proposal 1 for the Services overview: the Flip Flops butterfly is the menu.
// Its four wings are the four services. Names and descriptions come from
// `services_items` in the locale files; only wording without a key is here.

// The page's statement, set as a page title
export const statement = {
  en: 'Four wings, one team.',
  de: 'Vier Flügel, ein Team.',
  es: 'Cuatro alas, un solo equipo.'
}

// Column headings of the list, as on Home (where they are in English only)
export const columns = {
  service: { en: 'Service', de: 'Leistung', es: 'Servicio' },
  description: { en: 'Description', de: 'Beschreibung', es: 'Descripción' }
}

// Production Services has no page of its own: its row leads down to its text
export const onThisPage = {
  en: 'further down this page',
  de: 'weiter unten auf dieser Seite',
  es: 'más abajo en esta página'
}

// One wing per service, in the order of `services_items`: the upper wings
// (the two clapperboards) first, then the lower ones. Production Services is
// the first clapperboard: every shoot starts and ends with the slate.
export const wings = [
  { wing: 'ul', target: 'production-services' },
  { wing: 'ur', link: '/services/locations' },
  { wing: 'll', link: '/services/tax-incentives' },
  { wing: 'lr', link: '/services/crew-operations' }
]
