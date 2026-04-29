/**
 * Shared TypeScript interfaces for the dogsplace. storefront.
 *
 * These types mirror the Shopify Storefront API data shapes so swapping
 * the mock constants for real API responses requires minimal changes.
 */

export interface ProductVariant {
  id: string
  name: string
  /** 'inscription' variants render as a free-text input; others render as option buttons */
  type: 'size' | 'inscription' | 'gem'
  options: string[]
}

export interface Product {
  id: string
  name: string
  category: 'dog-bowl' | 'cat-bowl' | 'trinket' | 'custom'
  price: number
  currency: string
  description: string
  details: string
  variants: ProductVariant[]
  isNew: boolean
  inStock: boolean
  /** customizable products show a name-engraving input on the detail page */
  customizable: boolean
  tags: string[]
  /** Tailwind background class used as the image placeholder colour */
  bgClass: string
}

export interface CartItem {
  product: Product
  quantity: number
  /** Maps variant.id → chosen option, e.g. { size: 'Medium', gem: 'Ruby' } */
  selectedVariants: Record<string, string>
  /** Free-text pet name for inscription variants */
  customization?: string
}

export interface User {
  id: string
  email: string
  name: string
}

export interface Category {
  id: string
  title: string
  /** Small label shown above the title in the category grid */
  label: string
  cta: string
  ctaLink: string
  bgClass: string
  textColor: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role?: string
}

/** Returned by useCountdown — each field is pre-floored and clamped at 0 */
export interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
}

