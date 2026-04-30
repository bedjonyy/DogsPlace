import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CartProvider, useCart } from '../contexts/CartContext'
import type { Product } from '../types'

const mockProduct: Product = {
  id: 'test-bowl',
  name: 'Test Bowl',
  category: 'dog-bowl',
  price: 29.99,
  currency: 'EUR',
  description: 'A test bowl',
  details: '',
  variants: [],
  isNew: false,
  inStock: true,
  customizable: false,
  tags: [],
  bgClass: 'bg-ceramic-200',
}

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
)

describe('CartContext', () => {
  it('starts with an empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.items).toHaveLength(0)
    expect(result.current.total).toBe(0)
  })

  it('adds an item to the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addToCart(mockProduct, 1, {})
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].product.id).toBe('test-bowl')
    expect(result.current.items[0].quantity).toBe(1)
  })

  it('increments quantity when adding the same product twice', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addToCart(mockProduct, 1, {})
      result.current.addToCart(mockProduct, 1, {})
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
  })

  it('removes an item from the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addToCart(mockProduct, 1, {})
    })
    act(() => {
      result.current.removeFromCart('test-bowl')
    })

    expect(result.current.items).toHaveLength(0)
  })

  it('calculates the correct total', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addToCart(mockProduct, 3, {})
    })

    expect(result.current.total).toBeCloseTo(89.97)
  })

  it('returns the correct item count', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addToCart(mockProduct, 2, {})
    })

    expect(result.current.count).toBe(2)
  })

  it('clears the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.addToCart(mockProduct, 2, {})
    })
    act(() => {
      result.current.clearCart()
    })

    expect(result.current.items).toHaveLength(0)
    expect(result.current.total).toBe(0)
  })
})
