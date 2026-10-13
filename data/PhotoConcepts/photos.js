// Photography by Daniel Bonhoff (licensed by Flip Flops Film): all 124 photos
// of the FFF_CI_MOODS folders, island by island. The first ones of each island
// are the curated selection the rest of the site draws from; the Locations
// gallery shows them all. Each image exists at 1800px on the long edge, as a
// 900px "-md" and as a 480px "-sm" for thumbnails.
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
  arch: img('El Hierro', 'arch', 1800, 1200, 'Lava rock arch with waves breaking through it'),
  cave: img('El Hierro', 'cave', 1199, 1800, 'Sunlit rock pool inside a sea cave'),
  redCliffs: img('El Hierro', 'red-cliffs', 1200, 1800, 'Red cliffs dropping to a rocky shore and the sea'),
  juniperRest: img('El Hierro', 'juniper-rest', 1800, 1200, 'Two people resting under a wind-bent juniper by the sea'),
  dragonTreeVillage: img('El Hierro', 'dragon-tree-village', 1800, 1200, 'A dragon tree above the white houses of a village by the sea'),
  volcanoCone: img('El Hierro', 'volcano-cone', 1800, 1200, 'A red volcanic cone behind dry scrub, the sea beyond'),
  lavaCoastRoad: img('El Hierro', 'lava-coast-road', 1800, 1199, 'Aerial view of a road winding down dark lava slopes to the coast'),
  surfRocks: img('El Hierro', 'surf-rocks', 1800, 1199, 'Aerial view of surf breaking around black lava rocks in deep blue water'),
  rockPinnacles: img('El Hierro', 'rock-pinnacles', 1800, 1199, 'Rock pinnacles and red volcanic earth above the sea, seen from above'),
  hermitage: img('El Hierro', 'hermitage', 1800, 1200, 'A white hermitage with a bell gable among trees and green hills'),
  shrubSlope: img('El Hierro', 'shrub-slope', 1800, 1800, 'Green shrubs on a sandy, windswept hillside'),
  mistyPasture: img('El Hierro', 'misty-pasture', 1800, 1800, 'Wind-bent trees and a wooden fence on a pasture in the mist'),

  cofete: img('Fuerteventura', 'cofete', 1800, 1200, 'Long empty beach below a mountain ridge, waves rolling in'),
  reflection: img('Fuerteventura', 'reflection', 1800, 1206, 'Red mountains mirrored on wet sand at sunset'),
  desertRoad: img('Fuerteventura', 'desert-road', 1800, 1200, 'Woman sitting on a car bonnet on a straight desert road'),
  ridge: img('Fuerteventura', 'ridge', 1800, 1206, 'Mountain ridge in warm side light under a band of cloud'),
  sunsetWalk: img('Fuerteventura', 'sunset-walk', 1800, 1206, 'A person and a dog walking along the shore at sunset'),
  duskCamp: img('Fuerteventura', 'dusk-camp', 1800, 1200, 'A van parked on a dune beach at dusk, a lamp glowing beside it'),
  desertPlain: img('Fuerteventura', 'desert-plain', 1800, 1200, 'A flat stony desert plain under a pale evening sky'),
  nightPeaks: img('Fuerteventura', 'night-peaks', 1800, 1200, 'Jagged mountains under a deep blue night sky with stars'),
  sunsetHills: img('Fuerteventura', 'sunset-hills', 1800, 1206, 'The sun setting behind low hills'),
  pinkSurf: img('Fuerteventura', 'pink-surf', 1800, 1206, 'Waves rolling onto a wide beach under pink evening clouds'),
  eveningBeach: img('Fuerteventura', 'evening-beach', 1800, 1206, 'A long calm beach running towards a mountain at sunset'),
  footprints: img('Fuerteventura', 'footprints', 1800, 1206, 'Footprints in the sand leading towards the surf'),
  plainBw: img('Fuerteventura', 'plain-bw', 1800, 1206, 'Black and white: a flat plain with a lone signpost and distant hills'),
  hutsBw: img('Fuerteventura', 'huts-bw', 1800, 1206, 'Black and white: abandoned huts and containers in the desert'),
  silosBw: img('Fuerteventura', 'silos-bw', 1206, 1800, 'Black and white: silos behind a stone wall and barbed wire'),
  barbedWireBw: img('Fuerteventura', 'barbed-wire-bw', 1800, 1206, 'Black and white: coils of barbed wire across an empty plain'),
  stormBeach: img('Fuerteventura', 'storm-beach', 1800, 1800, 'A dark beach and red mountains under heavy evening clouds'),
  goldenPeak: img('Fuerteventura', 'golden-peak', 1800, 1800, 'A mountain peak backlit by a golden sunset over the beach'),
  loneMountain: img('Fuerteventura', 'lone-mountain', 1800, 1187, 'A lone mountain in warm light above a dry plain'),
  dirtTrack: img('Fuerteventura', 'dirt-track', 1800, 1187, 'A white off-road car on a dirt track through bare hills'),

  serpentine: img('Gran Canaria', 'serpentine', 1800, 1199, 'Aerial view of a hairpin road on a dry mountainside'),
  canyon: img('Gran Canaria', 'canyon', 1800, 1200, 'Walls of a narrow canyon with red and ochre stripes'),
  roqueNublo: img('Gran Canaria', 'roque-nublo', 1214, 1800, 'Rock pinnacle on a mountain ridge at golden hour'),
  seaStacks: img('Gran Canaria', 'sea-stacks', 1800, 1200, 'A woman on a cliff edge looking out at sea stacks'),
  cliffCoast: img('Gran Canaria', 'cliff-coast', 1800, 1200, 'Warm-lit cliffs along a calm coastline'),
  roofTent: img('Gran Canaria', 'roof-tent', 1800, 1206, 'An off-road car with a roof tent parked in the mountains'),
  villageStreet: img('Gran Canaria', 'village-street', 1800, 1200, 'A quiet village street with old houses'),
  hairpins: img('Gran Canaria', 'hairpins', 1800, 1199, 'Aerial view of hairpin bends on a mountain road'),
  valleyLight: img('Gran Canaria', 'valley-light', 1800, 1800, 'A deep mountain valley with a village far below in golden light'),
  mistyRoad: img('Gran Canaria', 'misty-road', 1800, 1204, 'A road disappearing into fog between tall pines'),
  redHouse: img('Gran Canaria', 'red-house', 1800, 1800, 'A red house among orchards below dry mountains'),
  lighthouse: img('Gran Canaria', 'lighthouse', 1800, 1206, 'A striped lighthouse silhouetted against a sunset sky'),
  windFarm: img('Gran Canaria', 'wind-farm', 1800, 1199, 'Wind turbines behind a white domed building'),
  headland: img('Gran Canaria', 'headland', 1800, 1207, 'A low headland with a lighthouse on a calm sea'),
  beachStreet: img('Gran Canaria', 'beach-street', 1800, 1800, 'A white house and a no-entry sign on a street leading to the beach'),
  harbourVillage: img('Gran Canaria', 'harbour-village', 1800, 1206, 'White houses on a cliff above a small harbour'),
  sandstoneCave: img('Gran Canaria', 'sandstone-cave', 1800, 1200, 'A cave in banded red sandstone'),
  turquoiseCliffs: img('Gran Canaria', 'turquoise-cliffs', 1200, 1800, 'Steep cliffs above turquoise water'),
  rockWindow: img('Gran Canaria', 'rock-window', 1800, 1800, 'A natural rock window on a ridge above pine-covered mountains'),
  colonialHallway: img('Gran Canaria', 'colonial-hallway', 1800, 1800, 'A bright hallway in an old colonial house with a chandelier'),
  patio: img('Gran Canaria', 'patio', 1800, 1800, 'A courtyard with plants, a fountain and wooden balconies'),
  cliffPeninsula: img('Gran Canaria', 'cliff-peninsula', 1800, 1199, 'Aerial view of a rocky peninsula and high cliffs'),
  reservoirValley: img('Gran Canaria', 'reservoir-valley', 1800, 1199, 'A green reservoir deep in a wide mountain valley'),
  forestReservoir: img('Gran Canaria', 'forest-reservoir', 1800, 1199, 'A dark reservoir between forested slopes'),
  surfTown: img('Gran Canaria', 'surf-town', 1800, 1200, 'Waves running onto a beach with a white town in the distance'),
  lakeReflection: img('Gran Canaria', 'lake-reflection', 1800, 1800, 'A pine-covered hill mirrored in a still lake'),
  seaLevel: img('Gran Canaria', 'sea-level', 1800, 1200, 'The coast at dusk seen from the surface of the sea'),
  cityStreet: img('Gran Canaria', 'city-street', 1800, 1206, 'Apartment blocks and a busy street in the city'),
  redHills: img('Gran Canaria', 'red-hills', 1800, 1199, 'Aerial view of a dirt road winding through red hills'),
  redEarth: img('Gran Canaria', 'red-earth', 1800, 1202, 'Top-down view of tracks crossing red earth and scrub'),
  greenMeadow: img('Gran Canaria', 'green-meadow', 1800, 1200, 'A person standing in a green meadow below the mountains'),
  pineCliff: img('Gran Canaria', 'pine-cliff', 1206, 1800, 'A rock face with pines growing along its top'),
  jungleWaterfall: img('Gran Canaria', 'jungle-waterfall', 1206, 1800, 'A thin waterfall in a lush green ravine'),
  cloudyShore: img('Gran Canaria', 'cloudy-shore', 1800, 1206, 'A rocky shore under heavy clouds, the city far away'),
  goldenTrack: img('Gran Canaria', 'golden-track', 1800, 1200, 'A dirt track through hills in hazy golden light'),
  greenValley: img('Gran Canaria', 'green-valley', 1800, 1206, 'A path through a green valley in soft backlight'),
  duskBeach: img('Gran Canaria', 'dusk-beach', 1800, 1773, 'A beach at dusk below a headland with a lighthouse'),
  valleyPalm: img('Gran Canaria', 'valley-palm', 1800, 1773, 'A single palm tree in a dry valley'),

  agando: img('La Gomera', 'agando', 1800, 1200, 'Volcanic rock spire above a winding mountain road'),
  laurelForest: img('La Gomera', 'laurel-forest', 1800, 1200, 'Dense green laurel forest with ferns'),
  treeRoad: img('La Gomera', 'tree-road', 1800, 1207, 'Road running through a tunnel of trees'),
  ferry: img('La Gomera', 'ferry', 1800, 1200, 'The deck rail of a ferry crossing between the islands'),
  mirador: img('La Gomera', 'mirador', 1200, 1800, 'A person on a glass viewing platform high above the sea'),
  roques: img('La Gomera', 'roques', 1800, 1200, 'Rock spires above green slopes and yellow broom'),
  forestBridge: img('La Gomera', 'forest-bridge', 1200, 1800, 'A wooden footbridge on a forest path'),
  forestStream: img('La Gomera', 'forest-stream', 1200, 1800, 'A rocky stream under the trees of the laurel forest'),
  mossyCreek: img('La Gomera', 'mossy-creek', 1200, 1800, 'A mossy creek winding through the forest'),
  glassViewpoint: img('La Gomera', 'glass-viewpoint', 1800, 1200, 'A glass viewing platform jutting out over the sea'),
  seaPool: img('La Gomera', 'sea-pool', 1800, 1200, 'A natural sea pool beside an old stone ruin'),
  breakingWaves: img('La Gomera', 'breaking-waves', 1800, 1200, 'Waves crashing against the rocks in backlight'),
  greenRidge: img('La Gomera', 'green-ridge', 1800, 1200, 'A jagged green mountain ridge under clouds'),

  caldera: img('La Palma', 'caldera', 1800, 1200, 'Deep forested gorge below jagged peaks'),
  meadow: img('La Palma', 'meadow', 1800, 1200, 'Woman in a white dress in a meadow of wildflowers'),
  waterfall: img('La Palma', 'waterfall', 1200, 1800, 'Waterfall falling into a dark rock gorge'),
  fernWalk: img('La Palma', 'fern-walk', 1200, 1800, 'A person walking through a dense fern forest'),
  fernForest: img('La Palma', 'fern-forest', 1200, 1800, 'Tall trees above a carpet of ferns'),
  sunlitFalls: img('La Palma', 'sunlit-falls', 1200, 1800, 'A waterfall in a green gorge, lit from above'),
  forestGorge: img('La Palma', 'forest-gorge', 1200, 1800, 'A narrow, overgrown forest gorge'),
  waterfallHiker: img('La Palma', 'waterfall-hiker', 1200, 1800, 'A hiker below a tall waterfall in the forest'),
  gorgeFalls: img('La Palma', 'gorge-falls', 1200, 1800, 'A waterfall in a dark, narrow gorge'),
  riverbed: img('La Palma', 'riverbed', 1200, 1800, 'A boulder-strewn riverbed between steep green walls'),
  flowerMeadow: img('La Palma', 'flower-meadow', 1200, 1800, 'A meadow of wildflowers below a pine-covered mountain'),
  pineRidges: img('La Palma', 'pine-ridges', 1800, 1199, 'Aerial view of forested ridges in late light'),
  pineMeadow: img('La Palma', 'pine-meadow', 1800, 1206, 'A meadow with scattered pines and mountains behind'),

  famara: img('Lanzarote', 'famara', 1800, 1199, 'Road along the foot of high cliffs above a long beach'),
  laGeria: img('Lanzarote', 'la-geria', 1800, 1199, 'Vines in black volcanic pits behind low stone walls'),
  palm: img('Lanzarote', 'palm', 1800, 1800, 'A single palm tree on a wide volcanic plain'),
  sunsetShore: img('Lanzarote', 'sunset-shore', 1800, 1200, 'Waves running up a beach at sunset'),
  lavaField: img('Lanzarote', 'lava-field', 1800, 1800, 'A lava field with clouds drifting over distant hills'),
  volcano: img('Lanzarote', 'volcano', 1800, 1800, 'A dark volcanic cone on a stony plain'),
  stoneHut: img('Lanzarote', 'stone-hut', 1800, 1800, 'A small stone hut among vines in black volcanic ash'),
  mistyBeach: img('Lanzarote', 'misty-beach', 1800, 1200, 'Mist drifting over a beach below high cliffs'),
  eveningWave: img('Lanzarote', 'evening-wave', 1800, 1200, 'A wave at sunset, seen from the water'),
  craterPlain: img('Lanzarote', 'crater-plain', 1800, 1206, 'A volcanic plain dotted with craters'),
  craterRim: img('Lanzarote', 'crater-rim', 1800, 1206, 'Looking into a wide volcanic crater'),
  erodedRocks: img('Lanzarote', 'eroded-rocks', 1800, 1206, 'Wind-eroded rock formations on a stony plain'),

  seaOfClouds: img('Tenerife', 'sea-of-clouds', 1800, 1208, 'Pine-covered ridges rising out of a sea of clouds'),
  sunsetPeaks: img('Tenerife', 'sunset-peaks', 1800, 1206, 'Two peaks and a village above the clouds at dusk'),
  teideCaldera: img('Tenerife', 'teide-caldera', 1800, 1208, 'Wide volcanic plain below the rim of the Teide caldera'),
  pineRoad: img('Tenerife', 'pine-road', 1800, 1208, 'Empty road curving through a tall pine forest'),
  valleyVillage: img('Tenerife', 'valley-village', 1800, 1207, 'A small village in a steep green valley'),
  abandonedChurch: img('Tenerife', 'abandoned-church', 1800, 1200, 'An abandoned church with graffiti under a bright sky'),
  snowyTeide: img('Tenerife', 'snowy-teide', 1800, 1207, 'Teide covered in snow above a snowy plain'),
  churchDusk: img('Tenerife', 'church-dusk', 1800, 1207, 'An abandoned church in soft evening light'),
  rockSpire: img('Tenerife', 'rock-spire', 1800, 1207, 'A rock spire above palms in a steep ravine'),
  calderaBw: img('Tenerife', 'caldera-bw', 1800, 1205, 'Black and white: a dry plant in front of the jagged caldera walls'),
  ghostVillageBw: img('Tenerife', 'ghost-village-bw', 1800, 1205, 'Black and white: ruins of an abandoned village under a cloudy sky'),
  rockPool: img('Tenerife', 'rock-pool', 1800, 1208, 'Waves breaking over a natural rock pool'),
  tunnelBw: img('Tenerife', 'tunnel-bw', 1798, 1800, 'Black and white: a curving road tunnel with open arches'),
  resortTown: img('Tenerife', 'resort-town', 1800, 1206, 'A resort town below the mountains in the haze'),
  skatepark: img('Tenerife', 'skatepark', 1800, 1206, 'A skater silhouetted mid-air against the sunset, palms behind')
}

// Shared by the services overview (its logo window) and concept 04, in the
// order of data/CreativeAgency/awards.json.
export const serviceImages = [photos.desertRoad, photos.agando, photos.serpentine, photos.pineRoad]

// Behind the menu links, one calm photo per island (concept 07).
export const menuPhotos = [
  photos.coast,
  photos.cofete,
  photos.roqueNublo,
  photos.agando,
  photos.caldera,
  photos.palm,
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
