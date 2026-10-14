// Services overview, proposal 2 ("Prep to wrap"): the services told as the
// schedule of a shoot with Flip Flops Film, from the first call to wrap.
// Wording that is not in the locale files, per language; the service names,
// their one-liners and the Production Services text come from the locales
// (services_items, services.top_*), as do the facts reused from other pages.
import { photos } from '@/data/PhotoConcepts/photos'

export const opening = {
  title: {
    en: 'From prep to wrap',
    de: 'Von der Vorbereitung bis zur letzten Klappe',
    es: 'De la preparación a la última toma'
  },
  intro: {
    en: 'Relaxed by nature, precise by trade. One local team that stays with your production from the first call to the last slate, so you can keep your eyes on the film.',
    de: 'Von Natur aus gelassen, im Handwerk präzise. Ein Team vor Ort, das Ihre Produktion vom ersten Anruf bis zum Drehschluss begleitet, damit Sie sich ganz auf Ihren Film konzentrieren können.',
    es: 'Relajados por naturaleza, precisos por oficio. Un equipo local que acompaña su producción desde la primera llamada hasta el fin de rodaje, para que usted pueda centrarse en la película.'
  }
}

// The facts at the head of the page, as on a call sheet. `key` takes label or
// value from the locale files; the rest is written here.
export const callSheet = {
  label: { en: 'Call sheet', de: 'Dispo', es: 'Orden de rodaje' },
  facts: [
    {
      label: { en: 'Base', de: 'Standorte', es: 'Sedes' },
      valueKey: 'footer.offices'
    },
    { labelKey: 'locations.gallery.season_label', valueKey: 'locations.gallery.season_value' },
    { labelKey: 'locations.gallery.tax_label', valueKey: 'locations.gallery.tax_value' },
    {
      label: { en: 'Footwear', de: 'Schuhwerk', es: 'Calzado' },
      value: {
        en: 'Flip flops, after wrap',
        de: 'Flip-Flops, nach Drehschluss',
        es: 'Chanclas, tras el rodaje'
      }
    }
  ]
}

