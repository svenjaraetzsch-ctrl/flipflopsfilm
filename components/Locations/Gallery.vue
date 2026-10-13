<template>
  <!-- The Locations Gallery. Its surface is a fine line map of the Canary
       Islands, next to the list of themes; the two point at each other (a
       theme lights the islands it is found on, an island the themes found on
       it). A click flies the camera down into an island (or into a theme);
       the map fades away and the photos gather where it was, framed whole in
       the window, next to what the island or theme offers a production.
       "Back to map" (or Esc) flies up again. Nothing is dragged: the page
       scrolls as usual. On smaller screens the photos follow as a grid below
       the (then folded) map. -->
  <section class="loc-gallery" :class="{ 'is-compact': compact, 'is-detail': level !== 'map' }">
    <div class="container loc-gallery__wrap">
      <Transition name="loc-gallery-fade">
        <button v-if="level !== 'map'" type="button" class="loc-gallery__back" @click="backToMap($event)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          {{ t('locations.gallery.back') }}
        </button>
      </Transition>

      <!-- What the island or the theme offers a production, as an open
           column in the type of the page around it: a label, the name in two
           weights, a lead sentence, then blocks on fine rules. Panels cross-
           fade (both briefly in place), so the next one can be measured
           before the camera sets off. -->
      <TransitionGroup name="loc-gallery-panel">
        <section v-if="level === 'island'" :key="`i${current}`" class="loc-gallery__panel" :aria-labelledby="`loc-gallery-title-i${current}`">
          <p class="loc-gallery__sub">
            {{ t('locations.gallery.island_no', { n: pad(current + 1), total: pad(isles.length) }) }}
            <span>{{ t('locations.gallery.photos', { count: isle.photos.length }) }}</span>
          </p>
          <h3 :id="`loc-gallery-title-i${current}`" class="loc-gallery__title f-xbold" :style="titleStyle(islandName(isle.name))" tabindex="-1">
            <span v-if="split(islandName(isle.name)).light" class="f-ultra-light d-block">{{ split(islandName(isle.name)).light }}</span>{{ split(islandName(isle.name)).bold }}
          </h3>
          <p v-if="islandText.intro" class="loc-gallery__lead">{{ islandText.intro }}</p>
          <div v-if="facts.filmed.length" class="loc-gallery__block">
            <p class="loc-gallery__sub">{{ t('locations.gallery.filmed') }}</p>
            <ul class="loc-gallery__filmed">
              <li v-for="f in facts.filmed" :key="f">
                {{ filmedLine(f).title }}<span v-if="filmedLine(f).year">{{ filmedLine(f).year }}</span>
              </li>
            </ul>
          </div>
        </section>

        <section v-else-if="level === 'theme'" :key="`t${currentTheme}`" class="loc-gallery__panel" :aria-labelledby="`loc-gallery-title-t${currentTheme}`">
          <p class="loc-gallery__sub">
            {{ t('locations.gallery.theme_no', { n: pad(currentTheme + 1), total: pad(themeSets.length) }) }}
            <span>{{ t('locations.gallery.photos', { count: theme.photos.length }) }}</span>
          </p>
          <h3 :id="`loc-gallery-title-t${currentTheme}`" class="loc-gallery__title f-xbold" :style="titleStyle(themeText(theme.key).name)" tabindex="-1">
            <span v-if="split(themeText(theme.key).name).light" class="f-ultra-light d-block">{{ split(themeText(theme.key).name).light }}</span>{{ split(themeText(theme.key).name).bold }}
          </h3>
          <p v-if="themeText(theme.key).intro" class="loc-gallery__lead">{{ themeText(theme.key).intro }}</p>
          <div class="loc-gallery__block">
            <p class="loc-gallery__sub">{{ t('locations.gallery.found_on') }}</p>
            <ul class="loc-gallery__found">
              <li v-for="j in theme.on" :key="j">
                <button
                  type="button"
                  :aria-label="t('locations.gallery.open_island', { name: islandName(isles[j].name) })"
                  @click="flyIn(j, $event)"
                  @pointerenter="enterIsland($event, j)"
                  @pointerleave="leave"
                >
                  {{ islandName(isles[j].name) }}
                </button>
              </li>
            </ul>
          </div>
          <div v-if="theme.filmed.length" class="loc-gallery__block">
            <p class="loc-gallery__sub">{{ t('locations.gallery.filmed') }}</p>
            <ul class="loc-gallery__filmed">
              <li v-for="f in theme.filmed" :key="f">
                {{ filmedLine(f).title }}<span v-if="filmedLine(f).year">{{ filmedLine(f).year }}</span><small v-if="filmedLine(f).where" class="loc-gallery__where">{{ filmedLine(f).where }}</small>
              </li>
            </ul>
          </div>
        </section>
      </TransitionGroup>

      <div
        ref="stage"
        class="loc-gallery__stage"
        :class="{ 'is-ready': ready, 'is-intro': intro, 'is-narrow': narrow }"
        role="region"
        aria-roledescription="map"
        :aria-label="t('locations.gallery.region', { count: total })"
      >
        <!-- The map itself: one drawing whose viewBox follows the camera, so
             the lines stay sharp at every zoom. Purely visual; the islands'
             names are the buttons further down. -->
        <svg
          ref="mapEl"
          class="loc-gallery__map"
          :viewBox="`${view.x} ${view.y} ${view.w} ${view.h}`"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <pattern :id="hatchId" patternUnits="userSpaceOnUse" width="2.6" height="2.6" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="2.6" />
            </pattern>
          </defs>
          <g class="loc-gallery__grat"><path v-for="g in graticule" :key="g.key" :d="g.d" /></g>
          <g class="loc-gallery__routes">
            <path v-for="r in routeLines" :key="r.key" class="loc-gallery__route" :class="{ 'is-active': routeLit(r) }" :d="r.d" />
          </g>
          <path class="loc-gallery__minor" :d="graciosa" />
          <path
            v-for="item in isles"
            :key="item.name"
            class="loc-gallery__island"
            :class="{ 'is-lit': lit.includes(item.index) }"
            :style="{ '--n': item.index }"
            :d="item.d"
            pathLength="1"
          />
          <g class="loc-gallery__ports">
            <template v-for="r in routeLines" :key="r.key">
              <circle v-for="(pt, j) in r.ends" :key="j" :class="{ 'is-active': routeLit(r) }" :cx="pt[0]" :cy="pt[1]" r="1" />
            </template>
          </g>
          <!-- Hit areas: each island with a wide invisible edge, so the small
               ones are easy to point at and tap; small islands on top -->
          <path
            v-for="i in hitOrder"
            :key="isles[i].name"
            class="loc-gallery__hit"
            :d="isles[i].d"
            @pointerenter="enterIsland($event, i)"
            @pointerleave="leave"
            @click="flyIn(i, $event)"
          />
        </svg>

        <!-- Larger screens: the collages of the islands and themes opened so
             far. Each is moved and scaled by the script as one layer and
             fades in as the camera arrives; the images get their source on
             the way down. -->
        <template v-if="!compact">
          <template v-for="item in isles" :key="item.name">
            <div v-if="visited[item.index]" :ref="(el) => (groupEls[item.index] = el)" class="loc-gallery__group">
              <button
                v-for="tile in islandCollage(item.index).tiles"
                :key="tile.src"
                type="button"
                class="loc-gallery__tile"
                :class="{ 'is-lifted': isLifted('i', item.index, tile) }"
                :style="tileStyle(tile)"
                :data-id="tile.id"
                :tabindex="level === 'island' && current === item.index ? 0 : -1"
                :aria-label="`${tile.alt} (${islandName(tile.island)})`"
                @click="open(tile, 'i', item.index)"
              >
                <img alt="" decoding="async" draggable="false" />
              </button>
            </div>
          </template>
          <template v-for="set in themeSets" :key="set.key">
            <div v-if="visitedThemes[set.index]" :ref="(el) => (themeEls[set.index] = el)" class="loc-gallery__group">
              <button
                v-for="tile in themeCollageOf(set.index).tiles"
                :key="tile.src"
                type="button"
                class="loc-gallery__tile"
                :class="{ 'is-lifted': isLifted('t', set.index, tile) }"
                :style="tileStyle(tile)"
                :data-id="tile.id"
                :tabindex="level === 'theme' && currentTheme === set.index ? 0 : -1"
                :aria-label="`${tile.alt} (${islandName(tile.island)})`"
                @click="open(tile, 't', set.index)"
              >
                <img alt="" decoding="async" draggable="false" />
                <span class="loc-gallery__tag" aria-hidden="true">{{ islandName(tile.island) }}</span>
              </button>
            </div>
          </template>
        </template>

        <div class="loc-gallery__shade" aria-hidden="true"></div>

        <!-- Map furniture that keeps its size on screen, placed by the
             script: degrees at the edges and the islands' names (buttons) -->
        <span v-for="(g, i) in graticule" :key="g.key" :ref="(el) => (degEls[i] = el)" class="loc-gallery__deg" :class="`is-${g.axis}`" aria-hidden="true">
          {{ g.deg }}° {{ t(g.dir === 'n' ? 'locations.gallery.north' : 'locations.gallery.west') }}
        </span>

        <div class="loc-gallery__labels" role="group" :aria-label="t('locations.gallery.islands')">
          <button
            v-for="item in isles"
            :key="item.name"
            :ref="(el) => (nameEls[item.index] = el)"
            type="button"
            class="loc-gallery__label"
            :class="[`is-${item.label[2]}`, { 'is-lit': lit.includes(item.index) }]"
            :tabindex="level === 'map' ? 0 : -1"
            :aria-label="t('locations.gallery.open', { name: islandName(item.name), count: item.photos.length })"
            @click="flyIn(item.index, $event)"
            @pointerenter="enterIsland($event, item.index)"
            @pointerleave="leave"
            @focus="onFocus($event, 'island', item.index)"
            @blur="leave"
          >
            <span>{{ islandName(item.name) }}</span>
          </button>
        </div>

        <!-- The title, and the facts for the whole archipelago in the info
             style of the Tax Incentives page -->
        <div ref="cartEl" class="loc-gallery__head">
          <h2 class="loc-gallery__heading f-xbold">
            <span class="f-ultra-light d-block">{{ t('locations.gallery.title_light') }}</span>{{ t('locations.gallery.title_bold') }}
          </h2>
          <dl v-if="archipelago.length" class="loc-gallery__arch">
            <div v-for="f in archipelago" :key="f.label">
              <dt>{{ t(`locations.gallery.${f.label}`) }}</dt>
              <dd>{{ t(`locations.gallery.${f.value}`) }}</dd>
            </div>
          </dl>
        </div>

        <p class="loc-gallery__hint">
          <span class="loc-gallery__hint-mouse">{{ t('locations.gallery.hint_mouse') }}</span>
          <span class="loc-gallery__hint-touch">{{ t('locations.gallery.hint_touch') }}</span>
        </p>

        <!-- Larger screens: the themes, in a column beside the map -->
        <Transition name="loc-gallery-fade">
          <div v-if="!compact && level === 'map'" class="loc-gallery__index" :class="{ 'is-matching': matches !== null }">
            <h6 class="loc-gallery__index-title sub-title">{{ t('locations.gallery.themes') }}</h6>
            <ul :aria-label="t('locations.gallery.themes')">
              <li v-for="set in themeSets" :key="set.key">
                <button
                  type="button"
                  :class="{ 'is-lit': hoverTheme === set.index, 'is-match': matches && matches.includes(set.index) }"
                  :aria-label="t('locations.gallery.open', { name: themeText(set.key).name, count: set.photos.length })"
                  @click="openTheme(set.index, $event)"
                  @pointerenter="enterTheme($event, set.index)"
                  @pointerleave="leave"
                  @focus="onFocus($event, 'theme', set.index)"
                  @blur="leave"
                >
                  <span>{{ themeText(set.key).name }}</span>
                  <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M5 13L13 5M6.5 5H13v6.5" /></svg>
                </button>
              </li>
            </ul>
          </div>
        </Transition>

        <div class="loc-gallery__legend" aria-hidden="true">
          <span class="loc-gallery__scale"><i ref="scaleEl"></i>{{ scaleKm }} km</span>
        </div>
      </div>

      <!-- Smaller screens: the themes as chips below the map -->
      <ul v-if="compact && level === 'map'" class="loc-gallery__chips" :class="{ 'is-matching': matches !== null }" :aria-label="t('locations.gallery.themes')">
        <li v-for="set in themeSets" :key="set.key">
          <button
            type="button"
            :class="{ 'is-lit': hoverTheme === set.index, 'is-match': matches && matches.includes(set.index) }"
            :aria-label="t('locations.gallery.open', { name: themeText(set.key).name, count: set.photos.length })"
            @click="openTheme(set.index, $event)"
            @focus="onFocus($event, 'theme', set.index)"
            @blur="leave"
          >
            {{ themeText(set.key).name }}
          </button>
        </li>
      </ul>

      <!-- Smaller screens: the photos as a grid below the map -->
      <div
        v-if="compact && level !== 'map'"
        :key="`grid-${level}-${level === 'island' ? current : currentTheme}`"
        class="loc-gallery__grid"
        role="group"
        :aria-label="t('locations.gallery.photos_of', { name: level === 'island' ? islandName(isle.name) : themeText(theme.key).name })"
      >
        <button
          v-for="tile in gridTiles"
          :key="tile.src"
          type="button"
          class="loc-gallery__cell"
          :class="{ 'is-lead': tile.index === gridLead, 'is-wide': tile.index === gridWide }"
          :data-id="tile.id"
          :aria-label="`${tile.alt} (${islandName(tile.island)})`"
          @click="open(tile, level === 'island' ? 'i' : 't', level === 'island' ? current : currentTheme)"
        >
          <img
            :src="tile.sm"
            :srcset="`${tile.sm} 480w, ${tile.md} 900w`"
            :sizes="tile.index === gridLead || tile.index === gridWide ? '100vw' : '50vw'"
            :width="tile.w"
            :height="tile.h"
            alt=""
            loading="lazy"
            decoding="async"
            draggable="false"
          />
          <span v-if="level === 'theme'" class="loc-gallery__tag" aria-hidden="true">{{ islandName(tile.island) }}</span>
        </button>
      </div>

      <!-- To the islands (or themes) either side, apart from the way back -->
      <nav v-if="level !== 'map'" class="loc-gallery__steps" :aria-label="t(level === 'island' ? 'locations.gallery.other_islands' : 'locations.gallery.other_themes')">
        <button type="button" class="loc-gallery__step" @click="step(-1, $event)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          <span><small>{{ t(level === 'island' ? 'locations.gallery.prev_island' : 'locations.gallery.prev_theme') }}</small>{{ stepName(-1) }}</span>
        </button>
        <span class="loc-gallery__no">{{ pad(stepNo + 1) }} / {{ pad(level === 'island' ? isles.length : themeSets.length) }}</span>
        <button type="button" class="loc-gallery__step loc-gallery__step--next" @click="step(1, $event)">
          <span><small>{{ t(level === 'island' ? 'locations.gallery.next_island' : 'locations.gallery.next_theme') }}</small>{{ stepName(1) }}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </nav>

      <!-- The large view: over the window on larger screens, over the whole
           screen on smaller ones (moved to the end of the page body there,
           since the page's main element is a stacking context below the
           site's header). The photo flies out of its place and back. -->
      <Teleport to="body" :disabled="!compact">
        <div
          v-if="viewing"
          ref="viewEl"
          class="loc-gallery__view"
          :class="{ 'is-closing': closing, 'is-fixed': compact }"
          role="dialog"
          aria-modal="true"
          :aria-label="t('locations.gallery.photo_of', { name: viewSetName, n: viewing.index + 1, total: viewTiles.length })"
          @keydown="onViewKey"
          @pointerdown="onViewDown"
          @pointerup="onViewUp"
        >
          <div class="loc-gallery__view-bg" @click="close"></div>
          <figure
            ref="figEl"
            class="loc-gallery__figure"
            :style="{ left: fig.x + 'px', top: fig.y + 'px', width: fig.w + 'px', height: fig.h + 'px' }"
          >
            <div class="pc-filmic loc-gallery__film">
              <img class="loc-gallery__view-low" :src="viewLow" alt="" draggable="false" />
              <img
                :key="viewing.src"
                class="loc-gallery__view-img"
                :class="{ 'is-loaded': viewLoaded }"
                :src="viewing.src"
                :srcset="viewing.srcset"
                :sizes="`${Math.ceil(fig.w)}px`"
                :width="viewing.w"
                :height="viewing.h"
                :alt="viewing.alt"
                draggable="false"
                @load="viewLoaded = true"
              />
            </div>
          </figure>
          <div class="loc-gallery__view-caption">
            <span>
              {{ islandName(viewing.island) }} <i></i>
              <template v-if="viewSet.kind === 't'">{{ themeText(themeSets[viewSet.i].key).name }} · </template>{{ pad(viewing.index + 1) }} / {{ pad(viewTiles.length) }}
            </span>
            <p>{{ viewing.alt }}</p>
          </div>
          <button type="button" class="loc-gallery__round loc-gallery__arrow loc-gallery__arrow--prev" :aria-label="t('locations.gallery.prev_photo')" @click="stepView(-1)">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button type="button" class="loc-gallery__round loc-gallery__arrow loc-gallery__arrow--next" :aria-label="t('locations.gallery.next_photo')" @click="stepView(1)">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
          <button ref="closeBtn" type="button" class="loc-gallery__round loc-gallery__close" :aria-label="t('locations.gallery.close')" @click="close">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>
      </Teleport>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { isles, total, graticule, routeLines, collage, themeSets, themeCollage, graciosa, view } from '@/data/Locations/mapGallery'
import { islandFacts, archipelagoFacts } from '@/data/Locations/islandFacts'

const { t } = useI18n()

const pad = (n) => String(n).padStart(2, '0')
const wrap = (i, n) => (i + n) % n

// ---------------------------------------------------------------------------
// Words, per language. The facts may be incomplete: every field falls back to
// empty.

const keyOf = (name) => islandFacts?.[name]?.key
const islandName = (name) => (keyOf(name) ? t(`locations.islands.${keyOf(name)}.name`) : name)
const islandWords = (name) => ({
  intro: keyOf(name) ? t(`locations.islands.${keyOf(name)}.intro`) : ''
})
const themeText = (key) => ({
  name: t(`locations.themes.${key}.name`),
  intro: t(`locations.themes.${key}.intro`)
})
// "Allied (2016) · Gran Canaria": the title, the year (set muted) and where,
// in the current language
const filmedLine = (line) => {
  const [full, where] = line.split(' · ')
  const m = full.match(/^(.*?)\s*(\([^)]*\))\s*$/)
  return {
    title: m ? m[1] : full,
    year: m ? m[2] : '',
    where: where
      ? where
          .split(', ')
          .map((name) => islandName(name))
          .join(', ')
      : ''
  }
}

