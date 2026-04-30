import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthContext'
import { AuthPage } from '../pages/AuthPage'

vi.mock('react-hot-toast', () => ({ default: { success: vi.fn(), error: vi.fn() } }))
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>()
  return { ...actual, useNavigate: () => vi.fn() }
})

function renderAuth(mode: 'login' | 'signup' = 'login') {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <AuthPage mode={mode} />
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('AuthPage — login mode', () => {
  it('renders email and password fields', () => {
    renderAuth('login')
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    // Use selector to target only the input, not the "Show password" button
    expect(screen.getByLabelText(/^password$/i, { selector: 'input' })).toBeInTheDocument()
  })

  it('shows login submit button', () => {
    renderAuth('login')
    expect(screen.getByText('Login', { selector: 'button[type="submit"]' })).toBeInTheDocument()
  })

  it('does not render the name field', () => {
    renderAuth('login')
    expect(screen.queryByLabelText(/full name/i)).not.toBeInTheDocument()
  })

  it('shows validation error for empty email on submit', async () => {
    const user = userEvent.setup()
    renderAuth('login')

    await user.click(screen.getByText('Login', { selector: 'button[type="submit"]' }))
    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument()
  })

  it('shows validation error when password is fewer than 8 characters', async () => {
    const user = userEvent.setup()
    renderAuth('login')

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/^password$/i, { selector: 'input' }), 'short')
    await user.click(screen.getByText('Login', { selector: 'button[type="submit"]' }))

    expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument()
  })

  it('clears the email error when the field is edited', async () => {
    const user = userEvent.setup()
    renderAuth('login')

    await user.click(screen.getByText('Login', { selector: 'button[type="submit"]' }))
    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument()

    await user.type(screen.getByLabelText(/email/i), 'a')
    expect(screen.queryByText(/enter a valid email address/i)).not.toBeInTheDocument()
  })

  it('switches to forgot password view', async () => {
    const user = userEvent.setup()
    renderAuth('login')

    await user.click(screen.getByRole('button', { name: /forgot password/i }))
    expect(screen.getByText(/reset password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument()
  })
})

describe('AuthPage — signup mode', () => {
  it('renders the full name field', () => {
    renderAuth('signup')
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
  })

  it('shows create account submit button', () => {
    renderAuth('signup')
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
  })

  it('shows validation error when name is empty', async () => {
    const user = userEvent.setup()
    renderAuth('signup')

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/^password$/i, { selector: 'input' }), 'password123')
    await user.click(screen.getByText('Create Account', { selector: 'button[type="submit"]' }))

    expect(screen.getByText(/name is required/i)).toBeInTheDocument()
  })
})

describe('AuthPage — reset mode (via forgot password)', () => {
  it('sends reset link without a password field', async () => {
    const user = userEvent.setup()
    renderAuth('login')

    await user.click(screen.getByRole('button', { name: /forgot password/i }))
    expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send reset link/i })).toBeInTheDocument()
  })

  it('shows validation error for invalid email in reset mode', async () => {
    const user = userEvent.setup()
    renderAuth('login')

    await user.click(screen.getByRole('button', { name: /forgot password/i }))
    await user.click(screen.getByText('Send Reset Link', { selector: 'button[type="submit"]' }))

    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument()
  })

  it('navigates back to login from reset view', async () => {
    const user = userEvent.setup()
    renderAuth('login')

    await user.click(screen.getByRole('button', { name: /forgot password/i }))
    await user.click(screen.getByRole('button', { name: /back to login/i }))

    expect(screen.getByText('Login', { selector: 'button[type="submit"]' })).toBeInTheDocument()
  })
})
