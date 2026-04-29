/**
 * HeroSection — full-screen slider with 3 slides.
 *
 * Slide backgrounds are render functions (not JSX stored in a data array)
 * so the data stays serializable and React creates fresh elements each render.
 * Slide metadata (text, CTAs) stays in the SLIDES constant.
 *
 * Slider mechanics:
 *   - Auto-advances every 5 s via setInterval.
 *   - Hovering pauses; mouse-leave resumes.
 *   - Arrow buttons and dot indicators navigate and reset the timer.
 *   - AnimatePresence cross-fades backgrounds and lifts text in/out.
 */
import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/Button'

// ─── Slide background components ─────────────────────────────────────────────

function Slide1Left() {
  const ovals = [
    { w: 80, h: 48, x: 15, y: 25 },
    { w: 60, h: 36, x: 40, y: 50 },
    { w: 90, h: 54, x: 60, y: 20 },
    { w: 50, h: 30, x: 25, y: 65 },
    { w: 70, h: 42, x: 70, y: 55 },
    { w: 55, h: 33, x: 10, y: 75 },
    { w: 65, h: 39, x: 50, y: 35 },
    { w: 45, h: 27, x: 80, y: 70 },
  ]
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#D8CEBC]">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 60%, #E8DFD0 0%, #C8BAA2 60%, #B8A888 100%)' }} />
      {/* Decorative ovals — static array, index key is intentional */}
      <div className="absolute inset-0 opacity-20">
        {ovals.map((b, i) => (
          <div key={i} className="absolute rounded-full border-2 border-ceramic-600" style={{ width: b.w, height: b.h, left: `${b.x}%`, top: `${b.y}%` }} />
        ))}
      </div>
      <div className="absolute inset-0 bg-white/5" />
    </div>
  )
}

function Slide1Right() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 40%, #A89880 0%, #8C7865 50%, #6B5E4E 100%)' }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-full border-[6px] border-[#C2502A]/60 opacity-70" style={{ width: '55%', height: '55%' }} />
      </div>
    </div>
  )
}

function Slide2Left() {
  const rings = [{ w: '50%', h: 28 }, { w: '62%', h: 34 }, { w: '74%', h: 40 }]
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 25% 55%, #D4C9A8 0%, #B8A87C 55%, #9C8C60 100%)' }} />
      {/* Stacked rings — static array, index key is intentional */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-25">
        {rings.map((r, i) => (
          <div key={i} className="rounded-full border-2 border-[#6B5C3E]" style={{ width: r.w, height: r.h }} />
        ))}
      </div>
    </div>
  )
}

function Slide2Right() {
  const lines = [70, 50, 60]
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 65% 45%, #C2502A 0%, #8B3A1E 50%, #5C2410 100%)' }} />
      {/* Inscription lines — static array, index key is intentional */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-30 px-12">
        {lines.map((w, i) => (
          <div key={i} className="h-px bg-white/80" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-full border-4 border-white/20" style={{ width: '48%', height: '48%' }} />
      </div>
    </div>
  )
}

function Slide3Left() {
  const dots = [
    { s: 12, x: 20, y: 30 }, { s: 18, x: 55, y: 20 }, { s: 10, x: 75, y: 45 },
    { s: 15, x: 35, y: 60 }, { s: 8,  x: 65, y: 70 }, { s: 20, x: 15, y: 75 },
    { s: 11, x: 80, y: 25 }, { s: 14, x: 45, y: 80 },
  ]
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 50%, #E2D5C8 0%, #C9B8A4 55%, #B0A08E 100%)' }} />
      {/* Studio dots — static array, index key is intentional */}
      <div className="absolute inset-0 opacity-[0.15]">
        {dots.map((d, i) => (
          <div key={i} className="absolute rounded-full bg-ceramic-700" style={{ width: d.s, height: d.s, left: `${d.x}%`, top: `${d.y}%` }} />
        ))}
      </div>
    </div>
  )
}

function Slide3Right() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 40%, #7C6B58 0%, #5C4E3E 50%, #3A3028 100%)' }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute rounded-full border-4 border-white/25 opacity-70" style={{ width: '44%', height: '44%', transform: 'translate(-15%, 0)' }} />
        <div className="absolute rounded-full border-4 border-white/25 opacity-70" style={{ width: '44%', height: '44%', transform: 'translate(15%, 0)' }} />
      </div>
    </div>
  )
}