// A name in the two weights of the site's headings: all but the last word
// light, the last word bold ("Gran / Canaria", "Desert & / dunes")
const split = (name = '') => {
  const words = name.split(' ')
  return { light: words.slice(0, -1).join(' '), bold: words[words.length - 1] }
}

// A long word (an island's name: "Fuerteventura") a size smaller rather than
// hyphenated; very long common nouns may still break
const titleStyle = (name = '') => {
  const longest = Math.max(...name.split(' ').map((w) => w.length))
  return longest > 11 ? { '--fit': Math.max(0.75, 11 / longest).toFixed(3) } : null
}

const archipelago = (archipelagoFacts || []).filter((f) => f && f.label && f.value)

// ---------------------------------------------------------------------------
// State

// Height of the window at the island or theme level on smaller screens, where
// it folds into a bar above the photos (with the way back)
const HEADER = 72
// Larger screens: the list of themes on the left, and above the map the
// title (see .loc-gallery__head), in pixels
const COLUMN = 300
const TITLE = 176

const stage = ref(null)
const mapEl = ref(null)
const scaleEl = ref(null)
const viewEl = ref(null)
const figEl = ref(null)
const closeBtn = ref(null)
const cartEl = ref(null)
const groupEls = []
const themeEls = []
const nameEls = []
const degEls = []

