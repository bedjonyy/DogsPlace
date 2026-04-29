import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Clock } from 'lucide-react'
import toast from 'react-hot-toast'

const CONTACT_DETAILS = {
  studio: 'DOGSPLACE STUDIO, UNIT 1, CERAMIC QUARTER,\nYOUR CITY, CF37 1LT, UK',
  instagram: '@dogsplacestudio',
  email: 'hello@dogsplace.com',
  hours: 'MON – FRI',
}

export function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in all fields.')
      return
    }
    setSending(true)
    await new Promise((r) => setTimeout(r, 800))
    setSending(false)
    toast.success('Message sent! We\'ll be in touch soon.')
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <main className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section
        className="relative h-[55vh] min-h-[420px] overflow-hidden"
        aria-labelledby="contact-hero-heading"
      >
        {/* Placeholder — draped fabric / ceramic texture */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 30% 50%, #C8C2B8 0%, #A8A29A 35%, #888278 65%, #6C6860 100%)',
          }}
        >
          {/* Fabric-fold suggestion */}
          {[
            { x: '8%', y: '10%', w: '30%', rot: '-12deg', op: 0.15 },
            { x: '25%', y: '30%', w: '45%', rot: '5deg', op: 0.12 },
            { x: '55%', y: '5%', w: '25%', rot: '-6deg', op: 0.1 },
            { x: '65%', y: '50%', w: '35%', rot: '10deg', op: 0.14 },
          ].map((f, i) => (
            <div
              key={i}
              className="absolute border border-white"
              style={{
                left: f.x,
                top: f.y,
                width: f.w,
                height: '40%',
                transform: `rotate(${f.rot})`,
                opacity: f.op,
                borderRadius: '40% 60% 55% 45% / 50% 40% 60% 50%',
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <motion.p
            className="text-white/70 text-[10px] tracking-[0.3em] uppercase mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Welcome to
          </motion.p>
          <motion.h1
            id="contact-hero-heading"
            className="font-display text-white font-normal leading-none mb-4"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            Contact
          </motion.h1>
          <motion.p
            className="font-handwritten italic text-white/80 max-w-lg"
            style={{ fontSize: 'clamp(0.9rem, 2vw, 1.25rem)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            You can contact us using our chat system or pop us an email and we will get back to you within our opening times.
          </motion.p>
        </div>
      </section>

      {/* ── Contact details + image ── */}
      <section className="bg-white px-6 py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          {/* Left — details */}
          <motion.div
            className="md:pt-20"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] tracking-[0.25em] uppercase text-ceramic-500 mb-5">
              Our Stores
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-normal text-ceramic-950 mb-8">
              Contact Details
            </h2>

            <address className="not-italic space-y-5">
              <p className="text-sm font-medium text-ceramic-950 leading-relaxed whitespace-pre-line uppercase tracking-wide">
                {CONTACT_DETAILS.studio}
              </p>

              <div className="space-y-2">
                <a
                  href={`https://instagram.com/${CONTACT_DETAILS.instagram.slice(1)}`}
                  className="flex items-center gap-2 font-handwritten italic text-lg text-ceramic-600 hover:text-ceramic-950 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  {CONTACT_DETAILS.instagram}
                </a>

                <a
                  href={`mailto:${CONTACT_DETAILS.email}`}
                  className="flex items-center gap-2 font-handwritten italic text-lg text-ceramic-600 hover:text-ceramic-950 transition-colors"
                >
                  <Mail size={14} strokeWidth={1.5} />
                  {CONTACT_DETAILS.email}
                </a>

                <p className="flex items-center gap-2 font-handwritten italic text-lg text-ceramic-500">
                  <Clock size={14} strokeWidth={1.5} />
                  {CONTACT_DETAILS.hours}
                </p>
              </div>
            </address>
          </motion.div>

          {/* Right — image placeholder */}
          <motion.div
            className="aspect-[4/5] rounded-sm overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background:
                'linear-gradient(150deg, #C8C2B8 0%, #A8A29A 40%, #888278 100%)',
            }}
            role="img"
            aria-label="Ceramic dog bowls studio photograph"
          >
            {/* Bowl silhouettes on slab */}
            <div className="w-full h-full flex items-end justify-center gap-8 pb-10 px-8">
              {[
                { w: '38%', h: '28%' },
                { w: '30%', h: '22%' },
                { w: '22%', h: '18%' },
              ].map((b, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 rounded-full border-2 border-white/40 opacity-50"
                  style={{ width: b.w, height: b.h }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Contact form ── */}
      <section
        className="bg-ceramic-50 px-6 py-16 md:py-20 border-t border-ceramic-200"
        aria-labelledby="contact-form-heading"
      >
        <div className="max-w-xl mx-auto">
          <motion.h2
            id="contact-form-heading"
            className="font-display text-3xl md:text-4xl font-normal text-ceramic-950 text-center mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Contact us
          </motion.h2>

          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            noValidate
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              aria-label="Your name"
              required
              className="w-full border border-ceramic-200 rounded-sm px-5 py-4 text-sm font-handwritten italic text-ceramic-950 placeholder:text-ceramic-400 bg-white outline-none focus:border-ceramic-950 transition-colors"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              aria-label="Your email"
              required
              className="w-full border border-ceramic-200 rounded-sm px-5 py-4 text-sm font-handwritten italic text-ceramic-950 placeholder:text-ceramic-400 bg-white outline-none focus:border-ceramic-950 transition-colors"
            />

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              aria-label="Your message"
              required
              rows={8}
              className="w-full border border-ceramic-200 rounded-sm px-5 py-4 text-sm font-handwritten italic text-ceramic-950 placeholder:text-ceramic-400 bg-white outline-none focus:border-ceramic-950 transition-colors resize-y"
            />

            <button
              type="submit"
              disabled={sending}
              className="self-start bg-ceramic-950 text-ceramic-50 px-8 py-3 text-[11px] tracking-[0.25em] uppercase hover:bg-ceramic-800 transition-colors disabled:opacity-50"
            >
              {sending ? 'Sending…' : 'Send'}
            </button>
          </motion.form>
        </div>
      </section>
    </main>
  )
}
