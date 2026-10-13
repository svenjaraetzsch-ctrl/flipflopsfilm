// The themes of the Locations Gallery: the same photos sorted by the kind of
// place a production looks for rather than by island, to show how much the
// islands offer between them. Each theme's name and short description live in
// the locale files under locations.themes.<key>; "filmed" holds checked
// productions with the island they were shot on.
import { photos, islands } from '@/data/PhotoConcepts/photos'

const definitions = [
  { key: 'volcanic', filmed: ['One Million Years B.C. (1966) · Lanzarote', 'Wrath of the Titans (2012) · Tenerife'] },
  { key: 'desert', filmed: ['Exodus: Gods and Kings (2014) · Fuerteventura', 'Allied (2016) · Fuerteventura', 'Solo: A Star Wars Story (2018) · Fuerteventura'] },
  { key: 'forest', filmed: [] },
  { key: 'mountains', filmed: [] },
  { key: 'coast', filmed: ['Moby Dick (1956) · Gran Canaria', 'In the Heart of the Sea (2015) · La Gomera, Lanzarote'] },
  { key: 'roads', filmed: [] },
  { key: 'towns', filmed: ['Fast & Furious 6 (2013) · Tenerife', 'Jason Bourne (2016) · Tenerife', 'Allied (2016) · Gran Canaria'] },
  { key: 'abandoned', filmed: [] }
]

// Every photo (by its key in photos.js) and the themes it shows.
const tags = {
  // El Hierro
  coast: ['coast', 'volcanic'],
  arch: ['coast', 'volcanic'],
  cave: ['forest', 'coast'],
  redCliffs: ['coast'],
  juniperRest: ['forest', 'mountains'],
  dragonTreeVillage: ['towns'],
  volcanoCone: ['volcanic'],
  lavaCoastRoad: ['roads', 'volcanic'],
  surfRocks: ['coast', 'volcanic'],
  rockPinnacles: ['volcanic', 'coast'],
  hermitage: ['towns'],
  shrubSlope: ['mountains'],
  mistyPasture: ['mountains', 'forest'],
  // Fuerteventura
  cofete: ['coast', 'mountains'],
  reflection: ['coast'],
  desertRoad: ['roads', 'desert'],
  ridge: ['mountains', 'desert'],
  sunsetWalk: ['coast'],
  duskCamp: ['coast', 'desert'],
  desertPlain: ['desert'],
  nightPeaks: ['mountains'],
  sunsetHills: ['mountains'],
  pinkSurf: ['coast'],
  eveningBeach: ['coast'],
  footprints: ['coast'],
  plainBw: ['desert'],
  hutsBw: ['abandoned', 'desert'],
  silosBw: ['abandoned'],
  barbedWireBw: ['abandoned', 'desert'],
  stormBeach: ['coast'],
  goldenPeak: ['coast'],
  loneMountain: ['desert', 'mountains'],
  dirtTrack: ['roads', 'desert'],
  // Gran Canaria
  serpentine: ['roads', 'mountains'],
  canyon: ['mountains'],
  roqueNublo: ['mountains'],
  seaStacks: ['coast'],
  cliffCoast: ['coast'],
  roofTent: ['roads', 'mountains'],
  villageStreet: ['towns'],
  hairpins: ['roads', 'mountains'],
  valleyLight: ['mountains', 'towns'],
  mistyRoad: ['roads', 'forest'],
  redHouse: ['mountains', 'towns'],
  lighthouse: ['coast'],
  windFarm: ['abandoned'],
  headland: ['coast'],
  beachStreet: ['towns', 'coast'],
  harbourVillage: ['towns', 'coast'],
  sandstoneCave: ['mountains'],
  turquoiseCliffs: ['coast'],
  rockWindow: ['mountains'],
  colonialHallway: ['towns'],
  patio: ['towns'],
  cliffPeninsula: ['coast'],
  reservoirValley: ['forest', 'mountains'],
  forestReservoir: ['forest'],
  surfTown: ['coast', 'towns'],
  lakeReflection: ['forest'],
  seaLevel: ['coast'],
  cityStreet: ['towns'],
  redHills: ['roads', 'desert'],
  redEarth: ['desert'],
  greenMeadow: ['mountains'],
  pineCliff: ['forest', 'mountains'],
  jungleWaterfall: ['forest'],
  cloudyShore: ['coast', 'towns'],
  goldenTrack: ['roads'],
  greenValley: ['mountains'],
  duskBeach: ['coast'],
  valleyPalm: ['desert'],
  // La Gomera
  agando: ['mountains', 'roads'],
  laurelForest: ['forest'],
  treeRoad: ['roads', 'forest'],
  ferry: ['coast'],
  mirador: ['coast'],
  roques: ['mountains', 'volcanic'],
  forestBridge: ['forest'],
  forestStream: ['forest'],
  mossyCreek: ['forest'],
  glassViewpoint: ['coast'],
  seaPool: ['forest', 'coast'],
  breakingWaves: ['coast'],
  greenRidge: ['mountains'],
  // La Palma
  caldera: ['mountains', 'forest'],
  meadow: ['mountains'],
  waterfall: ['forest'],
  fernWalk: ['forest'],
  fernForest: ['forest'],
  sunlitFalls: ['forest'],
  forestGorge: ['forest'],
  waterfallHiker: ['forest'],
  gorgeFalls: ['forest'],
  riverbed: ['mountains', 'forest'],
  flowerMeadow: ['mountains'],
  pineRidges: ['forest', 'mountains'],
  pineMeadow: ['mountains', 'forest'],
  // Lanzarote
  famara: ['roads', 'coast'],
  laGeria: ['mountains', 'volcanic'],
  palm: ['volcanic', 'desert'],
  sunsetShore: ['coast'],
  lavaField: ['volcanic'],
  volcano: ['volcanic'],
  stoneHut: ['mountains', 'volcanic'],
  mistyBeach: ['coast'],
  eveningWave: ['coast'],
  craterPlain: ['volcanic'],
  craterRim: ['volcanic'],
  erodedRocks: ['desert', 'volcanic'],
  // Tenerife
  seaOfClouds: ['forest', 'mountains'],
  sunsetPeaks: ['mountains'],
  teideCaldera: ['volcanic', 'desert'],
  pineRoad: ['roads', 'forest'],
  valleyVillage: ['towns', 'mountains'],
  abandonedChurch: ['abandoned'],
  snowyTeide: ['volcanic', 'mountains'],
  churchDusk: ['abandoned'],
  rockSpire: ['mountains'],
  calderaBw: ['volcanic'],
  ghostVillageBw: ['abandoned'],
  rockPool: ['forest', 'coast'],
  tunnelBw: ['roads', 'towns'],
  resortTown: ['towns'],
  skatepark: ['towns']
}

// Photos of each theme in the order of `islands` (west to east), so a theme's
// photos read as a journey across the archipelago, and the islands it is
// found on.
const ordered = islands.flatMap((island) => island.photos)
const keyOf = new Map(Object.entries(photos).map(([key, photo]) => [photo, key]))

export const themes = definitions.map(({ key, filmed }) => {
  const themePhotos = ordered.filter((photo) => tags[keyOf.get(photo)]?.includes(key))
  return {
    key,
    filmed,
    photos: themePhotos,
    islands: islands.map((island) => island.name).filter((name) => themePhotos.some((photo) => photo.island === name))
  }
})
