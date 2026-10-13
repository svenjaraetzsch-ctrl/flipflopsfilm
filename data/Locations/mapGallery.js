// The Locations Gallery: the island map as its surface, in map units (about a
// kilometre each); per island a collage of its photos laid out on and around
// its coastline, and per theme a collage of the theme's photos.
import { islands } from '@/data/PhotoConcepts/photos'
import { shapes, graciosa, routes, view, project } from '@/data/Locations/islandMap'
import { themes } from '@/data/Locations/themes'

export { graciosa, view }

// Where each island's name sits on the overview, in map units, and on which
// side of that point: in the open sea, so no name crosses a coast.
const place = {
  'El Hierro': { label: [27, 203, 's'] },
  'La Palma': { label: [43, 62, 'n'] },
  'La Gomera': { label: [91, 147, 'w'] },
  Tenerife: { label: [168, 101, 'n'] },
  'Gran Canaria': { label: [265, 193, 's'] },
  Fuerteventura: { label: [392, 158, 's'] },
  Lanzarote: { label: [430, 42, 'w'] }
}

// Outline path data ("M x y l dx dy … z", as in islandMap.js) to points
const toPoints = (d) => {
  const n = d.match(/-?(?:\d+\.?\d*|\.\d+)/g).map(Number)
  const pts = [[n[0], n[1]]]
  for (let i = 2; i + 1 < n.length; i += 2) {
    const [x, y] = pts[pts.length - 1]
    pts.push([x + n[i], y + n[i + 1]])
  }
  return pts
}

let offset = 0
export const isles = islands.map((item, index) => {
  const s = shapes[item.name]
  const [x, y, w, h] = s.box
  const isle = {
    name: item.name,
    index,
    photos: item.photos,
    first: offset,
    // Degrees and minutes, the compass letters added per language
    coords: [...s.coords.matchAll(/(\d+°\d+′)/g)].map((m) => m[1]),
    d: s.d,
    points: toPoints(s.d),
    box: { x, y, w, h },
    centre: { x: x + w / 2, y: y + h / 2 },
    ...place[item.name]
  }
  offset += item.photos.length
  return isle
})

export const total = offset

// Parallels and meridians every degree, drawn well past the map, since the
// camera can look beyond it when down at an island
export const graticule = []
for (const lat of [27, 28, 29, 30]) {
  const y = +project(-18, lat)[1].toFixed(1)
  graticule.push({ key: `lat${lat}`, d: `M-400 ${y}H900`, deg: lat, dir: 'n', axis: 'y', at: y })
}
for (const lon of [-19, -18, -17, -16, -15, -14, -13]) {
  const x = +project(lon, 28)[0].toFixed(1)
  graticule.push({ key: `lon${lon}`, d: `M${x} -300V600`, deg: -lon, dir: 'w', axis: 'x', at: x })
}

// The ferry lines, purely as a picture of the connections: gentle arcs
// between the ports (bend > 0 bows them to the left of the direction of
// travel). Rounded, since Math.cos (in project) may differ in the last digit
// between the server and the browser.
const bends = { 'Tenerife-La Palma': -0.08, 'Tenerife-El Hierro': 0.12, 'Gran Canaria-Fuerteventura': 0.1 }
export const routeLines = routes.map((r) => {
  const [x1, y1] = project(...r.from)
  const [x2, y2] = project(...r.to)
  const k = bends[`${r.a}-${r.b}`] ?? 0.06
  const cx = (x1 + x2) / 2 + (y2 - y1) * k
  const cy = (y1 + y2) / 2 - (x2 - x1) * k
  const f = (v) => v.toFixed(1)
  return {
    a: r.a,
    b: r.b,
    key: `${r.a}-${r.b}`,
    d: `M${f(x1)} ${f(y1)}Q${f(cx)} ${f(cy)} ${f(x2)} ${f(y2)}`,
    ends: [
      [f(x1), f(y1)],
      [f(x2), f(y2)]
    ]
  }
})

// mulberry32: a tiny seeded generator, so a collage comes out the same every
// time
const seeded = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const segDist = (px, py, ax, ay, bx, by) => {
  const dx = bx - ax
  const dy = by - ay
  const l = dx * dx + dy * dy
  const t = l ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / l)) : 0
  const ex = ax + t * dx - px
  const ey = ay + t * dy - py
  return Math.sqrt(ex * ex + ey * ey)
}

const inside = (px, py, poly) => {
  let c = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i]
    const [xj, yj] = poly[j]
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) c = !c
  }
  return c
}

// Each photo with its place in the whole set (an id), its island and its
// position within its island
const placed = new Map()
isles.forEach((isle) => isle.photos.forEach((p, k) => placed.set(p, { id: isle.first + k, island: isle.name, cluster: isle.index })))

