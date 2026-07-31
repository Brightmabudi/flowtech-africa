'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Container } from '@frontend/components/ui/Container'
import NavLink from '@frontend/components/ui/NavLink'
import Button from '@frontend/components/ui/Button'
import { cn } from '@frontend/lib/cn'

const LINKS = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Services',  href: '/services'  },
  { label: 'About',     href: '#about'     },
  { label: 'Careers',   href: '/careers'   },
  { label: 'Contact',   href: '#contact'   },
]

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const links = LINKS.map(l => (l.href.startsWith('#') && !isHome) ? { ...l, href: `/${l.href}` } : l)
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  if (pathname === '/login') return null

  return (
    <div className={cn(
      'fixed inset-x-0 top-0 z-[500] border-b border-brand-600/10 bg-white/75 backdrop-blur-xl transition-shadow duration-300',
      scrolled && 'shadow-brand-sm bg-white/85',
    )}>
      <Container>
        <div className={cn('flex items-center justify-between px-6 transition-[height] duration-300 lg:px-10', scrolled ? 'h-16' : 'h-[72px]')}>

          <a
            href={pathname === '/' ? '#' : '/'}
            aria-label={pathname === '/' ? 'FlowTech Africa — Back to top' : 'FlowTech Africa — Back to homepage'}
            className="flex items-center rounded-control focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            <Image src="/logo.png" alt="FlowTech Africa" width={142} height={38} className="h-[38px] w-auto object-contain" priority />
          </a>

          <ul className="hidden list-none items-center gap-9 lg:flex">
            {links.map(l => {
              const isActive = l.href.startsWith('/') && pathname === l.href
              return (
                <li key={l.label}>
                  <NavLink href={l.href} active={isActive}>{l.label}</NavLink>
                </li>
              )
            })}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <NavLink href={isHome ? '#contact' : '/#contact'} className="text-ink-500">Talk to us</NavLink>
            <Button href={isHome ? '#contact' : '/#contact'} size="sm">Get Started</Button>
          </div>

          <button
            className="rounded-control p-2 text-ink-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 lg:hidden"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-brand-600/10 bg-white/90 shadow-brand-sm backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              {links.map(l => (
                <NavLink
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-brand-600/10 py-3 !text-[15px] font-semibold text-ink-950 hover:text-brand-600"
                >
                  {l.label}
                </NavLink>
              ))}
              <Button href={isHome ? '#contact' : '/#contact'} onClick={() => setMobileOpen(false)} className="mt-3 w-full">Get Started</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
