import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export function InfoSection() {
  return (
    <section className="bg-ceramic-50 py-20 md:py-28 px-6" aria-label="About our ceramics">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: image */}
        <motion.div
          className="relative aspect-[4/5] rounded-sm overflow-hidden"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'linear-gradient(145deg, #4A443E 0%, #2D2924 60%, #1A1908 100%)',
          }}
        >
          {/* Accessories arrangement */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="w-40 h-28 rounded-2xl border-2 border-white/50 rotate-6" />
          </div>
          <div className="absolute bottom-8 left-8">
            <div className="w-24 h-16 rounded-full border-2 border-white/40 opacity-60" />
          </div>
        </motion.div>

        {/* Right: text */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[10px] tracking-[0.25em] uppercase text-ceramic-500 mb-5">
            We make super cute handmade and custom ceramics.
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-normal text-ceramic-950 leading-tight mb-8">
            read more about everything you need to know about custom bowls
          </h2>
          <Link
            to="/idea-hub"
            className="inline-block border border-ceramic-950 px-6 py-2.5 text-[10px] tracking-[0.2em] uppercase text-ceramic-950 hover:bg-ceramic-950 hover:text-white transition-colors"
          >
            Click Here
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