// The hatching of a lit island (one gallery per page, so a fixed id)
const hatchId = 'loc-gallery-hatch'

const ready = ref(false)
const intro = ref(false)
let near = false
// Phones: the title block above the map rather than in its sea
const narrow = ref(false)
const compact = ref(false)
const level = ref('map')
const current = ref(3)
const currentTheme = ref(0)
const hoverIsland = ref(null)
const hoverTheme = ref(null)
const scaleKm = ref(50)
const aspect = ref(1.45)
const visited = ref(isles.map(() => false))
const visitedThemes = ref(themeSets.map(() => false))

const isle = computed(() => isles[current.value])
const theme = computed(() => themeSets[currentTheme.value])
const facts = computed(() => {
  const f = islandFacts?.[isle.value.name] || {}
  return { filmed: f.filmed || [] }
})
const islandText = computed(() => islandWords(isle.value.name))

// The map and the themes point at each other: a theme pointed at lights all
// the islands it is found on, an island pointed at the themes found on it.
const lit = computed(() => {
  if (hoverTheme.value !== null) return themeSets[hoverTheme.value].on
  return hoverIsland.value !== null ? [hoverIsland.value] : []
})
const themesOn = (i) => themeSets.filter((set) => set.on.includes(i)).map((set) => set.index)
const matches = computed(() => (hoverIsland.value !== null && level.value === 'map' ? themesOn(hoverIsland.value) : null))
// Their ferry lines turn sand too: an island's own; for a theme those between
// two of its islands
const routeLit = (r) => {
  const names = lit.value.map((i) => isles[i].name)
  if (names.length === 1) return names.includes(r.a) || names.includes(r.b)
  return names.includes(r.a) && names.includes(r.b)
}

const islandCollage = (i) => collage(i, aspect.value)
const themeCollageOf = (i) => themeCollage(i, aspect.value)
const tileStyle = (tile) => ({ left: tile.x + 'px', top: tile.y + 'px', width: tile.w + 'px', height: tile.h + 'px' })

// On smaller screens: the photos as one list (same shape as a collage's
// tiles, for the large view)
const islandTiles = (i) => isles[i].photos.map((p, k) => ({ ...p, id: isles[i].first + k, island: isles[i].name, cluster: i, index: k }))
const themeTiles = (i) => themeCollage(i, 1.4).tiles
const gridTiles = computed(() => (level.value === 'island' ? islandTiles(current.value) : themeTiles(currentTheme.value)))
// In the grid, as in the composition, the first landscape photo leads across
// the full width; the others go two by two, and an odd one out at the end
// takes the full width too, so no cell stands alone.
const gridLead = computed(() => Math.max(0, gridTiles.value.findIndex((p) => p.w / p.h >= 1.2)))
const gridWide = computed(() => {
  const rest = gridTiles.value.filter((p) => p.index !== gridLead.value)
  return rest.length % 2 ? rest[rest.length - 1].index : -1
})

// Larger islands first, so the smaller ones' hit areas lie on top
const hitOrder = isles
  .map((item) => item.index)
  .sort((a, b) => isles[b].box.w * isles[b].box.h - isles[a].box.w * isles[a].box.h)

const stepNo = computed(() => (level.value === 'island' ? current.value : currentTheme.value))
const stepName = (d) =>
  level.value === 'island'
    ? islandName(isles[wrap(current.value + d, isles.length)].name)
    : themeText(themeSets[wrap(currentTheme.value + d, themeSets.length)].key).name

// ---------------------------------------------------------------------------
// Camera: the map point in the middle of the window, and the zoom in pixels
// per map unit. A plain object, not reactive: it changes every frame.

const cam = { x: view.x + view.w / 2, y: view.y + view.h / 2, z: 2.3 }
let W = 0
let H = 0
let fly = null
let reduced = false
let raf = 0
let last = 0
const alpha = isles.map(() => 0)
const themeAlpha = themeSets.map(() => 0)
// The level last flown into, which sets how far the camera goes down
let detail = { kind: 'i', i: 3 }
// Whether the camera is on its way back up from an island or a theme
let rising = false

const toScreen = (x, y) => [(x - cam.x) * cam.z + W / 2, (y - cam.y) * cam.z + H / 2]

// The window's height as it will be once it has finished changing (its
// height is animated); the camera aims for that.
let goal = 0
const goalH = () => goal || H

// The part of the window the photos are fitted into, beside the panel and
// above the navigation (larger screens)
const freeArea = () => [384, 24, W - 24, goalH() - 92]

// Larger screens: the window's own height (85vh, as in the CSS), grown when
// an island's or theme's panel needs more room than that
const baseHeight = () => Math.round(Math.min(1000, Math.max(540, window.innerHeight * 0.85)))
const fitStage = () => {
  if (compact.value) return
  const panel = level.value !== 'map' ? panelEl() : null
  const need = panel ? panel.offsetTop + panel.offsetHeight + 32 : 0
  const h = Math.max(baseHeight(), need)
  goal = h
  stage.value.style.height = h === baseHeight() ? '' : h + 'px'
  stage.value.style.maxHeight = h > 1000 ? 'none' : ''
  const [l, t2, r, b] = freeArea()
  aspect.value = Math.round(((r - l) / (b - t2)) * 10) / 10
}

// The window's height on smaller screens, set by the script so the camera
// knows it while the window changes size: the title, then the map across the
// full width.
const titleHeight = () => cartEl.value?.offsetHeight || 0
const narrowTop = () => 16 + titleHeight() + 20
// (A margin on either side, wider on the left, so names west of an island
// stay inside.)
const narrowZoom = () => (W - 56) / view.w
const overviewHeight = () =>
  narrow.value
    ? Math.round(narrowTop() + narrowZoom() * view.h + 48)
    : Math.round(Math.max(460 + titleHeight(), window.innerHeight * 0.75))
const stageHeight = () => (level.value !== 'map' ? HEADER : overviewHeight())

const mapTarget = () => {
  if (narrow.value) {
    const z = narrowZoom()
    const h = overviewHeight()
    return { x: view.x + view.w / 2 - 12 / z, y: view.y + view.h / 2 - (narrowTop() + (view.h * z) / 2 - h / 2) / z, z }
  }
  const h = compact.value ? overviewHeight() : goalH()
  // Below the title, and on larger screens beside the list of themes
  const [l, top, r, b] = compact.value ? [30, 16 + titleHeight() + 30, W - 30, h - 40] : [COLUMN + 20, TITLE + 24, W - 24, h - 44]
  const z = Math.min((r - l) / view.w, (b - top) / view.h)
  // (centred across, and close under the title rather than centred down)
  const my = top + Math.min((b - top) / 2, (view.h * z) / 2 + 24)
  return { x: view.x + view.w / 2 - ((l + r) / 2 - W / 2) / z, y: view.y + view.h / 2 - (my - h / 2) / z, z }
}

const islandTarget = (i) => {
  const item = isles[i]
  if (compact.value) {
    // The flight down, as the map fades and the window folds up
    const z = Math.min((W - 48) / item.box.w, (overviewHeight() - 120) / item.box.h)
    return { x: item.centre.x, y: item.centre.y, z }
  }
  const [l, t2, r, b] = freeArea()
  const { box, k } = islandCollage(i)
  const z = Math.min((r - l) / box.w, (b - t2) / box.h) * k
  return { x: item.centre.x - ((l + r) / 2 - W / 2) / z, y: item.centre.y - ((t2 + b) / 2 - goalH() / 2) / z, z }
}

// Into a theme the camera heads for the middle of its islands, close enough
// for the map to have faded on arrival
const themeTarget = (i) => {
  const m = mapTarget().z
  const c = themeSets[i].centre
  return { x: c.x, y: c.y, z: m * 2.6 }
}

const detailTarget = () => (detail.kind === 'i' ? islandTarget(detail.i) : themeTarget(detail.i))

// A theme's collage on screen (larger screens): fitted into the free area
const themeFit = (i) => {
  const [l, t2, r, b] = freeArea()
  const { box } = themeCollageOf(i)
  return { s: Math.min((r - l) / box.w, (b - t2) / box.h), x: (l + r) / 2, y: (t2 + b) / 2 }
}

