import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

const SHOP_LINKS = [
  { label: 'custom bowls', href: '/customise' },
  { label: 'in stock', href: '/ready-to-ship' },
  { label: 'bespoke', href: '/customise' },
  { label: 'get notified', href: '/signup' },
]

const HELPFUL_LINKS = [
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Returns Policy', href: '/returns' },
  { label: 'Feedback', href: '/feedback' },
]

const LEARN_LINKS = [
  { label: 'How it Works', href: '/idea-hub' },
  { label: 'About Us', href: '/about' },
  { label: 'How To Customise', href: '/idea-hub' },
  { label: 'Reviews', href: '/#testimonials' },
  { label: 'Track Your Custom Order', href: '/track' },
]

export function Footer() {
  const [email, setEmail] = useState('')

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    toast.success('You\'re on the list!')
    setEmail('')
  }

  return (
    <footer className="bg-white border-t border-ceramic-200">
      <div className="max-w-screen-xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Shop */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-ceramic-950 mb-4">Shop</p>
            <ul className="flex flex-col gap-2.5">
              {SHOP_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="font-handwritten text-base text-ceramic-600 hover:text-ceramic-950 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Helpful links */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-ceramic-950 mb-4">Helpful Links</p>
            <ul className="flex flex-col gap-2.5">
              {HELPFUL_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="font-handwritten text-base text-ceramic-600 hover:text-ceramic-950 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn more */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-ceramic-950 mb-4">Learn More</p>
            <ul className="flex flex-col gap-2.5">
              {LEARN_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="font-handwritten text-base text-ceramic-600 hover:text-ceramic-950 transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sign up */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-ceramic-950 mb-4">Sign Up</p>
            <p className="font-handwritten text-base text-ceramic-600 mb-4 leading-relaxed">
              Stay up to date with the new drops, mystery boxes and more.
            </p>
            <form onSubmit={handleSignup} className="flex border border-ceramic-300">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                aria-label="Email for newsletter"
                className="flex-1 px-3 py-2 text-sm bg-transparent outline-none placeholder:text-ceramic-400 text-ceramic-950"
                required
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="px-3 text-ceramic-950 hover:bg-ceramic-100 transition-colors border-l border-ceramic-300"
              >
                <ArrowRight size={14} strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-ceramic-100 flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="font-display text-lg text-ceramic-950">dogsplace.</span>
          <p className="text-xs text-ceramic-500">© {new Date().getFullYear()} dogsplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
