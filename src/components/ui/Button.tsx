/**
 * Button — shared CTA component used throughout the storefront.
 *
 */
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../lib/utils'

type ButtonVariant = 'dark' | 'light' | 'ghost' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg'
}

const variantClasses: Record<ButtonVariant, string> = {
  dark: 'bg-ceramic-950 text-ceramic-50 hover:bg-ceramic-800',
  light: 'bg-white/20 backdrop-blur-sm text-white border border-white/40 hover:bg-white/30',
  ghost: 'bg-transparent text-ceramic-950 border border-ceramic-300 hover:bg-ceramic-100',
  outline: 'bg-transparent text-ceramic-950 border border-ceramic-950 hover:bg-ceramic-950 hover:text-white',
}

const sizeClasses = {
  sm: 'px-5 py-2 text-[10px]',
  md: 'px-8 py-3 text-[11px]',
  lg: 'px-10 py-4 text-xs',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'dark', size = 'md', className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        // tracking-[0.2em] uppercase is consistent with the brand's label style
        'tracking-[0.2em] uppercase font-medium transition-colors duration-200 inline-flex items-center justify-center gap-2',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
)

Button.displayName = 'Button'
