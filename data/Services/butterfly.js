// Proposal 1 for the Services overview: the Flip Flops butterfly is the menu.
// Its four wings are the four services. Titles and one-line descriptions come
// from `services_items` in the locale files; only the extra wording is here.

// The line above the butterfly, in the brand voice
export const intro = {
  en: {
    lead: 'Four wings, one team.',
    rest: 'Everything an international production needs to shoot in Spain: relaxed like the islands, precise like a call sheet.'
  },
  de: {
    lead: 'Vier Flügel, ein Team.',
    rest: 'Alles, was eine internationale Produktion für den Dreh in Spanien braucht: entspannt wie die Inseln, präzise wie eine Dispo.'
  },
  es: {
    lead: 'Cuatro alas, un solo equipo.',
    rest: 'Todo lo que una producción internacional necesita para rodar en España: la calma de las islas y la precisión de una orden de rodaje.'
  }
}

// Production Services has no page of its own: its wing leads down to its text
export const onThisPage = {
  en: 'further down this page',
  de: 'weiter unten auf dieser Seite',
  es: 'más abajo en esta página'
}

export const listLabel = {
  en: 'Our services',
  de: 'Unsere Leistungen',
  es: 'Nuestros servicios'
}

// One wing per service, in the order of `services_items`. Coordinates are in
// the logo's own units (the ring is 33.3 across), measured from the centre of
// the ring: `anchor` is the dot on the wing, `line` the height of the label's
// rule. The leader runs from the dot at 45° to that height, then out to the
// edge of the page.
export const wings = [
  // The first clapperboard wing: every shoot starts and ends with the slate,
  // from prep to wrap. Scrolls down to the Production Services text.
  { wing: 'ul', side: 'left', target: 'production-services', anchor: [-9, -5.8], line: -12.4 },
  { wing: 'ur', side: 'right', link: '/services/locations', anchor: [9, -5.8], line: -12.4 },
  { wing: 'll', side: 'left', link: '/services/tax-incentives', anchor: [-4.9, 8], line: 13.8 },
  { wing: 'lr', side: 'right', link: '/services/crew-operations', anchor: [4.9, 8], line: 13.8 }
]
