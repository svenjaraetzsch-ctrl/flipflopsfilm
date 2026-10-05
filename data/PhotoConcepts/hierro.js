// Test set for the photography concepts page: El Hierro, by Daniel Bonhoff
// (licensed by Flip Flops Film). Each image exists at 1800px and a 900px "-md".
const base = '/assets/imgs/bonhoff/hierro'

const img = (n, w, h, alt) => ({
  src: `${base}/hierro-${n}.jpg`,
  md: `${base}/hierro-${n}-md.jpg`,
  srcset: `${base}/hierro-${n}-md.jpg ${Math.round(w / 2)}w, ${base}/hierro-${n}.jpg ${w}w`,
  w,
  h,
  alt
})

export const hierro = {
  village: img('01', 1800, 1200, 'Whitewashed village with a dragon tree above the sea'),
  crater: img('02', 1800, 1200, 'Red volcanic cone behind dry scrubland and a winding road'),
  serpentine: img('03', 1800, 1199, 'Aerial view of a road winding down a dark volcanic slope to the coast'),
  coast: img('04', 1800, 1199, 'Aerial view of a long volcanic coastline under a band of cloud'),
  rocks: img('05', 1800, 1199, 'Top-down aerial of a rocky coastline and deep blue water'),
  redCliff: img('06', 1800, 1199, 'Top-down aerial of a red cliff meeting green water'),
  arch: img('07', 1800, 1200, 'Lava rock arch with waves breaking through it'),
  sabina: img('08', 1800, 1200, 'Wind-bent juniper tree above the coast'),
  chapel: img('09', 1800, 1200, 'White chapel among wind-shaped trees and volcanic hills'),
  beach: img('10', 1200, 1800, 'Red cliffs above a black sand cove'),
  forest: img('11', 1800, 1800, 'Juniper woodland on reddish volcanic ground'),
  fog: img('12', 1800, 1800, 'Twisted shrubs on a misty pasture with stone walls'),
  cave: img('13', 1199, 1800, 'Sunlit rock pool inside a sea cave')
}