const measure = () => {
  compact.value = window.innerWidth < 992
  W = stage.value.clientWidth
  narrow.value = W < 700
  if (compact.value) {
    goal = stageHeight()
    stage.value.style.height = goal + 'px'
    stage.value.style.maxHeight = ''
  }
  H = stage.value.clientHeight
  fitStage()
}

const easeInOut = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2)

// A flight keeps the destination on a straight line on screen while the zoom
// changes evenly (in log steps); between distant islands it pulls back far
// enough in the middle to see both.
const flyTo = (to, dip = 0) => {
  if (reduced) {
    fly = null
    Object.assign(cam, to)
    rising = false
    kick()
    return
  }
  motion('moving')
  const zoomSpan = Math.abs(Math.log(to.z / cam.z))
  const dist = Math.sqrt((to.x - cam.x) ** 2 + (to.y - cam.y) ** 2)
  fly = {
    from: { ...cam },
    to,
    s0: { x: (to.x - cam.x) * cam.z, y: (to.y - cam.y) * cam.z },
    t0: performance.now(),
    dur: Math.min(2100, 900 + 260 * zoomSpan + Math.min(500, dist * 1.6) + 300 * dip),
    dip,
    p: 0
  }
  kick()
}

// On smaller screens the window changes height between the levels; this
// keeps it (or what follows it) in view, below the site's fixed header.
const scrollToStage = () => {
  const r = stage.value.getBoundingClientRect()
  if (r.top >= 100 && r.top < window.innerHeight * 0.4) return
  window.scrollTo({ top: window.scrollY + r.top - 108, behavior: reduced ? 'instant' : 'smooth' })
}

// The panel on show (another may still be fading out)
const panelEl = () => stage.value?.parentElement.querySelector('.loc-gallery__panel:not(.loc-gallery-panel-leave-active)')

const focusTitle = (e) => {
  // Keyboard users land on the name in the panel
  if (e && e.detail === 0) setTimeout(() => panelEl()?.querySelector('.loc-gallery__title')?.focus({ preventScroll: true }), reduced ? 0 : 450)
}

// Down into an island (from the map, a theme or another island)
const flyIn = async (i, e) => {
  if (viewing.value) return
  i = wrap(i, isles.length)
  const from = level.value === 'island' ? current.value : null
  if (from === i) return
  if (!compact.value) {
    islandCollage(i)
    visited.value[i] = true
  }
  const wasTheme = level.value === 'theme'
  level.value = 'island'
  current.value = i
  detail = { kind: 'i', i }
  rising = false
  hoverIsland.value = null
  hoverTheme.value = null
  if (compact.value) {
    goal = HEADER
    stage.value.style.height = HEADER + 'px'
    scrollToStage()
  } else {
    // The panel first, so the window can grow to fit it before the camera
    // knows where to go
    await nextTick()
    fitStage()
  }
  const to = islandTarget(i)
  let dip = 0
  if (from !== null) {
    const a = isles[from].centre
    const b = isles[i].centre
    const d = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
    const fit = (Math.min(W, compact.value ? HEADER : H) * 0.8) / (d + 40)
    dip = Math.max(0, Math.min(0.8, 1 - fit / Math.sqrt(cam.z * to.z)))
  }
  // From a theme: straight in, over the theme's photos fading out
  if (wasTheme) Object.assign(cam, { ...to, z: to.z * 0.55 })
  flyTo(to, dip)
  await nextTick()
  // The whole collage will be in view on arrival: load it during the flight
  if (!compact.value) islandCollage(i).tiles.forEach((tile) => load(tile, groupEls[i], to.z / islandCollage(i).k))
  focusTitle(e)
}

// Into a theme (from the map or another theme)
const openTheme = async (i, e) => {
  if (viewing.value) return
  i = wrap(i, themeSets.length)
  if (level.value === 'theme' && currentTheme.value === i) return
  if (!compact.value) {
    themeCollageOf(i)
    visitedThemes.value[i] = true
  }
  const fromTheme = level.value === 'theme'
  level.value = 'theme'
  currentTheme.value = i
  detail = { kind: 't', i }
  rising = false
  hoverTheme.value = null
  hoverIsland.value = null
  if (compact.value) {
    goal = HEADER
    stage.value.style.height = HEADER + 'px'
    scrollToStage()
  } else {
    await nextTick()
    fitStage()
  }
  // Between themes the camera stays down; the photos cross-fade
  if (!fromTheme) flyTo(themeTarget(i))
  else Object.assign(cam, themeTarget(i))
  kick()
  await nextTick()
  if (!compact.value) {
    const fit = themeFit(i)
    themeCollageOf(i).tiles.forEach((tile) => load(tile, themeEls[i], fit.s))
  }
  focusTitle(e)
}

// Back up to the whole map, in the view it was left in
const backToMap = (e) => {
  if (viewing.value || level.value === 'map') return
  const was = level.value === 'island' ? { kind: 'island', i: current.value } : { kind: 'theme', i: currentTheme.value }
  level.value = 'map'
  rising = true
  if (compact.value) {
    goal = overviewHeight()
    stage.value.style.height = goal + 'px'
    scrollToStage()
  } else fitStage()
  flyTo(mapTarget())
  // Keyboard users land on the island's name (or the theme), once the map is back
  if (!e || e.detail === 0) focusOnArrival = was
}
let focusOnArrival = null

const step = (d, e) => (level.value === 'island' ? flyIn(current.value + d, e) : openTheme(currentTheme.value + d, e))

const kick = () => {
  if (raf || !ready.value) return
  last = performance.now()
  raf = requestAnimationFrame(tick)
}

// The photos are a layer of their own while the camera moves. A layer keeps
// the resolution it was drawn at, so after a flight (which changes the scale)
// it is dropped for a frame and drawn again sharp. (A data attribute, since
// Vue rewrites the class list on every change.)
const motion = (v) => {
  if (stage.value.dataset.motion !== v) stage.value.dataset.motion = v
}

// How far the camera is down from the overview towards the island or theme
// last flown into: 0 on the map, 1 there (in log steps of the zoom)
const descent = () => {
  if (level.value === 'map' && !rising) return 0
  const m = mapTarget().z
  const t2 = detailTarget().z
  return Math.max(0, Math.min(1, Math.log(cam.z / m) / Math.log(t2 / m)))
}

const tick = (now) => {
  const dt = Math.max(1, Math.min(48, now - last))
  const k = dt / 16.7
  last = now
  let moving = false

  if (fly) {
    const p = (fly.p = Math.min(1, (now - fly.t0) / fly.dur))
    const e = easeInOut(p)
    const lz = Math.log(fly.from.z) + (Math.log(fly.to.z) - Math.log(fly.from.z)) * e
    cam.z = Math.exp(lz) * (1 - fly.dip * Math.sin(Math.PI * p))
    cam.x = fly.to.x - (fly.s0.x * (1 - e)) / cam.z
    cam.y = fly.to.y - (fly.s0.y * (1 - e)) / cam.z
    if (p >= 1) {
      Object.assign(cam, fly.to)
      fly = null
      rising = false
    }
    moving = true
  }

  // The photos fade in only as the camera arrives
  const r = descent()
  const arrive = Math.max(0, Math.min(1, (r - 0.8) / 0.2))
  const ease = (list, i, target) => {
    const a = reduced ? target : list[i] + (target - list[i]) * (1 - Math.pow(0.78, k))
    list[i] = Math.abs(target - a) < 0.005 ? target : a
    if (list[i] !== target) moving = true
  }
  isles.forEach((_, i) => ease(alpha, i, level.value === 'island' && current.value === i && !compact.value ? arrive : 0))
  themeSets.forEach((_, i) => ease(themeAlpha, i, level.value === 'theme' && currentTheme.value === i && !compact.value ? arrive : 0))

  render(r)
  // The window's height is animated by CSS: keep drawing until it has
  // arrived, or the map and its names would part
  if (goal && Math.abs(H - goal) > 0.5) moving = true
  if (!fly && focusOnArrival) {
    const f = focusOnArrival
    focusOnArrival = null
    nextTick(() => {
      if (f.kind === 'island') nameEls[f.i]?.focus({ preventScroll: true })
      else {
        const list = stage.value.parentElement.querySelectorAll('.loc-gallery__index button, .loc-gallery__chips button')
        list[f.i]?.focus({ preventScroll: true })
      }
    })
  }
  if (moving) raf = requestAnimationFrame(tick)
  else {
    raf = 0
    motion('')
  }
}

const show = (el, on) => {
  if (!el) return
  const v = on ? 'visible' : 'hidden'
  if (el.style.visibility !== v) el.style.visibility = v
}

