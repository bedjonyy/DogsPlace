import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { PRODUCTS } from '../constants'
import { formatPrice } from '../lib/utils'
import { useCart } from '../contexts/CartContext'
import toast from 'react-hot-toast'

interface ProductsPageProps {
  filter: 'all' | 'custom' | 'ready'
}

export function ProductsPage({ filter }: ProductsPageProps) {
  const [query, setQuery] = useState('')
  const { addToCart } = useCart()

  const filtered = useMemo(() => {
    let list = PRODUCTS
    if (filter === 'custom') list = list.filter((p) => p.customizable)
    if (filter === 'ready') list = list.filter((p) => !p.customizable && p.inStock)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q))
      )
    }
    return list
  }, [filter, query])

  const pageTitle =
    filter === 'custom' ? 'Customise' : filter === 'ready' ? 'Ready to Ship' : 'All Products'

  return (
    <main className="min-h-screen bg-ceramic-50 pt-20">
      {/* Hero strip */}
      <section className="bg-white border-b border-ceramic-200 px-6 py-12">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-[10px] tracking-[0.3em] uppercase text-ceramic-500 mb-2">Shop</p>
          <h1 className="font-display text-4xl md:text-5xl font-normal text-ceramic-950">{pageTitle}</h1>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-6 py-10">
        {/* Search */}
        <div className="relative mb-10 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ceramic-400" strokeWidth={1.5} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bowls…"
            aria-label="Search products"
            className="w-full pl-9 pr-4 py-2.5 border border-ceramic-300 bg-white text-sm text-ceramic-950 placeholder:text-ceramic-400 outline-none focus:border-ceramic-950 transition-colors"
          />
        </div>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <p className="text-ceramic-500 text-sm">No products found. Try a different search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <motion.article
                key={product.id}
                className="group"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                {/* Image */}
                <Link to={`/products/${product.id}`} tabIndex={-1} aria-hidden="true">
                  <div
                    className={`aspect-square mb-4 overflow-hidden ${product.bgClass} relative`}
                    style={{
                      background: i % 2 === 0
                        ? 'linear-gradient(145deg, #E8E2D9, #C8BAA2)'
                        : 'linear-gradient(145deg, #D4C8BC, #B8AC9C)',
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="rounded-full border-2 border-ceramic-600/40 transition-transform duration-500 group-hover:scale-105"
                        style={{
                          width: '55%',
                          height: '40%',
                          background: 'radial-gradient(ellipse at 40% 35%, #F5F0E8, #D4C8B8)',
                        }}
                      />
                    </div>
                    {product.isNew && (
                      <span className="absolute top-3 left-3 bg-ceramic-950 text-ceramic-50 text-[9px] tracking-widest uppercase px-2 py-1">
                        New
                      </span>
                    )}
                  </div>
                </Link>

                {/* Info */}
                <div>
                  <Link
                    to={`/products/${product.id}`}
                    className="font-display text-lg font-normal text-ceramic-950 hover:underline leading-tight block mb-0.5"
                  >
                    {product.name}
                  </Link>
                  <p className="text-sm text-ceramic-500 mb-3">{formatPrice(product.price, product.currency)}</p>
                  <button
                    onClick={() => {
                      addToCart(product, 1, {})
                      toast.success(`${product.name} added to cart`)
                    }}
                    className="text-[10px] tracking-[0.15em] uppercase text-ceramic-600 hover:text-ceramic-950 underline underline-offset-4 transition-colors"
                  >
                    {product.customizable ? 'Customise' : 'Add to Cart'}
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
