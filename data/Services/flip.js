import { photos } from '@/data/PhotoConcepts/photos'

// Services overview, proposal 3 "Flip": four cards that turn over like a
// clapperboard. Titles and one-liners come from `services_items` in the
// locale files; everything else the cards say lives here, per language.

export const statement = {
  en: ['Flip flops on.', 'Call sheet ready.'],
  de: ['Flip-Flops an.', 'Dispo steht.'],
  es: ['Chanclas puestas.', 'Claqueta lista.']
}

export const intro = {
  en: 'Laid-back by nature, meticulous on set. Four services take your production from the first scout to the final wrap. Flip a card to read its slate.',
  de: 'Von Natur aus entspannt, am Set präzise. Vier Leistungen begleiten Ihre Produktion vom ersten Scouting bis zum Drehschluss. Drehen Sie eine Karte um: Die Klappe verrät den Rest.',
  es: 'Relajados por naturaleza, meticulosos en el rodaje. Cuatro servicios acompañan su producción desde la primera localización hasta el último día de rodaje. Gire una tarjeta y lea su claqueta.'
}

// The fields printed on the back of each card, as on a real slate.
export const slate = {
  prod: { en: 'Prod.', de: 'Prod.', es: 'Prod.' },
  scene: { en: 'Scene', de: 'Szene', es: 'Escena' },
  take: { en: 'Take', de: 'Take', es: 'Toma' },
  company: 'Flip Flops Film'
}

// Where long compound words in the card titles may break, so a narrow card
// splits them at a sensible joint (Produktions-dienst-leistungen) rather
// than wherever the browser's hyphenation lands.
export const breaks = {
  Produktionsdienstleistungen: 'Produktions\u00addienst\u00adleistungen',
  Produktionsleistungen: 'Produktions\u00adleistungen',
  Steuervorteile: 'Steuer\u00advorteile',
  Localizaciones: 'Locali\u00adzaciones'
}

// Accessible hint read with each card button.
export const flipHint = {
  en: 'Turn the card over for details',
  de: 'Karte umdrehen für Details',
  es: 'Gire la tarjeta para ver los detalles'
}

// In the order of `services_items`: Production Services, Locations,
// Tax Incentives, Crew & Operations. `pos` is the photo's focal point in the
// tall card frame.
export const cards = [
  {
    photo: photos.serpentine,
    pos: '58% 50%',
    to: '#production-services',
    link: {
      en: 'Read on below',
      de: 'Mehr dazu unten',
      es: 'Siga leyendo abajo'
    },
    points: {
      en: ['Permits and local regulations', 'Reliable suppliers and providers', 'Every logistical detail covered'],
      de: ['Genehmigungen und lokale Vorschriften', 'Verlässliche Lieferanten und Dienstleister', 'Jedes logistische Detail im Griff'],
      es: ['Permisos y normativa local', 'Proveedores de confianza', 'Cada detalle logístico, cubierto']
    }
  },
  {
    photo: photos.roqueNublo,
    pos: '50% 50%',
    to: '/services/locations',
    link: {
      en: 'See the locations',
      de: 'Zu den Locations',
      es: 'Ver localizaciones'
    },
    points: {
      en: ['Lava fields to laurel forests', 'Many looks, few company moves', 'A filming season all year round'],
      de: ['Von Lavafeldern bis zum Lorbeerwald', 'Viele Looks, wenige Motivwechsel', 'Drehsaison das ganze Jahr'],
      es: ['De campos de lava a la laurisilva', 'Mucha variedad, pocos desplazamientos', 'Temporada de rodaje todo el año']
    }
  },
  {
    photo: photos.ridge,
    pos: '42% 50%',
    to: '/services/tax-incentives',
    link: {
      en: 'See the incentives',
      de: 'Zu den Steuervorteilen',
      es: 'Ver incentivos'
    },
    points: {
      en: ['Up to 54% rebate on the Canary Islands', 'Up to 30% on mainland Spain', 'Advice on eligibility and strategy'],
      de: ['Bis zu 54% Rückerstattung auf den Kanaren', 'Bis zu 30% auf dem spanischen Festland', 'Beratung zu Förderfähigkeit und Strategie'],
      es: ['Hasta un 54% de reembolso en Canarias', 'Hasta un 30% en la Península', 'Asesoría sobre requisitos y estrategia']
    }
  },
  {
    photo: photos.dirtTrack,
    pos: '56% 50%',
    to: '/services/crew-operations',
    link: {
      en: 'See crew & operations',
      de: 'Zu Crew & Produktion',
      es: 'Equipo y producción'
    },
    points: {
      en: ['Experienced local crews', 'Gear, transport and accommodation', 'From commercials to features'],
      de: ['Erfahrene lokale Crews', 'Equipment, Transport und Unterkunft', 'Vom Werbespot bis zum Spielfilm'],
      es: ['Equipos locales con experiencia', 'Material, transporte y alojamiento', 'De la publicidad al largometraje']
    }
  }
]