const render = (r = descent()) => {
  // The window may be changing height (smaller screens)
  H = stage.value.clientHeight
  const z = cam.z
  const vw = W / z
  const vh = H / z
  mapEl.value.setAttribute('viewBox', `${(cam.x - vw / 2).toFixed(3)} ${(cam.y - vh / 2).toFixed(3)} ${vw.toFixed(3)} ${vh.toFixed(3)}`)
  mapEl.value.style.setProperty('--u', (1 / z).toFixed(4))

  // How much of the overview is left: its names and title block go first,
  // the lines of the map follow; down at an island or theme only the photos
  // remain
  const o = Math.max(0, Math.min(1, 1 - r / 0.4))
  const lines = Math.max(0, Math.min(1, 1 - (r - 0.4) / 0.4))
  mapEl.value.style.opacity = lines.toFixed(3)
  show(mapEl.value, lines > 0.01)

  isles.forEach((item, i) => {
    const n = nameEls[i]
    const np = toScreen(item.label[0], item.label[1])
    n.style.transform = `translate3d(${np[0].toFixed(1)}px, ${np[1].toFixed(1)}px, 0)`
    n.style.opacity = o.toFixed(3)
    show(n, o > 0.02)
  })

  // The title
  cartEl.value.style.opacity = o.toFixed(3)
  show(cartEl.value, o > 0.02)

  // Degrees along the top of the map and the right edge, like a printed
  // chart (not under the title or the list of themes)
  const top = compact.value ? 16 + titleHeight() + 8 : TITLE + 6
  const left = compact.value ? 20 : COLUMN + 10
  graticule.forEach((g, i) => {
    const el = degEls[i]
    const p = toScreen(g.at, g.at)
    const v = g.axis === 'x' ? p[0] : p[1]
    const inView = !narrow.value && (g.axis === 'x' ? v > left + 10 && v < W - 60 : v > top + 30 && v < H - 40)
    if (g.axis === 'x') el.style.transform = `translate3d(${v.toFixed(1)}px, ${top}px, 0)`
    else el.style.transform = `translate3d(0, ${v.toFixed(1)}px, 0)`
    el.style.opacity = lines.toFixed(3)
    show(el, inView && lines > 0.02)
  })

  // Island collages (larger screens), placed over their island on the map
  isles.forEach((item, i) => {
    const el = groupEls[i]
    if (!el || !el.isConnected) return
    show(el, alpha[i] > 0.01)
    if (alpha[i] <= 0.01) return
    const p = toScreen(item.centre.x, item.centre.y)
    el.style.transform = `translate(${p[0].toFixed(1)}px, ${p[1].toFixed(1)}px) scale(${(z / islandCollage(i).k).toFixed(4)})`
    el.style.opacity = alpha[i].toFixed(3)
  })

  // Theme collages (larger screens), fitted into the window, settling in
  themeSets.forEach((_, i) => {
    const el = themeEls[i]
    if (!el || !el.isConnected) return
    show(el, themeAlpha[i] > 0.01)
    if (themeAlpha[i] <= 0.01) return
    const f = themeFit(i)
    const s = f.s * (0.94 + 0.06 * themeAlpha[i])
    el.style.transform = `translate(${f.x.toFixed(1)}px, ${f.y.toFixed(1)}px) scale(${s.toFixed(4)})`
    el.style.opacity = themeAlpha[i].toFixed(3)
  })

  // Scale bar: a round number of kilometres about 80px long
  const km = [1, 2, 5, 10, 20, 50, 100].find((v) => v * z >= 60) || 100
  if (km !== scaleKm.value) scaleKm.value = km
  scaleEl.value.style.width = (km * z).toFixed(1) + 'px'
}

// The source is set on the image directly (see the template), so loading a
// collage never re-renders the gallery. scale: layout units to pixels.
const load = (tile, group, scale) => {
  const img = group?.querySelector(`[data-id="${tile.id}"] img`)
  if (!img || img.getAttribute('src')) return
  img.onload = () => img.classList.add('is-loaded')
  img.sizes = `${Math.ceil(tile.w * scale)}px`
  img.srcset = `${tile.sm} 480w, ${tile.md} 900w`
  img.src = tile.md
}

// ---------------------------------------------------------------------------
// Pointing at islands and themes

let leaveTimer = null
const enterIsland = (e, i) => {
  if (e.pointerType === 'touch' || level.value !== 'map') return
  clearTimeout(leaveTimer)
  hoverTheme.value = null
  hoverIsland.value = i
}
const enterTheme = (e, i) => {
  if (e.pointerType === 'touch') return
  clearTimeout(leaveTimer)
  hoverIsland.value = null
  hoverTheme.value = i
}
const leave = () => {
  clearTimeout(leaveTimer)
  leaveTimer = setTimeout(() => {
    hoverIsland.value = null
    hoverTheme.value = null
  }, 90)
}
const onFocus = (e, kind, i) => {
  if (!e.target.matches(':focus-visible')) return
  clearTimeout(leaveTimer)
  hoverIsland.value = kind === 'island' ? i : null
  hoverTheme.value = kind === 'theme' ? i : null
}

// ---------------------------------------------------------------------------
// The large view

const viewing = ref(null)
const viewSet = reactive({ kind: 'i', i: 0 })
const viewLoaded = ref(false)
const closing = ref(false)
const viewLow = ref('')
const fig = reactive({ x: 0, y: 0, w: 0, h: 0 })
let lockedScroll = false

const viewTiles = computed(() => {
  if (!viewing.value) return []
  if (compact.value) return viewSet.kind === 'i' ? islandTiles(viewSet.i) : themeTiles(viewSet.i)
  return viewSet.kind === 'i' ? islandCollage(viewSet.i).tiles : themeCollageOf(viewSet.i).tiles
})
const viewSetName = computed(() =>
  viewSet.kind === 'i' ? islandName(isles[viewSet.i].name) : themeText(themeSets[viewSet.i].key).name
)
const isLifted = (kind, i, tile) => viewing.value && viewSet.kind === kind && viewSet.i === i && viewing.value.id === tile.id

// The photo's place: its tile in the collage, or its cell in the grid
const tileEl = (tile) => {
  if (compact.value) return stage.value?.parentElement.querySelector(`.loc-gallery__cell[data-id="${tile.id}"]`)
  const group = viewSet.kind === 'i' ? groupEls[viewSet.i] : themeEls[viewSet.i]
  return group?.querySelector(`[data-id="${tile.id}"]`)
}
const scaleOf = () => (viewSet.kind === 'i' ? islandTarget(viewSet.i).z / islandCollage(viewSet.i).k : themeFit(viewSet.i).s)

// The view lies over the window (larger screens) or the whole screen
const frame = () => {
  if (compact.value) return { x: 0, y: 0, w: window.innerWidth, h: window.innerHeight }
  const r = stage.value.getBoundingClientRect()
  return { x: r.left, y: r.top, w: r.width, h: r.height }
}

const place = (tile) => {
  const f = frame()
  const phone = f.w < 768
  const top = phone ? 74 : 72
  const bottom = phone ? 150 : 104
  const side = phone ? 8 : 116
  const maxW = f.w - side * 2
  const maxH = f.h - top - bottom
  const r = tile.w / tile.h
  const w = Math.min(maxW, maxH * r)
  fig.w = w
  fig.h = w / r
  fig.x = (f.w - w) / 2
  fig.y = top + (maxH - fig.h) / 2
}

const flipFrom = (tile) => {
  const el = tileEl(tile)
  if (!el) return 'scale(0.9)'
  const f = frame()
  const r = el.getBoundingClientRect()
  // Grid cells crop their photo: start from the cell's middle
  const k = Math.min(r.width / fig.w, r.height / fig.h)
  const x = r.left - f.x + (r.width - fig.w * k) / 2
  const y = r.top - f.y + (r.height - fig.h * k) / 2
  return `translate3d(${x - fig.x}px, ${y - fig.y}px, 0) scale(${k})`
}

const lowSrc = (tile) => tileEl(tile)?.querySelector('img')?.currentSrc || tile.sm

// The photos either side, fetched ahead at the size the large view asks for
const preload = (tile) => {
  const list = viewTiles.value
  for (const d of [1, -1]) {
    const n = list[(tile.index + d + list.length) % list.length]
    const img = new Image()
    img.sizes = `${Math.ceil(fig.w)}px`
    img.srcset = n.srcset
    img.src = n.src
  }
}

const lockScroll = (on) => {
  if (on === lockedScroll) return
  lockedScroll = on
  document.documentElement.style.overflow = on ? 'hidden' : ''
}

const loadInView = (tile) => {
  const group = viewSet.kind === 'i' ? groupEls[viewSet.i] : themeEls[viewSet.i]
  if (!compact.value) load(tile, group, scaleOf())
}

const open = async (tile, kind, i) => {
  if (viewing.value || fly) return
  viewSet.kind = kind
  viewSet.i = i
  loadInView(tile)
  place(tile)
  viewLow.value = lowSrc(tile)
  viewLoaded.value = false
  viewing.value = tile
  preload(tile)
  if (compact.value) lockScroll(true)
  await nextTick()
  closeBtn.value?.focus({ preventScroll: true })
  if (reduced) return
  figEl.value?.animate([{ transform: flipFrom(tile) }, { transform: 'none' }], {
    duration: 850,
    easing: 'cubic-bezier(0.2, 0.75, 0.15, 1)'
  })
}

const stepView = (d) => {
  const tile = viewing.value
  if (!tile || closing.value) return
  const list = viewTiles.value
  const next = list[(tile.index + d + list.length) % list.length]
  loadInView(next)
  place(next)
  viewLow.value = lowSrc(next)
  viewLoaded.value = false
  viewing.value = next
  preload(next)
  if (reduced) return
  nextTick(() => {
    figEl.value?.animate(
      [
        { opacity: 0, transform: `translate3d(${d * 40}px, 0, 0)` },
        { opacity: 1, transform: 'none' }
      ],
      { duration: 550, easing: 'cubic-bezier(0.2, 0.75, 0.15, 1)' }
    )
  })
}

