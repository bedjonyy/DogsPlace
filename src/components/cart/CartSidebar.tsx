import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { formatPrice } from '../../lib/utils'
import { Button } from '../ui/Button'
import toast from 'react-hot-toast'

interface CartSidebarProps {
  open: boolean
  onClose: () => void
}

export function CartSidebar({ open, onClose }: CartSidebarProps) {
  const { items, total, removeFromCart, updateQuantity, clearCart } = useCart()

  const handleCheckout = () => {
    // Shopify checkout integration point
    toast.success('Redirecting to checkout…')
  }

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <motion.aside
            key="drawer"
            role="dialog"
            aria-label="Shopping cart"
            aria-modal="true"
            className="fixed top-0 right-0 bottom-0 w-full max-w-[420px] bg-ceramic-50 z-50 flex flex-col shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-ceramic-200">
              <h2 className="font-display text-xl font-normal text-ceramic-950">Your Cart</h2>
              <button
                onClick={onClose}
                aria-label="Close cart"
                className="text-ceramic-500 hover:text-ceramic-950 transition-colors"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <p className="font-display text-2xl text-ceramic-400">Your cart is empty.</p>
                  <Link
                    to="/ready-to-ship"
                    onClick={onClose}
                    className="text-[11px] tracking-[0.15em] uppercase underline text-ceramic-600 hover:text-ceramic-950 transition-colors"
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col gap-5">
                  {items.map((item) => (
                    <li key={item.product.id} className="flex gap-4">
                      {/* Image */}
                      <div
                        className="w-20 h-20 flex-shrink-0 rounded-sm"
                        style={{ background: 'linear-gradient(145deg, #E8E2D9, #C8BAA2)' }}
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-base text-ceramic-950 leading-tight mb-0.5 truncate">
                          {item.product.name}
                        </p>
                        {item.customization && (
                          <p className="text-xs text-ceramic-500 mb-1">Name: {item.customization}</p>
                        )}
                        <p className="text-sm text-ceramic-600 mb-2">
                          {formatPrice(item.product.price, item.product.currency)}
                        </p>

                        {/* Qty controls */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-ceramic-200">
                            <button
                              onClick={() => {
                                if (item.quantity === 1) removeFromCart(item.product.id)
                                else updateQuantity(item.product.id, item.quantity - 1)
                              }}
                              aria-label={`Decrease quantity of ${item.product.name}`}
                              className="w-7 h-7 flex items-center justify-center text-ceramic-600 hover:bg-ceramic-100 transition-colors"
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-xs tabular-nums text-ceramic-950">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              aria-label={`Increase quantity of ${item.product.name}`}
                              className="w-7 h-7 flex items-center justify-center text-ceramic-600 hover:bg-ceramic-100 transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            aria-label={`Remove ${item.product.name}`}
                            className="text-ceramic-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={14} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>

                      {/* Line total */}
                      <p className="text-sm font-medium text-ceramic-950 flex-shrink-0">
                        {formatPrice(item.product.price * item.quantity, item.product.currency)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-ceramic-200">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-ceramic-600">Subtotal</span>
                  <span className="font-display text-xl text-ceramic-950">{formatPrice(total, 'EUR')}</span>
                </div>
                <Button variant="dark" size="lg" className="w-full mb-3" onClick={handleCheckout}>
                  Checkout
                </Button>
                <button
                  onClick={clearCart}
                  className="w-full text-center text-[10px] tracking-[0.15em] uppercase text-ceramic-400 hover:text-ceramic-700 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
