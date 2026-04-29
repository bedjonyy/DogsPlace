/**
 * App — router shell.
 *
 * CartSidebar lives here (not inside a route) so it can slide in over any page
 * without unmounting when the route changes. Its open state is managed here and
 * passed down via onCartClick to the Navbar.
 *
 * All route paths mirror the Shopify Liquid page handles used in production:
 *   /customise       → customise page
 *   /ready-to-ship   → collection page
 *   /clay-dates      → clay dates page
 *   /idea-hub        → blog/journal page
 *   /products/:id    → individual product handle
 *   /about           → about-us page
 *   /contact         → contact page
 */
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { CartSidebar } from './components/cart/CartSidebar'
import { HomePage } from './pages/HomePage'
import { AuthPage } from './pages/AuthPage'
import { ProductsPage } from './pages/ProductsPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { useState } from 'react'

export default function App() {
  // cartOpen lives here so both Navbar (cart icon) and CartSidebar share the same state
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <>
      <Navbar onCartClick={() => setCartOpen(true)} />
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/signup" element={<AuthPage mode="signup" />} />
        {/* ProductsPage reuses the same component; the filter prop controls what is shown */}
        <Route path="/customise" element={<ProductsPage filter="custom" />} />
        <Route path="/ready-to-ship" element={<ProductsPage filter="ready" />} />
        <Route path="/release-dates" element={<ProductsPage filter="all" />} />
        <Route path="/vision-hub" element={<ProductsPage filter="all" />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </>
  )
}