const close = () => {
  const tile = viewing.value
  if (!tile || closing.value) return
  closing.value = true
  // On smaller screens, the photo's place in the grid comes into view first
  // (instantly: the theme makes scrolling smooth by default)
  const el = tileEl(tile)
  if (compact.value && el) {
    lockScroll(false)
    const r = el.getBoundingClientRect()
    if (r.top < 100 || r.bottom > window.innerHeight) {
      window.scrollTo({ top: window.scrollY + r.top - (window.innerHeight - r.height) / 2, behavior: 'instant' })
    }
    lockScroll(true)
  }
  const done = () => {
    viewing.value = null
    closing.value = false
    lockScroll(false)
    // Once the tile is shown again (it was hidden while its photo was out)
    nextTick(() => el?.focus({ preventScroll: true }))
  }
  if (reduced || !figEl.value) {
    setTimeout(done, 200)
    return
  }
  const anim = figEl.value.animate([{ transform: 'none' }, { transform: flipFrom(tile) }], {
    duration: 650,
    easing: 'cubic-bezier(0.55, 0, 0.2, 1)',
    fill: 'forwards'
  })
  anim.onfinish = done
}

// Esc: closes the large view, or else flies back up to the map; the arrows
// step through the photos while the large view is open.
const onKey = (e) => {
  const el = document.activeElement
  if (el && el !== document.body && !stage.value.parentElement.contains(el) && !viewEl.value?.contains(el)) return
  if (viewing.value) {
    if (e.key === 'Escape') close()
    else if (e.key === 'ArrowLeft') stepView(-1)
    else if (e.key === 'ArrowRight') stepView(1)
    else return
    e.preventDefault()
  } else if (e.key === 'Escape' && level.value !== 'map') {
    e.preventDefault()
    backToMap()
  }
}

// Keeps Tab inside the large view while it is open
const onViewKey = (e) => {
  if (e.key !== 'Tab') return
  const items = [...viewEl.value.querySelectorAll('button')]
  const i = items.indexOf(document.activeElement)
  const next = items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length]
  e.preventDefault()
  next.focus({ preventScroll: true })
}

// Swipes between photos on touch screens
let swipe = null
const onViewDown = (e) => {
  if (e.pointerType !== 'mouse') swipe = { x: e.clientX, y: e.clientY }
}
const onViewUp = (e) => {
  if (!swipe) return
  const dx = e.clientX - swipe.x
  const dy = e.clientY - swipe.y
  swipe = null
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) stepView(dx < 0 ? 1 : -1)
}

// ---------------------------------------------------------------------------
// Set-up

let resizeObs = null
let headObs = null
let nearObs = null
let viewObs = null
let idle = null
let lastWidth = 0

onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  measure()
  lastWidth = window.innerWidth
  Object.assign(cam, mapTarget())
  ready.value = true
  document.addEventListener('keydown', onKey)

  // A change of width re-frames the camera; the window's own changes of
  // height between the levels (smaller screens) are followed by render().
  resizeObs = new ResizeObserver(() => {
    if (window.innerWidth === lastWidth && compact.value) return
    lastWidth = window.innerWidth
    measure()
    if (fly) return
    if (level.value === 'island') {
      Object.assign(cam, islandTarget(current.value))
      if (!compact.value) {
        visited.value[current.value] = true
        nextTick(() => islandCollage(current.value).tiles.forEach((tile) => load(tile, groupEls[current.value], cam.z / islandCollage(current.value).k)))
      }
    } else if (level.value === 'theme') {
      Object.assign(cam, themeTarget(currentTheme.value))
      if (!compact.value) {
        visitedThemes.value[currentTheme.value] = true
        nextTick(() => themeCollageOf(currentTheme.value).tiles.forEach((tile) => load(tile, themeEls[currentTheme.value], themeFit(currentTheme.value).s)))
      }
    } else Object.assign(cam, mapTarget())
    if (viewing.value) place(viewing.value)
    kick()
  })
  resizeObs.observe(stage.value)

  // Once the map is about to be scrolled to, the island collages are laid
  // out ahead, one at a time while the browser is idle.
  nearObs = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting || near) return
      near = true

      if (compact.value) return
      const queue = [3, 4, 2, 5, 1, 0, 6]
      const next = () => {
        const i = queue.shift()
        if (i === undefined) return
        islandCollage(i)
        idle = (window.requestIdleCallback || ((cb) => setTimeout(cb, 120)))(next)
      }
      next()
    },
    { rootMargin: '500px 0px' }
  )
  nearObs.observe(stage.value)

  // The outlines draw themselves once the map is in view
  viewObs = new IntersectionObserver(
    ([entry]) => {
      if (!intro.value && !reduced && entry.intersectionRatio >= 0.3) intro.value = true
    },
    { threshold: [0, 0.3] }
  )
  viewObs.observe(stage.value)

  // On smaller screens the title sets where the map goes; it changes height
  // with the width, and once the site's fonts have loaded.
  headObs = new ResizeObserver(() => {
    if (!compact.value || fly) return
    measure()
    if (level.value === 'map') Object.assign(cam, mapTarget())
    kick()
  })
  headObs.observe(cartEl.value)

  nextTick(() => {
    render()
    kick()
  })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  raf = 0
  clearTimeout(leaveTimer)
  if (idle) (window.cancelIdleCallback || clearTimeout)(idle)
  document.removeEventListener('keydown', onKey)
  lockScroll(false)
  resizeObs?.disconnect()
  headObs?.disconnect()
  nearObs?.disconnect()
  viewObs?.disconnect()
})
</script>

<style scoped>
.loc-gallery {
  --sand: #C8B49A;
  padding: 20px 0 100px;
}

.loc-gallery__wrap {
  --gutter: calc(var(--bs-gutter-x, 1.5rem) * 0.5);
  position: relative;
}

.loc-gallery__stage {
  position: relative;
  height: 85vh;
  min-height: 540px;
  max-height: 1000px;
  /* (grown by the script when a panel needs more room) */
  transition: height 0.6s cubic-bezier(0.45, 0, 0.2, 1);
  overflow: hidden;
  overflow: clip;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #1a1717;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  isolation: isolate;
}

/* ---------- The map ---------- */

.loc-gallery__map {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  --u: 0.43;
}

.loc-gallery__grat path {
  fill: none;
  stroke: rgba(255, 255, 255, 0.055);
  stroke-width: calc(var(--u) * 1px);
}

.loc-gallery__island {
  fill: rgba(255, 255, 255, 0.025);
  stroke: rgba(255, 255, 255, 0.72);
  stroke-width: calc(var(--u) * 1px);
  stroke-linejoin: round;
  transition: fill 0.45s ease, stroke 0.45s ease;
}

/* Dots: zero-length dashes with round caps */
.loc-gallery__route {
  fill: none;
  stroke: rgba(255, 255, 255, 0.28);
  stroke-width: calc(var(--u) * 1.6px);
  stroke-linecap: round;
  stroke-dasharray: 0 calc(var(--u) * 5px);
  transition: stroke 0.45s ease;
}

.loc-gallery__route.is-active {
  stroke: var(--sand);
  animation: loc-gallery-sail 1.6s linear infinite;
}

@keyframes loc-gallery-sail {
  to {
    stroke-dashoffset: calc(var(--u) * -5px);
  }
}

.loc-gallery__ports circle {
  fill: #1a1717;
  stroke: rgba(255, 255, 255, 0.4);
  stroke-width: calc(var(--u) * 1px);
  r: calc(var(--u) * 2.2px);
  transition: stroke 0.45s ease;
}

.loc-gallery__ports circle.is-active {
  stroke: var(--sand);
}

/* Pointed at (or one of a theme's islands): sand, hatched */
.loc-gallery__island.is-lit {
  fill: url(#loc-gallery-hatch);
  stroke: var(--sand);
}

#loc-gallery-hatch line {
  stroke: var(--sand);
  stroke-width: 0.55;
  stroke-opacity: 0.7;
}

.loc-gallery__minor {
  fill: none;
  stroke: rgba(255, 255, 255, 0.35);
  stroke-width: calc(var(--u) * 1px);
}

.loc-gallery__hit {
  fill: transparent;
  stroke: transparent;
  stroke-width: calc(var(--u) * 26px);
  stroke-linejoin: round;
  pointer-events: all;
  cursor: pointer;
}

/* Down at an island the map has faded away */
.is-detail .loc-gallery__map {
  pointer-events: none;
}

/* The outlines draw themselves when the map first comes into view */
.loc-gallery__stage.is-intro .loc-gallery__island {
  stroke-dasharray: 1 1;
  animation: loc-gallery-draw 1.6s cubic-bezier(0.45, 0, 0.25, 1) both;
  animation-delay: calc(var(--n) * 0.1s);
}

@keyframes loc-gallery-draw {
  from {
    stroke-dashoffset: 1;
    fill-opacity: 0;
  }

  60% {
    fill-opacity: 0;
  }

  to {
    stroke-dashoffset: 0;
  }
}

/* ---------- Collages ---------- */

.loc-gallery__group {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  transform-origin: 0 0;
  visibility: hidden;
}

[data-motion='moving'] .loc-gallery__group {
  will-change: transform, opacity;
}

.loc-gallery__tile {
  position: absolute;
  display: block;
  padding: 0;
  border: 0;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.4);
  cursor: pointer;
}

.loc-gallery__tile.is-lifted {
  visibility: hidden;
}

.loc-gallery__tile img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: var(--pc-film-filter);
  opacity: 0;
  transition: opacity 0.9s ease, transform 1.2s cubic-bezier(0.2, 0.7, 0.2, 1);
  pointer-events: none;
}

.loc-gallery__tile img.is-loaded {
  opacity: 1;
}

@media (hover: hover) {
  .loc-gallery__tile:hover img,
  .loc-gallery__cell:hover img {
    transform: scale(1.05);
  }
}

