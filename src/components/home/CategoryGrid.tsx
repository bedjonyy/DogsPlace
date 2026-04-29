import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CATEGORIES } from '../../constants'
import { cn } from '../../lib/utils'

const gradients = [
  'linear-gradient(160deg, #5C5248 0%, #3D3730 100%)',
  'linear-gradient(160deg, #D4C4B0 0%, #B8A484 100%)',
  'linear-gradient(160deg, #9A8C7C 0%, #7A6E60 100%)',
  'linear-gradient(160deg, #F0EDE8 0%, #DDD6CC 100%)',
]

export function CategoryGrid() {
  return (
    <section aria-label="Shop categories" className="grid grid-cols-2 md:grid-cols-4 h-[420px] md:h-[540px]">
      {CATEGORIES.map((cat, i) => (
        <motion.div
          key={cat.id}
          className="relative overflow-hidden group cursor-pointer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
        >
          {/* Background */}
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
            style={{ background: gradients[i] }}
          />

          {/* Ceramic texture overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E')]" />

          {/* Bowl silhouette suggestion */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-20 rounded-full border border-white/20 opacity-30" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-[9px] tracking-[0.2em] uppercase text-white/60 mb-1.5">{cat.label}</p>
            <h3
              className={cn(
                'font-display text-xl md:text-2xl font-normal mb-3 leading-tight',
                cat.textColor
              )}
            >
              {cat.title}
            </h3>
            <Link
              to={cat.ctaLink}
              className={cn(
                'text-[10px] tracking-[0.2em] uppercase underline underline-offset-4 transition-opacity hover:opacity-60',
                cat.textColor
              )}
              aria-label={`${cat.cta} — ${cat.title}`}
            >
              {cat.cta}
            </Link>
          </div>
        </motion.div>
      ))}
    </section>
  )
}
