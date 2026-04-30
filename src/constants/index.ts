/**
 * Static application data — products, categories, FAQs, testimonials, nav links.
 *
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
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. ONE SIZE Width 44cm, Height 5cm, Circ 47cm',
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
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Ready to ship.',
    details: 'Lorem ipsum dolor sit amet. Width 38cm, Height 4.5cm.',
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
    id: 'pet-bowl-with-gem',
    name: 'Custom Pet Bowl',
    category: 'dog-bowl',
    price: 22.50,
    currency: 'EUR',
    description: 'Lorem ipsum dolor sit amet your pet\'s name. Perfect as a gift.',
    details: 'Handmade. Approx 8cm diameter.',
    variants: [
      { id: 'inscription', name: 'Inscription', type: 'inscription', options: [] },
      { id: 'gem', name: 'Gem Detail', type: 'gem', options: ['None', 'Pearl', 'Ruby', 'Sapphire', 'Emerald'] },
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
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Ready to ship.',
    details: 'Ad litora torquent per conubia nostra inceptos himenaeos. Width 40cm, Height 5cm.',
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
    id: 'vision-hub',
    title: 'THE VISION HUB',
    label: 'Everything you need to know',
    cta: 'LEMME SEE',
    ctaLink: '/vision-hub',
    bgClass: 'bg-ceramic-600',
    textColor: 'text-white',
  },
  {
    id: 'new-drop',
    title: 'NEW DROP',
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
    ctaLink: '/vision-hub',
    bgClass: 'bg-ceramic-500',
    textColor: 'text-white',
  },
  {
    id: 'create-your-own',
    title: 'CREATE YOUR OWN',
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
    answer: 'Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere with your pet\'s name, paw prints, gem details, and more.',
  },
  {
    question: 'What are the sizes that you offer?',
    answer: 'Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Custom sizes are also available on request.',
  },
  {
    question: 'I have an idea but can\'t see it here.',
    answer: 'Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
  },
  {
    question: 'How often do you restock?',
    answer: 'Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
  },
  {
    question: 'How do we customise?',
    answer: 'Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.',
  },
  {
    question: 'I need more information.',
    answer: 'Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.',
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