// ─── Slide data (serializable — no JSX) ──────────────────────────────────────

interface SlideData {
  id: number
  eyebrow: string
  heading: string
  subheading: string
  primaryCta: { label: string; to: string }
  secondaryCta: { label: string; to: string }
  Left: () => React.ReactElement
  Right: () => React.ReactElement
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    eyebrow: 'Slowmade · Handmade',
    heading: 'FOREVER BOWLS',
    subheading: 'just for your pup',
    primaryCta: { label: 'Custom', to: '/customise' },
    secondaryCta: { label: 'Ready to Ship', to: '/ready-to-ship' },
    Left: Slide1Left,
    Right: Slide1Right,
  },
  {
    id: 2,
    eyebrow: 'Made to Order · One of a Kind',
    heading: 'CUSTOM MADE',
    subheading: 'designed around your dog',
    primaryCta: { label: 'Customise', to: '/customise' },
    secondaryCta: { label: 'Our Story', to: '/about' },
    Left: Slide2Left,
    Right: Slide2Right,
  },
  {
    id: 3,
    eyebrow: 'Book a Studio Session',
    heading: 'CLAY DATES',
    subheading: 'make it together',
    primaryCta: { label: 'Book Now', to: '/clay-dates' },
    secondaryCta: { label: 'Learn More', to: '/about' },
    Left: Slide3Left,
    Right: Slide3Right,
  },
]

// ─── Animation variants ───────────────────────────────────────────────────────

const DURATION = 0.55
const EASE = [0.16, 1, 0.3, 1] as const

const bgVariants = {
  enter:  { opacity: 0 },
  center: { opacity: 1, transition: { duration: DURATION, ease: EASE } },
  exit:   { opacity: 0, transition: { duration: DURATION * 0.7, ease: EASE } },
}

const textVariants = {
  enter:  { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0,   transition: { duration: DURATION, ease: EASE } },
  exit:   { opacity: 0, y: -12, transition: { duration: DURATION * 0.6, ease: EASE } },
}

// ─── Component ────────────────────────────────────────────────────────────────

const AUTOPLAY_MS = 5000

export function HeroSection() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length)
  }, [])

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
    }, AUTOPLAY_MS)
  }, [])

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (!paused) startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [paused, startTimer])

  const handleDotClick = (i: number) => { goTo(i); startTimer() }
  const handleArrow = (dir: 1 | -1) => { goTo(index + dir); startTimer() }

  const slide = SLIDES[index]

  return (
    <section
      className="relative h-screen min-h-[600px] overflow-hidden"
      aria-labelledby="hero-heading"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Background panels ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          className="absolute inset-0 grid grid-cols-2"
          variants={bgVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <slide.Left />
          <slide.Right />
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-px bg-white/20 z-10" />

      {/* ── Text overlay ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            className="flex flex-col items-center pointer-events-auto"
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <p className="text-white/80 text-[10px] tracking-[0.35em] uppercase mb-5 font-medium">
              {slide.eyebrow}
            </p>
            <h1
              id="hero-heading"
              className="font-display text-white font-normal leading-none mb-4"
              style={{ fontSize: 'clamp(2.8rem, 9vw, 8rem)' }}
            >
              {slide.heading}
            </h1>
            <p className="font-display italic text-white/90 mb-10" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
              {slide.subheading}
            </p>
            <div className="flex items-center gap-3">
              <Link to={slide.primaryCta.to}><Button variant="dark" size="md">{slide.primaryCta.label}</Button></Link>
              <Link to={slide.secondaryCta.to}><Button variant="light" size="md">{slide.secondaryCta.label}</Button></Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Arrow controls ── */}
      <button
        onClick={() => handleArrow(-1)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <ChevronLeft size={28} strokeWidth={1.5} />
      </button>
      <button
        onClick={() => handleArrow(1)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <ChevronRight size={28} strokeWidth={1.5} />
      </button>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20" role="tablist" aria-label="Slides">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => handleDotClick(i)}
            className="h-0.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
            style={{ width: i === index ? 24 : 16, background: i === index ? 'white' : 'rgba(255,255,255,0.35)' }}
          />
        ))}
      </div>
    </section>
  )
}