.loc-gallery__tile:focus-visible {
  outline: 2px solid var(--sand);
  outline-offset: 4px;
}

.loc-gallery__shade {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: radial-gradient(ellipse at center, rgba(20, 17, 17, 0) 60%, rgba(20, 17, 17, 0.55) 100%);
  box-shadow: inset 0 0 60px rgba(20, 17, 17, 0.85);
}

/* ---------- Furniture placed by the script ---------- */

.loc-gallery__deg,
.loc-gallery__label {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  will-change: transform;
}

.loc-gallery__stage:not(.is-ready) .loc-gallery__deg,
.loc-gallery__stage:not(.is-ready) .loc-gallery__label {
  visibility: hidden;
}

.loc-gallery__deg {
  font-size: 10px;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.3);
  white-space: nowrap;
  pointer-events: none;
}

.loc-gallery__deg.is-x {
  margin-left: -16px;
}

.loc-gallery__deg.is-y {
  left: auto;
  right: 14px;
  margin-top: -16px;
}

/* The islands' names: real buttons */
.loc-gallery__labels {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 4;
}

.loc-gallery__label {
  width: 0;
  height: 0;
  padding: 0;
  border: 0;
  background: none;
  color: rgba(255, 255, 255, 0.62);
  cursor: pointer;
}

.loc-gallery__label span {
  position: absolute;
  padding: 2px 4px;
  font-size: 11px;
  line-height: 1.3;
  letter-spacing: 2px;
  text-transform: uppercase;
  white-space: nowrap;
  transition: color 0.35s ease;
}

/* A larger invisible target than the text itself */
.loc-gallery__label span::before {
  content: '';
  position: absolute;
  inset: -12px -6px;
}

.loc-gallery__label.is-n span {
  transform: translate(-50%, -100%);
}

.loc-gallery__label.is-s span {
  transform: translateX(-50%);
}

.loc-gallery__label.is-w span {
  transform: translate(-100%, -50%);
}

.loc-gallery__label.is-lit {
  color: var(--sand);
}

.loc-gallery__label:focus-visible {
  outline: none;
}

.loc-gallery__label:focus-visible span {
  outline: 1px solid var(--sand);
  outline-offset: 3px;
}

/* ---------- Overview: the title, the scale, the hint ---------- */

/* Above the map, beside the list of themes: a heading in two weights as
   across the site, the facts under it as on the Tax Incentives page */
.loc-gallery__head {
  position: absolute;
  top: 22px;
  left: 320px;
  right: 24px;
  z-index: 3;
  pointer-events: none;
}

.loc-gallery__stage:not(.is-ready) .loc-gallery__head {
  visibility: hidden;
}

.loc-gallery__heading {
  font-size: 40px;
  line-height: 1;
  text-transform: uppercase;
}

.loc-gallery__arch {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 48px;
  margin: 24px 0 0;
}

.loc-gallery-swap-enter-active,
.loc-gallery-swap-leave-active {
  transition: opacity 0.2s ease;
}

.loc-gallery-swap-enter-from,
.loc-gallery-swap-leave-to {
  opacity: 0;
}

/* A quiet sentence, not a call to action */
.loc-gallery__hint {
  position: absolute;
  left: 320px;
  bottom: 22px;
  z-index: 3;
  margin: 0;
  font-size: 13px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.5);
  pointer-events: none;
  transition: opacity 0.5s ease, visibility 0.5s;
}

.loc-gallery__hint-touch {
  display: none;
}

.loc-gallery__legend {
  position: absolute;
  right: 24px;
  bottom: 24px;
  z-index: 3;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.55);
  pointer-events: none;
  transition: opacity 0.5s ease, visibility 0.5s;
}

.loc-gallery__scale i {
  display: inline-block;
  height: 6px;
  margin-right: 10px;
  vertical-align: middle;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-top: 0;
}

.is-detail .loc-gallery__legend,
.is-detail .loc-gallery__hint {
  opacity: 0;
  visibility: hidden;
}

/* The themes, in a column beside the map (larger screens), styled like the
   site's lists (the services on the home page): a small heading over a
   strong rule, then rows on fine rules that fill white on hover */
.loc-gallery__index {
  position: absolute;
  top: 22px;
  left: 18px;
  z-index: 4;
  width: 270px;
}

.loc-gallery__index-title {
  margin: 0;
  padding: 0 15px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}

.loc-gallery__index ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.loc-gallery__index button {
  position: relative;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 14px 15px;
  border: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background: none;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.4;
  text-align: left;
  cursor: pointer;
  transition: color 0.4s, opacity 0.4s;
}

.loc-gallery__index button::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: -1;
  width: 100%;
  height: 0;
  background: #fff;
  transition: height 0.4s;
}

.loc-gallery__index button svg {
  flex: 0 0 auto;
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.4;
}

.loc-gallery__index button:hover,
.loc-gallery__index button.is-lit {
  color: #201D1D;
}

.loc-gallery__index button:hover::after,
.loc-gallery__index button.is-lit::after {
  height: 100%;
}

/* An island pointed at: its themes stay, the others step back */
.loc-gallery__index.is-matching button:not(.is-match),
.loc-gallery__chips.is-matching button:not(.is-match) {
  opacity: 0.3;
}

.loc-gallery__index button:focus-visible,
.loc-gallery__chips button:focus-visible,
.loc-gallery__found button:focus-visible {
  outline: 1px solid var(--sand);
  outline-offset: 2px;
}

/* The themes as pills (smaller screens), like the site's .sub-title.bord */
.loc-gallery__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 14px 0 0;
  padding: 0;
  list-style: none;
}

.loc-gallery__chips button {
  min-height: 42px;
  padding: 10px 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  background: none;
  color: #fff;
  font-size: 13px;
  font-weight: 300;
  letter-spacing: 1.5px;
  line-height: 1.4;
  text-transform: uppercase;
  transition: opacity 0.3s ease, border-color 0.3s ease, background-color 0.3s ease, color 0.3s ease;
}

.loc-gallery__chips button.is-lit,
.loc-gallery__chips button:active {
  border-color: #fff;
  background: #fff;
  color: #201D1D;
}

/* A theme's islands, each opening that island */
.loc-gallery__found {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

/* The pills of the themes on phones, a size smaller */
.loc-gallery__found button {
  min-height: 36px;
  padding: 6px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  background: none;
  color: #fff;
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 1.5px;
  line-height: 1.4;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

.loc-gallery__found button:hover {
  border-color: #fff;
  background: #fff;
  color: #201D1D;
}

/* A photo's island, in a theme */
.loc-gallery__tag {
  position: absolute;
  left: 5px;
  bottom: 5px;
  max-width: calc(100% - 10px);
  overflow: hidden;
  padding: 2px 6px;
  border-radius: 9px;
  background: rgba(20, 17, 17, 0.72);
  color: rgba(255, 255, 255, 0.9);
  font-size: 9px;
  line-height: 1.5;
  letter-spacing: 0.6px;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
  pointer-events: none;
}

/* ---------- Island level ---------- */

/* The way back: on its own, top left, and the most visible control */
.loc-gallery__back {
  position: absolute;
  top: 18px;
  left: calc(var(--gutter) + 18px);
  z-index: 6;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 46px;
  padding: 0 22px 0 16px;
  border: 0;
  border-radius: 23px;
  background: var(--sand);
  color: #201D1D;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.loc-gallery__back:hover {
  background: #fff;
}

.loc-gallery__back svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.loc-gallery__back:focus-visible {
  outline: 2px solid var(--sand);
  outline-offset: 4px;
}

/* What an island or theme offers, as an open column in the type of the page
   above the gallery (no box): a label, the name in two weights, a lead, then
   blocks on fine rules, on an 8px rhythm */
.loc-gallery__panel {
  position: absolute;
  top: 96px;
  left: calc(var(--gutter) + 18px);
  z-index: 5;
  width: 330px;
  -webkit-hyphens: auto;
  hyphens: auto;
  overflow-wrap: break-word;
}

/* The one small label style: the site's sub-title */
.loc-gallery__sub {
  margin: 0;
  font-size: 12px;
  font-weight: 300;
  line-height: 1.5;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.loc-gallery__sub span::before {
  content: '·';
  margin: 0 8px 0 2px;
}

/* The name: the two-weight heading of the site, smaller */
.loc-gallery__title {
  --fit: 1;
  margin: 12px 0 0;
  font-size: calc(40px * var(--fit));
  line-height: 1;
  text-transform: uppercase;
  outline: none;
}

.loc-gallery__title:focus-visible {
  outline: 1px solid var(--sand);
  outline-offset: 6px;
}

/* The lead: the site's h5 lead */
.loc-gallery__lead {
  margin: 24px 0 0;
  -webkit-hyphens: manual;
  hyphens: manual;
  font-family: 'Mona-Sans Medium', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.6;
  color: #fff;
}

/* Body: the site's paragraph text */
.loc-gallery__filmed li {
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 300;
  line-height: 1.6;
  color: #ddd;
}

.loc-gallery__block {
  margin-top: 24px;
}

.loc-gallery__block .loc-gallery__sub {
  margin-bottom: 8px;
}

.loc-gallery__filmed {
  margin: 0;
  padding: 0;
  list-style: none;
}

.loc-gallery__filmed li span {
  margin-left: 0.3em;
  color: rgba(255, 255, 255, 0.5);
}

/* In a theme, the island a title was shot on: a quiet line of its own, so a
   narrow column never starts a line with a dash */
.loc-gallery__where {
  display: block;
  font-size: 13px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.5);
}

.loc-gallery__filmed li + li {
  margin-top: 6px;
}

/* Data: the info items of the Tax Incentives page, for the facts of the
   archipelago */
.loc-gallery__arch dt {
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.4;
  opacity: 0.8;
}

.loc-gallery__arch dd {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.35;
}

/* To the islands either side */
.loc-gallery__steps {
  position: absolute;
  right: calc(var(--gutter) + 18px);
  bottom: 18px;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 10px;
}

.loc-gallery__step {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-height: 52px;
  padding: 6px 20px 6px 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  background: rgba(32, 29, 29, 0.86);
  color: #fff;
  font-size: 15px;
  line-height: 1.25;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.loc-gallery__step--next {
  padding: 6px 14px 6px 20px;
  text-align: right;
}

.loc-gallery__step:hover {
  border-color: var(--sand);
}

.loc-gallery__step small {
  display: block;
  margin-bottom: 2px;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

.loc-gallery__step svg {
  flex: 0 0 auto;
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
}

.loc-gallery__step:focus-visible,
.loc-gallery__cell:focus-visible,
.loc-gallery__view button:focus-visible {
  outline: 1px solid var(--sand);
  outline-offset: 3px;
}

.loc-gallery__no {
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.7);
}

.loc-gallery-panel-enter-active {
  transition: opacity 0.45s ease 0.15s, transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) 0.15s;
}

.loc-gallery-panel-leave-active {
  transition: opacity 0.25s ease;
}

.loc-gallery-panel-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.loc-gallery-panel-leave-to {
  opacity: 0;
}

.loc-gallery-fade-enter-active,
.loc-gallery-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.loc-gallery-fade-enter-from,
.loc-gallery-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Short windows (a laptop at 720px): the panel a step tighter, so the window
   need hardly grow for it */
@media (min-width: 992px) and (max-height: 820px) {
  .loc-gallery__panel {
    top: 88px;
  }

  .loc-gallery__title {
    font-size: calc(34px * var(--fit));
  }

  .loc-gallery__lead {
    margin-top: 16px;
    font-size: 18px;
    line-height: 1.5;
  }

  .loc-gallery__block {
    margin-top: 16px;
  }

  .loc-gallery__filmed li {
    font-size: 14px;
    line-height: 1.5;
  }
}

/* ---------- Smaller screens: the photos as a grid below the map ---------- */

.loc-gallery__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 8px;
}

.loc-gallery__cell {
  position: relative;
  aspect-ratio: 4 / 5;
  padding: 0;
  border: 0;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
}

.loc-gallery__cell.is-lead,
.loc-gallery__cell.is-wide {
  grid-column: span 2;
  aspect-ratio: 3 / 2;
}

.loc-gallery__cell.is-lead {
  order: -1;
}

.loc-gallery__cell img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: var(--pc-film-filter);
  transition: transform 1.2s cubic-bezier(0.2, 0.7, 0.2, 1);
}

