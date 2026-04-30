/**
 * CartContext — shopping cart state via useReducer.
 *
 */
import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { CartItem, Product } from '../types'

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD'; product: Product; quantity: number; variants: Record<string, string>; customization?: string }
  | { type: 'REMOVE'; productId: string }
  | { type: 'UPDATE_QTY'; productId: string; quantity: number }
  | { type: 'CLEAR' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.findIndex((i) => i.product.id === action.product.id)
      if (existing !== -1) {
        // Existing item — increment quantity rather than adding a duplicate line
        const updated = [...state.items]
        updated[existing] = { ...updated[existing], quantity: updated[existing].quantity + action.quantity }
        return { items: updated }
      }
      return {
        items: [
          ...state.items,
          { product: action.product, quantity: action.quantity, selectedVariants: action.variants, customization: action.customization },
        ],
      }
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.product.id !== action.productId) }
    case 'UPDATE_QTY':
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  /** Total number of individual units across all line items */
  count: number
  /** Sum of (price × quantity) for all items, in EUR */
  total: number
  addToCart: (product: Product, quantity: number, variants: Record<string, string>, customization?: string) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  // Derived — recomputed on every render from the source-of-truth items array
  const count = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const total = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  const addToCart = (product: Product, quantity: number, variants: Record<string, string>, customization?: string) =>
    dispatch({ type: 'ADD', product, quantity, variants, customization })

  const removeFromCart = (productId: string) => dispatch({ type: 'REMOVE', productId })

  const updateQuantity = (productId: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QTY', productId, quantity })

  const clearCart = () => dispatch({ type: 'CLEAR' })

  return (
    <CartContext.Provider value={{ items: state.items, count, total, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

/** useCart — consume cart state. Throws if used outside CartProvider. */
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
