'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { Container, Section } from '@frontend/components/ui/Container'
import Button from '@frontend/components/ui/Button'

export default function CTA() {
  return (
    <Section bg="tint" id="contact-cta">
      <Container className="max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="relative overflow-hidden rounded-panel bg-gradient-to-br from-[#08050F] to-brand-800 px-6 py-16 text-center sm:px-16 sm:py-20"
        >
          <span className="mb-5 flex items-center justify-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-accent-400">Start Today</span>
          <h2 className="mb-5 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.1] tracking-tight text-white">
            Ready to transform<br />
            <span className="bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">your business?</span>
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/70">
            Join 500+ organisations across Africa who trust FlowTech for their mission-critical ICT infrastructure. Our team is ready for a no-obligation consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="#contact" size="lg" icon={<Calendar size={16} />}>Schedule a Demo</Button>
            <Button href="#solutions" variant="secondary" size="lg" icon={<ArrowRight size={15} />} iconPosition="right">View Our Solutions</Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
