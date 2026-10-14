// Proposal 1 for the Services overview: the Flip Flops butterfly is the menu.
// Its four wings are the four services. Names and descriptions come from
// `services_items` in the locale files; only wording without a key is here.

// The line above the butterfly, in the brand voice
export const intro = {
  en: 'Four wings, one team. Everything an international production needs to shoot in Spain: relaxed like the islands, precise like a call sheet.',
  de: 'Vier Flügel, ein Team. Alles, was eine internationale Produktion für den Dreh in Spanien braucht: entspannt wie die Inseln, präzise wie eine Dispo.',
  es: 'Cuatro alas, un solo equipo. Todo lo que una producción internacional necesita para rodar en España: la calma de las islas y la precisión de una orden de rodaje.'
}

export const listLabel = {
  en: 'Our services',
  de: 'Unsere Leistungen',
  es: 'Nuestros servicios'
}

// Production Services has no page of its own: its wing leads down to its text
export const onThisPage = {
  en: 'further down this page',
  de: 'weiter unten auf dieser Seite',
  es: 'más abajo en esta página'
}

// One wing per service, in the order of `services_items`: the upper wings
// (the two clapperboards) first, then the lower ones. Production Services is
// the first clapperboard: every shoot starts and ends with the slate. `y` is
// the height of the wing's middle in the logo's units, measured from the
// centre of the ring (34.4 across): the service's name sits beside it.
export const wings = [
  { wing: 'ul', side: 'left', y: -6, target: 'production-services' },
  { wing: 'ur', side: 'right', y: -6, link: '/services/locations' },
  { wing: 'll', side: 'left', y: 9, link: '/services/tax-incentives' },
  { wing: 'lr', side: 'right', y: 9, link: '/services/crew-operations' }
]
