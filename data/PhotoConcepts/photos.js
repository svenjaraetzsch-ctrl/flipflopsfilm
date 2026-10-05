// Photography by Daniel Bonhoff (licensed by Flip Flops Film): a first selection
// of 21, three per island, from the FFF_CI_MOODS folders. Each image exists at
// 1800px on the long edge and as a 900px "-md".
const img = (island, slug, w, h, alt) => {
  const dir = island.toLowerCase().replace(/ /g, '-')
  const base = `/assets/imgs/bonhoff/${dir}/${slug}`
  return {
    island,
    src: `${base}.jpg`,
    md: `${base}-md.jpg`,
    srcset: `${base}-md.jpg ${Math.round(w / 2)}w, ${base}.jpg ${w}w`,
    w,
    h,
    alt
  }
}

export const photos = {
  coast: img('El Hierro', 'coast', 1800, 1199, 'Aerial view of a long volcanic coastline under a band of cloud'),
  arch: img('El Hierro', 'arch', 1800, 1200, 'Lava rock arch with waves breaking through it'),
  cave: img('El Hierro', 'cave', 1199, 1800, 'Sunlit rock pool inside a sea cave'),
  redCliffs: img('El Hierro', 'red-cliffs', 1200, 1800, 'Red cliffs dropping to a rocky shore and the sea'),

  cofete: img('Fuerteventura', 'cofete', 1800, 1200, 'Long empty beach below a mountain ridge, waves rolling in'),
  reflection: img('Fuerteventura', 'reflection', 1800, 1206, 'Red mountains mirrored on wet sand at sunset'),
  desertRoad: img('Fuerteventura', 'desert-road', 1800, 1200, 'Woman sitting on a car bonnet on a straight desert road'),

  serpentine: img('Gran Canaria', 'serpentine', 1800, 1199, 'Aerial view of a hairpin road on a dry mountainside'),
  canyon: img('Gran Canaria', 'canyon', 1800, 1200, 'Walls of a narrow canyon with red and ochre stripes'),
  roqueNublo: img('Gran Canaria', 'roque-nublo', 1214, 1800, 'Rock pinnacle on a mountain ridge at golden hour'),

  agando: img('La Gomera', 'agando', 1800, 1200, 'Volcanic rock spire above a winding mountain road'),
  laurelForest: img('La Gomera', 'laurel-forest', 1800, 1200, 'Dense green laurel forest with ferns'),
  treeRoad: img('La Gomera', 'tree-road', 1800, 1207, 'Road running through a tunnel of trees'),

  caldera: img('La Palma', 'caldera', 1800, 1200, 'Deep forested gorge below jagged peaks'),
  meadow: img('La Palma', 'meadow', 1800, 1200, 'Woman in a white dress in a meadow of wildflowers'),
  waterfall: img('La Palma', 'waterfall', 1200, 1800, 'Waterfall falling into a dark rock gorge'),

  famara: img('Lanzarote', 'famara', 1800, 1199, 'Road along the foot of high cliffs above a long beach'),
  laGeria: img('Lanzarote', 'la-geria', 1800, 1199, 'Vines in black volcanic pits behind low stone walls'),
  palm: img('Lanzarote', 'palm', 1800, 1800, 'A single palm tree on a wide volcanic plain'),

  seaOfClouds: img('Tenerife', 'sea-of-clouds', 1800, 1208, 'Pine-covered ridges rising out of a sea of clouds'),
  sunsetPeaks: img('Tenerife', 'sunset-peaks', 1800, 1206, 'Two peaks and a village above the clouds at dusk'),
  pineRoad: img('Tenerife', 'pine-road', 1800, 1208, 'Empty road curving through a tall pine forest')
}

// Shared by the services hover on home and concept 04, in the order of
// data/CreativeAgency/awards.json.
export const serviceImages = [photos.desertRoad, photos.agando, photos.serpentine, photos.pineRoad]