// The schedule: four phases, each with the service that matters most then.
// `item` is the service's index in services_items (title and one-liner);
// the last station, wrap, has its own title and line instead.
export const schedule = {
  label: { en: 'Production schedule', de: 'Drehplan', es: 'Plan de producción' },
  stations: [
    {
      key: 'tax',
      item: 2,
      to: '/services/tax-incentives',
      photo: photos.seaOfClouds,
      phase: { en: 'Development', de: 'Entwicklung', es: 'Desarrollo' },
      when: { en: 'Before day one', de: 'Vor Drehbeginn', es: 'Antes del primer día' },
      points: [
        {
          en: 'Up to 54% back in the Canary Islands, up to 30% on the mainland: we check what your project qualifies for.',
          de: 'Bis zu 54% zurück auf den Kanaren, bis zu 30% auf dem Festland: Wir prüfen, was Ihrem Projekt zusteht.',
          es: 'Hasta un 54% de reembolso en Canarias y hasta un 30% en la Península: comprobamos a qué puede optar su proyecto.'
        },
        {
          en: 'We weigh up the requirements early, from the minimum local spend to the rebate cap.',
          de: 'Wir klären die Voraussetzungen früh, von den Mindestausgaben vor Ort bis zum Höchstbetrag der Erstattung.',
          es: 'Evaluamos los requisitos desde el principio, del gasto mínimo en España al límite del reembolso.'
        },
        {
          en: 'Together we shape a production plan that makes the most of the incentives.',
          de: 'Gemeinsam entwickeln wir einen Produktionsplan, der das Fördersystem optimal nutzt.',
          es: 'Juntos diseñamos un plan de producción que aprovecha al máximo los incentivos.'
        }
      ],
      link: {
        en: 'More on tax incentives',
        de: 'Mehr zu den Steuervorteilen',
        es: 'Más sobre incentivos fiscales'
      }
    },
    {
      key: 'locations',
      item: 1,
      to: '/services/locations',
      photo: photos.dirtTrack,
      phase: { en: 'Prep', de: 'Vorbereitung', es: 'Preparación' },
      when: { en: 'Scouting & recce', de: 'Motivsuche & Besichtigung', es: 'Scouting y visitas técnicas' },
      points: [
        {
          en: 'Scouting on seven islands and across Spain, guided by your script and your visual references.',
          de: 'Motivsuche auf sieben Inseln und in ganz Spanien, ausgerichtet auf Ihr Drehbuch und Ihre Bildideen.',
          es: 'Localización en siete islas y en toda España, a partir de su guion y sus referencias visuales.'
        },
        {
          en: 'Recces with your director and DoP; permits and location agreements in place before day one.',
          de: 'Motivbesichtigungen mit Regie und Kamera; Drehgenehmigungen und Motivverträge stehen vor dem ersten Drehtag.',
          es: 'Visitas técnicas con dirección y dirección de fotografía; permisos y contratos de localización cerrados antes del primer día.'
        },
        {
          en: 'Fewer company moves: volcanic plains, forests, desert roads and old villages, often a few hours apart.',
          de: 'Weniger Motivwechsel: Vulkanebenen, Wälder, Wüstenstraßen und alte Dörfer, oft nur wenige Stunden voneinander entfernt.',
          es: 'Menos traslados de unidad: llanuras volcánicas, bosques, carreteras desérticas y pueblos, a menudo a pocas horas.'
        }
      ],
      link: {
        en: 'More on locations',
        de: 'Mehr zu den Locations',
        es: 'Más sobre localizaciones'
      }
    },
    {
      key: 'crew',
      item: 3,
      to: '/services/crew-operations',
      photo: photos.teideCaldera,
      phase: { en: 'Shoot', de: 'Dreh', es: 'Rodaje' },
      when: { en: 'On set, every day', de: 'Jeden Drehtag am Set', es: 'En el set, cada día' },
      points: [
        {
          en: 'Experienced local crews, from production managers to drivers, at home on international sets.',
          de: 'Erfahrene Crews vor Ort, von der Produktionsleitung bis zum Fahrdienst, vertraut mit internationalen Drehs.',
          es: 'Equipos locales con experiencia, de jefatura de producción a conductores, habituados a rodajes internacionales.'
        },
        {
          en: 'Equipment, transport, travel and accommodation, coordinated end to end.',
          de: 'Technik, Transport, Reisen und Unterkünfte, durchgehend koordiniert.',
          es: 'Material, transporte, viajes y alojamiento, coordinados de principio a fin.'
        },
        {
          en: 'Day-to-day production on set, as one team with yours.',
          de: 'Die tägliche Drehorganisation am Set, als ein Team mit Ihrer Crew.',
          es: 'La operativa diaria del rodaje, como un solo equipo con el suyo.'
        }
      ],
      link: {
        en: 'More on crew & operations',
        de: 'Mehr zu Crew & Produktion',
        es: 'Más sobre equipo & producción'
      }
    },
    {
      key: 'wrap',
      photo: photos.roqueNublo,
      phase: { en: 'Wrap', de: 'Drehschluss', es: 'Cierre' },
      when: { en: 'Wrap-out & final costs', de: 'Abbau & Abrechnung', es: 'Desmontaje y liquidación' },
      title: { en: 'That’s a wrap', de: 'Im Kasten', es: 'Fin de rodaje' },
      line: {
        en: 'The last slate is not the end of our job.',
        de: 'Mit der letzten Klappe ist unsere Arbeit nicht vorbei.',
        es: 'La última claqueta no es el final de nuestro trabajo.'
      },
      points: [
        {
          en: 'Wrap-out: equipment returned, every location handed back as we found it.',
          de: 'Abbau: Technik zurückgegeben, jedes Motiv so übergeben, wie wir es vorgefunden haben.',
          es: 'Desmontaje: material devuelto y cada localización entregada tal como la encontramos.'
        },
        {
          en: 'The final cost report and the paperwork your tax rebate depends on.',
          de: 'Die Endabrechnung und die Unterlagen, von denen Ihre Steuerrückerstattung abhängt.',
          es: 'La liquidación final de costes y la documentación de la que depende su reembolso.'
        },
        {
          en: 'And then, at last: flip flops.',
          de: 'Und dann, endlich: Flip-Flops.',
          es: 'Y entonces, por fin: chanclas.'
        }
      ]
    }
  ]
}
