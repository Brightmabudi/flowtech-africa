import { ArrowRight } from 'lucide-react'
import Button from './Button'

interface GradientCTABannerProps {
  heading: string
  body: string
  ctaLabel: string
  ctaHref: string
}

export default function GradientCTABanner({ heading, body, ctaLabel, ctaHref }: GradientCTABannerProps) {
  return (
    <div className="relative overflow-hidden rounded-panel bg-gradient-to-br from-brand-800 to-brand-600 px-8 py-12 text-center sm:px-14">
      <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">{heading}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">{body}</p>
      <div className="mt-8 flex justify-center">
        <Button href={ctaHref} variant="secondary" icon={<ArrowRight size={16} />} iconPosition="right">
          {ctaLabel}
        </Button>
      </div>
    </div>
  )
}