@media (max-width: 991px) {
  .loc-gallery.is-compact .loc-gallery__wrap {
    display: flex;
    flex-direction: column;
  }

  /* Its height is set by the script (see stageHeight) */
  .loc-gallery.is-compact .loc-gallery__stage {
    order: 1;
    min-height: 0;
    max-height: none;
    transition: height 0.8s cubic-bezier(0.45, 0, 0.2, 1);
  }

  .loc-gallery__back {
    top: 12px;
    left: calc(var(--gutter) + 12px);
  }

  /* Below the map, in the page; the leaving one out of the way */
  .loc-gallery__panel {
    position: static;
    order: 2;
    width: auto;
    max-width: 640px;
    padding: 40px 0 16px;
  }

  .loc-gallery__panel.loc-gallery-panel-leave-active {
    display: none;
  }

  .loc-gallery__chips {
    order: 2;
  }

  .loc-gallery__head {
    left: 24px;
  }

  .is-narrow .loc-gallery__head {
    top: 16px;
    left: 16px;
    right: 16px;
  }

  .loc-gallery__hint {
    left: 24px;
  }

  .loc-gallery__grid {
    order: 3;
  }

  .loc-gallery__steps {
    position: static;
    order: 4;
    justify-content: space-between;
    margin-top: 16px;
  }


}

@media (max-width: 559px) {
  .loc-gallery__no {
    display: none;
  }

  .loc-gallery__step {
    flex: 1;
    min-width: 0;
    max-width: calc(50% - 4px);
    padding-left: 10px;
    padding-right: 10px;
  }

  /* A long name ("Vulkanlandschaften") breaks rather than pushes out */
  .loc-gallery__step span {
    min-width: 0;
    font-size: 14px;
    -webkit-hyphens: auto;
    hyphens: auto;
    overflow-wrap: break-word;
  }

}

/* ---------- Large view ---------- */

.loc-gallery__view {
  --sand: #C8B49A;
  position: absolute;
  top: 0;
  bottom: 0;
  left: var(--gutter);
  right: var(--gutter);
  z-index: 10;
}

.loc-gallery__view-bg {
  position: absolute;
  inset: 0;
  background: rgba(22, 19, 19, 0.9);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  animation: loc-gallery-in 0.5s ease both;
}

.loc-gallery__figure {
  position: absolute;
  margin: 0;
  transform-origin: 0 0;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45);
}

.loc-gallery__film img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.loc-gallery__view-img {
  opacity: 0;
  transition: opacity 0.6s ease;
}

.loc-gallery__view-img.is-loaded {
  opacity: 1;
}

.loc-gallery__view-caption,
.loc-gallery__arrow,
.loc-gallery__close {
  animation: loc-gallery-in 0.5s ease 0.35s both;
}

.loc-gallery__view-caption {
  position: absolute;
  left: 28px;
  right: 140px;
  bottom: 24px;
}

.loc-gallery__view-caption span {
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--sand);
}

.loc-gallery__view-caption i {
  display: inline-block;
  width: 18px;
  height: 1px;
  margin: 0 10px;
  vertical-align: middle;
  background: rgba(200, 180, 154, 0.5);
}

.loc-gallery__view-caption p {
  margin: 6px 0 0;
  font-size: 15px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.7);
}

.loc-gallery__round {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(32, 29, 29, 0.6);
  color: #fff;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.loc-gallery__round:hover {
  border-color: var(--sand);
}

.loc-gallery__round svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
}

.loc-gallery__close {
  position: absolute;
  top: 16px;
  right: 16px;
}

.loc-gallery__arrow {
  position: absolute;
  top: 50%;
  margin-top: -22px;
}

.loc-gallery__arrow--prev {
  left: 32px;
}

.loc-gallery__arrow--next {
  right: 32px;
}

.is-closing .loc-gallery__view-bg,
.is-closing .loc-gallery__view-caption,
.is-closing .loc-gallery__arrow,
.is-closing .loc-gallery__close {
  animation: loc-gallery-out 0.45s ease both;
}

@keyframes loc-gallery-in {
  from {
    opacity: 0;
  }
}

@keyframes loc-gallery-out {
  to {
    opacity: 0;
  }
}

/* Smaller screens: over the whole screen, above the site's header (#navi,
   z-index 999999); touch-action none keeps the page from scrolling under it */
.loc-gallery__view.is-fixed {
  position: fixed;
  inset: 0;
  z-index: 1000000;
  touch-action: none;
}

/* ---------- Touch screens and phones ---------- */

@media (hover: none) {
  .loc-gallery__hint-mouse {
    display: none;
  }

  .loc-gallery__hint-touch {
    display: inline;
  }
}

@media (max-width: 767px) {
  .loc-gallery__stage {
    height: 70vh;
    min-height: 460px;
  }

  .loc-gallery__title {
    font-size: calc(30px * var(--fit));
  }

  .loc-gallery__lead {
    margin-top: 16px;
    font-size: 18px;
  }

  .loc-gallery__heading {
    font-size: 30px;
  }

  .loc-gallery__arch {
    gap: 6px 28px;
    margin-top: 14px;
  }

  .loc-gallery__arch span {
    font-size: 13px;
  }

  .loc-gallery__arch h6 {
    font-size: 17px;
  }

  .loc-gallery__hint {
    left: 16px;
    bottom: 12px;
    font-size: 12px;
  }

  .loc-gallery__legend {
    display: none;
  }

  .loc-gallery__shade {
    box-shadow: inset 0 0 36px rgba(20, 17, 17, 0.85);
  }

  .loc-gallery__view-bg {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    background: rgba(22, 19, 19, 0.96);
  }

  .loc-gallery__view-caption {
    left: 16px;
    right: 120px;
    bottom: 20px;
  }

  .loc-gallery__view-caption p {
    font-size: 13px;
  }

  .loc-gallery__close {
    top: 12px;
    right: 12px;
  }

  .loc-gallery__arrow {
    top: auto;
    bottom: 20px;
    margin-top: 0;
  }

  .loc-gallery__arrow--prev {
    left: auto;
    right: 68px;
  }

  .loc-gallery__arrow--next {
    right: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .loc-gallery__route.is-active {
    animation: none;
  }

  .loc-gallery__tile img,
  .loc-gallery__cell img,
  .loc-gallery__island,
  .loc-gallery__stage,
  .loc-gallery__legend,
  .loc-gallery-fade-enter-active,
  .loc-gallery-fade-leave-active {
    transition-duration: 0.15s;
  }

  .loc-gallery__tile:hover img,
  .loc-gallery__cell:hover img {
    transform: none;
  }
}
</style>
