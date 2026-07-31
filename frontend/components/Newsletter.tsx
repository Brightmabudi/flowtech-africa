'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, CheckCircle2 } from 'lucide-react'
import { Container, Section } from '@frontend/components/ui/Container'
import Button from '@frontend/components/ui/Button'

export default function Newsletter() {
  const [email, setEmail]     = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [renderedAt]          = useState(() => Date.now())
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website, renderedAt }),
      })
      const data = await res.json()
      if (data.success) setSent(true)
      else setError(data.error || 'Failed to subscribe. Please try again later.')
    } catch {
      setError('Failed to subscribe. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Section bg="dark">
      <Container className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-control border border-brand-600/25 bg-brand-600/15 text-brand-400" aria-hidden="true">
            <Mail size={22} />
          </div>
          <h2 className="mb-3 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Stay Ahead of the Curve
          </h2>
          <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-white/60">
            Insights on cloud, cybersecurity, and digital transformation across Africa — straight to your inbox. No spam, unsubscribe anytime.
          </p>

          {sent ? (
            <div className="mx-auto flex max-w-sm items-center justify-center gap-2.5 rounded-control border border-emerald-500/20 bg-emerald-500/[0.08] px-5 py-4 text-sm font-semibold text-emerald-400">
              <CheckCircle2 size={18} aria-hidden="true" />
              You&apos;re subscribed — thank you!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="text"
                name="website"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-px w-px opacity-0"
              />
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="you@company.co.za"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full flex-1 rounded-control border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none backdrop-blur-md transition-shadow focus:border-brand-500 focus:shadow-[0_0_0_3px_rgba(91,53,213,.25)]"
              />
              <Button type="submit" loading={loading} className="sm:flex-shrink-0">
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          )}
          {error && (
            <div role="alert" className="mx-auto mt-4 max-w-md rounded-control border border-accent-500/20 bg-accent-500/[0.08] p-3 text-[13px] text-accent-400">
              {error}
            </div>
          )}
        </motion.div>
      </Container>
    </Section>
  )
}
