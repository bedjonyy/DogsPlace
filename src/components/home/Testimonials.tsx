/**
 * Testimonials — rotating handwritten quotes with brand logo row.
 *
 * Auto-advance:
 *   Quotes rotate every 5 s via setInterval. Clicking a dot or arrow stops the
 *   current timer and starts a fresh one so the slide doesn't immediately skip
 *   after a manual navigation.
 *
 * Hover pauses: mousing over the quote area clears the interval and restores it
 *   on mouse-leave, giving readers time to finish long quotes.
 *
 * Brand logos sit below the quote in a static row — they never animate.
 */
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TESTIMONIALS, BRAND_LOGOS } from '../../constants'

const AUTOPLAY_MS = 5000

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % TESTIMONIALS.length)
    }, AUTOPLAY_MS)
  }, [])

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (!paused) startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [paused, startTimer])

  const goTo = (next: number) => {
    setActiveIndex((next + TESTIMONIALS.length) % TESTIMONIALS.length)
    startTimer()
  }

  const testimonial = TESTIMONIALS[activeIndex]

  return (
    <section id="testimonials" className="bg-white pt-20 pb-10 px-6" aria-label="Customer testimonials">
      <div className="max-w-screen-xl mx-auto">
        {/* Section label */}
        <p className="text-center text-[10px] tracking-[0.3em] uppercase text-ceramic-500 mb-12">
          Happy Customers
        </p>

        {/* Quote area */}
        <div
          className="relative max-w-2xl mx-auto text-center mb-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Previous arrow */}
          <button
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous testimonial"
            className="absolute -left-10 top-1/2 -translate-y-1/2 text-ceramic-300 hover:text-ceramic-600 transition-colors hidden md:block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ceramic-950"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>

          {/* Animated quote */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <blockquote className="font-handwritten text-2xl md:text-3xl text-ceramic-800 leading-relaxed italic mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <p className="text-[11px] tracking-[0.2em] uppercase text-ceramic-500 font-medium">
                {testimonial.author}
                <span className="mx-2 text-ceramic-300">·</span>
                {testimonial.role}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Next arrow */}
          <button
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next testimonial"
            className="absolute -right-10 top-1/2 -translate-y-1/2 text-ceramic-300 hover:text-ceramic-600 transition-colors hidden md:block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ceramic-950"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>

        </div>

        {/* Brand logos — static row */}
        <div className="flex items-center justify-center gap-12 md:gap-20 flex-wrap">
          {BRAND_LOGOS.map((brand) => (
            <span
              key={brand}
              className="text-sm font-semibold tracking-widest text-ceramic-400 uppercase hover:text-ceramic-600 transition-colors cursor-default"
              aria-label={brand}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
