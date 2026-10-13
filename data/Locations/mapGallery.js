// The Locations Gallery: the island map as its surface, in map units (about a
// kilometre each), and per island and per theme its photos composed as on a
// page of a photo book.
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

// Each photo with its place in the whole set (an id), its island and its
// position within its island
const placed = new Map()
isles.forEach((isle) => isle.photos.forEach((p, k) => placed.set(p, { id: isle.first + k, island: isle.name, cluster: isle.index })))

// A composition, as on the page of a photo book: the photos on a calm grid
// with even gutters and aligned edges, the lead (the first landscape photo)
// clearly the largest. A layout is a tree of rows (children side by side, of
// one height) and columns (children stacked, of one width); for every node
// its width is a linear function of its height, w = a·h + b, so the sizes
// that make all edges meet are exact. Of a set of arrangements (the lead
// beside or above the others, the others in a column, a row or a small grid)
// the one that fills the free part of the window best wins, as long as no
// photo turns into a thumbnail. All in layout units: the box is 1000 wide.
const GUTTER = 22

const leaf = (photo, i, s = 1) => ({ leaf: true, photo, i, s, a: (photo.w / photo.h) * s, b: 0 })
const row = (kids) => ({ row: true, kids, a: kids.reduce((n, k) => n + k.a, 0), b: kids.reduce((n, k) => n + k.b, 0) + GUTTER * (kids.length - 1) })
const col = (kids) => {
  const inv = kids.reduce((n, k) => n + 1 / k.a, 0)
  const a = 1 / inv
  return { col: true, kids, a, b: a * (kids.reduce((n, k) => n + k.b / k.a, 0) - GUTTER * (kids.length - 1)) }
}
const group = (kind, kids) => (kids.length === 1 ? kids[0] : kind === 'row' ? row(kids) : col(kids))

// Places a node at x, y with the given height; collects the photos' boxes
const lay = (node, x, y, h, out) => {
  const w = node.a * h + node.b
  if (node.leaf) {
    // (a smaller second photo sits at the foot of the row)
    out[node.i] = { x, y: y + h * (1 - node.s), w, h: h * node.s }
  } else if (node.row) {
    let cx = x
    for (const k of node.kids) {
      lay(k, cx, y, h, out)
      cx += k.a * h + k.b + GUTTER
    }
  } else {
    let cy = y
    for (const k of node.kids) {
      const kh = (w - k.b) / k.a
      lay(k, x, cy, kh, out)
      cy += kh + GUTTER
    }
  }
  return w
}

// The ways to set out the photos beside the lead: in one column or one row,
// in rows of two or three stacked, or in columns of two or three side by side
const splits = (n, sizes) => {
  const out = []
  const walk = (left, acc) => {
    if (!left) return out.push(acc)
    for (const k of sizes) if (k <= left) walk(left - k, [...acc, k])
  }
  walk(n, [])
  return out
}
const arrangements = (items) => {
  const n = items.length
  const res = []
  if (n <= 3) res.push(col(items))
  if (n <= 4) res.push(row(items))
  for (const parts of [...splits(n, [2, 3]), ...splits(n, [1, 2])]) {
    if (parts.length < 2 || parts.length > 4) continue
    let at = 0
    const groups = parts.map((k) => items.slice(at, (at += k)))
    res.push(col(groups.map((g) => group('row', g))))
    res.push(row(groups.map((g) => group('col', g))))
  }
  return res
}

const compose = (list) => (aspect) => {
  const BW = 1000
  const BH = Math.round(BW / aspect)
  const leadAt = Math.max(0, list.findIndex((p) => p.w / p.h >= 1.2))
  const lead = leaf(list[leadAt], leadAt)
  const others = list.map((p, i) => i).filter((i) => i !== leadAt).map((i) => leaf(list[i], i))
  // The others in their own order, and with the upright photos first or
  // last, so a portrait can stand beside the lead
  const upright = (l) => l.photo.w / l.photo.h < 1.2
  const orders = [others, [...others.filter(upright), ...others.filter((l) => !upright(l))], [...others.filter((l) => !upright(l)), ...others.filter(upright)]]

  const options = []
  if (!others.length) options.push(lead)
  else if (others.length === 1) {
    // Two photos: the lead, and the other beside it, a size smaller
    options.push(row([lead, leaf(others[0].photo, others[0].i, 0.62)]), col([lead, others[0]]))
  } else {
    for (const rest of orders) {
      for (const sub of arrangements(rest)) options.push(row([lead, sub]), col([lead, sub]))
      // The lead with one or two photos beside it, the others below
      for (let k = 1; k < Math.min(3, rest.length); k++) {
        const top = row([lead, group('col', rest.slice(0, k))])
        const below = rest.slice(k)
        options.push(col([top, group('row', below)]))
        if (below.length >= 3) for (const sub of arrangements(below)) if (sub.col) options.push(col([top, sub]))
      }
    }
  }

  let best = null
  for (const node of options) {
    const h = Math.min(BH, (BW - node.b) / node.a)
    const boxes = []
    const w = lay(node, 0, 0, h, boxes)
    const areas = boxes.map((t) => t.w * t.h)
    const leadArea = areas[leadAt]
    const rest = areas.filter((_, i) => i !== leadAt)
    const fill = areas.reduce((n, v) => n + v, 0) / (BW * BH)
    const small = rest.length ? Math.min(...rest.map((v) => v / leadArea)) : 1
    const tooSmall = Math.min(...boxes.map((t) => Math.min(t.w, t.h))) < BW * 0.12
    // Fill the space, keep the others from shrinking too far, the lead
    // clearly first, no thumbnails
    let score = fill * Math.pow(small, 0.2)
    if (rest.length && Math.max(...rest) > leadArea * 0.7) score *= 0.4
    if (tooSmall) score *= 0.5
    if (!best || score > best.score) best = { score, boxes, w, h }
  }

  // Centred in the box
  const ox = -BW / 2 + (BW - best.w) / 2
  const oy = -BH / 2 + (BH - best.h) / 2
  const tiles = list.map((photo, index) => {
    const t = best.boxes[index]
    return {
      ...photo,
      ...placed.get(photo),
      index,
      x: Math.round(ox + t.x),
      y: Math.round(oy + t.y),
      w: Math.round(t.w),
      h: Math.round(t.h)
    }
  })
  return { tiles, box: { x: -BW / 2, y: -BH / 2, w: BW, h: BH } }
}

const cache = {}
const memo = (key, make) => cache[key] || (cache[key] = make())
const roundAspect = (a) => Math.round(Math.max(0.6, Math.min(2.4, a)) * 10) / 10

// An island's composition. k: layout units per map unit, which sets how far
// the camera comes down to the island (it fills about half the box).
export const collage = (i, aspect = 1.45) => {
  const a = roundAspect(aspect)
  return memo(`i${i}|${a}`, () => {
    const isle = isles[i]
    const BW = 1000
    const k = Math.min((BW * 0.54) / isle.box.w, ((BW / a) * 0.64) / isle.box.h)
    return { ...compose(isle.photos)(a), k }
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
  return memo(`t${i}|${a}`, () => compose(themeSets[i].photos)(a))
}
