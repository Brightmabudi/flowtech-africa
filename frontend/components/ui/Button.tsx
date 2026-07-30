'use client'
import { type ReactNode, type ButtonHTMLAttributes } from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { cn } from '@frontend/lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  external?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  loading?: boolean
  type?: 'button' | 'submit'
  className?: string
  onClick?: () => void
}

const base = 'inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-control transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:hover:translate-y-0'

const variants: Record<ButtonVariant, string> = {
  primary:   'bg-gradient-to-br from-brand-800 to-brand-600 text-white shadow-brand-md hover:shadow-brand-lg hover:-translate-y-0.5',
  secondary: 'bg-white/5 text-white/80 border border-white/10 backdrop-blur hover:bg-white/10 hover:border-white/20 hover:text-white',
  ghost:     'bg-transparent text-ink-950 border border-brand-600/20 hover:bg-brand-50 hover:border-brand-600/40',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-[15px]',
  lg: 'px-7 py-3.5 text-[15px]',
}

export default function Button({
  children, variant = 'primary', size = 'md', href, external, icon, iconPosition = 'left',
  loading, disabled, type = 'button', className, onClick, ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className)
  const content = (
    <>
      {loading
        ? <Loader2 size={16} className="animate-spin" aria-hidden="true" />
        : icon && iconPosition === 'left' ? <span aria-hidden="true" className="inline-flex">{icon}</span> : null}
      {children}
      {!loading && icon && iconPosition === 'right' ? <span aria-hidden="true" className="inline-flex">{icon}</span> : null}
    </>
  )

  if (href && !disabled) {
    const isInternal = href.startsWith('/') && !external
    const isAnchor = href.startsWith('#')
    if (isAnchor) {
      return <a href={href} onClick={onClick} className={classes}>{content}</a>
    }
    if (isInternal) {
      return <Link href={href} onClick={onClick} className={classes}>{content}</Link>
    }
    return <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} onClick={onClick} className={classes}>{content}</a>
  }

  return (
    <button type={type} disabled={disabled || loading} onClick={onClick} className={classes} {...rest}>
      {content}
    </button>
  )
}
