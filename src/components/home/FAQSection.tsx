import { motion } from 'framer-motion'
import { Accordion } from '../ui/Accordion'
import { FAQS } from '../../constants'

export function FAQSection() {
  const half = Math.ceil(FAQS.length / 2)
  const leftFaqs = FAQS.slice(0, half)
  const rightFaqs = FAQS.slice(half)

  return (
    <section id="faq" className="bg-white py-20 px-6" aria-labelledby="faq-heading">
      <div className="max-w-screen-xl mx-auto">
        <motion.h2
          id="faq-heading"
          className="font-display text-3xl md:text-4xl font-normal text-ceramic-950 text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-x-16">
          <Accordion items={leftFaqs} />
          <Accordion items={rightFaqs} />
        </div>
      </div>
    </section>
  )
}
