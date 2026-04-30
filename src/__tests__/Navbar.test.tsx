import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../contexts/CartContext'
import { AuthProvider } from '../contexts/AuthContext'
import { Navbar } from '../components/layout/Navbar'

function renderNavbar(path = '/', onCartClick = vi.fn()) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AuthProvider>
        <CartProvider>
          <Navbar onCartClick={onCartClick} />
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('Navbar', () => {
  it('renders the brand logo link', () => {
    renderNavbar()
    expect(screen.getByRole('link', { name: /dogsplace. home/i })).toBeInTheDocument()
  })

  it('renders all desktop nav links', () => {
    renderNavbar()
    expect(screen.getByRole('link', { name: /customise/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ready to ship/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /clay dates/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /idea hub/i })).toBeInTheDocument()
  })

  it('shows login link when user is not authenticated', () => {
    renderNavbar()
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument()
  })

  it('shows cart button', () => {
    renderNavbar()
    expect(screen.getByRole('button', { name: /cart/i })).toBeInTheDocument()
  })

  it('calls onCartClick when cart button is pressed', async () => {
    const user = userEvent.setup()
    const onCartClick = vi.fn()
    renderNavbar('/', onCartClick)

    await user.click(screen.getByRole('button', { name: /cart/i }))
    expect(onCartClick).toHaveBeenCalledOnce()
  })

  it('opens the mobile menu and shows navigation links', async () => {
    const user = userEvent.setup()
    renderNavbar()

    const menuBtn = screen.getByRole('button', { name: /open menu/i })
    expect(menuBtn).toHaveAttribute('aria-expanded', 'false')

    await user.click(menuBtn)

    expect(screen.getByRole('button', { name: /close menu/i })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: /mobile navigation/i })).toBeInTheDocument()
  })

  it('closes the mobile menu when the close button is clicked', async () => {
    const user = userEvent.setup()
    renderNavbar()

    await user.click(screen.getByRole('button', { name: /open menu/i }))
    const closeBtn = screen.getByRole('button', { name: /close menu/i })
    await user.click(closeBtn)

    // Button aria-expanded reflects closed state immediately; framer-motion
    // may keep the nav in the DOM during its exit animation so we test state
    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute('aria-expanded', 'false')
  })

  it('always shows a solid background on non-home pages', () => {
    renderNavbar('/about')
    const header = screen.getByRole('banner')
    expect(header.className).toMatch(/bg-ceramic-50/)
  })
})
