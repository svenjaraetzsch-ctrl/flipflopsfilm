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
  { key: 'towns', filmed: ['Fast & Furious 6 (2013) · Tenerife', 'Jason Bourne (2016) · Tenerife', 'Allied (2016) · Gran Canaria'] }
]

// Every photo (by its key in photos.js) and the themes it shows.
const tags = {
  // El Hierro
  coast: ['coast', 'volcanic'],
  cave: ['coast', 'forest'],
  dragonTreeVillage: ['towns'],
  // Fuerteventura
  cofete: ['coast', 'mountains'],
  dirtTrack: ['desert', 'roads'],
  ridge: ['desert', 'mountains'],
  // Gran Canaria
  serpentine: ['roads', 'mountains'],
  roqueNublo: ['mountains', 'volcanic'],
  villageStreet: ['towns'],
  // La Gomera
  agando: ['volcanic', 'mountains', 'roads'],
  roques: ['mountains', 'volcanic'],
  treeRoad: ['roads', 'forest'],
  // La Palma
  caldera: ['mountains', 'forest'],
  waterfall: ['forest'],
  fernForest: ['forest'],
  // Lanzarote
  famara: ['coast', 'roads'],
  laGeria: ['volcanic', 'desert'],
  // Tenerife
  seaOfClouds: ['forest', 'mountains'],
  teideCaldera: ['volcanic', 'desert'],
  valleyVillage: ['towns', 'mountains']
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
