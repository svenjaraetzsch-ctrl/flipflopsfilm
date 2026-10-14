// Photography by Daniel Bonhoff (licensed by Flip Flops Film). The licence
// allows at most 20 photos on the whole site, so these 20 are all there is:
// three per island (two for Lanzarote), the first of each island leading in
// the Locations Gallery, and every other page draws from the same set. Each
// image exists at 1800px on the long edge, as a 900px "-md" and as a 480px
// "-sm" for thumbnails.
const img = (island, slug, w, h, alt) => {
  const dir = island.toLowerCase().replace(/ /g, '-')
  const base = `/assets/imgs/bonhoff/${dir}/${slug}`
  return {
    island,
    src: `${base}.jpg`,
    md: `${base}-md.jpg`,
    sm: `${base}-sm.jpg`,
    srcset: `${base}-md.jpg ${Math.round(w / 2)}w, ${base}.jpg ${w}w`,
    w,
    h,
    alt
  }
}

export const photos = {
  coast: img('El Hierro', 'coast', 1800, 1199, 'Aerial view of a long volcanic coastline under a band of cloud'),
  cave: img('El Hierro', 'cave', 1199, 1800, 'Sunlit rock pool inside a sea cave'),
  dragonTreeVillage: img('El Hierro', 'dragon-tree-village', 1800, 1200, 'A dragon tree above the white houses of a village by the sea'),

  cofete: img('Fuerteventura', 'cofete', 1800, 1200, 'Long empty beach below a mountain ridge, waves rolling in'),
  dirtTrack: img('Fuerteventura', 'dirt-track', 1800, 1187, 'A white off-road car on a dirt track through bare hills'),
  ridge: img('Fuerteventura', 'ridge', 1800, 1206, 'Mountain ridge in warm side light under a band of cloud'),

  serpentine: img('Gran Canaria', 'serpentine', 1800, 1199, 'Aerial view of a hairpin road on a dry mountainside'),
  roqueNublo: img('Gran Canaria', 'roque-nublo', 1214, 1800, 'Rock pinnacle on a mountain ridge at golden hour'),
  villageStreet: img('Gran Canaria', 'village-street', 1800, 1200, 'A quiet village street with old houses'),

  agando: img('La Gomera', 'agando', 1800, 1200, 'Volcanic rock spire above a winding mountain road'),
  roques: img('La Gomera', 'roques', 1800, 1200, 'Rock spires above green slopes and yellow broom'),
  treeRoad: img('La Gomera', 'tree-road', 1800, 1207, 'Road running through a tunnel of trees'),

  caldera: img('La Palma', 'caldera', 1800, 1200, 'Deep forested gorge below jagged peaks'),
  waterfall: img('La Palma', 'waterfall', 1200, 1800, 'Waterfall falling into a dark rock gorge'),
  fernForest: img('La Palma', 'fern-forest', 1200, 1800, 'Tall trees above a carpet of ferns'),

  famara: img('Lanzarote', 'famara', 1800, 1199, 'Road along the foot of high cliffs above a long beach'),
  laGeria: img('Lanzarote', 'la-geria', 1800, 1199, 'Vines in black volcanic pits behind low stone walls'),

  seaOfClouds: img('Tenerife', 'sea-of-clouds', 1800, 1208, 'Pine-covered ridges rising out of a sea of clouds'),
  teideCaldera: img('Tenerife', 'teide-caldera', 1800, 1208, 'Wide volcanic plain below the rim of the Teide caldera'),
  valleyVillage: img('Tenerife', 'valley-village', 1800, 1207, 'A small village in a steep green valley')
}

// Behind the menu links, one calm photo per island.
export const menuPhotos = [
  photos.coast,
  photos.cofete,
  photos.roqueNublo,
  photos.agando,
  photos.caldera,
  photos.laGeria,
  photos.seaOfClouds
]

// The Locations gallery: every photo, grouped by island from west to east.
export const islands = [
  'El Hierro',
  'La Palma',
  'La Gomera',
  'Tenerife',
  'Gran Canaria',
  'Fuerteventura',
  'Lanzarote'
].map((name) => ({
  name,
  photos: Object.values(photos).filter((p) => p.island === name)
}))
