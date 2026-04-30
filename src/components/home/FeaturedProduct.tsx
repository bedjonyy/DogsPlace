/**
 * FeaturedProduct — "New Arrival" spotlight section.
 *
 * Two notable implementation details:
 *
 * 1. Rotating badge (RotatingBadge):
 *    The "New Arrival" text runs along an SVG circular path (textPath).
 *    The entire SVG div rotates via the Tailwind animate-spin-slow class (20s CSS animation).
 *    This is pure CSS — no JS requestAnimationFrame loop needed.
 *    The text string is repeated three times so the circular path is always full.
 *
 * 2. Featured product selection:
 *    The component finds the first product with isNew: true.
 *    When Shopify products are wired up, this can be replaced with a
 *    Shopify "featured_product" metafield or a tagged collection query.
 */
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PRODUCTS } from '../../constants'
import { formatPrice } from '../../lib/utils'
import { Button } from '../ui/Button'

function RotatingBadge() {
  const text = 'New Arrival · New Arrival · New Arrival · '
  return (
    <div className="w-24 h-24 animate-spin-slow" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          {/* Invisible circular path that the text follows */}
          <path
            id="circle-path"
            d="M 50 50 m -34 0 a 34 34 0 1 1 68 0 a 34 34 0 1 1 -68 0"
          />
        </defs>
        <text
          fontSize="9.5"
          fontFamily="Inter, sans-serif"
          letterSpacing="1.5"
          fill="#1A1908"
        >
          <textPath href="#circle-path">{text}</textPath>
        </text>
      </svg>
    </div>
  )
}

export function FeaturedProduct() {
  // Fallback to first product if none are marked isNew
  const product = PRODUCTS.find((p) => p.isNew) ?? PRODUCTS[0]

  return (
    <section className="max-w-screen-xl mx-auto px-6 py-20 md:py-28" aria-label="New arrival">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Left — product info */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Underlined heading mirrors the Naetive reference exactly */}
          <h2 className="font-display text-3xl md:text-4xl font-normal text-ceramic-950 underline underline-offset-4 mb-2">
            {product.name}
          </h2>

          {product.category === 'dog-bowl' && (
            <p className="font-display text-2xl text-ceramic-500 mb-1">Dog Bowl</p>
          )}
          {product.customizable && (
            <p className="font-display text-2xl text-ceramic-500 mb-4">Custom Pet Bowl</p>
          )}

          <p className="text-lg font-medium text-ceramic-950 mb-3">
            {formatPrice(product.price, product.currency)}
          </p>

          {/* Caveat italic for the description matches the handwritten studio-label feel */}
          <p
            className="font-handwritten text-lg text-ceramic-600 leading-relaxed mb-8 max-w-xs"
            style={{ fontStyle: 'italic' }}
          >
            {product.description}
          </p>

          <Link to={`/products/${product.id}`}>
            <Button variant="dark" size="md">View Product</Button>
          </Link>
        </motion.div>

        {/* Right — rotating badge + image placeholder */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Badge is offset top-left, slightly outside the image — same as reference */}
          <div className="absolute -top-8 left-0 md:left-8 z-10">
            <RotatingBadge />
          </div>

          {/* Product image area — replace background with a real <img> in production */}
          <div
            className="w-full aspect-[4/3] rounded-sm overflow-hidden ml-0 md:ml-16"
            style={{
              background: 'linear-gradient(145deg, #E8E2D9 0%, #D4CAB8 40%, #C8BCA8 100%)',
            }}
            role="img"
            aria-label={`${product.name} product image`}
          >
            {/* Two bowl silhouettes mimic the reference photo of two stacked bowls */}
            <div className="w-full h-full flex items-end justify-center pb-8 gap-6">
              <div
                className="rounded-full border-2 border-ceramic-600/40"
                style={{
                  width: '38%',
                  height: '38%',
                  background: 'radial-gradient(ellipse at 40% 35%, #F0EDE8, #C8C0B0)',
                }}
              />
              <div
                className="rounded-full border-2 border-ceramic-600/40"
                style={{
                  width: '28%',
                  height: '28%',
                  background: 'radial-gradient(ellipse at 40% 35%, #F0EDE8, #C8C0B0)',
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
