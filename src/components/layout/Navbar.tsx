/**
 * Navbar — fixed site header.
 *
 */
import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'
import { NAV_LINKS } from '../../constants'
import { cn } from '../../lib/utils'

interface NavbarProps {
  onCartClick: () => void
}

export function Navbar({ onCartClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { count } = useCart()
  const { user, logout } = useAuth()
  const { pathname } = useLocation()

  // Only the home page has a full-screen dark hero that the transparent navbar sits over.
  // Every other page has a light background, so the navbar must always be solid there.
  const isHome = pathname === '/'

  useEffect(() => {
    // passive: true tells the browser this listener won't call preventDefault,
    // allowing it to optimise scroll performance on mobile.
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // On non-home pages, treat the navbar as always-scrolled so it shows the solid style.
  const isSolid = scrolled || !isHome

  const navBase = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    isSolid ? 'bg-ceramic-50 border-b border-ceramic-200' : 'bg-transparent'
  )

  const linkColor = isSolid ? 'text-ceramic-950' : 'text-white'
  const iconColor = isSolid ? 'text-ceramic-950' : 'text-white'

  return (
    <header className={navBase} role="banner">
      <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className={cn('font-display text-xl font-normal tracking-tight transition-colors', linkColor)}
          aria-label="dogsplace. home"
        >
          dogsplace.
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={cn(
                'text-[10px] tracking-[0.2em] uppercase font-medium transition-opacity hover:opacity-60',
                linkColor
              )}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button aria-label="Search" className={cn('transition-opacity hover:opacity-60', iconColor)}>
            <Search size={18} strokeWidth={1.5} />
          </button>

          {/* Show logout icon when logged in, login link when not */}
          {user ? (
            <button
              onClick={logout}
              aria-label="Account"
              className={cn('transition-opacity hover:opacity-60', iconColor)}
            >
              <User size={18} strokeWidth={1.5} />
            </button>
          ) : (
            <Link to="/login" aria-label="Login" className={cn('transition-opacity hover:opacity-60', iconColor)}>
              <User size={18} strokeWidth={1.5} />
            </Link>
          )}

          <button
            onClick={onCartClick}
            aria-label={`Cart, ${count} item${count !== 1 ? 's' : ''}`}
            className={cn('relative transition-opacity hover:opacity-60', iconColor)}
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-ceramic-950 text-ceramic-50 text-[9px] flex items-center justify-center rounded-full font-medium">
                {count}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            className={cn('md:hidden transition-opacity hover:opacity-60', iconColor)}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile menu — animates height from 0 to auto */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-ceramic-50 border-t border-ceramic-200 overflow-hidden"
          >
            <nav className="px-6 py-6 flex flex-col gap-5" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[11px] tracking-[0.2em] uppercase font-medium text-ceramic-950 hover:opacity-60 transition-opacity"
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
