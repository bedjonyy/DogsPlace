import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export function Newsletter() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      toast.error('Please fill in both fields.')
      return
    }
    toast.success(`Welcome, ${name}! You're on the list.`)
    setName('')
    setEmail('')
  }

  return (
    <section className="bg-ceramic-50 py-20 px-6 border-t border-ceramic-200" aria-labelledby="newsletter-heading">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Left */}
          <div className="md:max-w-xs">
            <h2 id="newsletter-heading" className="font-display text-3xl font-normal text-ceramic-950 mb-2">
              Newsletter
            </h2>
            <p className="font-handwritten text-lg text-ceramic-600 italic leading-relaxed">
              Sign up for exclusive deals and early access to new products.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 md:max-w-xl flex flex-col gap-3"
            noValidate
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                aria-label="Your name"
                required
                className="flex-1 border border-ceramic-300 px-4 py-3 text-sm text-ceramic-950 placeholder:text-ceramic-400 bg-white outline-none focus:border-ceramic-950 transition-colors"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                aria-label="Your email address"
                required
                className="flex-1 border border-ceramic-300 px-4 py-3 text-sm text-ceramic-950 placeholder:text-ceramic-400 bg-white outline-none focus:border-ceramic-950 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-ceramic-950 text-ceramic-50 py-3 text-[11px] tracking-[0.25em] uppercase font-medium hover:bg-ceramic-800 transition-colors"
            >
              Sign Up
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
