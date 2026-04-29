/**
 * Application entry point.
 *
 * Provider order matters:
 *   BrowserRouter → AuthProvider → CartProvider → App
 *
 * BrowserRouter must wrap everything that uses React Router hooks.
 * AuthProvider is outermost so CartProvider can access user state if needed.
 * CartProvider wraps App so the CartSidebar (rendered inside App) can read cart state.
 * Toaster sits at the root level so toast notifications overlay any page content.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import App from './App'
import './index.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                background: '#1A1908',  // ceramic-950 — matches the dark button colour
                color: '#FAFAF8',
                borderRadius: '0',      // square corners match the no-radius design system
              },
            }}
          />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
