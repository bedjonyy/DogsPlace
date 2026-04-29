/**
 * Accordion — accessible expand/collapse used in FAQSection.
 *
 * Behaviour:
 *   - Only one item open at a time (openIndex tracks which one).
 *   - Clicking an open item closes it (toggle: openIndex === i ? null : i).
 *   - AnimatePresence + motion.div provides a height animation without needing
 *     a fixed height — Framer Motion can animate to "auto" height.
 *   - aria-expanded on the trigger button communicates open/close state to
 *     screen readers without relying on visual cues alone.
 *
 * AccordionRow is kept private (not exported) because it is only meaningful
 * inside the Accordion composition.
 */
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

interface AccordionRowProps {
  item: AccordionItem
  open: boolean
  onToggle: () => void
}

function AccordionRow({ item, open, onToggle }: AccordionRowProps) {
  return (
    <div className="border-b border-ceramic-200">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-4 text-left gap-4 group"
      >
        <span className="font-handwritten text-lg text-ceramic-800 group-hover:text-ceramic-950 transition-colors">
          {item.question}
        </span>
        {/* Icon swaps between Plus and Minus to reinforce the open/closed state visually */}
        <span className="flex-shrink-0 text-ceramic-600">
          {open ? <Minus size={14} strokeWidth={1.5} /> : <Plus size={14} strokeWidth={1.5} />}
        </span>
      </button>

      {/*
        AnimatePresence with initial={false} skips the mount animation on first render
        so items appear closed without an animation flash on page load.
      */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p className="pb-4 text-sm text-ceramic-600 leading-relaxed">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className={cn('w-full', className)}>
      {items.map((item, i) => (
        <AccordionRow
          key={item.question}
          item={item}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  )
}
