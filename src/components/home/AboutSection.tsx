import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export function AboutSection() {
  return (
    <section className="bg-white pt-10 pb-20 md:pb-28 px-6 overflow-hidden" aria-label="Founder story">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-normal text-ceramic-950 mb-4">
            About Our Story.
          </h2>
          <p
            className="font-handwritten text-lg text-ceramic-600 leading-relaxed mb-8 italic max-w-sm"
          >
            Find out more about how we founded dogsplace. and why your bowl means so much.
          </p>
          <Link
            to="/about"
            className="inline-block border border-ceramic-950 px-6 py-2.5 text-[10px] tracking-[0.2em] uppercase text-ceramic-950 hover:bg-ceramic-950 hover:text-white transition-colors"
          >
            Find Out More
          </Link>
        </motion.div>

        {/* Right: overlapping images */}
        <motion.div
          className="relative h-[400px] md:h-[520px]"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Back image */}
          <div
            className="absolute top-0 right-0 w-[62%] h-[55%] rounded-sm"
            style={{
              background: 'linear-gradient(135deg, #C8C0B4 0%, #B0A898 100%)',
            }}
          />
          {/* Front image (larger, overlapping) */}
          <div
            className="absolute bottom-0 left-0 w-[75%] h-[78%] rounded-sm shadow-xl"
            style={{
              background: 'linear-gradient(145deg, #E0D8D0 0%, #C4BAB0 50%, #B0A898 100%)',
            }}
          >
            {/* Studio bowl shelf suggestion */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end gap-2">
              {[0, 1, 2].map((row) => (
                <div key={row} className="flex gap-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div
                      key={j}
                      className="rounded-full border border-white/30"
                      style={{ width: 28, height: 18 }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
