import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/Button'

type AuthMode = 'login' | 'signup' | 'reset'

interface AuthPageProps {
  mode: 'login' | 'signup'
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function AuthPage({ mode: initialMode }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { login, signup, resetPassword, isLoading } = useAuth()
  const navigate = useNavigate()

  const validate = (): boolean => {
    const next: Record<string, string> = {}
    if (mode === 'signup' && !name.trim()) next.name = 'Name is required.'
    if (!EMAIL_RE.test(email)) next.email = 'Enter a valid email address.'
    if (mode !== 'reset' && password.length < 8) next.password = 'Password must be at least 8 characters.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    try {
      if (mode === 'login') {
        await login(email, password)
        toast.success('Welcome back!')
        navigate('/')
      } else if (mode === 'signup') {
        await signup(name, email, password)
        toast.success('Account created! Welcome to dogsplace.')
        navigate('/')
      } else {
        await resetPassword(email)
        toast.success('Reset link sent — check your inbox.')
        setMode('login')
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <main className="min-h-screen bg-ceramic-50 flex items-center justify-center px-6 py-20">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <Link to="/" className="block font-display text-2xl text-ceramic-950 mb-10 text-center">
          dogsplace.
        </Link>

        {/* Tab switcher (login / signup only) */}
        {mode !== 'reset' && (
          <div className="flex border-b border-ceramic-200 mb-8">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 pb-3 text-[11px] tracking-[0.2em] uppercase transition-colors ${
                mode === 'login'
                  ? 'text-ceramic-950 border-b-2 border-ceramic-950 -mb-px'
                  : 'text-ceramic-400 hover:text-ceramic-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 pb-3 text-[11px] tracking-[0.2em] uppercase transition-colors ${
                mode === 'signup'
                  ? 'text-ceramic-950 border-b-2 border-ceramic-950 -mb-px'
                  : 'text-ceramic-400 hover:text-ceramic-600'
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {mode === 'reset' && (
          <div className="mb-8">
            <h2 className="font-display text-2xl text-ceramic-950 mb-1">Reset password</h2>
            <p className="text-sm text-ceramic-500">Enter your email and we&apos;ll send a reset link.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {/* Name field — signup only */}
          {mode === 'signup' && (
            <div>
              <label htmlFor="name" className="block text-[10px] tracking-[0.15em] uppercase text-ceramic-600 mb-1.5">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: '' })) }}
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                className={`w-full border px-4 py-3 text-sm bg-white text-ceramic-950 placeholder:text-ceramic-400 outline-none focus:border-ceramic-950 transition-colors ${errors.name ? 'border-red-400' : 'border-ceramic-300'}`}
                placeholder="Your name"
              />
              {errors.name && <p id="name-error" className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-[10px] tracking-[0.15em] uppercase text-ceramic-600 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })) }}
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`w-full border px-4 py-3 text-sm bg-white text-ceramic-950 placeholder:text-ceramic-400 outline-none focus:border-ceramic-950 transition-colors ${errors.email ? 'border-red-400' : 'border-ceramic-300'}`}
              placeholder="you@example.com"
            />
            {errors.email && <p id="email-error" className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          {/* Password */}
          {mode !== 'reset' && (
            <div>
              <label htmlFor="password" className="block text-[10px] tracking-[0.15em] uppercase text-ceramic-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })) }}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  className={`w-full border px-4 py-3 pr-12 text-sm bg-white text-ceramic-950 placeholder:text-ceramic-400 outline-none focus:border-ceramic-950 transition-colors ${errors.password ? 'border-red-400' : 'border-ceramic-300'}`}
                  placeholder={mode === 'signup' ? 'At least 8 characters' : '••••••••'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-ceramic-400 hover:text-ceramic-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p id="password-error" className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>
          )}

          {/* Forgot password link */}
          {mode === 'login' && (
            <button
              type="button"
              onClick={() => setMode('reset')}
              className="text-[11px] text-ceramic-500 hover:text-ceramic-950 transition-colors text-right underline"
            >
              Forgot password?
            </button>
          )}

          <Button type="submit" variant="dark" size="lg" disabled={isLoading} className="mt-2 w-full">
            {isLoading
              ? 'Please wait…'
              : mode === 'login'
              ? 'Login'
              : mode === 'signup'
              ? 'Create Account'
              : 'Send Reset Link'}
          </Button>
        </form>

        {/* Back to login from reset */}
        {mode === 'reset' && (
          <button
            onClick={() => setMode('login')}
            className="block text-center mt-4 text-[11px] text-ceramic-500 hover:text-ceramic-950 underline transition-colors"
          >
            Back to login
          </button>
        )}
      </motion.div>
    </main>
  )
}
