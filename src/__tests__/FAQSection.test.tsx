import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { FAQSection } from '../components/home/FAQSection'

describe('FAQSection', () => {
  it('renders the section heading', () => {
    render(<FAQSection />)
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument()
  })

  it('renders all FAQ questions', () => {
    render(<FAQSection />)
    expect(screen.getByText('What can you make me?')).toBeInTheDocument()
    expect(screen.getByText('What are the sizes that you offer?')).toBeInTheDocument()
    expect(screen.getByText('How do we customise?')).toBeInTheDocument()
  })

  it('answers are not in the document initially (AnimatePresence removes them)', () => {
    render(<FAQSection />)
    const answer = screen.queryByText(/We specialise in handmade ceramic dog bowls/)
    // AnimatePresence unmounts collapsed panels — element should be absent
    expect(answer).not.toBeInTheDocument()
  })

  it('reveals an answer when the question is clicked', async () => {
    const user = userEvent.setup()
    render(<FAQSection />)

    const question = screen.getByText('What can you make me?')
    await user.click(question)

    // After clicking, AnimatePresence mounts the answer panel into the DOM
    const answer = screen.getByText(/We specialise in handmade ceramic dog bowls/)
    expect(answer).toBeInTheDocument()
  })

  it('collapses an open answer when clicked again', async () => {
    const user = userEvent.setup()
    render(<FAQSection />)

    const question = screen.getByText('What can you make me?')
    await user.click(question)
    // Confirm it appeared
    expect(screen.getByText(/We specialise in handmade ceramic dog bowls/)).toBeInTheDocument()

    await user.click(question)
    // After second click, AnimatePresence begins exit — it may still be mounted during
    // the exit animation; verify the toggle state via aria-expanded
    expect(question.closest('button')).toHaveAttribute('aria-expanded', 'false')
  })
})
