// What a production wants to know about each island, for the Locations
// Gallery. The words (what an island doubles for, its landscapes) live in the
// locale files under locations.islands.<key>; this file holds what needs no
// translation. "Filmed here" lists productions checked against press and
// film-commission sources (October 2026). Areas and summits are rounded.
export const islandFacts = {
  'El Hierro': {
    key: 'elHierro',
    filmed: ['Hierro (2019–2021)'],
    airport: 'VDE',
    summit: 'Malpaso',
    height: 1501,
    area: 269
  },
  'La Palma': {
    key: 'laPalma',
    filmed: ['La Palma (2024)'],
    airport: 'SPC',
    summit: 'Roque de los Muchachos',
    height: 2426,
    area: 708
  },
  'La Gomera': {
    key: 'laGomera',
    filmed: ['In the Heart of the Sea (2015)', 'The Fog and the Maiden (2017)', 'The Whistlers (2019)'],
    airport: 'GMZ',
    summit: 'Garajonay',
    height: 1487,
    area: 370
  },
  Tenerife: {
    key: 'tenerife',
    filmed: ['Wrath of the Titans (2012)', 'Fast & Furious 6 (2013)', 'Jason Bourne (2016)'],
    airport: 'TFS · TFN',
    summit: 'Teide',
    height: 3715,
    area: 2034
  },
  'Gran Canaria': {
    key: 'granCanaria',
    filmed: ['Moby Dick (1956)', 'Allied (2016)'],
    airport: 'LPA',
    summit: 'Pico de las Nieves',
    height: 1949,
    area: 1560
  },
  Fuerteventura: {
    key: 'fuerteventura',
    filmed: ['Exodus: Gods and Kings (2014)', 'Allied (2016)', 'Solo: A Star Wars Story (2018)', 'Eternals (2021)'],
    airport: 'FUE',
    summit: 'Pico de la Zarza',
    height: 807,
    area: 1660
  },
  Lanzarote: {
    key: 'lanzarote',
    filmed: ['One Million Years B.C. (1966)', 'Broken Embraces (2009)', 'In the Heart of the Sea (2015)'],
    airport: 'ACE',
    summit: 'Peñas del Chache',
    height: 671,
    area: 846
  }
}

// For the whole archipelago, shown on the overview: the label and value keys
// under locations.gallery. The rebate is the figure on the Tax Incentives page.
export const archipelagoFacts = [
  { label: 'tax_label', value: 'tax_value' },
  { label: 'season_label', value: 'season_value' }
]
