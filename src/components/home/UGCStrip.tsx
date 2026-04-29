/**
 * UGCStrip — infinite auto-scrolling customer photo strip.
 *
 * Structure:
 *   1. Announcement marquee — "THANK YOU SO MUCH FOR SHARING" text ticker.
 *   2. Photo strip — cards at exactly 180 × 319.84 px scroll right-to-left forever.
 *
 * Both layers use pure CSS animation (animation-play-state: running) — no JS
 * timers, no React state. The track renders each array twice so the -50%
 * translateX loops back to an identical start position with no gap.
 */

const ANNOUNCEMENT = 'THANK YOU SO MUCH FOR SHARING 😅 ✨'

// Repeat the string enough times to fill any viewport width before the CSS
// animation loop kicks in. 10 copies × ~40 chars each ≈ 400 chars, plenty.
const announcementRepeated = Array.from({ length: 10 }, () => ANNOUNCEMENT).join('  ·  ')

const UGC_ITEMS = [
  { bg: 'linear-gradient(160deg, #E8DDD4 0%, #C8B8A4 100%)', handle: '@dogsplace', dot: '#C2502A' },
  { bg: 'linear-gradient(160deg, #E2D8CC 0%, #C4B09A 100%)', handle: '@dogsplace',        dot: '#8C7865' },
  { bg: 'linear-gradient(160deg, #D8D0C4 0%, #C0B0A0 100%)', handle: '@dogsplace',       dot: '#A89880' },
  { bg: 'linear-gradient(160deg, #D0C8BC 0%, #B8A898 100%)', handle: '@dogsplace',    dot: '#6B5E4E' },
  { bg: 'linear-gradient(160deg, #DDD8D0 0%, #C4B8A8 100%)', handle: '@dogsplace',  dot: '#C2502A' },
  { bg: 'linear-gradient(160deg, #E4DCD4 0%, #CCBFB0 100%)', handle: '@dogsplace',       dot: '#8C7865' },
  { bg: 'linear-gradient(160deg, #D8CEC4 0%, #C0B4A4 100%)', handle: '@dogsplace',        dot: '#A89880' },
  { bg: 'linear-gradient(160deg, #DEDAD4 0%, #C8C0B4 100%)', handle: '@dogsplace',   dot: '#6B5E4E' },
  { bg: 'linear-gradient(160deg, #E0D8D0 0%, #C8BEB0 100%)', handle: '@dogsplace',   dot: '#C2502A' },
]

// Doubled so translateX(-50%) loops seamlessly
const TRACK_ITEMS = [...UGC_ITEMS, ...UGC_ITEMS]

interface UGCCardProps {
  bg: string
  handle: string
  dot: string
  idx: number
}

function UGCCard({ bg, handle, dot, idx }: UGCCardProps) {
  return (
    <div
      className="ugc-card relative overflow-hidden rounded-xl select-none flex-shrink-0"
      style={{ background: bg }}
      role="img"
      aria-label={`Customer photo by ${handle}`}
    >
      {/* Instagram-style header */}
      <div className="absolute top-2 left-2 right-2 z-10 flex items-center gap-1.5">
        {/* Avatar circle with accent colour */}
        <div
          className="w-5 h-5 rounded-full flex-shrink-0 ring-[1.5px] ring-white/60"
          style={{ background: `radial-gradient(circle at 35% 35%, ${dot}99, ${dot})` }}
        />
        <span className="text-[8.5px] text-white/90 font-semibold tracking-tight truncate drop-shadow-sm">
          {handle}
        </span>
        {/* Verified dot */}
        <div
          className="w-1.5 h-1.5 rounded-full flex-shrink-0 ml-auto"
          style={{ background: dot }}
        />
      </div>

      {/* Bowl placeholder — centred ellipse */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="rounded-full opacity-30"
          style={{
            width: '62%',
            height: '42%',
            background: `radial-gradient(ellipse at 38% 35%, rgba(255,255,255,0.6), ${dot}55)`,
            border: '1px solid rgba(255,255,255,0.35)',
          }}
        />
      </div>

      {/* Caption area at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="absolute bottom-2 left-2 right-2">
        <p className="text-[7.5px] text-white/70 leading-snug line-clamp-2">
          {idx % 3 === 0
            ? `I could never have imagined a mug so beautiful 🥹 thank you @dogsplace.studio ♥`
            : idx % 3 === 1
            ? `Our pup loves his personalised bowl! The quality is unreal 🐾`
            : `The best clay date — we made matching bowls for our dogs 🍵✨`}
        </p>
      </div>
    </div>
  )
}

export function UGCStrip() {
  return (
    <section className="bg-white overflow-hidden" aria-label="Customer photos">
      {/* ── Announcement ticker ──────────────────────────────────────────── */}
      <div
        className="bg-ceramic-950 text-ceramic-50 py-2.5 overflow-hidden whitespace-nowrap"
        aria-hidden="true"
      >
        <div className="marquee-track text-[11px] tracking-[0.1em]">
          <span className="pr-12">{announcementRepeated}</span>
          <span className="pr-12">{announcementRepeated}</span>
        </div>
      </div>

      {/* ── Spacing ──────────────────────────────────────────────────────── */}
      <div className="h-6" />

      {/* ── Photo strip ──────────────────────────────────────────────────── */}
      <div className="ugc-wrapper overflow-hidden" aria-hidden="true">
        <div className="ugc-track">
          {TRACK_ITEMS.map((item, i) => (
            <UGCCard
              key={i}
              bg={item.bg}
              handle={item.handle}
              dot={item.dot}
              idx={i}
            />
          ))}
        </div>
      </div>

      <div className="h-6" />
    </section>
  )
}
