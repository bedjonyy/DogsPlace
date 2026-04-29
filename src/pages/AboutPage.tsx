import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Truck, Check, Leaf } from 'lucide-react'

const FEATURES = [
  {
    icon: Truck,
    headline: '1 – 3 week',
    sub: 'processing time',
  },
  {
    icon: Check,
    headline: 'After Care',
    sub: 'on all orders.',
  },
  {
    icon: Leaf,
    headline: 'Eco-Friendly and Thoughtful',
    sub: 'packaging',
  },
] as const

export function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section
        className="relative h-[60vh] min-h-[460px] overflow-hidden"
        aria-labelledby="about-hero-heading"
      >
        {/* Placeholder — studio bowls */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 60% 40%, #7A7060 0%, #5C564E 40%, #3D3830 70%, #28241E 100%)',
          }}
        >
          {/* Bowl shapes on a stone slab */}
          <div className="absolute inset-0 flex items-end justify-center pb-12 gap-6 opacity-30">
            {[
              { w: 120, h: 70, rot: '-8deg' },
              { w: 90, h: 55, rot: '4deg' },
              { w: 70, h: 42, rot: '-2deg' },
            ].map((b, i) => (
              <div
                key={i}
                className="rounded-full border-2 border-white/50"
                style={{ width: b.w, height: b.h, transform: `rotate(${b.rot})` }}
              />
            ))}
          </div>
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <motion.p
            className="text-white/70 text-[10px] tracking-[0.3em] uppercase mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Welcome to
          </motion.p>
          <motion.h1
            id="about-hero-heading"
            className="font-display text-white font-normal leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            OUR STORY
          </motion.h1>
          <motion.p
            className="font-handwritten italic text-white/90 mb-8"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            find out how we founded dogsplace. and why your order means the world.
          </motion.p>
          <motion.a
            href="#story"
            className="border border-white/60 text-white text-[10px] tracking-[0.25em] uppercase px-8 py-3 hover:bg-white/10 transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Read More
          </motion.a>
        </div>
      </section>

      {/* ── Dream bowl section ── */}
      <section
        id="story"
        className="bg-white py-20 md:py-28 px-6 overflow-hidden"
        aria-label="About our studio"
      >
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-normal text-ceramic-950 leading-tight mb-4">
              Make your dream bowl.
            </h2>
            <p className="font-handwritten italic text-lg text-ceramic-600 leading-relaxed mb-8">
              Use our options to build your new fave bowl.
            </p>
            <Link
              to="/customise"
              className="inline-block bg-ceramic-950 text-ceramic-50 px-6 py-3 text-[10px] tracking-[0.25em] uppercase hover:bg-ceramic-800 transition-colors"
            >
              Shop Now
            </Link>
          </motion.div>

          {/* Right — studio shelves placeholder */}
          <motion.div
            className="relative aspect-[3/4] overflow-hidden rounded-sm"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background:
                'linear-gradient(160deg, #D8D4CC 0%, #C4BFB6 30%, #B0ABA2 70%, #9C978E 100%)',
            }}
            role="img"
            aria-label="Studio shelves with ceramic dog bowls"
          >
            {/* Shelf rows suggestion */}
            <div className="absolute inset-0 flex flex-col justify-evenly px-6">
              {Array.from({ length: 7 }).map((_, row) => (
                <div key={row} className="flex items-center gap-3 border-b border-white/20 pb-2">
                  <div className="w-1 h-6 bg-white/20 flex-shrink-0" />
                  <div className="flex gap-2 flex-1 overflow-hidden">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <div
                        key={j}
                        className="flex-shrink-0 rounded-full border border-white/30 opacity-60"
                        style={{ width: 28, height: 18 }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features strip ── */}
      <section
        className="bg-ceramic-100 py-16 px-6"
        aria-label="Why dogsplace."
      >
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {FEATURES.map(({ icon: Icon, headline, sub }) => (
            <motion.div
              key={headline}
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Icon size={32} strokeWidth={1} className="text-ceramic-700" aria-hidden="true" />
              <p className="font-display text-xl font-normal text-ceramic-950">{headline}</p>
              <p className="font-handwritten italic text-base text-ceramic-500">{sub}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}