// A collage, fitted into a box of the given aspect (width over height, that
// of the free part of the window), in layout units (the box is 1000 wide).
// Each photo, the lead (larger) first, takes the best free spot: for an
// island on its land first, then as close to its coast as possible (so the
// collage takes on a little of the island's shape), and otherwise as close to
// the middle as possible, plus a little seeded noise. If they don't all fit,
// every photo is made a little smaller and the layout starts again. Computed
// when first needed, in the browser only.
const build = (list, poly, seed) => (aspect) => {
  const n = list.length
  const BW = 1000
  const BH = Math.round(BW / aspect)
  const x0 = -BW / 2
  const y0 = -BH / 2

  // Candidate centres on a jittered grid over the box, best first
  const noise = seeded(seed)
  const step = 14
  const cands = []
  for (let y = y0 + step / 2; y < -y0; y += step) {
    for (let x = x0 + step / 2; x < -x0; x += step) {
      const jx = x + (noise() - 0.5) * step * 0.8
      const jy = y + (noise() - 0.5) * step * 0.8
      let near = 0
      if (poly) {
        let d = Infinity
        for (let p = 0, q = poly.length - 1; p < poly.length; q = p++) {
          d = Math.min(d, segDist(jx, jy, poly[q][0], poly[q][1], poly[p][0], poly[p][1]))
        }
        near = inside(jx, jy, poly) ? 0 : d
      }
      // (a wider box spreads sideways rather than into a disc)
      const r = Math.sqrt((jx / aspect) ** 2 * 1.4 + jy * jy)
      cands.push({ x: jx, y: jy, score: near + 0.12 * r + noise() * 34 })
    }
  }
  cands.sort((p, q) => p.score - q.score)

  // Many photos: closer together and more even in size, so none gets small
  const many = n > 24
  const GAP = many ? 10 : 14
  const layout = (fill) => {
    const rnd = seeded(seed * 31 + 7)
    const unit = (fill * BW * BH) / (n + 1.6)
    const out = []
    for (let pi = 0; pi < n; pi++) {
      const r = list[pi].w / list[pi].h
      const area = pi === 0 ? unit * (many ? 2.3 : 2.6) : unit * (many ? 0.9 + 0.2 * rnd() : 0.78 + 0.44 * rnd())
      const w = Math.sqrt(area * r)
      const h = w / r
      const spot = cands.find(
        (c) =>
          c.x - w / 2 >= x0 + 4 &&
          c.x + w / 2 <= -x0 - 4 &&
          c.y - h / 2 >= y0 + 4 &&
          c.y + h / 2 <= -y0 - 4 &&
          !out.some((t) => c.x - w / 2 < t.x + t.w + GAP && c.x + w / 2 + GAP > t.x && c.y - h / 2 < t.y + t.h + GAP && c.y + h / 2 + GAP > t.y)
      )
      if (!spot) return null
      out.push({ x: spot.x - w / 2, y: spot.y - h / 2, w, h })
    }
    return out
  }

  let fill = 0.62
  let boxes = layout(fill)
  while (!boxes && fill > 0.2) {
    fill *= 0.94
    boxes = layout(fill)
  }

  const tiles = list.map((photo, index) => {
    const t = boxes[index]
    return {
      ...photo,
      ...placed.get(photo),
      index,
      x: Math.round(t.x),
      y: Math.round(t.y),
      w: Math.round(t.w),
      h: Math.round(t.h)
    }
  })
  return { tiles, box: { x: x0, y: y0, w: BW, h: BH } }
}

const cache = {}
const memo = (key, make) => cache[key] || (cache[key] = make())
const roundAspect = (a) => Math.round(Math.max(0.6, Math.min(2.4, a)) * 10) / 10

// An island's collage. k: layout units per map unit, to place it over the
// island on the map (the island fills about half the box).
export const collage = (i, aspect = 1.45) => {
  const a = roundAspect(aspect)
  return memo(`i${i}|${a}`, () => {
    const isle = isles[i]
    const BW = 1000
    const share = isle.photos.length > 24 ? 0.44 : 0.54
    const k = Math.min((BW * share) / isle.box.w, ((BW / a) * (share + 0.1)) / isle.box.h)
    const poly = isle.points.map(([x, y]) => [(x - isle.centre.x) * k, (y - isle.centre.y) * k])
    return { ...build(isle.photos, poly, 4099 + i * 7919)(a), k }
  })
}

// A theme's collage, with the islands it is found on (by index) and the
// middle of them on the map, which the camera heads for on the way in
export const themeSets = themes.map((theme, i) => {
  const on = theme.islands.map((name) => isles.findIndex((isle) => isle.name === name))
  const xs = on.map((j) => isles[j].centre.x)
  const ys = on.map((j) => isles[j].centre.y)
  return {
    ...theme,
    index: i,
    on,
    centre: { x: (Math.min(...xs) + Math.max(...xs)) / 2, y: (Math.min(...ys) + Math.max(...ys)) / 2 }
  }
})

export const themeCollage = (i, aspect = 1.45) => {
  const a = roundAspect(aspect)
  return memo(`t${i}|${a}`, () => build(themeSets[i].photos, null, 6151 + i * 3571)(a))
}
