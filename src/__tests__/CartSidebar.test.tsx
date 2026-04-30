import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider, useCart } from '../contexts/CartContext'
import { AuthProvider } from '../contexts/AuthContext'
import { CartSidebar } from '../components/cart/CartSidebar'
import type { Product } from '../types'

vi.mock('react-hot-toast', () => ({ default: { success: vi.fn(), error: vi.fn() } }))

const mockProduct: Product = {
  id: 'bowl-1',
  name: 'Classic Bowl',
  category: 'dog-bowl',
  price: 45,
  currency: 'EUR',
  description: '',
  details: '',
  variants: [],
  isNew: false,
  inStock: true,
  customizable: false,
  tags: [],
  bgClass: 'bg-ceramic-200',
}

function AddToCartButton() {
  const { addToCart } = useCart()
  return (
    <button data-testid="add-btn" onClick={() => addToCart(mockProduct, 2, {})}>
      Add
    </button>
  )
}

function TestHarness({ open = true, onClose = vi.fn() } = {}) {
  return (
    <MemoryRouter>
      <AuthProvider>
        <CartProvider>
          <AddToCartButton />
          <CartSidebar open={open} onClose={onClose} />
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('CartSidebar', () => {
  it('renders nothing when closed', () => {
    render(<TestHarness open={false} />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('shows the cart heading when open', () => {
    render(<TestHarness />)
    expect(screen.getByRole('dialog', { name: /shopping cart/i })).toBeInTheDocument()
    expect(screen.getByText('Your Cart')).toBeInTheDocument()
  })

  it('shows empty state when cart has no items', () => {
    render(<TestHarness />)
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /shop now/i })).toBeInTheDocument()
  })

  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<TestHarness onClose={onClose} />)

    await user.click(screen.getByRole('button', { name: /close cart/i }))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('shows product name and price after adding an item', async () => {
    const user = userEvent.setup()
    render(<TestHarness />)

    await user.click(screen.getByTestId('add-btn'))

    expect(screen.getByText('Classic Bowl')).toBeInTheDocument()
    // formatPrice uses de-DE locale: "45,00 €"
    expect(screen.getByText(/45[,.]00/)).toBeInTheDocument()
  })

  it('shows the checkout and clear cart buttons when items are present', async () => {
    const user = userEvent.setup()
    render(<TestHarness />)

    await user.click(screen.getByTestId('add-btn'))

    expect(screen.getByRole('button', { name: /checkout/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /clear cart/i })).toBeInTheDocument()
  })

  it('removes an item when the remove button is clicked', async () => {
    const user = userEvent.setup()
    render(<TestHarness />)

    await user.click(screen.getByTestId('add-btn'))
    expect(screen.getByText('Classic Bowl')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /remove classic bowl/i }))
    expect(screen.queryByText('Classic Bowl')).not.toBeInTheDocument()
    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument()
  })
})
