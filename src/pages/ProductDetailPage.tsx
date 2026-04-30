import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { PRODUCTS } from '../constants'
import { formatPrice } from '../lib/utils'
import { useCart } from '../contexts/CartContext'
import { Button } from '../components/ui/Button'

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const product = PRODUCTS.find((p) => p.id === id)
  const { addToCart } = useCart()
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({})
  const [customization, setCustomization] = useState('')
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <main className="min-h-screen bg-ceramic-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="font-display text-2xl text-ceramic-950 mb-4">Product not found.</p>
          <Link to="/ready-to-ship" className="text-sm underline text-ceramic-500 hover:text-ceramic-950">
            Browse all products
          </Link>
        </div>
      </main>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariants, customization || undefined)
    toast.success(`${product.name} added to cart!`)
  }

  return (
    <main className="min-h-screen bg-ceramic-50 pt-20">
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        {/* Back */}
        <Link
          to="/ready-to-ship"
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-ceramic-500 hover:text-ceramic-950 transition-colors mb-10"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Back
        </Link>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left — image */}
          <motion.div
            className="aspect-[4/3] rounded-sm overflow-hidden sticky top-24"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              background: 'linear-gradient(145deg, #E8E2D9 0%, #D4CAB8 40%, #C8BCA8 100%)',
            }}
          >
            <div className="w-full h-full flex items-end justify-center pb-10 gap-8">
              <div
                className="rounded-full border-2 border-ceramic-600/40"
                style={{ width: '38%', height: '38%', background: 'radial-gradient(ellipse at 40% 35%, #F0EDE8, #C8C0B0)' }}
              />
              <div
                className="rounded-full border-2 border-ceramic-600/40"
                style={{ width: '26%', height: '26%', background: 'radial-gradient(ellipse at 40% 35%, #F0EDE8, #C8C0B0)' }}
              />
            </div>
          </motion.div>

          {/* Right — details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {product.isNew && (
              <span className="inline-block bg-ceramic-950 text-ceramic-50 text-[9px] tracking-widest uppercase px-2 py-1 mb-4">
                New Arrival
              </span>
            )}
            <h1 className="font-display text-3xl md:text-4xl font-normal text-ceramic-950 mb-1 leading-tight">
              {product.name}
            </h1>
            <p className="font-display text-xl text-ceramic-500 mb-1">Dog Bowl</p>
            {product.customizable && (
              <p className="font-display text-xl text-ceramic-500 mb-4">Custom Bowl With Pet Name</p>
            )}
            <p className="text-xl font-medium text-ceramic-950 mb-4">{formatPrice(product.price, product.currency)}</p>
            <p className="font-handwritten italic text-lg text-ceramic-600 leading-relaxed mb-6 max-w-xs">
              {product.description}
            </p>

            {/* Variants */}
            {product.variants.map((variant) => (
              <div key={variant.id} className="mb-5">
                <p className="text-[10px] tracking-[0.15em] uppercase text-ceramic-600 mb-2">{variant.name}</p>
                {variant.type === 'inscription' ? (
                  <input
                    type="text"
                    value={customization}
                    onChange={(e) => setCustomization(e.target.value)}
                    placeholder="Enter your pet's name"
                    maxLength={20}
                    aria-label="Pet name inscription"
                    className="border border-ceramic-300 px-3 py-2.5 text-sm text-ceramic-950 placeholder:text-ceramic-400 bg-white outline-none focus:border-ceramic-950 transition-colors w-full max-w-xs"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedVariants((prev) => ({ ...prev, [variant.id]: opt }))}
                        className={`px-4 py-2 text-[11px] tracking-wider uppercase border transition-colors ${
                          selectedVariants[variant.id] === opt
                            ? 'border-ceramic-950 bg-ceramic-950 text-white'
                            : 'border-ceramic-300 text-ceramic-600 hover:border-ceramic-950'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.15em] uppercase text-ceramic-600 mb-2">Quantity</p>
              <div className="flex items-center border border-ceramic-300 w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-10 h-10 flex items-center justify-center text-ceramic-600 hover:bg-ceramic-100 transition-colors text-lg"
                >
                  −
                </button>
                <span className="w-12 text-center text-sm text-ceramic-950 tabular-nums">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-10 h-10 flex items-center justify-center text-ceramic-600 hover:bg-ceramic-100 transition-colors text-lg"
                >
                  +
                </button>
              </div>
            </div>

            <Button variant="dark" size="lg" onClick={handleAddToCart} className="w-full md:w-auto">
              Add to Cart — {formatPrice(product.price * quantity, product.currency)}
            </Button>

            {/* Details */}
            <div className="mt-8 pt-6 border-t border-ceramic-200">
              <p className="text-[10px] tracking-[0.15em] uppercase text-ceramic-600 mb-2">Details</p>
              <p className="text-sm text-ceramic-600 leading-relaxed">{product.details}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
