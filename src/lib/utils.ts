import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names with full Tailwind conflict resolution.
 *
 * clsx handles conditional logic (arrays, objects, falsy values).
 * twMerge resolves Tailwind conflicts so the last class wins,
 * e.g. cn('px-4', 'px-8') → 'px-8' instead of both being present.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a price using the browser's built-in Intl API.
 *
 * de-DE locale is used because it formats EUR as "41,95 €" which matches
 * the European ceramics market convention shown in the Naetive reference.
 * Change the locale to match the store's target region.
 */
export function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

/**
 * Returns a Date that is `hoursFromNow` hours in the future from the moment
 * of the call. Used to initialise the 48-hour countdown target.
 *
 * The result is computed once inside a useMemo so the target date stays stable
 * across re-renders — calling this directly inside render would reset the timer
 * on every render cycle.
 */
export function getCountdownTarget(hoursFromNow: number): Date {
  const target = new Date()
  target.setHours(target.getHours() + hoursFromNow)
  return target
}
