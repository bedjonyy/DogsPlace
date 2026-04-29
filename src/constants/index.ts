/**
 * Static application data — products, categories, FAQs, testimonials, nav links.
 *
 * In production these arrays are replaced by Shopify Storefront API responses.
 * The shape of each object mirrors the Shopify Product/Metafield schema so the
 * UI components need no changes when the data source is swapped.
 *
 * bgClass on each product is a Tailwind class used as the image placeholder.
 * When real Shopify product images are wired up, bgClass can be removed.
 */
import type { Product, Category, FAQItem, Testimonial } from '../types'

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Customise', href: '/customise' },
  { label: 'Ready to Ship', href: '/ready-to-ship' },
  { label: 'Release Dates', href: '/release-dates' },
  { label: 'Vision Hub', href: '/vision-hub' },
] as const

export const PRODUCTS: Product[] = [
  {
    id: 'ultimate-custom-pet-bowl',
    name: 'Ultimate Custom Pet Bowl',
    category: 'dog-bowl',
    price: 41.95,
    currency: 'EUR',
    description: 'Handmade custom pet bowl. Select your gems and personalise the text. ONE SIZE Width 44cm, Height 5cm, Circ 47cm',
    details: 'Each bowl is individually hand-thrown and hand-painted. Allow 4–6 weeks for production.',
    variants: [
      { id: 'inscription', name: 'Inscription', type: 'inscription', options: [] },
      { id: 'gem', name: 'Gem Detail', type: 'gem', options: ['None', 'Pearl', 'Ruby', 'Sapphire', 'Emerald'] },
    ],
    isNew: true,
    inStock: true,
    customizable: true,
    tags: ['bestseller', 'custom', 'personalised'],
    bgClass: 'bg-ceramic-200',
  },
  {
    id: 'classic-ceramic-bowl',
    name: 'Classic Ceramic Bowl',
    category: 'dog-bowl',
    price: 32.00,
    currency: 'EUR',
    description: 'A timeless handmade ceramic bowl with a hand-stamped paw print motif. Ready to ship.',
    details: 'Dishwasher safe. Width 38cm, Height 4.5cm.',
    variants: [
      { id: 'size', name: 'Size', type: 'size', options: ['Small', 'Medium', 'Large'] },
    ],
    isNew: false,
    inStock: true,
    customizable: false,
    tags: ['ready-to-ship', 'classic'],
    bgClass: 'bg-ceramic-100',
  },
  {
    id: 'pet-trinket',
    name: 'Custom Pet Trinket',
    category: 'trinket',
    price: 22.50,
    currency: 'EUR',
    description: 'A miniature ceramic trinket dish with your pet\'s name. Perfect as a gift.',
    details: 'Handmade. Approx 8cm diameter.',
    variants: [
      { id: 'inscription', name: 'Inscription', type: 'inscription', options: [] },
    ],
    isNew: false,
    inStock: true,
    customizable: true,
    tags: ['trinket', 'gift', 'custom'],
    bgClass: 'bg-ceramic-300',
  },
  {
    id: 'wavy-edge-bowl',
    name: 'Wavy Edge Dog Bowl',
    category: 'dog-bowl',
    price: 38.00,
    currency: 'EUR',
    description: 'A sculptural wavy-rim bowl, hand-shaped for a one-of-a-kind look. Ready to ship.',
    details: 'Each piece varies slightly. Width 40cm, Height 5cm.',
    variants: [
      { id: 'size', name: 'Size', type: 'size', options: ['Medium', 'Large'] },
    ],
    isNew: true,
    inStock: true,
    customizable: false,
    tags: ['ready-to-ship', 'sculptural', 'new'],
    bgClass: 'bg-ceramic-200',
  },
]

export const CATEGORIES: Category[] = [
  {
    id: 'idea-hub',
    title: 'THE IDEA HUB',
    label: 'Everything you need to know',
    cta: 'LEMME SEE',
    ctaLink: '/idea-hub',
    bgClass: 'bg-ceramic-600',
    textColor: 'text-white',
  },
  {
    id: 'pet-drop',
    title: 'PET DROP',
    label: 'Get making',
    cta: 'SHOP NOW',
    ctaLink: '/ready-to-ship',
    bgClass: 'bg-ceramic-300',
    textColor: 'text-ceramic-950',
  },
  {
    id: 'bowl-muse',
    title: 'BOWL MUSE',
    label: 'Find your next naetive',
    cta: 'LOOK HERE',
    ctaLink: '/idea-hub',
    bgClass: 'bg-ceramic-500',
    textColor: 'text-white',
  },
  {
    id: 'paint-your-own',
    title: 'PAINT YOUR OWN',
    label: 'Get creative',
    cta: 'BUY NOW',
    ctaLink: '/clay-dates',
    bgClass: 'bg-ceramic-100',
    textColor: 'text-ceramic-950',
  },
]

export const FAQS: FAQItem[] = [
  {
    question: 'What can you make me?',
    answer: 'We specialise in handmade ceramic dog bowls and pet accessories. We can customise with your pet\'s name, paw prints, gem details, and more.',
  },
  {
    question: 'What are the sizes that you offer?',
    answer: 'Our bowls come in Small (suitable for cats and small dogs), Medium (for medium breeds), and Large (for large breeds). Custom sizes are also available on request.',
  },
  {
    question: 'I have an idea but can\'t see it here.',
    answer: 'We love a bespoke brief! Reach out via our contact page and we\'ll work with you to bring your vision to life.',
  },
  {
    question: 'How often do you restock?',
    answer: 'Ready-to-ship items are restocked every few weeks. Sign up to our newsletter to be the first to know about new drops.',
  },
  {
    question: 'How do we customise?',
    answer: 'Simply select the customise option on any product, enter your pet\'s name and any other personalisation details, and we\'ll hand-paint it just for you.',
  },
  {
    question: 'I need more information.',
    answer: 'Drop us an email or use our contact form. We aim to reply within 24 hours and are happy to help with any questions.',
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: 'Working with dogsplace. on a gifting campaign was a pleasure. Nothing was too much hassle or stress and the whole experience from start to finish was positive. The product was produced exactly how we visioned it to be.',
    author: 'Marketing Director',
    role: 'SPACENK',
  },
  {
    id: '2',
    quote: 'The quality of the bowls is absolutely incredible. Our dog Bruno has his name on his bowl and it is the most beautiful thing in our kitchen.',
    author: 'Jane M.',
    role: 'Verified Customer',
  },
  {
    id: '3',
    quote: 'We gifted a custom clay date to our whole team and it was the best afternoon we\'ve spent together. The bowls we made are proudly on display in our office.',
    author: 'John Doe T.',
    role: 'REFY',
  },
]

export const BRAND_LOGOS = ['BRAND1', 'BRAND2', 'BRAND3'] as const

/** How many hours from "now" the limited-drop countdown targets */
export const COUNTDOWN_TARGET_HOURS = 48

